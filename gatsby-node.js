const DEPLOY_ENV = process.env.DEPLOY_ENV || 'lbn_published_production';

/**
 * Generate node edges
 *
 * @param {any} { node, actions, getNode }
 */
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  /**
   * If these don't exist, the LBN WordPress Plugin isn't installed – so build all posts.
   */
  if (
    !Object.prototype.hasOwnProperty.call(node, 'meta') ||
    !Object.prototype.hasOwnProperty.call(node.meta, 'lbn_published_production')
    ) {
    createNodeField({ node, name: 'deploy', value: true });
    return;
  }

  let deploy;

  if (node.meta[DEPLOY_ENV]) {
    deploy = true;
  } else {
    deploy = false;
  }

  createNodeField({ node, name: 'deploy', value: deploy });
};


const _ = require('lodash');
const path = require('path');
const slash = require(`slash`);

const queryWordPressGatsbyConfig = `
  {
    wordpressGatsbyConfig {
      per_page
      front_page
      posts_page
    }
  }
`

const queryWordPressPages = `
  {
    allWordpressPage (filter: { status: { eq : "publish" } }) {
      edges {
        node {
          id
          wordpress_id
          slug
          template
        }
      }
    }
  }
`

const queryWordPressPosts = `
  {
    allWordpressPost (filter: { status: { eq : "publish" } }) {
      edges {
        node {
          id
          wordpress_id
          slug
          template
        }
      }
    }
  }
`

const queryWordPressCategories = `
  {
    allWordpressCategory {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`;


const pageTemplate = path.resolve(`./src/templates/page.js`)
const homeTemplate = path.resolve(`./src/templates/home.js`)
const postTemplate = path.resolve(`./src/templates/post.js`)
const blogTemplate = path.resolve(`./src/templates/blog.js`)
const aboutTemplate = path.resolve(`./src/templates/about.js`)
const careersTemplate = path.resolve(`./src/templates/careers.js`)
const inviteTemplate = path.resolve(`./src/templates/request_invite.js`)
const categoryTemplate = path.resolve(`./src/templates/category.js`)

exports.createPages = ({ graphql, boundActionCreators }) => {

    let config;
    const { createPage } = boundActionCreators;

    return new Promise((resolve, reject) => {

        graphql(queryWordPressGatsbyConfig)

            .then(r => {
                if (r.errors) {
                    console.log(r.errors);
                    reject(r.errors);
                }
                return r.data.wordpressGatsbyConfig;
            })

            .then(config => {

                return graphql(queryWordPressPages).then(r => {
                    if (r.errors) {
                        console.log(r.errors);
                        reject(r.errors);
                    }
                    _.each(r.data.allWordpressPage.edges, edge => {
                        createPage({
                            path: edge.node.wordpress_id === config.front_page ? '/' : edge.node.slug,
                            component: (
                              () => {
                                  if (edge.node.wordpress_id === config.posts_page) {
                                      return slash(blogTemplate);
                                  } else if (edge.node.wordpress_id === config.front_page) {
                                      return slash(homeTemplate);
                                  } else if (edge.node.wordpress_id === 13) {
                                      return slash(aboutTemplate);
                                  } else if (edge.node.wordpress_id === 15) {
                                    return slash(careersTemplate);
                                  } else if (edge.node.wordpress_id === 14) {
                                    return slash(inviteTemplate);
                                }
                                  return slash(pageTemplate);
                              }
                            )(),
                            context: {
                                id: edge.node.id,
                                wordpress_id: edge.node.wordpress_id
                            }
                        });
                    });
                })
                .then(r => {
                    return graphql(queryWordPressPosts).then(r => {
                        if (r.errors) {
                            console.log(r.errors);
                            reject(r.errors);
                        }
                        _.each(r.data.allWordpressPost.edges, edge => {
                            createPage({
                                path: edge.node.slug,
                                component: slash(postTemplate),
                                context: {
                                    id: edge.node.id,
                                    wordpress_id: edge.node.wordpress_id
                                }
                            });
                        });
                    });
                })
                .then(r => {
                    return graphql(queryWordPressCategories).then(r => {
                        if (r.errors) {
                            console.log(r.errors);
                            reject(r.errors);
                        }
                        _.each(r.data.allWordpressCategory.edges, edge => {
                            createPage({
                                path: `category/${edge.node.slug}`,
                                component: slash(categoryTemplate),
                                context: {
                                    id: edge.node.id,
                                    wordpress_posts_page_id: config.posts_page
                                }
                            })
                        });

                    });

                })
                .then(r => {
                    resolve();
                })

            });

    });

};

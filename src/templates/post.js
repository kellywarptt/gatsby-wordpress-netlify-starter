import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from "../components/seo"

class BlogPost extends React.Component {
  render() {
    const pageData = this.props.data.wordpressPage

    return (
      <Layout pageId={pageData.wordpress_id}>
        Blog Post
      </Layout>
    )
  }
}

export default BlogPost

export const postQuery = graphql`
    query currentPostQuery($id: String!) {
        wordpressPage(id: { eq: $id }) {
            title
            content
            excerpt
            wordpress_id
            yoast_wpseo {
              title
              metadesc
              metakeywords
            }
        }
    }
`

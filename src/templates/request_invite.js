import React, {Component} from "react";
import Layout from '../components/layout';
import SEO from "../components/seo"
import { graphql } from "gatsby"

class RequestInvite extends Component {
  render() {
    const pageData = this.props.data.wordpressPage

    return (
      <Layout pageId={pageData.wordpress_id}>
      <SEO title="Request Invite" />
        <div className="invite">
          <div className="form">
            <div className="container">
              <h1>
                {pageData.acf.request_invite.headline}
              </h1>
              <div className="grid-6 copy">
                <p>
                  {pageData.acf.request_invite.copy}
                </p>
                <img src={pageData.acf.request_invite.image.source_url} alt={pageData.acf.request_invite.image.alt_text} />
              </div>
              <div className="grid-5"
                dangerouslySetInnerHTML={{ __html: pageData.acf.request_invite.form_embed}}
              />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default RequestInvite;

export const inviteQuery = graphql`
  query invitePageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      wordpress_id
      yoast_wpseo {
        title
        metadesc
        metakeywords
      }
      acf {
        request_invite {
          copy
          form_embed
          headline
          image {
            source_url
            alt_text
          }
        }
      }
    }
  }
`

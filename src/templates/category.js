import React, { Component } from 'react';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

export default class CategoryTemplate extends Component {
    render() {
        const { page, posts, categories, category, config } = this.props.data;
        return (
            <Layout>
                <SEO title="Careers" />
            </Layout>
        );
    }
}

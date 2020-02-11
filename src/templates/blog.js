import React, { Component } from 'react';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

export default class BlogTemplate extends Component {
    render() {
        const { page, posts, categories, config } = this.props.data;
        return (
            <Layout config={config} hero={{ image: page.hero, title: page.title }}>
                test
            </Layout>
        );
    }
}
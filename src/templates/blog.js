import React, { Component } from 'react';

import Layout from "../components/layout";

export default class BlogTemplate extends Component {
    render() {
        const { page, posts, categories, config } = this.props.data;
        return (
            <Layout>
                test
            </Layout>
        );
    }
}
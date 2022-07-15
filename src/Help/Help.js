import React from 'react'
import Footer from '../SharedComponents/Footer'
import Header from '../SharedComponents/Header'
import Content from './Content.js'

export default function Help() {
    function componentDidMount() {
        document.title = "Help"
    }
    return (
        <div onLoad={componentDidMount()}>
            <Header />
            <Content />
            <Footer />
        </div>
    )
}

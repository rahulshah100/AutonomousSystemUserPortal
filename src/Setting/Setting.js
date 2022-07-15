import React from 'react'
import Content from './Content.js'
import Footer from '../SharedComponents/Footer'
import Header from '../SharedComponents/Header'

export default function Setting() {
    function componentDidMount() {
        document.title = "Setting"
    }
    return (
        <div onLoad={componentDidMount()}>
            <Header />
            <Content />
            <Footer />
        </div>
    )
}

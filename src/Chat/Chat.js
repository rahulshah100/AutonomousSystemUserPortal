import React from 'react'
import Header from '../SharedComponents/Header'
import Footer from '../SharedComponents/Footer'
import Content from './Content'

export default function Chat() {
    function componentDidMount() {
        document.title = "Chat"
    }
    return (
        <div onLoad={componentDidMount()}>
            <Header />
            <Content />
            <Footer active="4"/>
        </div>
    )
}

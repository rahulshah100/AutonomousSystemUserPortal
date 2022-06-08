import React from 'react'
import Header from '../SharedComponents/Header'
import Footer from '../SharedComponents/Footer'
import Content from './Content'

export default function Map() {
    function componentDidMount() {
        document.title = "Map"
    }
    return (
        <div onLoad={componentDidMount()}>
            <Header />
            <Content />
            <Footer active="3"/>
        </div>
    )
}

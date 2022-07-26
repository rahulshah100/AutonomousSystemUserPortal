import React from 'react'
import Header from '../SharedComponents/Header'
import Footer from '../SharedComponents/Footer'
import Content from './Content'

export default function CameraView(props) {
    function componentDidMount() {
        document.title = "Camera View"
    }
    return (
        <div onLoad={componentDidMount()}>
            <Header />
            <Content siteStartedAt={props.siteStartedAt}/>
            <Footer active="2"/>
        </div>
    )
}

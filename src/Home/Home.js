import React from 'react'
import Header from '../SharedComponents/Header'
import Content from './Content'
import Footer from '../SharedComponents/Footer'

export default function HomePage() {
  function componentDidMount() {
    document.title = "Home"
  }

  return (
    <div onLoad={componentDidMount()}>
      <Header />
      <Content />
      <Footer active="1"/>
    </div>
  )
}

import React from 'react'
import Header from '../SharedComponents/Header'
import Footer from '../SharedComponents/Footer'
import Content from './Content'

export default function NotificationHistory() {
  function componentDidMount(){
    document.title = "Notification History"
}

  return (
    <div onLoad={componentDidMount()}>
      <Header/>
      <Content/>
      <Footer/>
    </div>
  )
}

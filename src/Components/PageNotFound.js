import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function PageNotFound() {
  return (
    <div>
      <Header/>
      <h2 style={{minHeight:'39.5vw', textAlign:'center'}}>This Page does not exist.</h2>
      <Footer/>
    </div>
  )
}

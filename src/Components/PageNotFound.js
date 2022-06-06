import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function PageNotFound() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: '40.2vw'}}>
        <h1>Oops! <span>This Page does not exist.</span> </h1>        
      </div>
      <Footer />
    </div>
  )
}

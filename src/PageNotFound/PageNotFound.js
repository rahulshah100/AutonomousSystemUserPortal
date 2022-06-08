import React from 'react'
import Footer from '../SharedComponents/Footer'
import Header from '../SharedComponents/Header'

export default function PageNotFound() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: '40.2vw', padding:20}}>
        <h1>Oops! <span>This Page does not exist.</span> </h1>        
      </div>
      <Footer />
    </div>
  )
}

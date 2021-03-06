import React, { useState, useEffect } from 'react'
import Header from '../SharedComponents/Header'
import HomePageLeftHalf from './HomePageLeftHalf'
import HomePageRightHalf from './HomePageRightHalf'
import Tutorial from './Tutorial'
import Footer from '../SharedComponents/Footer'

export default function HomePage(props) {
  const [righthalf, setrighthalf] = useState("Home")
  const [lefthalf, setlefthalf] = useState(1)

  useEffect(() => {
    // Deciding to show RightHalf as home page's right half or to display is as tutorials page.
    if (window.location.href.substring(window.location.href.lastIndexOf('#') + 1) === "Home") {
      setrighthalf("Home")
    } else if (window.location.href.substring(window.location.href.lastIndexOf('#') + 1) === "Tutorial") {
      setrighthalf("Tutorial")
    } else { setrighthalf("Home") }

    if (righthalf === "Home") {
      document.title = "Home"
    } else if (righthalf === "Tutorial") {
      document.title = "Tutorial"
    }
  }, [righthalf])


  return (
    <div>
      <Header />
      <div className="containerHomePage" style={{ height: '40.2vw' }}>
        {lefthalf === 1 && <HomePageLeftHalf siteStartedAt={props.siteStartedAt} />}
        {righthalf === "Home" && <HomePageRightHalf data={setrighthalf} />}
        {righthalf === "Tutorial" && <Tutorial data={setrighthalf} />}
      </div>
      <Footer active="1" />
    </div>
  )
}

import React from 'react'
import Content from './Content.js'

export default function Controller(props) {
  // Preventing audio in the background to be played on this page. Chrome was showing an error warning as a notification for pausing, so to take care of that error, I used try catch block below.
  try {
    props.audio.pause()
    props.audio.currentTime = 0
  }
  catch{
    console.log("Browser threw an error/warning")
  }

  return (
    <div>
      <Content />
    </div>
  )
}

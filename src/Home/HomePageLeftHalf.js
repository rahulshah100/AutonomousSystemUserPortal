import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './HomeStyle.css'

export default function HomePageLeftHalf(props) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // To keep videos ongoing and in sync.
  useEffect(() => {
    let currentTime = new Date();
    let videoIsAt = (currentTime - props.siteStartedAt) / 1000
    document.getElementById("MapVid").currentTime = videoIsAt
  })

  // To replace thumbnail Image with the map video as the video gets loaded.
  function onLoadedData() {
    setIsVideoLoaded(true)
  }

  return (
    <div>
      <div className='item1' style={{ textAlign: 'center', background: 'black', padding: 0, maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'relative', minHeight: '100px' }}>
          <img className='MapVidHeader' src="images/MapVidHeader.png" alt="Map Video Description" style={{ left: 0, position: 'absolute', width: '100%' }} />
        </div>
        <div className='MapVid'>
          {/* till the video loads, we'll show a blurred out image as a thumbnail */}
          <img src="images/HomePageMapThumbnail.png" alt="Thumbnail Image of Map" style={{ zoom: 0.790, display: isVideoLoaded ? 'none' : 'block' }} />
          <video style={{ width: '85%' }} autoPlay={true} muted={true} onLoadedData={onLoadedData} id="MapVid">
            <source src="Videos/Map1.mp4" type="video/mp4" autoPlay={true} />
          </video>
        </div>
      </div>
    </div>
  )
}

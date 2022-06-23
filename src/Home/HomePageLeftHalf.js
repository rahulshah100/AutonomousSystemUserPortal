import React from 'react'
import './HomeStyle.css'

export default function HomePageLeftHalf() {
  // const msg = new SpeechSynthesisUtterance()

  function videoControls() {
    // document.querySelector('video').playbackRate = 5;
    // msg.text = 'okokokokokokokookokokokok'
    // window.speechSynthesis.speak(msg)
    // document.getElementsByTagName('audio')[0].volume = 0.25;
}

  return (
    <div  onLoad={() => videoControls()}>
       <div className='item1' style={{ textAlign: 'center', background: 'black', padding: 0 }}>
                <div className='MapVid'>
                    <video style={{ width: 530 }} autoPlay={true} muted={true}>
                        <source src="/Videos/Map1.mp4" type="video/mp4" autoPlay={true} />
                    </video>
                    {/* <audio src='/Audio/sample.mp3' loop='loop' autoPlay={true}/> */}
                </div>
            </div>
    </div>
  )
}

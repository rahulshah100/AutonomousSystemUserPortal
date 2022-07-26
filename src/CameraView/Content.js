import React from 'react'
import './CameraViewStyle.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Content(props) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [currentVid, setCurrentVid] = useState(0)

    // To keep videos ongoing and in sync.
    useEffect(() => {
        let currentTime = new Date();
        let videoIsAt = (currentTime - props.siteStartedAt) / 1000
        document.getElementById("Vid").currentTime = videoIsAt
    }, [currentVid])

    // To replace thumbnail Image with the map video as the video gets loaded.
    function onLoadedData() {
        setIsVideoLoaded(true)
    }

    // Becomes functional as buttons are pressed to choose between the different camera views.
    function initializePage(e) {
        if (e.currentTarget.id) {
            if (e.currentTarget.id === "Front") {
                // TO show that button as active/selected one.
                document.getElementById(e.currentTarget.id).classList += " activeView"

                // TO show remaining buttons as unselected.
                document.getElementById("Rear").classList = "Viewbtn"
                document.getElementById("Left").classList = "Viewbtn"

                // To show that Image/Video and hide others.                
                document.getElementsByClassName('FrontImgVid')[0].style.display="block"
                document.getElementsByClassName('RearImgVid')[0].style.display="none"
                document.getElementsByClassName('SideImgVid')[0].style.display="none"               

                // To reload the useEffect, so to sync this video, as it has loaded again.
                setCurrentVid(currentVid + 1)
            }
            else if (e.currentTarget.id === "Rear") {
                // setCurrentVid('Trip1RearCamera.mkv')
                document.getElementById(e.currentTarget.id).classList += " activeView"
                         
                document.getElementsByClassName('RearImgVid')[0].style.display="block"
                document.getElementsByClassName('FrontImgVid')[0].style.display="none"
                document.getElementsByClassName('SideImgVid')[0].style.display="none"
                
                document.getElementById("Front").classList = "Viewbtn"
                document.getElementById("Left").classList = "Viewbtn"
            }
            else {
                // setCurrentVid('Trip1LeftCamera.mkv')
                document.getElementById(e.currentTarget.id).classList += " activeView"
                
                document.getElementsByClassName('SideImgVid')[0].style.display="block"
                document.getElementsByClassName('FrontImgVid')[0].style.display="none"
                document.getElementsByClassName('RearImgVid')[0].style.display="none"
                
                document.getElementById("Rear").classList = "Viewbtn"
                document.getElementById("Front").classList = "Viewbtn"
            }
        }
    }

    return (
        <div className='containerCam' style={{ height: '40.2vw' }}>
            {/* Buttons */}
            <div className='item1'>
                <div className='Viewbtn activeView' title='Front View' id='Front' onClick={(e) => { initializePage(e) }}><Link to='#' style={{
                    textDecoration: 'none', color: 'white'
                }}>Front View</Link></div>
                <div className='Viewbtn' id='Rear' onClick={(e) => { initializePage(e) }}><Link title='Rear View' to='#' style={{
                    textDecoration: 'none', color: 'white'
                }}>Rear View</Link></div>
                <div className='Viewbtn' title='Left View' id='Left' onClick={(e) => { initializePage(e) }}><Link to='#' style={{
                    textDecoration: 'none', color: 'white'
                }}>Left Side View</Link></div>
            </div>
            {/* Images/Videos */}
            <div className='item2'>
                <span className='FrontImgVid'>
                    <img src="images/FrontBlur.png" alt="Thumbnail Image of Map" style={{ marginBottom: 30, zoom: 0.8, display: isVideoLoaded ? 'none' : 'block' }} />
                    <video autoPlay={true} muted={true} id="Vid" width={'100%'} style={{ marginBottom: 30, display: isVideoLoaded ? 'block' : 'none' }} onLoadedData={onLoadedData}>
                        <source src="Videos/Trip1FrontCamera.mkv" type="video/mp4" autoPlay={true} />
                    </video>
                </span>
                <span className='RearImgVid' style={{display:'none', width:'100%'}}>
                    <img className="CamImage" src="images/Rear.png" alt="CamImage" />
                </span>
                <span className='SideImgVid' style={{display:'none', width:'100%'}}>
                    <img className="CamImage" src="images/Left.png" alt="CamImage" />
                </span>
            </div>
        </div>
    )
}

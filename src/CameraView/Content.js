import React from 'react'
import './CameraViewStyle.css'
import { Link } from 'react-router-dom'

export default function Content() {

    function initializePage(e) {
        // console.log(e.currentTarget.id)
        if (e.currentTarget.id) {
            if (e.currentTarget.id === "Rear") {
                document.getElementById(e.currentTarget.id).classList += " activeView"
                document.getElementsByClassName("item2")[0].innerHTML='<img class="CamImage" src="images/Rear.png"/>'
                // console.log("rear")
                document.getElementById("Front").classList = "Viewbtn"
                document.getElementById("Left").classList = "Viewbtn"
            }
            else if (e.currentTarget.id === "Front") {
                document.getElementById(e.currentTarget.id).classList += " activeView"
                document.getElementsByClassName("item2")[0].innerHTML='<img class="CamImage" src="images/Front.png"/>'
                // console.log("front")
                document.getElementById("Rear").classList = "Viewbtn"
                document.getElementById("Left").classList = "Viewbtn"
            }
            else {
                document.getElementById(e.currentTarget.id).classList += " activeView"
                document.getElementsByClassName("item2")[0].innerHTML='<img class="CamImage" src="images/Left.png"/>'
                // console.log("left")
                document.getElementById("Rear").classList = "Viewbtn"
                document.getElementById("Front").classList = "Viewbtn"
            }
        }
    }

    return (
        <div className='containerCam' style={{ height: '40.2vw' }}>
            <div className='item1'>
                <div className='Viewbtn activeView' id='Rear' onClick={(e) => { initializePage(e) }}><Link title='Rear View' to='#' style={{
                    textDecoration: 'none', color: 'white'
                }}>Rear View</Link></div>
                <div className='Viewbtn' title='Front View' id='Front' onClick={(e) => { initializePage(e) }}><Link to='#' style={{
                    textDecoration: 'none', color: 'white'
                }}>Front View</Link></div>
                <div className='Viewbtn' title='Left View' id='Left' onClick={(e) => { initializePage(e) }}><Link to='#' style={{
                    textDecoration: 'none', color: 'white'
                }}>Left Side View</Link></div>
            </div>
            <div className='item2'>
                <img className="CamImage" src="images/Rear.png"/>
            </div>
        </div>
    )
}

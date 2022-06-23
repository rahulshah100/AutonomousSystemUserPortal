import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './TutorialStyle.css'

export default function Content(props) {
    const[currentCard,setcurrentCard]=useState(1)

    function pagination() {
        console.log('Pahin')
    }
    function turnMapBgRed() {  }

    function componentDidmount(){
        console.log('mountess')
    }

    useEffect(()=>{
        console.log("current Value", currentCard)
        if(currentCard===6){
            document.getElementById('MapIcon').background = 'red';
            console.log(document.getElementById('MapIcon').background) 
            console.log('rutenr red')
        }
    }, [currentCard])

    return (
        <div style={{ height: '40.2vw', fontFamily: 'Arial, Helvetica, sans-serif', paddingTop: '40px' }} className="TutorialContainer">
            <Link to="#Home" className='goBack' onClick={() => { props.data("Home") }} style={{ color: 'black', textDecoration: 'none' }}><h3> &larr; Go Back </h3></Link>

            <div style={{ minHeight: '81%', border: '2px solid black', borderRadius: ' 10px', backgroundColor: 'white', paddingLeft: 10, position: 'relative' }} className="alert">
                <div>
                    <img src="images/card6.png" alt="Tutorial Icon" style={{ zoom: 0.7, marginLeft: 10, marginTop: 10 }} />
                    <h3 style={{ color: 'blue', color: 'rgb(2,91,130)', verticalAlign: 'middle', lineHeight: '45px', fontWeight: 600, display: 'inline-block' }}>
                        Tutorial Mode
                    </h3>
                    <hr style={{ backgroundColor: 'rgb(2,91,130)', color: 'rgb(2,91,130)', height: '3.5px' }} />
                </div>


                <div>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '200px', alignItems: 'center' }} className='hide'>
                        <h3><b> Welcome to Tutorial Mode! </b></h3>
                        <h3 style={{ width: '80%' }}>We can give you instructions for easy navigation</h3>
                    </div>

                    <div className='hide'>
                        <h4>
                            <ul>
                                <li>What is my trip status?</li><br />
                                <li>How can I make a change to my trip? </li><br />
                                <li>Where can I view event history?</li><br />
                                <li>How can I ask a question?</li>
                            </ul>
                        </h4>
                    </div>

                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '200px', alignItems: 'center', padding: 20 }} className="hide">
                        <h3 className='redBox' style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>Your current location is always displayed on the home screen</h3>
                    </div>

                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '200px', alignItems: 'center', padding: 20 }} className="hide">
                        <h3 className='redBox' style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>On the Home Screen, you'll also have access to your Destination and Arrival Time</h3>
                    </div>

                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '200px', alignItems: 'center', padding: 20 }} className="hide">
                        <h3 className='redBox' style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>You can also view your location while in Map View</h3>
                    </div>

                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '200px', alignItems: 'center', padding: 20 }} className="" >
                        <h3 className='redBox' style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '100%' }}>Try clicking here</h3>
                        <div style={{ position: 'relative' }} >
                            <div style={{ width: '5px', minHeight: '100px', backgroundColor: 'red', position: 'absolute', top: 0 }}></div>
                            <div style={{ minWidth: '220px', minHeight: '5px', backgroundColor: 'red', position: 'absolute', top: 100, left: -215 }}></div>
                            <div style={{ width: '5px', minHeight: '83px', backgroundColor: 'red', position: 'absolute', top: 100, left: -215 }}></div>
                            <div style={{ color: 'red', position: 'absolute', bottom: -195, left: -232 }}><span style={{ zoom: 4.4 }}> &#8964;</span></div>
                        </div>
                    </div>
                </div>

                <div className='Cardfooter' style={{ position: 'absolute', bottom: 10 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" fill="currentColor" className="leftArrow bi bi-chevron-left" viewBox="0 0 16 16" onClick={()=>{setcurrentCard(currentCard-1)}}>
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" fill="currentColor" className="rightArrow bi bi-chevron-right" viewBox="0 0 16 16" onClick={()=>{setcurrentCard(currentCard+1)}}>
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" fill="currentColor" className="reverseArrow bi bi-arrow-clockwise" viewBox="0 0 16 16" onClick={()=>{setcurrentCard(1)}}>
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

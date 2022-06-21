import React from 'react'
import './HomeStyle.css'
import { Link } from 'react-router-dom'

export default function Header() {
    // const msg = new SpeechSynthesisUtterance()

    function videoControls() {
        // document.querySelector('video').playbackRate = 5;
        // msg.text = 'okokokokokokokookokokokok'
        // window.speechSynthesis.speak(msg)
        // document.getElementsByTagName('audio')[0].volume = 0.25;
    }

    return (
        <div className="containerHomePage" style={{ height: '40.2vw' }} onLoad={() => videoControls()}>
            <div className='item1' style={{ textAlign: 'center', background: 'black', padding: 0 }}>
                <div className='MapVid'>
                    <video style={{ width: 530 }} autoPlay={true} muted={true}>
                        <source src="/Videos/Map1.mp4" type="video/mp4" autoPlay={true} />
                    </video>
                    {/* <audio src='/Audio/sample.mp3' loop='loop' autoPlay={true}/> */}
                </div>
            </div>
            <div className='item2'>
                <div className='TopBar'>
                    <div className='QuickAccess'>Quick Access</div>
                    <div className='SeeMore'><Link to='#' style={{
                        textDecoration: 'none', color: 'rgb(255, 64, 0)'
                    }}> See more </Link></div>
                </div>
                <div className='Cards'>
                    <Link to="#" className='Card' style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                        <div className='CardIcon'><img src="/images/Card1.png" alt="View Route" title='View Route' /></div>
                        <div className='CardText'>View Route</div>
                    </Link>
                    <Link to="#" className='Card' style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                        <div className='CardIcon'><img src="/images/Card2.png" alt="Change Destination" title='Change Destination' /></div>
                        <div className='CardText'>Change Destination</div>
                    </Link>
                    <Link to="#" className='Card' style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                        <div className='CardIcon'><img src="/images/Card3.png" alt="Payment Options" title='Payment Options' /></div>
                        <div className='CardText'>Payment Options</div>
                    </Link>
                    <Link to="#" className='Card' style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                        <div className='CardIcon'><img src="/images/Card4.png" alt="Adjust Text" title='Adjust Text' /></div>
                        <div className='CardText'>Adjust Text</div>
                    </Link>
                    <Link to="#" className='Card' style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                        <div className='CardIcon'><img src="/images/Card5.png" alt="Adjust Sounds" title='Adjust Sounds' /></div>
                        <div className='CardText'>Adjust Sounds</div>
                    </Link>
                    <Link to="#" className='Card' style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                        <div className='CardIcon'><img src="/images/Card6.png" alt="Tutorial Mode" title='Tutorial Mode' /></div>
                        <div className='CardText'>Tutorial Mode</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
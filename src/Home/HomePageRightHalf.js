import React from 'react'
import './HomeStyle.css'
import { Link } from 'react-router-dom'

export default function Header(props) {
    setTimeout(() => {
        document.getElementById('MapIcon').style.background = 'none'
        document.getElementById('MapIcon').style.outline = 'none'
        document.getElementsByClassName('MapVid')[0].style.border = 'none'
        document.getElementsByClassName('MapVidHeader')[0].style.border = 'none'
    })
    return (        
        <div className='item2'>
            <div className='TopBar'>
                <div className='QuickAccess'>Quick Access</div>
                <div className='SeeMore'>
                    <Link to='#' title='See More Options' style={{
                        textDecoration: 'none', color: 'rgb(255, 64, 0)'
                    }}> See more </Link>                    
                </div>
            </div>
            <div className='Cards'>
                <Link to="#" className='Card' title="View Route" style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                    <div className='CardIcon'><img src="images/Card1.png" alt="View Route" title='View Route' /></div>
                    <div className='CardText' style={{display:'flex', justifyContent:'center'}}>View Route</div>
                </Link>
                <Link to="#" className='Card' title="Change Destination" style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                    <div className='CardIcon'><img src="images/Card2.png" alt="Change Destination" title='Change Destination' /></div>
                    <div className='CardText' style={{display:'flex', justifyContent:'center'}}>Change Destination</div>
                </Link>
                <Link to="#" className='Card' title="Payment Options" style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                    <div className='CardIcon'><img src="images/Card3.png" alt="Payment Options" title='Payment Options' /></div>
                    <div className='CardText' style={{display:'flex', justifyContent:'center'}}>Payment Options</div>
                </Link>
                <Link to="#" className='Card' title="Display Settings" style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                    <div className='CardIcon'><img src="images/Card4.png" alt="Display Settings" title='Display Settings' /></div>
                    <div className='CardText' style={{display:'flex', justifyContent:'center'}}>Display Settings</div>
                </Link>
                <Link to="#" className='Card' title="Audio Settings" style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }}>
                    <div className='CardIcon'><img src="images/Card5.png" alt="Audio Settings" title='Audio Settings' /></div>
                    <div className='CardText' style={{display:'flex', justifyContent:'center'}}>Audio Settings</div>
                </Link>
                <Link to="#Tutorial" className='Card' title="Tutorial Mode" style={{ textDecoration: 'none', color: 'rgb(2, 91, 130)', marginTop: '0px' }} onClick={() => { props.data("Tutorial") }}>
                    <div className='CardIcon'><img src="images/Card6.png" alt="Tutorial Mode" title='Tutorial Mode' /></div>
                    <div className='CardText' style={{display:'flex', justifyContent:'center'}}>Tutorial Mode</div>
                </Link>
            </div>
        </div>
    )
}
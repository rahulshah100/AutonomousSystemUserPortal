import React from 'react'
import './HomeStyle.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className="container" style={{ height: '40.2vw' }} >
            <div className='item1'>
                <div className=''>
                </div>
                <div className=''>
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
                    <div className='Card'>
                        <Link to="#" style={{textDecoration:'none', color:'rgb(2, 91, 130)'}}>
                            <div className='CardIcon'><img src="/images/Card1.png" alt="View Route" title='View Route' /></div>
                            <div className='CardText'>View Route</div>
                        </Link>
                    </div>
                    <div className='Card'>
                        <Link to="#" style={{textDecoration:'none', color:'rgb(2, 91, 130)'}}>
                            <div className='CardIcon'><img src="/images/Card2.png" alt="Change Destination" title='Change Destination' /></div>
                            <div className='CardText'>Change Destination</div>
                        </Link>
                    </div>
                    <div className='Card'>
                        <Link to="#" style={{textDecoration:'none', color:'rgb(2, 91, 130)'}}>
                            <div className='CardIcon'><img src="/images/Card3.png" alt="Payment Options" title='Payment Options' /></div>
                            <div className='CardText'>Payment Options</div>
                        </Link>
                    </div>
                    <div className='Card'>
                        <Link to="#" style={{textDecoration:'none', color:'rgb(2, 91, 130)'}}>
                            <div className='CardIcon'><img src="/images/Card4.png" alt="Adjust Text" title='Adjust Text' /></div>
                            <div className='CardText'>Adjust Text</div>
                        </Link>
                    </div>
                    <div className='Card'>
                        <Link to="#" style={{textDecoration:'none', color:'rgb(2, 91, 130)'}}>
                            <div className='CardIcon'><img src="/images/Card5.png" alt="Adjust Sounds" title='Adjust Sounds' /></div>
                            <div className='CardText'>Adjust Sounds</div>
                        </Link>
                    </div>
                    <div className='Card'>
                        <Link to="#" style={{textDecoration:'none', color:'rgb(2, 91, 130)'}}>
                            <div className='CardIcon'><img src="/images/Card6.png" alt="Tutorial Mode" title='Tutorial Mode' /></div>
                            <div className='CardText'>Tutorial Mode</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
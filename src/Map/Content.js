import React from 'react'
import './MapStyle.css'
import { Link } from 'react-router-dom'

export default function Content() {  
  return (
    <div style={{ height: '40.2vw' }} className='containerMap'>
      <div className='item1' style={{ paddingTop: '99.6%', paddingLeft: '6%', border: '1px solid black' }}>
        <img src="images/Speed Limit.png" alt="Map" style={{ zoom: 1.2 }} />
      </div>

      <div className='item2'>
        <div className='DesinationTime'>
          <div>
            <h5 style={{ display: 'inline-block', minWidth: '40%', color: 'rgb(20,110,129)' }}><b> Destination </b></h5>
            <h4 style={{ display: 'inline', color: 'rgb(2,91,130)', fontWeight: 800 }}>University at Buffalo</h4>
          </div>
          <div>
            <h5 style={{ display: 'inline-block', minWidth: '40%', color: 'rgb(20,110,129)' }}><b> Arrival Time </b></h5>
            <h4 style={{ display: 'inline', color: 'rgb(2,91,130)', fontWeight: 800 }}>2:40 PM</h4>
          </div>
        </div>
        <div className='Directions'>
          <div>
            <h4 style={{ textAlign: 'left', display: 'inline-block', minWidth: '50%' }}>Directions</h4>
            <div style={{ textAlign: 'right', display: 'inline-block', float:'right' }}>
              <Link to="#" title='show all' style={{ textDecoration: 'none', color: 'rgb(4,166,236)' }} className="showall"><h5> show all </h5></Link>
            </div>
            <div className='steps' style={{ minHeight: '394px' }}>
            </div>
          </div>
        </div>
      </div>

      <div className='item3'>
        <div className='controls'>
          <h4>Optional</h4>
          <ul style={{ listStyle: 'none', color: 'rgb(125, 125, 125)' }}>
            <li>
              <span><input type="checkbox" title='Speed Limit On/Off'/></span>
              <span style={{ display: 'inline-block', marginTop: 4, marginRight: 50, fontSize: 18 }}> Speed Limit </span>
              <span className='info tool_tip'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <span className='tooltip_text'>Shows the speed limit</span>
              </span>
            </li>
            <li style={{ marginTop: 20, marginBottom: 20 }}>
              <span><input type="checkbox" title='Current Speed On/Off'/></span>
              <span style={{ marginRight: 35, fontSize: 18 }}>Current Speed</span>
              <span className='info tool_tip'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
                <span className='tooltip_text'>Shows the Current Speed</span>
              </span>
            </li>
            <li>
              <span><input type="checkbox" title='Show Traffic On/Off'/></span>
              <span style={{ marginRight: 50, fontSize: 18 }}>Show Traffic</span>
              <span className='info tool_tip'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
                <span className='tooltip_text'>Shows the Traffic</span>
              </span>
            </li>
          </ul>
        </div>

        <div className='help'>
          <h4> Need help? </h4>

          <div title="Change Destination" className="alert" style={{ backgroundColor: 'white', border: '2px solid rgba(32, 110, 144)', padding: '10px', borderRadius: '12px' }}>
            <span style={{ paddingTop: '10%', marginLeft: '5px', minWidth: 55, minHeight: 55, borderRadius: 27.5, border: '2px solid rgb(2,91,130)', backgroundColor: 'rgb(247,247,249)', textAlign: 'center', verticalAlign: 'middle' }}>
              <img src="images/Polyline.png" alt="notificationIcon" style={{ zoom: 1.12 }} />
            </span>
            <h5 style={{ fontSize: 19, color: '#F06449', textAlign: 'center', verticalAlign: 'middle', fontWeight: 600, lineHeight: '46px', paddingTop: '2px' }}>
              Change Destination
            </h5>
          </div>

          <div title="Vehicle Monitor" className="alert" style={{ backgroundColor: 'white', border: '2px solid rgba(32, 110, 144)', padding: '10px', borderRadius: '12px' }}>
            <span style={{ paddingTop: '10%', marginLeft: '5px', minWidth: 55, minHeight: 55, borderRadius: 27.5, border: '2px solid rgb(2,91,130)', backgroundColor: 'rgb(247,247,249)', textAlign: 'center', verticalAlign: 'middle' }}>
              <img src="images/clip.png" alt="notificationIcon" style={{ zoom: 1.12 }} />
            </span>
            <h5 style={{ fontSize: 19, color: '#F06449', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold', lineHeight: '45px', paddingTop: '2px' }}>
              Vehicle Monitor
            </h5>
          </div>

          <div title="Change Laguage" className="alert" style={{ backgroundColor: 'white', border: '2px solid rgba(32, 110, 144)', padding: '10px', borderRadius: '12px' }}>
            <span style={{ paddingTop: '17%', marginLeft: '5px', minWidth: 55, minHeight: 55, borderRadius: 27.5, border: '2px solid rgb(2,91,130)', backgroundColor: 'rgb(247,247,249)', textAlign: 'center', verticalAlign: 'middle' }}>
              <img src="images/clarity_language-line.png" alt="notificationIcon" style={{ zoom: 1.12 }} />
            </span>
            <h5 style={{fontSize: 19, color: '#F06449', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold', lineHeight: '48px' }}>
              Change Language
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}

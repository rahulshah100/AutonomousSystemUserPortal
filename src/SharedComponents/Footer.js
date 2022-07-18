import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(props) {
  setTimeout(async () => {
    let allSrc = Array.from(document.getElementsByClassName('FooterImage'))

    if (props.active === '1') {
      allSrc[props.active - 1].src = "images/footer/homeIconActive.png"
    }
    else if (props.active === '2') {
      allSrc[props.active - 1].src = "images/footer/eyeIconActive.png"
    }
    else if (props.active === '3') {
      allSrc[props.active - 1].src = "images/footer/mapIconActive.png"
    }
    else if (props.active === '4') {
      allSrc[props.active - 1].src = "images/footer/chatIconActive.png"
    }
    else { }
  })

  return (
    <nav className="navbar navbar-expand-lg" style={{ padding: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white' }}>
      <div className="container-fluid" style={{ paddingLeft: '12.5%', paddingRight: '12.5%', paddingTop: '0.37%', paddingBottom: '0.70%' }}>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ display: 'grid', gridTemplateColumns: '10% 10% 10% 10%', gridColumnGap: '20%', minWidth: '100%', textAlign: 'center' }}>
          <li className="nav-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link className="nav-link footerLink" to="/AutonomousSystemUserPortal/#Home" style={{ maxHeight: 45 }}>
              <img className="FooterImage" src='images/footer/homeIcon.png' alt='home' title='home' />
            </Link>
          </li>
          <li className="nav-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link className="nav-link footerLink" to="/AutonomousSystemUserPortal/CameraView" style={{ maxHeight: 45 }}>
              <img className="FooterImage" src='images/footer/eyeIcon.png' alt='camera view' title='camera view' />
            </Link>
          </li>
          <li className="nav-item" id="MapIcon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link className="nav-link footerLink" to="/AutonomousSystemUserPortal/Map" style={{ maxHeight: 45 }}>
              <img className="FooterImage" src='images/footer/mapIcon.png' alt='map' title='map' />
            </Link>
          </li>
          <li className="nav-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link className="nav-link footerLink" to="/AutonomousSystemUserPortal/Chat" style={{ maxHeight: 45 }}>
              <img className="FooterImage" src='images/footer/chatIcon.png' alt="Chat" title="chat" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(props) {
  setTimeout( () => {
    let allSrc = Array.from(document.getElementsByClassName('FooterImage'))

    // console.log(allSrc)

    if (props.active == 1) {
      allSrc[props.active - 1].src = "https://i.ibb.co/Ld3b6Zz/Screenshot-18.png"
      allSrc[props.active - 1].style.zoom = '1.56'
      allSrc[props.active - 1].style.left = '19.74%'
      allSrc[props.active - 1].style.top = '3.56px'
      allSrc[props.active - 1].style.width = '38px'
    }
    else if (props.active == 2) {
      allSrc[props.active - 1].src = "https://i.ibb.co/brZzymp/Screenshot-18-1.png"
      allSrc[props.active - 1].style.width = '43px'
      allSrc[props.active - 1].style.left = '40.25%'
      allSrc[props.active - 1].style.top = '8px'
      allSrc[props.active - 1].style.zoom = '1.34'
      allSrc[props.active - 1].style.height = '39px'
    }
    else if (props.active == 3) {
      allSrc[props.active - 1].src = "https://i.ibb.co/jM99R70/Screenshot-19.png"
      allSrc[props.active - 1].style.width = '43px'
      allSrc[props.active - 1].style.right = '40.1%'
      allSrc[props.active - 1].style.top = '8px'
      allSrc[props.active - 1].style.height = '39px'
    }
    else {
      allSrc[props.active - 1].src = "https://i.ibb.co/ctL0rsj/Screenshot-19-1.png"
      allSrc[props.active - 1].style.zoom = '1.7'
      allSrc[props.active - 1].style.width = '25px'
      allSrc[props.active - 1].style.top = '6.8px'
      allSrc[props.active - 1].style.right = '20.1%'
    }
  })

  return (
    <nav className="navbar navbar-expand-lg" style={{ padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white' }}>
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ minWidth: '80%' }}>
          <li className="nav-item footerLink" style={{ minWidth: 20, minHeight: 40 }}>
            <Link className="nav-link" to="/">
              <img className="FooterImage" src='https://i.ibb.co/ZSCSq61/Screenshot-9.jpg' alt='home' title='home' style={{ width: 35, height: 35, position: 'absolute', top: 6, left: '20%', zoom: 1.3 }} />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link footerLink" to="/CameraView">
              <img className="FooterImage" src='https://i.ibb.co/JsRt6Rb/Screenshot-10.jpg' alt='camera view' title='camera view' style={{ width: 45, height: 35, position: 'absolute', top: 6, left: '40%', zoom: 1.3 }} />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link footerLink" to="/Map">
              <img className="FooterImage" src='https://i.ibb.co/7QGrhSq/Screenshot-9-1.jpg' alt='map' title='map' style={{ width: 48, height: 35, position: 'absolute', top: 6, right: '40%', zoom: 1.3 }} />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link footerLink" to="/Chat">
              <img className="FooterImage" src='https://i.ibb.co/5My0M72/Screenshot-9-2.jpg' alt="Chat" title="chat" style={{ width: 38, height: 28, position: 'absolute', top: 8, right: '20%', zoom: 1.3 }} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

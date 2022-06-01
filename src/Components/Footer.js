import React from 'react'

export default function Footer() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white'}}>
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ minWidth: '80%' }}>
          <li className="nav-item footerLink" style={{minWidth: 20, minHeight: 40 }}>
            <a className="nav-link" href="#" >
              <img src='https://i.ibb.co/ZSCSq61/Screenshot-9.jpg' style={{ width: 35, height: 35, position: 'absolute', top: 6, left: '20%', zoom: 1.3 }} />
            </a>
          </li>          
          <li className="nav-item">
            <a className="nav-link footerLink" href="#">
              <img src='https://i.ibb.co/JsRt6Rb/Screenshot-10.jpg' style={{ width: 45, height: 35, position: 'absolute', top: 6, left: '40%', zoom: 1.3 }} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link footerLink" href="#">
              <img src='https://i.ibb.co/7QGrhSq/Screenshot-9-1.jpg' style={{ width: 48, height: 35, position: 'absolute', top: 6, right: '40%', zoom: 1.3 }} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link footerLink" href="#">
              <img src='https://i.ibb.co/5My0M72/Screenshot-9-2.jpg' alt="settings" title="settings" style={{ width: 38, height: 28, position: 'absolute', top: 8, right: '20%', zoom: 1.3 }} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

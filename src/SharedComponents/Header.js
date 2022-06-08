import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from "../FireBaseConnection/FireBaseConnection";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import './HeaderStyle.css'

export default function Header() {
    // Fetching Data from Firebase
    const [NotifToBeShown, setNotifToBeShown] = useState([]);
    const NotifAdded_CollectionRef = collection(db, "Notifs");

    // For Speech
    const msg = new SpeechSynthesisUtterance()

    useEffect(() => {
        // if (NotifToBeShown["Title"]) {
        msg.text = JSON.stringify(NotifToBeShown["Title"])
        window.speechSynthesis.speak(msg)
        // }
    }, [msg, NotifToBeShown])

    useEffect(() => {
        setInterval(() => {
            const getNotifAdded = async () => {
                let data = await getDocs(NotifAdded_CollectionRef);

                let a = data.docs[0]._document.data.value;
                a = a.mapValue.fields.NotifAdded.booleanValue;

                if (a == true) {
                    let a2 = data.docs[0]._document.data.value;
                    a2 = a2.mapValue.fields.NotifHistory.stringValue;
                    a2 = (eval(a2)).at(-1)
                    console.log('a2', a2)
                    setNotifToBeShown(a2);

                    console.log('localSt', JSON.parse(localStorage.getItem("NotifToBeShown")))
                    openNotif()

                    updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifAdded': false })
                }
            };
            getNotifAdded();
        }, 1000)
    }, [NotifToBeShown]);

    useEffect(() => {
        console.log(NotifToBeShown["Title"], typeof NotifToBeShown)
    }, [NotifToBeShown]);

    function closeNotif() {
        document.getElementById('NotificationDIV').classList.remove('NotifShow')
        document.getElementById('NotificationDIV').classList += ' NotifHide'
    }

    function openNotif() {
        document.getElementById('NotificationDIV').classList.remove('NotifHide')
        document.getElementById('NotificationDIV').classList += ' NotifShow'
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark" style={{ padding: 10, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, zoom: 1.25 }}>

            {/* Notifications */}
            <div id="NotificationDIV" className="NotifHide alert alert-success alert-dismissible fade show" role="alert" style={{ zIndex: 1, position: 'absolute', top: 66, backgroundColor: 'white', border: '2px solid rgba(240, 100, 73)', fontSize: 13, width: '50%', left: '25%', display: 'flex', flexDirection: 'row', paddingTop: 12, paddingBottom: 0, paddingLeft: 10, boxShadow: '-10px 1px 30px black', color: 'black', fontFamily: 'Arial' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16" style={{ marginLeft: 6, marginRight: 6, marginTop: 2, color: 'black', borderRadius: 6 }}>
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
                <img src="https://d1vg9wkrun3t3k.cloudfront.net/users/5edb2893-05a4-44db-a779-b6d26b6657e7/forever_files/e75be267-cfb1-44f8-b992-f144f776715c/original.png?format=jpg&width=155&height=151&quality=85" alt="notificationIcon" style={{ height: 30, position: 'absolute', top: 6, left: 6 }} />
                <span>
                    <h4 style={{ color: 'blue', fontSize: 15, color: 'rgb(40,116,149)', display: 'inline' }}><b> {NotifToBeShown["Title"]} </b></h4>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => { closeNotif() }}></button>
                    <p style={{ marginLeft: '6.1%' }}>{NotifToBeShown["Desc"]}</p>
                </span>
            </div>

            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ minWidth: '80%' }}>
                        <li className="nav-item headerLink" style={{ backgroundColor: 'rgba(240, 100, 73)', minWidth: 20, minHeight: 40 }}>
                            <Link className="nav-link" aria-current="page" to="#" > <img src='https://i.ibb.co/X34P8MJ/Screenshot-2-1.jpg' style={{ width: 45, height: 45, position: 'absolute', top: -0.3, left: -1.4, zoom: 1.35, borderBottomLeftRadius: 14 }} />
                                <img src='https://i.ibb.co/LDFJngP/Screenshot-2.jpg' style={{ width: 45, height: 45, position: 'absolute', top: 8, left: 7, zoom: 0.9, borderBottomLeftRadius: 16 }} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink">
                            <Link alt='Notifications' title='Notifications' className="nav-link" to="/NotificationHistory">
                                <img src='https://i.ibb.co/xjDhpvL/Screenshot-6.jpg' style={{ width: 45, height: 45, position: 'absolute', top: 1, left: 49, zoom: 1.3 }} />
                            </Link>
                        </li>
                        <li className="nav-item" >
                            <Link className="nav-link" to="#">
                                <img src='https://i.ibb.co/2j7V37r/Screenshot-7.jpg' className="headerLink" style={{ width: 45, height: 45, position: 'absolute', top: 1, left: 97, zoom: 1.3 }} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink">
                            <Link className="nav-link" to="#">
                                <img src='https://i.ibb.co/R2dMPFC/Screenshot-8.jpg' alt="settings" title="settings" style={{ width: 45, height: 45, position: 'absolute', top: 1, left: 145, zoom: 1.3 }} />
                            </Link>
                        </li>
                    </ul>

                    <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault() }}>
                        <div className="input-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" style={{ color: 'white', zoom: 1.25, position: 'absolute', zIndex: 1, color: 'black', top: 7.5, left: -55, opacity: 0.4 }}>
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                            <input type="text" className="form-control" placeholder="" aria-label="Input group example" aria-describedby="basic-addon1" style={{ marginRight: 3, borderRadius: 3, marginLeft: -80 }} />
                        </div>
                        <button className="btn headerLink mic" type="submit" style={{ backgroundColor: 'rgba(240, 100, 73)', color: "white", width: 50, marginRight: 70 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" name="bi bi-mic-fill" viewBox="0 0 16 16" style={{ zoom: 1.3 }}>
                                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </nav >
    )
}
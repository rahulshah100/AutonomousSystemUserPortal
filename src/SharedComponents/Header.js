import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
        if (msg.text != undefined && NotifToBeShown["Title"]) {
            msg.text = JSON.stringify(NotifToBeShown["Title"])
            window.speechSynthesis.speak(msg)
        }
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
                    // console.log('a2', a2)
                    setNotifToBeShown(a2);

                    // console.log('localSt', JSON.parse(localStorage.getItem("NotifToBeShown")))
                    openNotif()

                    updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifAdded': false })
                }
            };
            getNotifAdded();
        }, 1000000000000000000000000000000000000)
    }, [NotifToBeShown]);

    useEffect(() => {
        // console.log(NotifToBeShown["Title"], typeof NotifToBeShown)
    }, [NotifToBeShown]);


    // To make li tags capable of redirecting
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }


    function closeNotif() {
        document.getElementById('NotificationDIV').classList.remove('NotifShow')
        document.getElementById('NotificationDIV').classList += ' NotifHide'
    }

    function openNotif() {
        document.getElementById('NotificationDIV').classList.remove('NotifHide')
        document.getElementById('NotificationDIV').classList += ' NotifShow'

        document.getElementsByClassName('NotifShowMore')[0].classList.remove('NotifHide');
        document.getElementsByClassName('DescContainer')[0].classList += ' NotifHide';
        document.getElementsByClassName('PointersContainer')[0].classList += ' NotifHide';
    }

    let counter = 0
    function addDesc(theDesc) {
        setTimeout(() => {
            Array.from(document.getElementsByClassName('DescContainer'))[counter].innerHTML = theDesc
            counter += 1
        })
    }

    let counter2 = 0
    function addPointerElem(theNotif) {
        setTimeout(() => {
            if (theNotif.Pointer) {
                Array.from(document.getElementsByClassName('PointersContainer'))[counter - 1].innerHTML = theNotif.Pointer
                console.log(theNotif.Pointer)
                // theNotif.Pointer.addEventListener("click", HighPriorityNotifs())
            } else {
                Array.from(document.getElementsByClassName('PointersContainer'))[counter - 1].innerHTML = ''
            }
        })
        counter2 += 1
    }

    function HighPriorityNotifs() {
        console.log('clicked high prior')
    }

    function ShowMoreNotifInfo() {
        document.getElementsByClassName('NotifShowMore')[0].classList += ' NotifHide';
        document.getElementsByClassName('DescContainer')[0].classList.remove('NotifHide');
        document.getElementsByClassName('PointersContainer')[0].classList.remove('NotifHide');
    }


    return (
        <nav className="navbar headerContainer navbar-expand-lg bg-dark" style={{ padding: 0, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, zoom: 1.25 }}>
            {/* Notifications */}
            <div id="NotificationDIV" className="NotifHide alert alert-success alert-dismissible fade show" role="alert" style={{ zIndex: 1, position: 'absolute', top: 66, backgroundColor: 'white', border: '2px solid rgba(240, 100, 73)', fontSize: 13, width: '50%', left: '25%', paddingTop: 12, paddingBottom: 0, paddingRight: 9, paddingLeft: 10, boxShadow: '-10px 1px 30px black', color: 'black', fontFamily: 'Arial', display: 'inline-flex !important', textAlign: 'top', alignItems: 'top' }}>
                <div style={{ display: 'inline-flex', maxHeight: '25px', minWidth: '21px', padding: '5px', background: '#36382E', borderRadius: '6px', alignItems: 'center', justifyContent: 'center', marginRight: '3px' }}>
                    <img src="images/Notif.png" alt="Notification" />
                </div>
                <span style={{ maxWidth: '90%', display: 'inline-block' }}>
                    <button title="close notification" type="button" className="btn-close" aria-label="Close" onClick={() => { closeNotif() }} style={{ paddingRight: 10, paddingTop: 4, float: 'right' }}></button>
                    <h4 style={{ color: 'blue', fontSize: 15, color: 'rgb(40,116,149)', display: 'inline-flex', alignItems: 'center', fontWeight: 'bold' }}>{NotifToBeShown["Title"]}</h4>
                    <p className='NotifShowMore' style={{ cursor: 'pointer' }} onClick={() => { ShowMoreNotifInfo() }}>Show more...</p>
                    <p style={{ whiteSpace: 'pre-wrap', marginLeft: '0%', marginBottom: '3px' }} className="DescContainer NotifHide">{addDesc(NotifToBeShown.Desc)}</p>
                    <p className='PointersContainer NotifHide' style={{ marginLeft: '0%', marginBottom: 10 }}>{addPointerElem(NotifToBeShown)}</p>
                </span>
            </div>

            <div className="container-fluid" style={{ paddingLeft: '0px' }}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item headerLink" style={{ background: '#F06449', borderBottomLeftRadius: 14, paddingLeft: '16px', paddingRight: '20px', marginRight: '3px' }} onClick={() => { window.open('tel:911', '_self') }}>
                            <Link title='Call Emergency' className="nav-link" aria-current="page" to="#">
                                <img src="images/header/Siren.png" alt="Call Emergency Services Button Image" width={'47px'} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink" style={{ backgroundColor: '#45473A', margin: '4px 3px', padding: 0 }} onClick={() => { routeChange('/NotificationHistory') }}>
                            <Link title='Notifications' className="nav-link" to="/NotificationHistory" style={{ padding: '0px !important', margin: 0, minWidth: '65%', minHeight: '80%', border: '2px solid white', borderRadius: 40, alignItems: 'center', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="images/header/NotificationBell.png" alt="Notification Icon" width={'26px'} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink" style={{ backgroundColor: '#45473A', margin: '4px 3px' }} onClick={() => { routeChange('/Help') }}>
                            <Link title='Help' className="nav-link" to="/Help" style={{ padding: '0px !important', margin: '0px 13px', minWidth: '65%', minHeight: '80%', outline: '2px solid white', borderRadius: 27.5, alignItems: 'center', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="images/header/Help.png" alt="Settings Icon" width={'15px'} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink" style={{ backgroundColor: '#45473A', margin: '4px 3px' }} onClick={() => { routeChange('/Setting') }}>
                            <Link title="Settings" className="nav-link" to="/Setting" style={{ padding: '0px !important', margin: '0px 13px', minWidth: '68%', minHeight: '80%', outline: '2px solid white', borderRadius: 27.5, alignItems: 'center', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="images/header/Settings.png" alt="Settings Icon" width={'32.3px'} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

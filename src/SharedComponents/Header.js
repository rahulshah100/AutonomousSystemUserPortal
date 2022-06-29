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
        // console.log('\n msg.text, msg.text!=undefined:', msg.text, msg.text!=undefined)
        // console.log('NotifToBeShown["Title"]', NotifToBeShown["Title"])
        // console.log('outside')
        if (msg.text != undefined && NotifToBeShown["Title"]) {
            // console.log("inside")
            msg.text = JSON.stringify(NotifToBeShown["Title"])
            // console.log('msg-', msg.text)
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
        }, 500000000)
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

    function record() {
        var recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-GB";

        recognition.onresult = function (event) {
            document.getElementById('SearchBar').value = event.results[0][0].transcript;
        }

        recognition.start();
    }

    return (
        <nav className="navbar headerContainer navbar-expand-lg bg-dark" style={{ padding: 0, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, zoom: 1.25 }}>

            {/* Notifications */}
            <div id="NotificationDIV" className="NotifHide alert alert-success alert-dismissible fade show" role="alert" style={{ zIndex: 1, position: 'absolute', top: 66, backgroundColor: 'white', border: '2px solid rgba(240, 100, 73)', fontSize: 13, width: '50%', left: '25%', display: 'flex', flexDirection: 'row', paddingTop: 12, paddingBottom: 0, paddingLeft: 10, boxShadow: '-10px 1px 30px black', color: 'black', fontFamily: 'Arial' }}>
                <div style={{ display: 'inline-flex', minHeight: '21px', minWidth: '21px', padding: '3px', background: '#36382E', borderRadius: '6px', alignItems: 'center', justifyContent: 'center', marginRight: '3px' }}>
                    <img src="images/Notif.png" alt="Notification" />
                </div>
                <span>
                    <h4 style={{ color: 'blue', fontSize: 15, color: 'rgb(40,116,149)', display: 'inline', verticalAlign:'top' }}><b> {NotifToBeShown["Title"]} </b></h4>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => { closeNotif() }}></button>
                    <p style={{ marginLeft: '6.1%' }}>{NotifToBeShown["Desc"]}</p>
                </span>
            </div>

            <div className="container-fluid" style={{ paddingLeft: '0px' }}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item headerLink" style={{ background: '#F06449', borderBottomLeftRadius: 14, paddingLeft: '16px', paddingRight: '20px', marginRight: '3px' }}>
                            <Link className="nav-link" aria-current="page" to="#" >
                                <img src="images/header/Siren.png" alt="" width={'47px'} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink" style={{ backgroundColor: '#45473A', margin: '4px 3px', padding: 0 }}>
                            <Link alt='Notifications' title='Notifications' className="nav-link" to="/NotificationHistory" style={{ padding: '0px !important', margin: 0, minWidth: '65%', minHeight: '80%', border: '2px solid white', borderRadius: 40, alignItems: 'center', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="images/header/NotificationBell.png" alt="Notification Icon" width={'26px'} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink" style={{ backgroundColor: '#45473A', margin: '4px 3px' }}>
                            <Link alt="Settings" className="nav-link" to="#" style={{ padding: '0px !important', margin: '0px 13px', minWidth: '65%', minHeight: '80%', outline: '2px solid white', borderRadius: 27.5, alignItems: 'center', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="images/header/Help.png" alt="Settings Icon" width={'15px'} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink" style={{ backgroundColor: '#45473A', margin: '4px 3px' }}>
                            <Link alt="Settings" className="nav-link" to="#" style={{ padding: '0px !important', margin: '0px 13px', minWidth: '68%', minHeight: '80%', outline: '2px solid white', borderRadius: 27.5, alignItems: 'center', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="images/header/Settings.png" alt="Settings Icon" width={'32.3px'} />
                            </Link>
                        </li>
                    </ul>

                    <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault() }}>
                        <div className="input-group">
                            <input type="text" id="SearchBar" className="form-control" placeholder="" aria-label="Input group example" aria-describedby="basic-addon1" style={{ paddingLeft: '40px', marginRight: 5, borderRadius: 3 }} />
                        </div>
                        <button className="btn headerLink mic" type="submit" style={{ backgroundColor: 'rgba(240, 100, 73)', color: "white", width: 50, marginRight: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => record()}>
                            <img src="images/header/Microphone.png" alt="" style={{ zoom: 0.7 }} />
                        </button>
                    </form>
                </div>
            </div>
        </nav >
    )
}

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from "../FireBaseConnection/FireBaseConnection"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import './HeaderStyle.css'

export default function Header() {
    // Fetching Data from Firebase
    const [NotifToBeShown, setNotifToBeShown] = useState([]);
    const NotifAdded_CollectionRef = collection(db, "Notifs");

    // For Vocally Announcing the Notification. This function keeps updating as NotifToBeShown i.e. a New Notification to be shown is discovered.
    useEffect(() => {
        const msg = new SpeechSynthesisUtterance()
        if (msg.text !== undefined && NotifToBeShown["Title"]) {
            if (NotifToBeShown["Criticality"] && NotifToBeShown["Criticality"] === 2) {
                // adding heptic feedback
                window.navigator.vibrate([300, 100, 300])
                // Adding a an alarm sound prefacing the title announcement
                let HighCriticalityAudio = new Audio('audio/HighCriticality.flac')
                HighCriticalityAudio.play()

            } else {
                // adding heptic feedback
                window.navigator.vibrate([300])
                // Adding a an alarm sound prefacing the title announcement
                let LowCriticalityAudio = new Audio('audio/LowCriticality.wav')
                LowCriticalityAudio.play()
            }
            msg.text = JSON.stringify(NotifToBeShown["Title"])
            window.speechSynthesis.pause()
            setTimeout(() => {
                window.speechSynthesis.resume()
            }, 1200)
            window.speechSynthesis.speak(msg)
        }
    }, [NotifToBeShown]);


    // Keeps checking from Firebase, if any new Show request has been made. If so, updates the NotifToBeShown.
    setInterval(() => {
        const getNotifAdded = async () => {
            let data = await getDocs(NotifAdded_CollectionRef);

            let a = data.docs[0]._document.data.value;
            a = a.mapValue.fields.NotifAdded.booleanValue;

            if (a === true) {
                let a2 = data.docs[0]._document.data.value;
                a2 = a2.mapValue.fields.NotifHistory.stringValue;
                a2 = (eval(a2)).at(-1)
                setNotifToBeShown(a2);

                // After fetching the value from Firebase, it opens i.e.unhides that notification on the user's site.
                openNotif()

                // Updating Firebase by changing value of Show request.
                updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifAdded': false })
            }
        };
        getNotifAdded();
    }, 10000)


    // To make the whole Header Icon (Card) clickable and not just the image in the Icon. The li tags are made capable of redirecting like Link tags by this function.
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }


    // Helper Function. Closes the Notification on User's site.
    function closeNotif() {
        document.getElementById('NotificationDIV').classList.remove('NotifShow')
        document.getElementById('NotificationDIV').classList += ' NotifHide'

        // Stops the announcement as soon as close is clicked
        window.speechSynthesis.cancel()
    }

    // Helper function. Responsible for displaying the Notification on User's site.
    function openNotif() {
        document.getElementById('NotificationDIV').classList.remove('NotifHide')
        document.getElementById('NotificationDIV').classList += ' NotifShow'

        document.getElementsByClassName('NotifShowMore')[0].classList.remove('NotifHide');
        document.getElementsByClassName('DescContainer')[0].classList += ' NotifHide';
        document.getElementsByClassName('PointersContainer')[0].classList += ' NotifHide';
    }


    // Inserting Description of the Notification by Javascript as HTML; as such otherwise by simply having it written in html body wasn't rendering the new lines properly in that Description.
    let counter = 0
    function addDesc(theDesc) {
        setTimeout(() => {
            Array.from(document.getElementsByClassName('DescContainer'))[counter].innerHTML = theDesc
            counter += 1
        })
    }

    // Inserting Pointer Items in the Description. For Higher Priority Notifications with Pointer Items Provided.
    function addPointerElem(theNotif) {
        setTimeout(() => {
            if (theNotif.Pointer) {
                Array.from(document.getElementsByClassName('PointersContainer'))[counter - 1].innerHTML = theNotif.Pointer
            } else {
                Array.from(document.getElementsByClassName('PointersContainer'))[counter - 1].innerHTML = ''
            }

            // Responsible for Loading Pointers in the notifications where bulletins are to be shown as loading initially, and then Done.
            if (theNotif.Criticality === 2) {
                // Displaying Notification with Loading GIFs
                if (theNotif.Title === "Vehicle self-checking") {                    
                    DisplayLoadingPointer()
                }
            }
        })
    }

    // Helper functions. Responsible for Loading Pointers in the notifications where bulletins are to be shown as loading initially, and then Done.
    function DisplayLoadingPointer() {
        console.log(document.getElementsByClassName('PointersCointainer'))
        Array.from(document.getElementsByClassName('PointersCointainer'))[counter - 1].innerHTML = `
                <ul>
                    <li class='MonitoredItem'>
                        <span class="MonitoredItemLoading spinner-border text-warning" role="status"></span>                                
                        <span class='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                        <span class='MonitoredItemText'>Taillights</span>
                    </li>
                    <li class='MonitoredItem closed'>
                        <span class="MonitoredItemLoading spinner-border text-warning" role="status"></span>
                        <span class='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                        <span class='MonitoredItemText'>Rear-Ultrasonic sensors</span>
                    </li>
                    <li class='MonitoredItem closed'>
                        <span class="MonitoredItemLoading spinner-border text-warning" role="status"></span>
                        <span class='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                        <span class='MonitoredItemText'>Rear-Radar Sensors</span>
                    </li>
                    <li class='MonitoredItem closed'>
                        <span class="MonitoredItemLoading spinner-border text-warning" role="status"></span>
                        <span class='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                        <span class='MonitoredItemText'>Crash Sensors</span>
                    </li>
                    <li class='MonitoredItem closed'>
                        <span class="MonitoredItemLoading spinner-border text-warning" role="status"></span>
                        <span class='MonitoredItemDone closed closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                        <span class='MonitoredItemText'>Lidar Sensors</span>
                    </li>
                    <li class='MonitoredItem closed'>
                        <span class="MonitoredItemLoading spinner-border text-warning" role="status"></span>
                        <span class='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                        <span class='MonitoredItemText'>Front-Ultrasonic Sensors</span>
                    </li>
                    <li class='MonitoredItem closed'>
                        <span class="MonitoredItemLoading spinner-border text-warning" role="status"></span>
                        <span class='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                        <span class='MonitoredItemText'>Front-Radar Sensors</span>
                    </li>
                    <li class='MonitoredItem closed'>
                        <span class="MonitoredItemLoading spinner-border text-warning" role="status"></span>
                        <span class='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                        <span class='MonitoredItemText'>Battery</span>
                    </li>
                    <li class='MonitoredItem closed'>
                        <span class="MonitoredItemLoading spinner-border text-warning" role="status"></span>
                        <span class='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                        <span class='MonitoredItemText'>Braking system</span>
                    </li>
                </ul>
            `

        let count = 1
        let showMonitoredItems = setInterval(() => {
            // try catch is used here as below statements of the setInterval kept on executing even if move to a different page. Hence, in case of statements in try block, when new page gets opened up while this setInterval was not cleared, then html of new page would not have any element with className MonitoredItem and that kept throwing errors.
            try {
                document.getElementsByClassName('MonitoredItem')[count].classList.remove("closed")
            }
            catch (error) {
                clearInterval(showMonitoredItems);
            }

            if (count === document.getElementsByClassName('MonitoredItem').length - 1) {
                clearInterval(showMonitoredItems);
                setTimeout(ChangeLoadingIconAsDone, 2000)
            }
            count += 1
        }, 750)
    }

    // Helper function to Change Loading GIF to Done Image.
    function ChangeLoadingIconAsDone() {
        let count2 = 0
        Array.from(document.getElementsByClassName('MonitoredItemLoading')).forEach((elem) => {
            elem.remove()
            document.getElementsByClassName('MonitoredItemDone')[count2].classList = "MonitoredItemDoneOk"
        })
    }

    // Showing the Description as User Clicks on "Show more..." in the Notification.
    function ShowMoreNotifInfo() {
        document.getElementsByClassName('NotifShowMore')[0].classList += ' NotifHide';
        document.getElementsByClassName('DescContainer')[0].classList.remove('NotifHide');
        document.getElementsByClassName('PointersContainer')[0].classList.remove('NotifHide');

        // Announces the Desciption
        let DescAnnouncement = new SpeechSynthesisUtterance()
        DescAnnouncement.text = JSON.stringify(NotifToBeShown.Desc)
        DescAnnouncement.text = DescAnnouncement.text.replaceAll("\\n", " ")
        window.speechSynthesis.speak(DescAnnouncement)

        // Announces the Pointer in the Description
        if (NotifToBeShown.Pointer) {
            let PointerAnnouncement = new SpeechSynthesisUtterance()
            PointerAnnouncement.text = JSON.stringify(NotifToBeShown.Pointer)
            window.speechSynthesis.speak(PointerAnnouncement)
        }
    }


    return (
        <nav className="navbar headerContainer navbar-expand-lg bg-dark">
            {/* Notification */}
            <div id="NotificationDIV" className="NotifHide alert alert-success alert-dismissible fade show" role="alert">
                <div className='NotifBellImage'>
                    <img src="images/Notif.png" alt="Notification" />
                </div>
                <span style={{ maxWidth: '90%', display: 'inline-block' }}>
                    <button title="close notification" type="button" className="btn-close" onClick={() => { closeNotif() }}></button>
                    <h4 className="NotificationTitle">{NotifToBeShown["Title"]}</h4>
                    <p className='NotifShowMore' onClick={() => { ShowMoreNotifInfo() }}>Show more...</p>
                    <p className="DescContainer NotifHide">{addDesc(NotifToBeShown.Desc)}</p>
                    <p className='PointersContainer NotifHide'>{addPointerElem(NotifToBeShown)}</p>
                </span>
            </div>

            {/* Header NavBar */}
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item headerLink1" onClick={() => { window.open('tel:911', '_self') }}>
                            <Link title='Call Emergency' className="nav-link navlink1" aria-current="page" to="#">
                                <img src="images/header/Siren.png" alt="Call Emergency Services Button Image" width={'47px'} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink2" onClick={() => { routeChange('/NotificationHistory') }}>
                            <Link title='Notifications' className="nav-link navlink2" to="/NotificationHistory">
                                <img src="images/header/NotificationBell.png" alt="Notification Icon" width={'26px'} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink2" onClick={() => { routeChange('/Help') }}>
                            <Link title='Help' className="nav-link navlink3" to="/Help" style={{}}>
                                <img src="images/header/Help.png" alt="Settings Icon" width={'15px'} />
                            </Link>
                        </li>
                        <li className="nav-item headerLink2" onClick={() => { routeChange('/Setting') }}>
                            <Link title="Settings" className="nav-link navlink4" to="/Setting">
                                <img src="images/header/Settings.png" alt="Settings Icon" width={'32.3px'} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

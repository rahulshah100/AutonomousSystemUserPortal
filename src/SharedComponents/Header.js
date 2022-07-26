import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from "../FireBaseConnection/FireBaseConnection"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import './HeaderStyle.css'
import { click } from '@testing-library/user-event/dist/click'

export default function Header() {
    // Fetching Data from Firebase
    const [NotifToBeShown, setNotifToBeShown] = useState([]);
    const NotifAdded_CollectionRef = collection(db, "Notifs");

    // For when a new Page is loaded, if from previous page the notification was still announcing, that would be stopped.
    window.speechSynthesis.cancel()

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

        // Responsible for Loading Pointers in the notifications where bulletins are to be shown as loading initially, and then Done.
        if (NotifToBeShown.Criticality === 2) {
            // Displaying Notification with Loading GIFs
            if (NotifToBeShown.Title === "Vehicle self-checking") {
                DisplayLoadingPointer(Array.from(document.getElementsByClassName('PointersContainer'))[counter - 1])
            }
        }

        // Making All Pointers in displayed notification, as Clickable.
        FollowupModal()
    }

    // Helper function. For opening Followup Notifications to main notifications.
    function FollowupModal() {
        Array.from(document.getElementsByClassName('ClickablePointers')).forEach((EachPointerItem) => {
            EachPointerItem.addEventListener("click", () => {
                EachPointerItem.classList.remove("ClickablePointers")

                let FollowupNotif_Message
                if (EachPointerItem.className.toLowerCase() === "wait for emergency services to arrive.") {
                    FollowupNotif_Message = 'Okay. Emergency services will arrive here in 6 minutes.'
                } else if (EachPointerItem.className.toLowerCase() === "request a new vehicle.") {
                    FollowupNotif_Message = 'Okay. A request has been sent for a new vehicle.'
                } else if (EachPointerItem.className.toLowerCase() === "exit and travel to your final destination on own.") {
                    FollowupNotif_Message = 'Okay. It may take you 5 to 10 minutes to arrive at your final destination on your own. The door will open soon.'
                } else {
                    FollowupNotif_Message = "Okay. Your request has been considered."
                }

                // Announcing Text of Followup Notification
                window.speechSynthesis.cancel()
                const FollowuoNotif_Message_Announce = new SpeechSynthesisUtterance()
                FollowuoNotif_Message_Announce.text = JSON.stringify(FollowupNotif_Message)
                window.speechSynthesis.speak(FollowuoNotif_Message_Announce)

                document.getElementsByClassName('NotificationTitle')[0].innerHTML = FollowupNotif_Message
                document.getElementsByClassName('DescContainer')[0].remove()
                document.getElementsByClassName('PointersContainer')[0].remove()
            })
        })
    }

    // Helper functions. Responsible for Loading Pointers in the notifications where bulletins are to be shown as loading initially, and then Done.
    function DisplayLoadingPointer(thePointerHolderElem) {
        thePointerHolderElem.innerHTML = `
                <ul id="Loaderul">
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
        const Donemsg = new SpeechSynthesisUtterance()
        Donemsg.text = JSON.stringify("Vehicle Status is Fine")
        window.speechSynthesis.speak(Donemsg)
    }


    // to unset session storage so each time further we could detect when page first loads, which helps us to show welcome modal.
    window.addEventListener("beforeunload", () => {
        sessionStorage.clear()
    })


    // To set session Storage and show Welcome Modal on first time loading the site.
    useEffect(() => {
        // To detect if page has loaded for first time. Because, if it has loaded for first time, we'll need a user click, so that the audio functions could start working. We'll need audio for background sounds and for announcing notifications. We'll incorporate the task of getting a click by using a welcome modal.
        if (sessionStorage.getItem('PageHasBeenLoaded') == null) {
            sessionStorage.setItem('PageHasBeenLoaded', "Mulitple times")
            document.getElementById("WelcomeModalButton").click()

            // To set date & time in modal
            let currentMonthYear = new Date().toLocaleString('en-us', { month: 'short', year: 'numeric' })
            let currentDate = new Date().getDate()

            const d = new Date();
            let hrs = d.getHours();
            let m = d.getMinutes();
            // Condition to add zero before minute
            let min = m < 10 ? `0${m}` : m;
            const currTime = hrs >= 12 ? `${hrs - 12}:${min} pm` : `${hrs}:${min} am`;

            document.getElementsByClassName('modal-time')[0].innerHTML = `${currTime} `
            document.getElementsByClassName('modal-date')[0].innerHTML = `${currentDate} ${currentMonthYear} -`
        }
    })

    return (
        <nav className="navbar headerContainer navbar-expand-lg bg-dark">
            {/*  */}
            {/* <!-- Button trigger modal --> */}
            <button type="button" id="WelcomeModalButton" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" style={{ display: 'none' }}>
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
                        <div className="modal-header">
                            <h5 className="modal-title center" id="exampleModalLongTitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-fill" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                </svg>
                                Cloudy and 56<b>&#x2109;</b>
                            </h5>
                        </div>
                        <div className="modal-body">
                            <b><span className='modal-date' style={{ fontSize: 15, marginRight: 15 }}></span></b>
                            <span className='modal-time' style={{ fontSize: 30 }}></span>
                            <div style={{ fontSize: 15, marginTop: 20 }}>Desination: University At Buffalo</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(240, 100, 73)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 5 }} width="16" height="16" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                    <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                                </svg>
                                Begin
                            </button>
                        </div>
                    </div>
                </div>
            </div>


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

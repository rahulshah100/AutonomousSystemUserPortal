import React, { useState, useEffect } from 'react';
import { db } from "../FireBaseConnection/FireBaseConnection";
import { collection, getDocs } from "firebase/firestore";
import * as ReactBootstrap from 'react-bootstrap';

export default function Content() {
    // For unique key of each Notification
    let count = 0

    // For Storing Fetched Data from Firebase
    const [NotifHistory, setNotifHistory] = useState([]);
    const NotifHistory_CollectionRef = collection(db, "Notifs");

    // Variable which determines if a Loading gif is to be shown.
    const [Loading, setLoading] = useState(true);

    // Initializing setState Variables by fetching values from firebase.
    useEffect(() => {
        setTimeout(() => {
            const getNotifHistory = async () => {
                const data = await getDocs(NotifHistory_CollectionRef);
                let a = data.docs[0]._document.data.value;
                a = a.mapValue.fields.NotifHistory.stringValue;
                // converting a fetched string into an object. 
                a = eval(a)
                a = a.reverse()
                setNotifHistory(currentState => [...a])
                // Stopping the display of Loading gif
                setLoading(false)
            };
            getNotifHistory();
        })
    }, []);

    // Inserting Description in all notifications as innerHTML by Js, as otherwise by simply putting it in the html's body was not rendering new line and spaces as wanted.
    let AddressedthePointerLoaders = false
    function addPointerElem(theNotif) {
        setTimeout(() => {
            if (theNotif.Pointer !== undefined) {
                // Responsible for Loading Pointers in the notifications where bulletins are to be shown as loading initially, and then Done. 
                if (theNotif.Title === "Vehicle self-checking" && !AddressedthePointerLoaders) {
                    Array.from(document.getElementsByClassName(theNotif.SrNum)).forEach((element) => {
                        element.innerHTML = `
                    <ul style="list-style-type:none; padding-left: 0px; margin-left: -29px;">
                        <li>                                                    
                            <span style="zoom:0.6"> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                            <span>Taillights</span>
                        </li>
                        <li>                        
                            <span style="zoom:0.6"> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                            <span>Rear-Ultrasonic sensors</span>
                        </li>
                        <li>                        
                            <span style="zoom:0.6"> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                            <span>Rear-Radar Sensors</span>
                        </li>
                        <li>                        
                            <span style="zoom:0.6"> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                            <span>Crash Sensors</span>
                        </li>
                        <li>                       
                            <span style="zoom:0.6"> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                            <span>Lidar Sensors</span>
                        </li>
                        <li>                        
                            <span style="zoom:0.6"> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                            <span>Front-Ultrasonic Sensors</span>
                        </li>
                        <li>                        
                            <span style="zoom:0.6"> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                            <span>Front-Radar Sensors</span>
                        </li>
                        <li>                        
                            <span style="zoom:0.6"> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                            <span>Battery</span>
                        </li>
                        <li>                        
                            <span style="zoom:0.6"> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" title="Done." /> </span>
                            <span>Braking system</span>
                        </li>
                    </ul>` })
                }
                else {
                    Array.from(document.getElementsByClassName(theNotif.SrNum)).forEach((element) => { element.innerHTML = theNotif.Pointer })
                }
            }
        })
    }


    return (
        <div style={{ height: '40.2vw', width: '100%', justifyContent: 'center', alignItems: 'center', padding: 15, overflow: 'auto' }}>
            <div style={{ margin: '0px auto' }}>
                <h2 style={{ textAlign: 'center' }}>Notification History- <span style={{ fontSize: '23px' }}> The last 15 Notifications (Latest Shown First) :</span> </h2><hr />

                {Loading ? <div style={{ textAlign: 'center' }}><ReactBootstrap.Spinner animation='border' /></div> : ''}
                <div className="list-notifs">
                    {NotifHistory && NotifHistory.length === 0 && Loading === false ? <div style={{ textAlign: 'center' }}>No Notifications</div> :
                        NotifHistory.map((notif) => {
                            return <div key={count += 1} className="MainNotif alert alert-success alert-dismissible fade show" role="alert" style={{ backgroundColor: 'white', border: '2px solid rgba(240, 100, 73)', fontSize: 13, width: '50%', display: 'flex', flexDirection: 'row', paddingTop: 10, paddingBottom: 0, paddingRight: 12, paddingLeft: 10, color: 'black', fontFamily: 'Arial', marginRight: 25, marginBottom: 35, flexBasis: '50%', marginLeft: '25%' }}>
                                <div style={{ display: 'inline-flex', maxHeight: '25px', minWidth: '24px', padding: '3px', background: '#36382E', borderRadius: '6px', alignItems: 'center', justifyContent: 'center', marginRight: '5px' }}>
                                    <img src="images/Notif.png" alt="Notification" />
                                </div>
                                <span>
                                    <h4 style={{ fontSize: 15, color: 'rgb(40,116,149)' }}>
                                        <b> {notif["Title"]} </b>
                                    </h4>
                                    <p className="DescContainer" style={{ whiteSpace: 'pre-wrap', 'fontFamily': 'Arial', marginBottom: '0px' }}>
                                        {notif["Desc"]}
                                    </p>
                                    <p className={notif.SrNum}>
                                        {addPointerElem(notif)}
                                    </p>
                                </span>
                            </div>
                        })}
                </div>
            </div>
        </div>
    )
}

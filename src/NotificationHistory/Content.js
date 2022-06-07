import React, { useState, useEffect } from 'react';
import { db } from "../FireBaseConnection/FireBaseConnection";
import { collection, getDocs } from "firebase/firestore";

export default function Content() {
    // Fetching Data from Firebase
    const [NotifHistory, setNotifHistory] = useState([]);
    const NotifHistory_CollectionRef = collection(db, "Notifs");

    // Initializing setState Variables by fetching values from firebase
    useEffect(() => {
        const getNotifHistory = async () => {
            const data = await getDocs(NotifHistory_CollectionRef);
            let a = data.docs[0]._document.data.value;
            a = a.mapValue.fields.NotifHistory.stringValue;
            // converting a fetched string into an object. 
            a = eval(a)
            a = a.reverse()
            setNotifHistory(currentState => [...a])
        };
        getNotifHistory();
    }, []);

    // As NotifHistory Changes, we can catch that and store it in localStorage.
    useEffect(() => {
        localStorage.setItem('NotifHistory', JSON.stringify(NotifHistory))
    }, [NotifHistory]);

    return (
        <div style={{ minHeight: '40vw', width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
            <div style={{ margin: '0px auto' }}>
                <h2 style={{ textAlign: 'center' }}>Notification History- <span style={{ fontSize: '23px' }}> The last 15 Notifications are as follows (From Latest)* :</span> </h2><hr />

                <div className="list-notifs">
                    {NotifHistory.length === 0 ? 'No Notifications' :
                        NotifHistory.map((notif) => {
                            return <div key={notif.SrNum} className="alert alert-success alert-dismissible fade show" role="alert" style={{ backgroundColor: 'white', border: '2px solid rgba(240, 100, 73)', fontSize: 13, width: '50%', display: 'flex', flexDirection: 'row', paddingTop: 10, paddingBottom: 0, paddingRight: 12, paddingLeft: 10, color: 'black', fontFamily: 'Arial', marginRight: 25, marginBottom: 35, flexBasis: '50%', marginLeft: '25%' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16" style={{ marginLeft: 6, marginRight: 24, marginTop: 2, color: 'black', borderRadius: 6 }}>
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                </svg>
                                <img src="https://d1vg9wkrun3t3k.cloudfront.net/users/5edb2893-05a4-44db-a779-b6d26b6657e7/forever_files/e75be267-cfb1-44f8-b992-f144f776715c/original.png?format=jpg&width=155&height=151&quality=85" alt="notificationIcon" style={{ height: 30, position: 'absolute', top: 6, left: 6 }} />
                                <span style={{ minWidth: '96%' }}>
                                    <h4 style={{ color: 'blue', fontSize: 15, color: 'rgb(40,116,149)' }}><b> {notif.Title} </b></h4>
                                    <p>{notif.Desc}</p>
                                </span>
                            </div>
                        })}
                </div>
            </div>
        </div>
    )
}

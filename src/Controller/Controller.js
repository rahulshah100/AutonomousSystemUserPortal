import React, { useState, useEffect } from 'react';
import { db } from "../FireBaseConnection/FireBaseConnection";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export default function Controller() {
    // For Testing Purpose
    // const [NotifContent, setNotifContent] = useState(
    //     [{ SrNum:1, Title:"Braking Due to an Unknown Object Ahead", Desc:"To ensure your safety, the vehicle brakes when it detects unknown objects ahead or objects moving in unclear paths. Please remember to wear seatbelt at all times when the vehicle is in motion." }, { SrNum:2, Title:"Heavier Rain May Impact Travel", Desc:"To ensure your safety, the vehicles maintains lower than normal speed when certain weather events, such as rain or fog, impact sensor reliability." }]
    // );

    // Fetching Data from Firebase
    const [NotifContent, setNotifContent] = useState([]);
    const NotifContent_CollectionRef = collection(db, "Notifs");

    // Initializing setState Variables by fetching values from firebase
    useEffect(() => {
        const getNotifContent = async () => {
            const data = await getDocs(NotifContent_CollectionRef);
            let a = data.docs[0]._document.data.value;
            a = a.mapValue.fields.NotifContent.stringValue;
            // converting a fetched string into an object. 
            a = eval(a)
            setNotifContent(currentState => [...a])
        };
        getNotifContent();
        localStorage.setItem('NotifContent', JSON.stringify(NotifContent))
    }, []);

    // As NotifContent Changes, we can catch that and store it in localStorage.
    useEffect(() => {
        localStorage.setItem('NotifContent', JSON.stringify(NotifContent))
    }, [NotifContent]);


    const ShowNotifOnUserScreen = async (id) => {
        // console.log("Show", id)

        // Fetching NotifHistory from firebase
        let data = await getDocs(NotifContent_CollectionRef);
        let a = data.docs[0]._document.data.value;
        a = a.mapValue.fields.NotifHistory.stringValue;
        a = eval(a)

        // Getting Value of Notification on which Show was clicked
        let showedElem;
        (eval(localStorage.NotifContent)).forEach((element, index) => {
            if (element.SrNum == id) {
                showedElem = element
                return
            }
        });

        alert(`Alert Shown Successfully- ${showedElem.Title}`)

        // Pushing back the changed NotifHistory to firebase
        a = [...a, showedElem]
        // if more than 15 notifications gather in history then consider the last 15 items for history.
        if (a.length > 15) {
            a = a.slice(-15)
        }
        updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifHistory': JSON.stringify(a) })
        
        // Changing the NotifAdded value to true in firebase
        updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifAdded': true })
    }


    const DelNotification = async (SrNum) => {
        let confirmDel = window.confirm('Are you sure you want to delete this Notification?');

        if (confirmDel == true) {
            setNotifContent(NotifContent.filter((e) => {
                return e["SrNum"] !== SrNum
            }))
        }

        setTimeout(() => {
            let AlteredNotifContent = localStorage.NotifContent
            // console.log(AlteredNotifContent)
            updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifContent': AlteredNotifContent })
        }, 1000)
    }


    const AddNotification = async (SrNum) => {
        let NewNotifSrNum;

        if (NotifContent.length == 0) { NewNotifSrNum = 1 }
        else { NewNotifSrNum = NotifContent[NotifContent.length - 1]['SrNum'] + 1 }

        let NewNotifContent = {
            SrNum: NewNotifSrNum,
            Title: document.getElementById('NewNotifTitle').value,
            Desc: document.getElementById('NewNotifDesc').value,
        }

        setNotifContent([...NotifContent, NewNotifContent])

        document.getElementById('NewNotifDesc').value = ''
        document.getElementById('NewNotifTitle').value = ''

        alert(`New Alert Added Successfully`)

        setTimeout(() => {
            let AlteredNotifContent = localStorage.NotifContent
            // console.log(AlteredNotifContent)
            updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifContent': AlteredNotifContent })
        }, 1000)
    }


    const clearNotifHistory = async () => {
        let confirmClear = window.confirm("Do you want to Clear entire Notification History?")

        if (confirmClear) {
            updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifHistory': JSON.stringify([]) })
        }
    }


    return (
        <div style={{ margin: '20px 30px' }} onLoad={() => { document.title = "Notification Controller"; }}>
            <hr /><h2>Click on <button type="button" className="btn btn-warning" style={{ zoom: 0.7 }}><b> Show</b></button> to make that Notification Pop up on User's Screen.</h2><hr />

            <div className="list-notifs" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {NotifContent.length === 0 ? 'No Notifications' :
                    NotifContent.map((notif) => {
                        return <div key={notif.SrNum} className="alert alert-success alert-dismissible fade show" role="alert" style={{ backgroundColor: 'white', border: '2px solid rgba(240, 100, 73)', fontSize: 13, width: '50%', display: 'flex', flexDirection: 'row', paddingTop: 10, paddingBottom: 0, paddingRight: 12, paddingLeft: 10, color: 'black', fontFamily: 'Arial', marginRight: 25, marginBottom: 35, flexBasis: '50%' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16" style={{ marginLeft: 6, marginRight: 14, marginTop: 2, color: 'black', borderRadius: 6 }}>
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                            </svg>
                            <img src="https://d1vg9wkrun3t3k.cloudfront.net/users/5edb2893-05a4-44db-a779-b6d26b6657e7/forever_files/e75be267-cfb1-44f8-b992-f144f776715c/original.png?format=jpg&width=155&height=151&quality=85" alt="notificationIcon" style={{ height: 30, position: 'absolute', top: 6, left: 6 }} />
                            <span style={{ minWidth: '96%' }}>
                                <button type="button" className="btn btn-warning" title="Shows this Notification on User's Screen" style={{ zoom: 0.7, float: 'right' }} onClick={() => ShowNotifOnUserScreen(notif.SrNum)}><b> Show</b></button>
                                <h4 style={{ color: 'blue', fontSize: 15, color: 'rgb(40,116,149)' }}><b> {notif.Title} </b></h4>
                                <p>{notif.Desc}</p>
                                <button type="button" title="Delete this Notification" className="btn btn-danger" style={{ border: '1px solid black', zoom: 0.7, float: 'right', position: 'relative', top: '15%', right: '0%' }} onClick={() => DelNotification(notif.SrNum)}><b> Delete</b></button>
                            </span>
                        </div>
                    })}
            </div>

            <br /><hr /><h2>Add a New Notification</h2><hr />
            <form onSubmit={(e) => { e.preventDefault(); AddNotification() }}>
                <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ backgroundColor: 'white', border: '2px solid rgba(240, 100, 73)', fontSize: 13, width: '50%', display: 'flex', flexDirection: 'row', paddingTop: 10, paddingBottom: 0, paddingRight: 0, paddingLeft: 10, color: 'black', fontFamily: 'Arial', marginBottom: 40 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16" style={{ marginLeft: 6, marginRight: 14, marginTop: 2, color: 'black', borderRadius: 6 }}>
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                    <img src="https://d1vg9wkrun3t3k.cloudfront.net/users/5edb2893-05a4-44db-a779-b6d26b6657e7/forever_files/e75be267-cfb1-44f8-b992-f144f776715c/original.png?format=jpg&width=155&height=151&quality=85" alt="notificationIcon" style={{ height: 30, position: 'absolute', top: 6, left: 6 }} />
                    <span style={{ width: '90%' }}>
                        <h4 style={{ color: 'blue', fontSize: 15, color: 'rgb(40,116,149)' }}><b>  <label htmlFor="NewNotifTitle" className="form-label"><b> Title* </b></label>
                            <input style={{ fontSize: 13, backgroundColor: 'rgb(253,253,257)' }} type="text" className="form-control" id="NewNotifTitle" aria-describedby="emailHelp" placeholder='Example: Breaking Due to an Unknown Object Ahead' required /> </b></h4>
                        <label htmlFor="NewNotifDesc" className="form-label"><b>Description*</b></label>
                        <textarea style={{ fontSize: 13, backgroundColor: 'rgb(253,253,257)' }} className="form-control" id="NewNotifDesc" rows="2" placeholder='Example: To ensure your safety, the ehivle brakes when...' required></textarea>
                        <button type="submit" title="Add this Notification" className="btn btn-success" style={{ border: '1px solid black', zoom: 0.8, float: 'right', position: 'relative', top: 30, left: 40 }}>Add</button>
                    </span>
                </div>
            </form><br />


            <hr />
            <h2>Clear Notification History
                <button type="button" title="Clears the entire Notification History" className="btn btn-primary" style={{ marginLeft: 10, zoom: 0.9 }} onClick={() => { clearNotifHistory() }}> Clear</button>
            </h2>
            <hr />
        </div>
    )
}

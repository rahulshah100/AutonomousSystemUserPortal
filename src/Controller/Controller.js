import React, { useState, useEffect } from 'react';
import { db } from "../FireBaseConnection/FireBaseConnection";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import './Controller.css'

export default function Controller() {
    // For Testing Purpose
    // const [NotifContent, setNotifContent] = useState(
    //     [{ SrNum:1, Title:"Braking Due to an Unknown Object Ahead", Desc:"To ensure your safety, the vehicle brakes when it detects unknown objects ahead or objects moving in unclear paths. Please remember to wear seatbelt at all times when the vehicle is in motion." }, { SrNum:2, Title:"Heavier Rain May Impact Travel", Desc:"To ensure your safety, the vehicles maintains lower than normal speed when certain weather events, such as rain or fog, impact sensor reliability." }]
    // );

    // Fetching Data from Firebase
    const [NotifContent, setNotifContent] = useState([]);
    const [CurrentScenarioPage, setCurrentScenarioPage] = useState(1)
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
            if (element.SrNum === id) {
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

        if (confirmDel === true) {
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

        if (NotifContent.length === 0) { NewNotifSrNum = 1 }
        else { NewNotifSrNum = NotifContent[NotifContent.length - 1]['SrNum'] + 1 }

        // Getting Value of Radio Button
        let ScenarioCase = document.getElementsByName('Scenario')
        for (let i = 0; i < ScenarioCase.length; i++) {
            if (ScenarioCase[i].checked) {
                ScenarioCase = i + 1
                break
            }
        }

        let Severity = document.getElementsByName('Severity')
        for (let i = 0; i < Severity.length; i++) {
            if (Severity[i].checked) {
                Severity = i + 1
                break
            }
        }

        let PointerText = ''

        Array.from(document.getElementsByClassName('PointerElem')).forEach((element) => {
            PointerText += ` \n${element.value}`
            element.value = null
        })

        let NewNotifContent = {
            SrNum: NewNotifSrNum,
            Title: document.getElementById('NewNotifTitle').value,
            Desc: document.getElementById('NewNotifDesc').value,
            Scenario: ScenarioCase,
            Severity: Severity,
            Pointer: PointerText
        }

        setNotifContent([...NotifContent, NewNotifContent])

        document.getElementById('NewNotifDesc').value = ''
        document.getElementById('NewNotifTitle').value = ''
        document.getElementById('flexRadioDefault1').checked = true
        document.getElementById('flexRadioDefault4').checked = true
        document.getElementsByClassName('PointerElem')[0].value = ''
        Array.from(document.getElementsByClassName('newPointerElem')).forEach((element) => {
            element.remove()
        })
        addHidePointer("Normal")

        alert(`New Alert Added Successfully`)

        setTimeout(() => {
            let AlteredNotifContent = localStorage.NotifContent
            // console.log(AlteredNotifContent)
            updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifContent': AlteredNotifContent })
        })
    }

    function addHidePointer(importance) {
        if (importance === "High") {
            if (!document.getElementById("DescPointers").classList.contains('show')) {
                document.getElementById("DescPointers").classList += ' show'
            }
            if (document.getElementById("DescPointers").classList.contains('hide')) {
                document.getElementById("DescPointers").classList.remove('hide')
            }
        }
        if (importance === "Normal") {
            if (!document.getElementById("DescPointers").classList.contains('hide')) {
                document.getElementById("DescPointers").classList += ' hide'
            }
            if (document.getElementById("DescPointers").classList.contains('show')) {
                document.getElementById("DescPointers").classList.remove('show')
            }
            Array.from(document.getElementsByClassName('newPointerElem')).forEach((element) => {
                element.remove()
            })
            document.getElementsByClassName('PointerElem')[0].value = ''
        }
    }

    function AddPointer() {
        let newElem = document.createElement('input')
        newElem.setAttribute('type', 'text')
        newElem.setAttribute('class', "form-control")
        newElem.classList += '  PointerElem newPointerElem'
        document.getElementById('PointerElems').appendChild(newElem)
    }

    const clearNotifHistory = async () => {
        let confirmClear = window.confirm("Do you want to Clear entire Notification History?")

        if (confirmClear) {
            updateDoc(doc(db, "Notifs", 'Bldcpia0cF0lbMjHG5ji'), { 'NotifHistory': JSON.stringify([]) })
        }
    }

    function ChangeScenario() {
        // Updating variables which are declared using useState, happens Asynchronously. So here, although the function was executed but it was ran on the previous values of useState variables. By using setTimeout, which is an Asynchronous function, this problem is solved.
        setTimeout(() => {
            if (window.location.href.substring(window.location.href.lastIndexOf('#') + 1) === "Scenario1") {
                setCurrentScenarioPage(1)

                if (!document.getElementsByClassName('Scenariobtn')[2].classList.contains('btn-light')) {
                    document.getElementsByClassName('Scenariobtn')[2].classList += ' btn-light'
                }
                if (document.getElementsByClassName('Scenariobtn')[1].classList.contains('btn-light')) {
                    document.getElementsByClassName('Scenariobtn')[1].classList.remove('btn-light')
                    document.getElementsByClassName('Scenariobtn')[1].classList += ' btn-secondary'
                }
                if (document.getElementsByClassName('Scenariobtn')[0].classList.contains('btn-light')) {
                    document.getElementsByClassName('Scenariobtn')[0].classList.remove('btn-light')
                    document.getElementsByClassName('Scenariobtn')[0].classList += ' btn-secondary'
                }
            }
            if (window.location.href.substring(window.location.href.lastIndexOf('#') + 1) === "Scenario2") {
                setCurrentScenarioPage(2)
                if (!document.getElementsByClassName('Scenariobtn')[1].classList.contains('btn-light')) {
                    document.getElementsByClassName('Scenariobtn')[1].classList += ' btn-light'
                }
                if (document.getElementsByClassName('Scenariobtn')[0].classList.contains('btn-light')) {
                    document.getElementsByClassName('Scenariobtn')[0].classList.remove('btn-light')
                    document.getElementsByClassName('Scenariobtn')[0].classList += ' btn-secondary'
                }
                if (document.getElementsByClassName('Scenariobtn')[2].classList.contains('btn-light')) {
                    document.getElementsByClassName('Scenariobtn')[2].classList.remove('btn-light')
                    document.getElementsByClassName('Scenariobtn')[2].classList += ' btn-secondary'
                }
            }
            if (window.location.href.substring(window.location.href.lastIndexOf('#') + 1) === "Scenario3") {
                setCurrentScenarioPage(3)

                if (!document.getElementsByClassName('Scenariobtn')[0].classList.contains('btn-light')) {
                    document.getElementsByClassName('Scenariobtn')[0].classList += ' btn-light'
                }
                if (document.getElementsByClassName('Scenariobtn')[2].classList.contains('btn-light')) {
                    document.getElementsByClassName('Scenariobtn')[2].classList.remove('btn-light')
                    document.getElementsByClassName('Scenariobtn')[2].classList += ' btn-secondary'
                }
                if (document.getElementsByClassName('Scenariobtn')[1].classList.contains('btn-light')) {
                    document.getElementsByClassName('Scenariobtn')[1].classList.remove('btn-light')
                    document.getElementsByClassName('Scenariobtn')[1].classList += ' btn-secondary'
                }
            }
        })
    }

    let counter = 0

    function addDesc(theDesc) {
        setTimeout(() => {
            Array.from(document.getElementsByClassName('DescContainer'))[counter].innerHTML = theDesc
            counter += 1
        })
    }

    return (
        <div style={{ margin: '20px 30px' }} onLoad={() => { document.title = "Notification Controller" }} className="controllerContainer">
            <hr /><h2>
                Click on
                <button type="button" className="btn btn-warning" style={{ zoom: 0.7, margin: '0px 8px' }}>
                    <b> Show </b>
                </button>
                to make that Notification Pop up on User's Screen.
                <Link className="ScenarioLink" to="#Scenario3"><button type="submit" title="Scenario 3" className="Scenariobtn btn btn-secondary" style={{ float: 'right', marginLeft: 8, border: '1px solid black' }} onClick={() => ChangeScenario()}>Scenario 3</button></Link>
                <Link className="ScenarioLink" to="#Scenario2"> <button type="submit" title="Scenario 2" className="Scenariobtn btn btn-secondary" style={{ float: 'right', marginLeft: 8, border: '1px solid black' }} onClick={() => ChangeScenario()}> Scenario 2 </button></Link>
                <Link className="ScenarioLink" to="#Scenario1"><button type="submit" title="Scenario 1" className="Scenariobtn btn btn-light" style={{ float: 'right', marginLeft: 8, border: '1px solid black' }} onClick={() => ChangeScenario()}> Scenario 1 </button></Link>
            </h2><hr />

            <div className="list-notifs" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {NotifContent.length === 0 ? 'No Notifications' :
                    NotifContent.map((notif) => {
                        if (notif.Scenario === CurrentScenarioPage) {
                            return <div key={notif.SrNum} className="alert alert-success alert-dismissible fade show" role="alert" style={{ backgroundColor: 'white', border: '2px solid rgba(240, 100, 73)', fontSize: 13, width: '50%', display: 'flex', paddingTop: 10, paddingBottom: 0, paddingRight: 12, paddingLeft: 10, color: 'black', fontFamily: 'Arial', marginBottom: 35, marginLeft: 10, display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'center' }}>
                                <div style={{ display: 'inline-flex', maxHeight: '25px', minWidth: '21px', padding: '3px', background: '#36382E', borderRadius: '6px', alignItems: 'center', justifyContent: 'center', marginRight: '5px' }}>
                                    <img src="images/Notif.png" alt="Notification" />
                                </div>
                                <span style={{ minWidth: '96%' }}>
                                    <button type="button" className="btn btn-warning" title="Shows this Notification on User's Screen" style={{ zoom: 0.7, float: 'right' }} onClick={() => ShowNotifOnUserScreen(notif.SrNum)}>
                                        <b> Show</b>
                                    </button>
                                    <h4 style={{ fontSize: 15, color: 'rgb(40,116,149)' }}>
                                        <b> {notif.Title} </b>
                                    </h4>
                                    <p className="DescContainer" style={{ whiteSpace: 'pre-wrap', 'fontFamily': 'Arial' }}>
                                        {addDesc(notif.Desc)}
                                        {console.log("its heer", notif.Desc)}
                                    </p>
                                    <button type="button" title="Delete this Notification" className="btn btn-danger" style={{ border: '1px solid black', zoom: 0.7, float: 'right', position: 'relative', top: '15%', right: '0%' }} onClick={() => DelNotification(notif.SrNum)}><b> Delete</b></button>
                                </span>
                            </div>
                        }
                    })}
            </div><br />

            <hr /><h2>Add a New Notification</h2><hr />
            <form onSubmit={(e) => { e.preventDefault(); AddNotification() }}>
                <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ backgroundColor: 'white', border: '2px solid rgba(240, 100, 73)', fontSize: 13, width: '50%', display: 'flex', flexDirection: 'row', paddingTop: 10, paddingBottom: 0, paddingRight: 0, paddingLeft: 10, fontFamily: 'Arial', marginBottom: 40 }}>
                    <div style={{ display: 'inline-flex', maxHeight: '25px', minWidth: '21px', padding: '3px', background: '#36382E', borderRadius: '6px', alignItems: 'center', justifyContent: 'center', marginRight: '5px' }}>
                        <img src="images/Notif.png" alt="Notification" />
                    </div>
                    <span style={{ width: '90%' }}>
                        <h4 style={{ fontSize: 15, color: 'rgb(40,116,149)' }}><b>  <label htmlFor="NewNotifTitle" className="form-label"><b> Title* </b></label>
                            <input style={{ fontSize: 13, backgroundColor: 'rgb(253,253,257) !important', background: 'none' }} type="text" className="form-control" id="NewNotifTitle" aria-describedby="emailHelp" placeholder='Example: Breaking Due to an Unknown Object Ahead' required /> </b></h4>

                        <label htmlFor="NewNotifDesc" className="form-label"><b>Description*</b></label>
                        <textarea style={{ fontSize: 13, backgroundColor: 'rgb(253,253,257)' }} className="form-control" id="NewNotifDesc" rows="2" placeholder='Example: To ensure your safety, the vehicle brakes when it detects...' required></textarea>

                        <label htmlFor="NewNotifDesc" className="form-label"><b>Add to:</b></label>
                        <div className="RadioButtonScenario">
                            <input className="form-check-input" type="radio" name="Scenario" value={1} id="flexRadioDefault1" defaultChecked />
                            <label className="LabelScenario" htmlFor="flexRadioDefault1">
                                Scenario 1
                            </label>
                        </div>
                        <div className="RadioButtonScenario">
                            <input className="form-check-input" type="radio" name="Scenario" value={2} id="flexRadioDefault2" />
                            <label className="LabelScenario" htmlFor="flexRadioDefault2">
                                Scenario 2
                            </label>
                        </div>
                        <div className="RadioButtonScenario">
                            <input className="form-check-input" type="radio" name="Scenario" value={3} id="flexRadioDefault3" />
                            <label className="LabelScenario" htmlFor="flexRadioDefault3">
                                Scenario 3
                            </label>
                        </div><br />

                        <div>
                            <label htmlFor="NewNotifDesc" className="form-label"><b>Severity:</b></label>
                            <div className="RadioButtonScenario">
                                <input className="form-check-input" type="radio" name="Severity" value={4} id="flexRadioDefault4" defaultChecked onClick={() => { addHidePointer("Normal") }} />
                                <label className="LabelScenario" htmlFor="flexRadioDefault4">
                                    Normal
                                </label>
                            </div>
                            <div className="RadioButtonScenario">
                                <input className="form-check-input" type="radio" name="Severity" value={5} id="flexRadioDefault5" onClick={() => { addHidePointer("High") }} />
                                <label className="LabelScenario" htmlFor="flexRadioDefault5">
                                    High
                                </label>
                            </div><br />
                        </div>
                        <div id="DescPointers" className='hide'>
                            <b style={{ marginTop: '6px', display: 'block' }}> Add points to description (Optional):</b>
                            <div id="PointerElems" style={{ fontSize: 13, minWidth: '90%', display: 'inline-block' }} >
                                <input type="text" className="form-control  PointerElem" />
                            </div>
                            <button type="button" className="btn btn-primary" style={{ float: 'right' }} onClick={() => { AddPointer() }}>+</button>
                        </div>

                        <button type="submit" title="Add this Notification" className="btn btn-success" style={{ border: '1px solid black', zoom: 0.8, float: 'right', position: 'relative', top: 30, left: 40 }}>Add</button>
                    </span>
                </div>
            </form ><br />


            <hr />
            <h2>Clear Notification History
                <button type="button" title="Clears the entire Notification History" className="btn btn-primary" style={{ marginLeft: 10, zoom: 0.9 }} onClick={() => { clearNotifHistory() }}> Clear</button>
            </h2>
            <hr />
        </div >
    )
}

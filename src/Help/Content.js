import React from 'react'
import './Help.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Content() {
    useEffect(() => {
        // Showing and Closing the answer on click
        Array.from(document.getElementsByClassName('FAQ_Question')).forEach((elem, index) => {
            elem.addEventListener('click', () => {
                if (document.getElementsByClassName("Answer")[index].classList.contains("closed")) {
                    // If answer is closed then open it as clicked
                    document.getElementsByClassName("Answer")[index].classList.remove('closed')
                    document.getElementsByClassName("Answer")[index].classList += ' opened'
                    // change + Icon to -
                    document.getElementsByClassName("Icon")[index].innerHTML = `<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>`
                }
                else {
                    // if answer is opened, then close it as clicked
                    document.getElementsByClassName("Answer")[index].classList.remove('opened')
                    document.getElementsByClassName("Answer")[index].classList += ' closed'
                    // change - Icon +                    
                    document.getElementsByClassName("Icon")[index].innerHTML = `<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />`
                }
            })
        })

        // Showing the Vehicle Monitoring Items one by one
        let count = 1
        let showMonitoredItems = setInterval(() => {
            document.getElementsByClassName('MonitoredItem')[count].classList.remove("closed")
            if (count === document.getElementsByClassName('MonitoredItem').length - 1) {
                clearInterval(showMonitoredItems);
                setTimeout(ChangeLoadingIconAsDone, 2000)
            }
            count += 1
        }, 750)
    })

    // Change the Loading Icon to Done for each Monitoring Item
    function ChangeLoadingIconAsDone() {
        let count2 = 0
        Array.from(document.getElementsByClassName('MonitoredItemLoading')).forEach((elem) => {
            elem.remove()
            document.getElementsByClassName('MonitoredItemDone')[count2].classList = "MonitoredItemDoneOk"
        })
    }

    return (
        <div style={{ height: '40.2vw' }} className='containerHelp'>
            <div className='VehicleMonitoring'>
                <h3 className='title'><b> Vehicle Monitoring </b></h3>
                <ul>
                    <li className='MonitoredItem'>
                        <div className="MonitoredItemLoading spinner-border text-warning" role="status"></div>
                        <div className='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" /> </div>
                        <span className='MonitoredItemText'>Front sensors</span>
                    </li>
                    <li className='MonitoredItem closed'>
                        <div className="MonitoredItemLoading spinner-border text-warning" role="status"></div>
                        <div className='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" /> </div>
                        <span className='MonitoredItemText'>Rear sensors</span>
                    </li>
                    <li className='MonitoredItem closed'>
                        <div className="MonitoredItemLoading spinner-border text-warning" role="status"></div>
                        <div className='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" /> </div>
                        <span className='MonitoredItemText'>Headlights</span>
                    </li>
                    <li className='MonitoredItem closed'>
                        <div className="MonitoredItemLoading spinner-border text-warning" role="status"></div>
                        <div className='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" /> </div>
                        <span className='MonitoredItemText'>Tail lights</span>
                    </li>
                    <li className='MonitoredItem closed'>
                        <div className="MonitoredItemLoading spinner-border text-warning" role="status"></div>
                        <div className='MonitoredItemDone closed closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" /> </div>
                        <span className='MonitoredItemText'>Battery</span>
                    </li>
                    <li className='MonitoredItem closed'>
                        <div className="MonitoredItemLoading spinner-border text-warning" role="status"></div>
                        <div className='MonitoredItemDone closed'> <img src="images/InspectionGreenTick.png" alt="GreenTickIcon" /> </div>
                        <span className='MonitoredItemText'>Braking system</span>
                    </li>
                </ul>
                <Link to="/AutonomousSystemUserPortal/CameraView" style={{ color: '#1570A6', position: 'absolute', display: 'flex', bottom: 50, textAlign: 'center', left: 100, textDecoration: 'none' }}>Check Camera Views</Link>
            </div>
            <div className="vl"></div>
            <div className='FAQ'>
                <h3 className='title'><b> Frequently Asked Questions </b></h3>
                <ul>
                    <li className='FAQ_Question'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="Icon bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </span>
                        <span className='Question'> How do I find out more information about a notification?</span>
                        <div className='Answer closed'> How do I find out more information about a notification?</div>
                    </li>

                    <li className='FAQ_Question '>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="Icon bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </span>
                        <span className='Question'> How do I call for help?</span>
                        <div className='Answer closed'> You can click on the emergency icon in the top left corner.</div>
                    </li>

                    <li className='FAQ_Question'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="Icon bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </span>
                        <span className='Question'> How can I change my settings?</span>
                        <div className='Answer closed'> You can click on the settings menu in the shape of a gear at the top of the screen.</div>
                    </li>
                </ul>
                <Link to="/AutonomousSystemUserPortal/Chat" style={{ color: '#1570A6', textAlign: 'left', textDecoration: 'none' }}>Click here For More Questions </Link>
            </div>
        </div>
    )
}

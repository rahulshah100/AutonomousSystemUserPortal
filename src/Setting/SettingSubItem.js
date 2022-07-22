import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './SettingItem.css'

export default function SettingSubItem() {
    let SettingItem = localStorage.getItem('SettingItem')
    let ClickedOn = localStorage.getItem('ClickedOn')

    useEffect(() => {
        // Setting Page Title
        console.log()
        document.title = `${SettingItem}: ${ClickedOn}`

        if (ClickedOn === "Screen-reader-settings") {
            document.getElementsByClassName('Vision')[0].classList.remove('closed')
            document.getElementsByClassName(ClickedOn)[0].classList.remove('closed')
            Array.from(document.getElementsByClassName('VisionHide')).forEach((elem) => {
                elem.classList += ' closed'
            })
        } else {
            Array.from(document.getElementsByClassName('SubListLevel2')).forEach((elem) => {
                if (elem.classList.contains(ClickedOn)) {
                    elem.classList.remove("closed")
                }
            })
        }
    })

    function takingBackToAccessibility() {
        let w = 800
        let h = 550
        let y = 50;
        let x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
        window.open('/Setting/Item', `Setting- ${SettingItem}`, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`)
        localStorage.setItem('SettingItem', SettingItem)
        window.close()
    }

    // Bring back to the same Page
    function ClickedOpen2(ClickedOnn) {
        let w = 800
        let h = 550
        let y = 50
        let x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
        window.open('/Setting/Accessibility/Item', `${SettingItem}- ${ClickedOn}`, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`)
        // window.close()
        localStorage.setItem('ClickedOn', ClickedOnn)
    }


    return (
        <div className='containerSettingItem'>
            <h1 className='title'>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
                <b>{SettingItem}: {ClickedOn}</b>
            </h1>
            <hr />
            <span>
                <ol className='Vision SubListLevel2 closed'>
                    <li className='VisionHide'>
                        <span> Screen reader </span>
                        <span style={{ marginLeft: 52 }}> <input type="checkbox" /></span>
                    </li>
                    <li className='VisionHide'>
                        <span>  Screen reader settings </span>
                        <button type="button" className="btn btn-dark" style={{ marginLeft: 5, zoom: 0.67 }} onClick={() => { ClickedOpen2('Screen-reader-settings') }}>Open</button>
                    </li>
                    <span>
                        <ol className='Screen-reader-settings SubListLevel3 closed'>
                            <li>
                                <span> Voice</span>
                                <span style={{ zoom: 0.9, marginLeft:134 }}>
                                    <input className="form-check-input" type="radio" name="flexRadio1" id="flexRadio1" />
                                    <label className="form-check-label" htmlFor="flexRadio1">
                                        Male
                                    </label>
                                    <input className="form-check-input" type="radio" name="flexRadio1" id="flexRadio2" defaultChecked />
                                    <label className="form-check-label" htmlFor="flexRadio2">
                                        Female
                                    </label>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span> Rate</span>
                                    <span><input type="range" title='DarkmodeSlider' style={{ zoom: 0.9, marginLeft:153 }} /></span>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span> Verbosity</span>
                                    <span style={{ zoom: 0.9, marginLeft:103 }}>
                                        <input className="form-check-input" type="radio" name="flexRadioo1" id="flexRadioo1" />
                                        <label className="form-check-label" htmlFor="flexRadioo1">
                                            Low
                                        </label>
                                        <input className="form-check-input" type="radio" name="flexRadioo1" id="flexRadioo2" defaultChecked />
                                        <label className="form-check-label" htmlFor="flexRadioo2">
                                            Medium
                                        </label>
                                        <input className="form-check-input" type="radio" name="flexRadioo1" id="flexRadioo3" defaultChecked />
                                        <label className="form-check-label" htmlFor="flexRadioo3">
                                            High
                                        </label>
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span> Screen reader volume </span>
                                    <span><input type="range" title='DarkmodeSlider' style={{ zoom: 0.9, marginLeft:10 }} /></span>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span> Read all form fields</span>
                                    <span style={{ marginLeft: 22 }}> <input type="checkbox" /></span>
                                </span>
                            </li>
                        </ol>
                    </span>
                    <li className='VisionHide'>
                        <span>High contrast</span>
                        <span style={{ marginLeft: 60 }}> <input type="checkbox" /></span>
                    </li>
                    <li className='VisionHide'>
                        <span>Magnifier</span>
                        <span style={{ marginLeft: 88 }}> <input type="checkbox" /></span>
                    </li>
                    <li className='VisionHide'>
                        <span>Bold text</span>
                        <span style={{ marginLeft: 91 }}> <input type="checkbox" /></span>
                    </li>
                </ol>
                <ol className='Hearing SubListLevel2 closed'>
                    <li>
                        <span> Mono Audio </span>
                        <span style={{ marginLeft: 30 }}> <input type="checkbox" /></span>
                    </li>
                    <span>
                        <ol className='SubListLevel3'>
                            <li>
                                <span> Left</span>
                                <span style={{ marginLeft: 60 }}> <input type="checkbox" /></span>
                            </li>
                            <li>
                                <span> Right</span>
                                <span style={{ marginLeft: 50 }}> <input type="checkbox" /></span>
                            </li>
                        </ol>
                    </span>
                    <li>
                        <span> Hearing Aid</span>
                        <span style={{ marginLeft: 32 }}> <input type="checkbox" /></span>
                    </li>
                    <li>
                        <span> Closed captions</span>
                        <span style={{ marginLeft: 2 }}> <input type="checkbox" /></span>
                    </li>
                    <span>
                        <ol className='SubListLevel3'>
                            <li>
                                <span> Caption size </span>
                                <span style={{ zoom: 0.9 }}>
                                    <input className="form-check-input" type="radio" name="fllexRadio1" id="fllexRadio1" defaultChecked />
                                    <label className="form-check-label" htmlFor="fllexRadio1">
                                        Small
                                    </label>
                                    <input className="form-check-input" type="radio" name="fllexRadio1" id="fllexRadio2" defaultChecked />
                                    <label className="form-check-label" htmlFor="fllexRadio2">
                                        Medium
                                    </label>
                                    <input className="form-check-input" type="radio" name="fllexRadio1" id="fllexRadio3" defaultChecked />
                                    <label className="form-check-label" htmlFor="fllexRadio3">
                                        Large
                                    </label>
                                </span>
                            </li>
                        </ol>
                    </span>
                </ol>
                <ol className='Interaction-and-Motor SubListLevel2 closed'>
                    <li>
                        <span>Switch control</span>
                        <span style={{ marginLeft: 70 }}> <input type="checkbox" /></span>
                    </li>
                    <span>
                        <ol className='SubListLevel3'>
                            <li>
                                <span>Scanning mode</span>
                                <span style={{ marginLeft: 36 }}>
                                    <input className="form-check-input" type="radio" name="fflexRadio1" id="fflexRadio1" defaultChecked />
                                    <label className="form-check-label" htmlFor="fflexRadio1">
                                        Automatic
                                    </label>
                                    <input className="form-check-input" type="radio" name="fflexRadio1" id="fflexRadio2" defaultChecked />
                                    <label className="form-check-label" htmlFor="fflexRadio2">
                                        Manual
                                    </label>
                                </span>
                            </li>
                            <li>
                                <span>Scanning speed</span>
                                <span><input type="range" title='DarkmodeSlider' style={{ zoom: 0.9, marginLeft: 50 }} /></span>
                            </li>
                        </ol>
                    </span>
                    <li>
                        <span>Voice Control</span>
                        <span style={{ marginLeft: 80 }}> <input type="checkbox" /></span>
                    </li>
                    <li>
                        <span>Ignore repeated touches</span>
                        <span>
                            <span style={{ marginLeft: 2 }}> <input type="checkbox" /></span>
                        </span>
                    </li>
                </ol>
            </span>
            <Link to="#" style={{ color: '#1570A6', textDecoration: 'none', float: 'left' }} onClick={() => takingBackToAccessibility()} className="GoBackLink">Return to Accessibility Page</Link>
        </div>
    )
}

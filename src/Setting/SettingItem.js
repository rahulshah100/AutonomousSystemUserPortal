import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './SettingItem.css'

export default function SettingItem() {
    let SettingItem = localStorage.getItem('SettingItem')

    useEffect(() => {
        // Setting Page Title
        document.title = `Setting: ${SettingItem}`

        Array.from(document.getElementsByClassName('SubList')).forEach((elem) => {
            if (elem.classList.contains(SettingItem)) {
                elem.classList.remove("closed")
            }
        })
    })

    function ClickedOpen(ClickedOn) {
        let w = 800
        let h = 550
        let y = 50
        let x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
        window.open('/AutonomousSystemUserPortal/Setting/Accessibility/Item', `${SettingItem}- ${ClickedOn}`, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`)
        window.close()
        localStorage.setItem('ClickedOn', ClickedOn)
    }

    return (
        <div className='containerSettingItem'>
            <h1 className='title'>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
                <b>{SettingItem}</b></h1>
            <hr />
            <span>
                <ul className='SubList Display-Settings closed'>
                    <li>
                        <span> Brightness </span>
                        <span>
                            <input type="range" className="form-control-range" />
                        </span>
                    </li>
                    <li>
                        <span> Dark mode </span>
                        <span>
                            <input type="checkbox" title='DarkmodeSlider' />
                        </span>
                    </li>
                </ul>
                <ul className='SubList Audio-Settings closed'>
                    <li>
                        <span> Volume </span>
                        <span><input type="range" className="form-control-range" /></span>
                    </li>
                    <li>
                        <span> Mute </span>
                        <span style={{ marginLeft: 22 }}> <input type="checkbox" /></span>
                    </li>
                    <li>
                        <span> Pitch </span>
                        <span style={{ marginLeft: 19, zoom: 0.9 }}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Low
                            </label>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Normal
                            </label>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                High
                            </label>
                        </span>
                    </li>
                    <li>
                        <span> Voice </span>
                        <span style={{ marginLeft: 16, zoom: 0.9 }}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault_22" id="flexRadioDefault11" />
                            <label className="form-check-label" htmlFor="flexRadioDefault11">
                                Male
                            </label>
                            <input className="form-check-input" type="radio" name="flexRadioDefault_22" id="flexRadioDefault22" defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault22">
                                Female
                            </label>
                        </span>
                    </li>
                </ul>
                <ul className='SubList Accessibility closed'>
                    <li>
                        <span> Vision </span>
                        <span>
                            <button type="button" className="btn btn-dark" onClick={() => ClickedOpen('Vision')} style={{ marginLeft: 170, zoom: 0.67 }}>Open</button>
                        </span>
                    </li>
                    <li>
                        <span>Hearing</span>
                        <span>
                            <button type="button" className="btn btn-dark" onClick={() => ClickedOpen('Hearing')} style={{ marginLeft: 156, zoom: 0.67 }}>Open</button>
                        </span>
                    </li>
                    <li>
                        <span>Interaction and Motor</span>
                        <span>
                            <button type="button" className="btn btn-dark" onClick={() => ClickedOpen('Interaction-and-Motor')} style={{ marginLeft: 15, zoom: 0.67 }}>Open</button>
                        </span>
                    </li>
                </ul>
            </span>
            <Link to="#" style={{ color: '#1570A6', textDecoration: 'none', float: 'left' }} onClick={() => window.close()} className="GoBackLink">Go Back to Settings Page</Link>
        </div>
    )
}

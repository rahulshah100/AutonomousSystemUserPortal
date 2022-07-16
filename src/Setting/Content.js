import React from 'react'
import './Setting.css'

export default function Content() {
  function OpenSettingItem(SettingItem) {
    let w = 800
    let h = 550
    let y = 50;
    let x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
    window.open('/Setting/Item', `Setting- ${SettingItem}`, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`)
    localStorage.setItem('SettingItem', SettingItem)
  }

  return (
    <div style={{ height: '40.2vw' }} className='containerSetting'>
      <h3 className='title'>
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="32" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg>
        <b> Settings </b>
      </h3>

      <div className="MainList">
        <div className='ListItem'>
          <span> 1. Display Settings  </span>
          <button type="button" class="btn btn-dark" onClick={() => OpenSettingItem('Display-Settings')}>Open</button>
        </div><br />
        <div className='ListItem'>
          <span> 2. Audio Settings</span>
          <button type="button" class="btn btn-dark" onClick={() => OpenSettingItem('Audio-Settings')}>Open</button>
        </div><br />
        <div className='ListItem'>
          <span> 3. Accessibility  </span>
          <button type="button" class="btn btn-dark" onClick={() => OpenSettingItem('Accessibility')}>Open</button>
        </div>
      </div>
    </div>
  )
}

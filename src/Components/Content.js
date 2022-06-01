import React from 'react'
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

export default function Header() {
    let setTitle=()=>{
        document.getElementsByTagName('title')[0].innerHTML='HomePage';
    }
    return (
        <div style={{minHeight:'40vw', padding: 20, display:'flex', flexDirection:'row'}} onLoad={setTitle()}> 
            <div className='leftsidePanel' style={{minWidth:'65%'}}>
                <LeftPanel/>
            </div>
            <div className='rightsidePanel' style={{minWidth:'35'}}>
                <RightPanel/>
            </div>
        </div>
    )
}

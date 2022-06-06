import React from 'react'
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

export default function Header() {
    function componentDidMount(){
        document.title = "Home Page"
    }

    return (
        <div style={{minHeight:'40vw', padding: 20, display:'flex', flexDirection:'row'}} onLoad={componentDidMount()}> 
            <div className='leftsidePanel' style={{minWidth:'65%'}}>
                <LeftPanel/>
            </div>
            <div className='rightsidePanel' style={{minWidth:'35'}}>
                <RightPanel/>
            </div>
        </div>
    )
}
import React from 'react'
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

export default function Header() {
    return (
        <div style={{ height: '40.2vw', padding: 20, display: 'flex', flexDirection: 'row', overflow: 'auto' }} >
            <div className='leftsidePanel' style={{ minWidth: '65%' }}>
                <LeftPanel />
            </div>
            <div className='rightsidePanel' style={{ minWidth: '35' }}>
                <RightPanel />
            </div>
        </div>
    )
}

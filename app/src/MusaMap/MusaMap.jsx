import React, { useState } from 'react'
import styles from "./MusaMap.module.scss"
import { InteractiveMap } from './InteractiveMap'
import { SideBar } from './SideBar'

export function MusaMap() {
    const [showSideBar, setShowSideBar] = useState(true)
    const [selectedFarm, setSelectedFarm] = useState(null)
    return (
        <div className={styles.mapWrapper}>
            <InteractiveMap lon={-82.5071} lat={9.4523} z={12} farm={selectedFarm} setFarm={setSelectedFarm}/>
            {showSideBar && <SideBar setShow={setShowSideBar}/>}    
        </div>
    )
} 
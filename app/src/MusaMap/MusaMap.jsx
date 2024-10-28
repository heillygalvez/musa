import React, { useEffect, useState } from 'react'
import styles from "./MusaMap.module.scss"
import { InteractiveMap } from './InteractiveMap'
import { TitleBar } from './TitleBar'
import { SideBar } from './SideBar'

import { farmInfo } from "../mockData/mockInfo"

export function MusaMap() {
    const [showSideBar, setShowSideBar] = useState(true)
    const [selectedFarmId, setSelectedFarmId] = useState(null)
    const [selectedFarmInfo, setSelectedFarmInfo] = useState(null)
    const handleClose = () => {
        setShowSideBar(false)
        setSelectedFarmId(null)
    }
    useEffect(() => {
        if (farmInfo){
            setSelectedFarmInfo(farmInfo.find(f => f.id === selectedFarmId))
            setShowSideBar(true)
        }
    }, [selectedFarmId])

    return (
        <div className={styles.mapWrapper}>
            <InteractiveMap lon={-82.5071} lat={9.4523} z={13.5} farmId={selectedFarmId} setFarmId={setSelectedFarmId}/>
            <TitleBar/>
            {selectedFarmInfo && showSideBar && <SideBar closeSideBar={handleClose} selectedFarm={selectedFarmInfo}/>}    
        </div>
    )
} 
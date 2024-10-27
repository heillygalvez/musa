import React from 'react'
import styles from "./MusaMap.module.scss"
import { InteractiveMap } from './InteractiveMap'
import { SideBar } from './SideBar'

export function MusaMap() {
    return (
        <div className={styles.mapWrapper}>
            <InteractiveMap lon={-82.5071} lat={9.4523} z={12}/>
            <SideBar/>       
        </div>
    )
} 
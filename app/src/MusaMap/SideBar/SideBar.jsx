import React from 'react'
import styles from "./SideBar.module.scss"

export function SideBar({selectedFarm, closeSideBar}) {
    return <div className={styles.sideBarWrapper}>
        <div className={styles.header} onClick={closeSideBar}>×</div>
        <div className={styles.content}>Farm: {selectedFarm?.id}</div>
    </div>
}
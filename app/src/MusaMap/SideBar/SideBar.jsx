import React from 'react'
import styles from "./SideBar.module.scss"

export function SideBar({setShow}) {
    return <div className={styles.sideBarWrapper}>
        <div className={styles.header} onClick={() => setShow(false)}>×</div>
    </div>
}
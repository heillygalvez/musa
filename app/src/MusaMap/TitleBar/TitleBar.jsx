import React from 'react'
import styles from "./TitleBar.module.scss"
import logo from "../../assets/logo.png"

export function TitleBar() {
    return <div className={styles.titleWrapper}>
        <div className={styles.bar}>
            <div className={styles.imgContainer}><img alt="musa-logo" src={logo} /></div>
            <span>Musa: Monitoreo y Predicción de Patógenos</span>
        </div>
    </div>
}
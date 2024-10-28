import React from 'react'
import styles from "./SideBar.module.scss"

export function SideBar({selectedFarm, closeSideBar}) {
    const {id, type, size, yellow, status, risk} = selectedFarm
    return <div className={styles.sideBarWrapper}>
        <div className={styles.header} onClick={closeSideBar}>×</div>
        <div className={styles.content}>
            <div>Bananal: <span className={styles.value}>{id}</span></div>
            <div>Tipo: <span className={styles.value}>{type}</span></div>
            <div>Superficie: <span className={styles.value}>{size}</span> KM2</div>
            <hr/>
            <div>Observación de Amarillez fuera de Temporada Seca: <span className={styles.value}>{yellow*100}%</span></div>
            <div>Diagnóstico:  <span className={styles.value}>{status}</span></div>
            <hr/>
            <div>Probabilidad de un Brote de Fusarium dentro de un año o menos:  <span className={styles.value}>{risk*100}%</span></div>
        </div>
    </div>
}
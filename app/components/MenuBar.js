import React, { Component } from 'react';
import styles from '../containers/css/styles.css';

const MenuBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.btnGroup}>
        <Link className={styles.btn} to="/explore">Explore</Link>
        <button className={styles.btn} onClick={(e) => {this.onLogout(e)}}>Logout</button>
      </div>
    </div>
  )
}

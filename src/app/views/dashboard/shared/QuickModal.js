import React, { Component } from 'react'

const QuickModal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="quick-modal-main">
          {children}
          <button id="createbtn" className="withdraw-color" onClick={handleClose}>cancel</button>
        </section>
      </div>
    );
  };

export default QuickModal

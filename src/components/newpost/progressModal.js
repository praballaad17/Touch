import React, { useEffect } from 'react'
import ReactDom from 'react-dom'

export default function ProgressModal({ open, onClose, progress }) {
    useEffect(() => {
        document.querySelector(".progress__bar").style.width = progress
    }, [progress])

    if (!open) return null
    
    return ReactDom.createPortal(
        <>
            <div className="modal-layout"></div>
            <div className="modal-box">
                <div className="modal-box__heading heading-black u-center-text">Progress</div>
                <ul className="modal-box__list">
                    <li className="modal-box__item" >{progress}</li>
                    <li><div className="progress">
                        <div className="progress__bar"></div>
                        <div className="progress__base"></div>
                    </div></li>
                </ul>
            </div>
        </>,
        document.getElementById("modal")
    )
}

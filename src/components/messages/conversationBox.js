import { faArrowLeft, faEllipsisH, faImage, faInfoCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useState } from 'react'
import { DEFAULT_IMAGE_PATH } from '../../constants/paths'
import { useConversations } from '../../context/conversationProvider'
import ReactLoader from '../loader'

export default function ConversationBox() {
    const { selectedConversation, sendMessage, setSelectedConversationGroupId } = useConversations()
    const [text, setText] = useState("")

    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    const handleInput = (e) => {
        e.preventDefault()
        const message = e.target.value
        setText(message)
    }

    const handleSubmit = () => {
        setText("")
        sendMessage(selectedConversation.membersId, text, selectedConversation._id)
    }
    const handleKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    if (!selectedConversation) return (
        <>
            <div className="convbox__notselected">
                <div className="convbox__notselected-box">
                    <div className="convbox__notselected-head">You don’t have a message selected</div>
                    <div className="convbox__notselected-message">Choose one from your existing messages, or start a new one.</div>
                    <button className="btn btn--tertiary" >New Messages</button>
                </div>
            </div>
            <div className="convbox__notselected-mob">
                <ReactLoader />
            </div>
        </>
    )
    else return (
        <div className="convbox">
            <div className="convbox__head">
                <div style={{ display: "flex", alignItems: "center" }} >
                    <div className="u-icon convbox__head-back" ><FontAwesomeIcon icon={faArrowLeft} onClick={() => setSelectedConversationGroupId()} /></div>
                    <img className="convbox__head-img" src={DEFAULT_IMAGE_PATH} alt="profile-img" />
                </div>
                <div className="convbox__head-title">
                    {selectedConversation._id}
                </div>
                <div className="u-icon"><FontAwesomeIcon icon={faInfoCircle} /></div>
            </div>
            <div className="convbox__box">
                {selectedConversation.messages.map((message, index) => {
                    const lastMessage = selectedConversation.messages.length - 1 === index
                    return (
                        <div key={index} ref={lastMessage ? setRef : null} className={`convbox__box-message ${message.fromMe ? 'convbox__box-message-me' : 'convbox__box-message-other'}`} >
                            <div className={`convbox__box-message-textbox ${message.fromMe ? 'convbox__box-message-textbox-me' : 'convbox__box-message-textbox-other'}`} >
                                <div className="u-icon convbox__box-message-textbox-icon"><FontAwesomeIcon icon={faEllipsisH} /></div>
                                <div className={`convbox__box-message-text ${message.fromMe ? 'convbox__box-message-text-me' : 'convbox__box-message-text-other'}`}>{message.text}</div>
                            </div>
                            <div className="convbox__box-message-details">{message.fromMe ? 'You' : message.senderName}</div>
                        </div>
                    )
                })}
            </div>
            <div className="convbox__form">
                <label className="u-icon">
                    <FontAwesomeIcon icon={faImage} />
                    <input type="file" style={{ opacity: 0, position: "absolute", left: "-99999px" }} />
                </label>
                {/* <textarea className="convbox__form-input" onInput={handleInput} placeholder="Start a New Message" /> */}
                <input className="convbox__form-input" type="text" onKeyUp={handleKey} onInput={handleInput} value={text} placeholder="Start a New Message" />
                <div className="u-icon" onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane} /></div>
            </div>
        </div>
    )
}

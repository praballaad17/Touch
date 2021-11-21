import { faArrowLeft, faCog, faEnvelopeOpen, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { DEFAULT_IMAGE_PATH, LOADING_ANI_PATH } from '../../constants/paths'
import { useConversations } from '../../context/conversationProvider'
import ReactLoader from '../loader'
import NewConversationModal from './newConversationModal'

export default function ConversationList() {
    const [onsearch, setOnsearch] = useState(false)
    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState()
    const result = []

    const { conversations, setSelectedConversationGroupId, loading } = useConversations()

    const handleSearch = () => {
        setOnsearch(true)

    }
    const handleInput = (e) => {
        setSearch(e.target.value)
    }
    const handleClear = () => {
        setSearch("")
        let input = document.querySelector('.convlist__search-input')
        input.value = ""
    }
    return (
        <div className="convlist">
            <div className="convlist__head">
                <div className="heading-black">
                    Messages
                </div>
                <div className="convlist__head-right">
                    <div className="u-icon"><FontAwesomeIcon icon={faCog} /></div>
                    <div className="u-icon" onClick={() => setModal(true)}><FontAwesomeIcon icon={faEnvelopeOpen} /></div>
                </div>
            </div>
            {loading ? <div className="convlist__loading">
                <ReactLoader />
            </div> : <>
                {conversations.length ?
                    <>
                        <div className="convlist__search">
                            {onsearch && <div className="u-icon" onClick={() => setOnsearch(false)}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </div>}
                            <div className="convlist__search-box">
                                <div className="convlist__search-inputbox">
                                    <FontAwesomeIcon icon={faSearch} />
                                    <input className="convlist__search-input" onInput={handleInput} type="text" onClick={handleSearch} placeholder="Search for People or Group" />
                                </div>
                                {search && !loading && <div className="u-icon" onClick={handleClear}><FontAwesomeIcon icon={faTimes} /></div>}
                                {loading && <img className="search__loading" src={LOADING_ANI_PATH} alt="loading" />}
                            </div>
                        </div>

                    </> :
                    <div className="convlist__nolist">
                        <div className="convlist__nolist-head" >Send a message, get a message</div>
                        <div className="convlist__nolist-message">Direct Messages are private conversations between you and other people on Touch. Share Touch, media, and more!</div>
                        <button className="btn btn--tertiary" onClick={() => setModal(true)} >Start Conversation</button>
                    </div>
                }

                {onsearch && <div className="convlist__result">
                    {!result?.length ? <div className="convlist__result-noresult">
                        Try searching for people or groups
                    </div> :
                        <div>

                        </div>
                    }
                </div>}

                {!onsearch && <div className="convlist__list">
                    {conversations.map(conversation => (
                        <div className="convlist__list-conv" onClick={() => setSelectedConversationGroupId(conversation._id)}>
                            <img className="convlist__list-conv-img" src={DEFAULT_IMAGE_PATH} alt="profile-img" />
                            {conversation.members.map(user => <div>&nbsp;{user.fullName},</div>)}
                        </div>
                    ))}
                </div>}
                <div className="convlist__newconv" onClick={() => setModal(true)}> <FontAwesomeIcon icon={faEnvelopeOpen} /></div>
            </>}

            {modal && <NewConversationModal onClose={() => setModal(false)} />}
        </div>
    )
}

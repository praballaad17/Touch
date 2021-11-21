import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { DEFAULT_IMAGE_PATH, LOADING_ANI_PATH } from '../../constants/paths'
import { useConversations } from '../../context/conversationProvider'
import useSearch from '../../hooks/use-search'

export default function NewConversationModal({ onClose }) {
    const [selected, setselected] = useState([])
    const [selectedId, setselectedId] = useState([])
    const [search, setSearch] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const { createGroup } = useConversations()

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
        setPageNumber(1)
    }

    const { result, loading } = useSearch(search, pageNumber)

    const addtoSelected = (user) => {
        setselected(prev => [...prev, user])
        setselectedId(prev => [...prev, user._id])
    }

    const deleteSelected = (user) => {
        setselected(selected.filter(u => u.username !== user.username))
        setselected(selectedId.filter(id => id !== user._id))
    }

    const handleSubmit = (e) => {
        createGroup(selectedId, selected)
        onClose()
    }
    return ReactDom.createPortal(
        <>
            <div className="modal-layout" onClick={onClose}></div>
            <div className="modal-newconv">
                <div className="modal-newconv__heading">
                    <div className="u-icon" onClick={onClose}><FontAwesomeIcon icon={faTimes} /></div>
                    <div className="modal-newconv__heading-main">New Messages</div>
                    <button disabled={!selected.length} className={`btn btn--grey ${!selected.length && 'u-opacity-50'}`} onClick={handleSubmit}>Create</button>
                </div>
                <div className="modal-newconv__search">
                    <div className="modal-newconv__search-box">
                        <FontAwesomeIcon icon={faSearch} />
                        <input className="modal-newconv__search-input" type="text" onInput={handleSearch} placeholder="Search People" />
                        {loading && <img className="search__loading" src={LOADING_ANI_PATH} alt="loading" />}
                    </div>
                    {selected.length ? <div className="modal-newconv__search-selected">
                        {selected.map(user => (
                            <div className="modal-newconv__search-selected-user" onClick={() => deleteSelected(user)}>
                                <img className="modal-newconv__search-selected-img" src={user.profileImg.length ? user.profileImg : DEFAULT_IMAGE_PATH} alt="profile-img" />
                                <span>{user.fullName}</span>
                                <FontAwesomeIcon className="modal-newconv__search-selected-icon" icon={faTimes} />
                            </div>
                        ))}
                    </div> : <></>}
                </div>

                <div className="modal-newconv__result">
                    {result.map(user => (
                        <div className="modal-newconv__result-user" onClick={() => addtoSelected(user)}>
                            <img className="modal-newconv__result-user-img" src={user.profileImg.length ? user.profileImg : DEFAULT_IMAGE_PATH} loading="prfileimg" />
                            <div className="modal-newconv__result-user-info">
                                <span>{user.fullName}</span>
                                <span className="modal-newconv__result-user-info-username">@{user.username}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>,
        document.getElementById("modal"))
}

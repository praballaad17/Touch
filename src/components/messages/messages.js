import React, { useEffect } from 'react'
import { useConversations } from '../../context/conversationProvider';
// import * as ROUTES from '../../constants/routes'
import ConversationBox from './conversationBox'

import ConversationList from './conversationList'

export default function Messages() {
    useEffect(() => {
        document.title = 'Messages | Touch';
    }, []);
    const { retriveGroups, selectedConversationGroupId } = useConversations()
    useEffect(async () => {
        await retriveGroups()
    }, [])
    console.log(selectedConversationGroupId);

    return (
        <>
            <div className="message">
                <div className="message__convlist">
                    <ConversationList />
                </div>
                <div className="message__convbox">
                    <ConversationBox />
                    {/* <Route path={ROUTES.CONVERSATION} component={ConversationBox} />
                    <Route path={ROUTES.GROUPINFO} component={Profile} />
                    <Route path={ROUTES.MESSAGES} component={Profile} /> */}
                </div>
            </div>

            <div className="message-mob">
                {!selectedConversationGroupId ?
                    <div className="message-mob__convlist">
                        <ConversationList />
                    </div> :
                    <div className="message-mob__convbox">
                        <ConversationBox />
                    </div>
                }
            </div>
        </>
    )
}

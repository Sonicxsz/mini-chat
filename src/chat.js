import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom' 

function Chat({socket, userName, room}) {
    const [currentMessage, setCurrentMessage] = React.useState('')
    const [messageList, setMessageList] = React.useState([])


    const sendMessage = async () => {
        if(currentMessage !== ''){


            const messageData = {
                room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage('')
            
        }
    }

    React.useEffect(() => {
      socket.on("receive_message", (data) =>{
       
      setMessageList((list) => [...list, data])
      })
    }, [socket])
    

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
            {messageList.map(i => {
                return (<div className='message' id={userName === i.author ? 'you' : 'other'}>
                    <div>
                        <div className='message-content'>
                            <p>{i.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p>{i.time}</p>
                            <p>{i.author}</p>
                        </div>
                    </div>
                </div>)
            })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input 
            onKeyDown={(e) =>{
                if(e.key === 'Enter'){
                    sendMessage();
                }
            }}
            onChange={(e) =>{
                setCurrentMessage(e.target.value)
              }}
            value={currentMessage}
            type="text" placeholder='write....'/>
            <button onClick={() =>{
                sendMessage()
            }}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat
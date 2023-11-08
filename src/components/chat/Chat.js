import React, { useState, useEffect } from 'react';
import SockJsClient from 'react-stomp';
import * as StompJs from "@stomp/stompjs";

const Chat = () => {
    const [chat, setChat] = useState('');
    const [chatList, setChatList] = useState([]); //화면에 표시될 채팅리스트
    const { apply_id } = useParams(); // 채널을 구분하는 식별자를 URL 파라미터(스터디아이디?)로 받는다.
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // WebSocket 연결 -> WebSocket에 연결할 주소를 인자로 주어 호출
        const ws = new WebSocket('ws://localhost:3000/ws');

        ws.onopen = () => {
            //서버와 핸드 셰이킹이 이루어진 직후 해당 함수를 수행
            console.log('WebSocket 연결 성공');
        };

        ws.onmessage = (event) => {
            //서버로부터 데이터를 수신할 경우 해당 함수를 수행
            const message = JSON.parse(event.data);
            setChatList((prevChatList) => [...prevChatList, message.chat]);
        };

        ws.onclose = () => {
            //서버와의 연결이 종료된 직후 해당 함수를 수행
            console.log('WebSocket 연결 종료');
        };
        ws.onerror=()=>{
            //에러가 발생했을 때 해당 함수를 수행
        }
        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && chat) {
            const message = {
                chat: chat,
            };
            socket.send(JSON.stringify(message));
            setChat(''); // 입력 필드 초기화
        }
    };

    const handleChange = (event) => {
        setChat(event.target.value);
    };

    return (
        <div>
            <div className="chat-list">
                {chatList.map((message, index) => (
                    <div key={index} className="chat-message">
                        {message}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input type="text" name="chatInput" onChange={handleChange} value={chat} />
                <button onClick={sendMessage}>메시지 보내기</button>
            </div>
        </div>
    );
};

export default Chat;

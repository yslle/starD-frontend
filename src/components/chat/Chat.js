import React, {Component, useRef} from 'react';
import {Client} from '@stomp/stompjs';
import chatting from "../../css/study_css/chatting.css";
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            message: '',
            greetings: [],
            studyId: this.props.studyId,
            studyTitle: this.props.studyTitle,
        };

        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket',
        });

        this.stompClient.onConnect = this.onConnect;
        this.stompClient.onWebSocketError = this.onWebSocketError;
        this.stompClient.onStompError = this.onStompError;

        this.messageEndRef = React.createRef();
    }

    state = {
        connected: false,
        message: '',
        greetings: [],
        newMessage: '',
        studyId: this.props.studyId,
    };

    componentDidMount() {
        this.setConnected(false);

        this.connect()
            .then(() => {
                if (this.stompClient.connected) {
                    this.subscribeToChatRoom(this.state.studyId);
                }
            })
            .catch((error) => {
                console.error('Failed to connect:', error);
            });

    }

    componentWillUnmount() {
        this.sendExitMessage();
    }

    scrollChatToBottom() {
        const chatBox = document.querySelector('.chattingbox');
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
    subscribeToChatRoom(studyId) {
        this.stompClient.subscribe(`/topic/greetings/${studyId}`, (greeting) => {
            this.showGreeting(JSON.parse(greeting.body));
        });
    }

    fetchChatHistory = () => {
        const accessToken = localStorage.getItem('accessToken');
        const { studyId } = this.state;
        if (accessToken) {
            axios.get(`http://localhost:8080/chat/history/${studyId}`,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(response => {
                    this.setState({greetings: response.data});
                    console.log("####: ", response.data);
                    this.sendEnterMessage();
                })
                .catch(error => {
                    console.error('Error fetching chat history:', error);
                });
        }
    };

    onConnect = (frame) => {
        const { studyId } = this.state;
        this.setConnected(true);
        console.log('Connected: ' + frame);
        this.stompClient.subscribe(`/topic/greetings/${studyId}`, (greeting) => {
            this.showGreeting(JSON.parse(greeting.body));
        });
        this.fetchChatHistory();
    };

    onWebSocketError = (error) => {
        console.error('Error with websocket', error);
    };

    onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    setConnected = (connected) => {
        this.setState({
            connected: connected,
        });
    };

    connect = () => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            return new Promise((resolve, reject) => {
                this.stompClient.activate({ headers })
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        } else {
            console.error('Access token not found.');
            return Promise.reject(new Error('Access token not found.'));
        }
    };

    disconnect = () => {
        this.stompClient.deactivate();
        this.setConnected(false);
        console.log('Disconnected');
        //this.sendExitMessage();
    };

    sendEnterMessage = () => {
        const accessToken = localStorage.getItem('accessToken');
        const { studyId } = this.state;

        if (accessToken) {
            const headers = {
                Authorization: `${accessToken}`,
            };
            this.stompClient.publish({
                destination: `/app/enter/${studyId}`,
                body: JSON.stringify({ type: 'GREETING', studyId: studyId }),
                headers: headers,
            });
        } else {
            console.error('Access token not found.');
        }
    };

    sendExitMessage = () => {
        const accessToken = localStorage.getItem('accessToken');
        const { studyId } = this.state;

        if (this.stompClient.connected && accessToken) {
            const headers = {
                Authorization: `${accessToken}`,
            };
            this.stompClient.publish({
                destination: `/app/exit/${studyId}`,
                body: JSON.stringify({ type: 'GREETING', studyId: studyId }),
                headers: headers,
            });
        } else {
            console.error('Access token not found.');
        }
        this.disconnect();
    };

    sendMessage = () => {
        const accessToken = localStorage.getItem('accessToken');
        const { message, studyId } = this.state;


        if (accessToken) {
            const headers = {
                Authorization: `${accessToken}`,
            };
            if (message.length === 0) {
                alert('메시지를 입력하세요.');
            } else {
                this.stompClient.publish({
                    destination: `/app/chat/${studyId}`,
                    body: JSON.stringify({type: 'TALK', studyId: studyId, message: `${message}`}),
                    headers: headers,
                });
                this.scrollChatToBottom();
                this.setState({
                    message: '',
                });
            }
        } else {
            console.error('Access token not found.');
        }
    };

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    };

    showGreeting = (message) => {
        this.setState((prevState) => ({
            greetings: [...prevState.greetings, message],
        }),()=>{
            this.scrollChatToBottom();
        });
    };

    formatDatetime = (datetime) => {
        const date = new Date(datetime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };





    render() {
        return (
            <div className={"chat_wrap"}>
                <div className={"studyTitle"}>
                    <h2>채팅방</h2><br/><br/>
                </div>
                <div className={"chattingbox"}>
                    <table className={"chatting"}>
                        <thead>
                        <tr>
                            <th>Messages</th>
                        </tr>
                        </thead>
                        <tbody id={"message"}>
                        {this.state.greetings.map((greeting, index) => (
                            <tr key={index}>
                                <td  id={"message-detail"}>
                                    {greeting.type === "GREETING" ? (
                                        greeting.message
                                    ) : (
                                        <span>
                                            {greeting.member ? greeting.member.nickname : 'Unknown'}: {greeting.message} [{this.formatDatetime(greeting.createdAt)}]
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td ref={this.messageEndRef}></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={"input_chat"}>
                    <label>채팅 보내기</label>
                    <input
                        type="text"
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.target.value })}
                        onKeyDown={this.onKeyDown}
                        placeholder="내용을 입력하세요"
                    />
                    <button onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        );
    }
}

export default Chat;

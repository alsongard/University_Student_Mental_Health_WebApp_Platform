import React, { useEffect, useRef, useState } from 'react';
import { Search, MoreVertical, Paperclip, Smile, Send, Phone, Video, Check, CheckCheck, Heart } from 'lucide-react';
import {io, Socket} from "socket.io-client";
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MessagingComponent()
{
    const apiURL = import.meta.env.VITE_API_URL;
    const myRole =  useSelector((state)=>state.myAuthSlicer.role);
    const [chatUsersList , setChatUsersList] = useState([]);
    const [chatContacts, setChatContacts] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatHeaderMain, setChatHeader] = useState("");
    const [theRecieverId, setTheRecieverId] = useState<String>("");

    const getPsychiatristsContacts = async () =>
    {
        try
        {
            // const response = await axios.get('http://localhost:5000/api/messages/getAllPsychiatrist', {withCredentials:true});
            const response = await axios.get(`${apiURL}/api/messages/getAllPsychiatrist`, {withCredentials:true});
            // console.log("Response from getPsychiatrists:");
            // console.log(response.data.data);

            if (response.data.success)
            {
                setChatContacts(response.data.data);
            }

        }
        catch(error){
            console.error("Error fetching psychiatrists:", error);
        }
    };

    const getAllStudentsContacts = async () =>{}

    const getUserChatPartnersSideBar = async () =>
    {
        try
        {
            
            // const response = await axios.get('http://localhost:5000/api/messages/retrieveUserChatPartners', {withCredentials:true});
            const response = await axios.get(`${apiURL}/api/messages/retrieveUserChatPartners`, {withCredentials:true});
            // console.log("Response from getChatPartners:");
            // console.log(response.data.data.length );
            // console.log(response.data.data );

            if (response.data.success)
            {
                if (response.data.data.length === 0)
                {
                    // console.log("No Chats At the moment");
                    setChatUsersList([]);
                    return;
                };
                // if (response.data.data === "No Chats At the moment")
                const data = response.data.data;
                setChatUsersList(data);

            }

        }
        catch(error){
            console.error("Error fetching chat users:", error);
        }
    };

    const getMessagesBetweenUsers = async (partnerId:String) =>
    {
        // console.log(`Getting messages between users with partnerId: ${partnerId}`);
        setTheRecieverId(partnerId);
        try
        {
            // const response = await axios.get(`http://localhost:5000/api/messages/retrievemessages/${partnerId}`, {withCredentials:true});
            const response = await axios.get(`${apiURL}/api/messages/retrievemessages/${partnerId}`, {withCredentials:true});
            // console.log("Response from getMessagesBetweenUsers:");
            // console.log(response.data.data);

            if (response.data.success)
            {
                if (response.data.data.length === 0)
                {
                    console.log("No Messages Between Users");
                }
                // console.log(response.data.data);
                setChatMessages(response.data.data);


            }

        }
        catch(error){
            console.error("Error fetching messages between users:", error);
        }
    }
    // ${apiURL}
    let socketRef = useRef(null);
    useEffect(()=>{
        socketRef.current = io(`${apiURL}`, 
            {
                transports: ['websocket', 'polling'],
                autoConnect: true,
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                withCredentials: true,
            }
        );
        getUserChatPartnersSideBar();
        getPsychiatristsContacts();
        return ()=>{
            socketRef.current?.disconnect()
        }
    }, []);
    const [selectedChat, setSelectedChat] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    const filteredChats = chatMessages.filter(chat =>
        {
            if (chat.receiverName)
            {
                return chat.receiverName.toLowerCase().includes(searchQuery.toLowerCase())
            }
        }
    );

    // using local Storage but will be changed to cookies soon
    const studentId = localStorage.getItem("studentId");
    const handleSendMessage = () => {
        console.log('sending message');
        if (messageInput.trim()) 
        {
            // the above will always evaluate to true since string.trim() on any string that has space at the
            // beginning or end will be returned and even with no space 
            const newMessage = {
                id: Date.now(), // This should be replaced with a unique ID from the backend
                receiverId: theRecieverId, // receiverId is acquired from the chatBetweenUsers
                text: messageInput,
                image: "",
                timestamp: new Date().toJSON(),
                status: "sent"
            };
            
            // const updatedChat = {
            //     ...selectedChat,
            //     messages: [...selectedChat.messages, newMessage]
            // };
            console.log('New Message on handleMessage before emit');
            // console.log(newMessage);

            // THIS IS AN UPDATE FOR THE FRONTEND CODE
            setChatMessages((prevData)=>{
                return [
                    ...prevData,
                    {
                        senderRole: myRole,
                        message:newMessage.text,
                        _id:newMessage.id,
                        status:newMessage.status,
                        updatedAt: newMessage.timestamp
                    }
                ]
            })

            if (socketRef.current)
            {
                // console.log('=== CLIENT: Before emit ===');
                // console.log('Socket exists:', !!socketRef);
                // console.log('socketRef connected:', socketRef.current.connected);
                // console.log('socketRef ID:', socketRef.current.id);
                socketRef.current.emit("sendMessage", newMessage, (response)=>{
                    setMessageInput('');
                    // console.log("argument from backend");
                    if(response.status == "ok")
                    {
                        console.log('Message sent successfully');
                    }
                })
            }
            else 
            {
                console.log('Socket is not initialized');
            }
        }
    };


    // Listener on event:
    useEffect(()=>{
        if (!socketRef.current) return;

        if (socketRef.current)
        {
            socketRef.current.on("newMessage", (myNewMessage)=>{
                // append message to chats displayed
                // console.log('newMessage on someData below')
                // console.log(myNewMessage);
                setChatMessages((prevData)=>
                    prevData.map((message)=>{
                        return message.tempId == myNewMessage.tempId ? {...myNewMessage} : message
                    })
                )
            })
        }
        return ()=>{
            socketRef.current.off("newMessage")
        }

    },[])
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const [viewChats, setViewChats] = useState(true); // true for MyChats, false for Contacts
    const [viewContacts, setViewContacts] = useState(false);

    const userViewsPrac = chatMessages && chatMessages.length > 0 && 
        (
            chatMessages.map((chatItem)=>{
                
            })
        )

    return (
        <div className="flex h-screen   ">
            {/* Sidebar - Chat List */}
            <div className="w-96 bg-white dark:bg-slate-900 border-r border-gray-200 flex flex-col">
                {/* Sidebar Header */}
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
                        </div>
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition">
                            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    <div className='flex border-b border-gray-200 dark:border-gray-700 flex-row space-x-5 px-2 py-2'>
                        <button 
                            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 w-full p-[10px] rounded-md transition"
                            onClick={()=>{console.log("set mychats state"); setViewChats(prevValue=> !prevValue); setViewContacts(false);}}>
                            <h1 className="text-gray-900 dark:text-white font-medium">MyChats</h1>
                        </button>
                        <button
                            className="bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 w-full p-[10px] rounded-md transition" 
                            onClick={()=>{console.log("set contacts state"); setViewContacts(prevValue=> !prevValue); setViewChats(false);}}>
                            <p className="text-gray-900 dark:text-white font-medium">Contacts</p>
                        </button>
                    </div>
                    
                    {/* VIEWCHAT CONTAINER */}
                    {
                        viewChats && (
                            <div className="pt-2 px-2">
                                {/* DISPLAY THIS IF NO CHATS */}
                                {
                                    chatUsersList.length === 0 && (
                                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                            No conversations available. Start a new chat to connect with your psychiatrist or support team.
                                        </div>
                                    )
                                }
                                {/* HOWEVER IF CHATS EXIST DO THE FOLLOWING */}
                                {
                                    chatUsersList.length > 0 && 
                                    chatUsersList.map((chat) => (
                                        <div
                                            key={chat._id}
                                            onClick={()=>{ 
                                                console.log(`chat`);
                                                setChatHeader(chat);
                                                getMessagesBetweenUsers(chat.psychiatristId || chat.studentId);
                                                setSelectedChat(true)
                                            }}
                                            className={`px-4 py-3 mb-2 rounded-md bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
                                                chatHeaderMain?._id === chat._id ? 'bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-600 dark:border-blue-500' : ''
                                            }`}
                                        >
                                            <div className="flex flex-row items-start space-x-5">
                                                <div className="relative">
                                                    <img
                                                        src={chat.avatar ? chat.avatar : "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop"}
                                                        alt={chat.fullName ? chat.fullName : "User Avatar"}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>

                                                    {/* THIS WILL BE SET BY SOCEKT IO */}
                                                    {/* {chat.online && ( 
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                                    )} */}
                                                </div>
                                                {/* <p className="text-sm text-gray-500 dark:text-white truncate mb-1">{chat.recieverRole}</p> */}
                                                {/* <div className="flex items-center justify-between"> */}
                                                    {/* <p className={`text-sm truncate dark:text-white ${chat.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                                        {chat.lastMessage}
                                                    </p> */}
                                                    {/* {
                                                        chat.unread > 0 && (
                                                        <span className="ml-2 dark:text-white flex-shrink-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                                                            {chat.unread}
                                                        </span>
                                                    )} */}
                                                {/* </div> */}
                                                
                                                <div className="min-w-0">
                                                    <div className="flex flex-col items-start justify-between mb-1">
                                                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{chat.fullName || chat.studentName}</h3>
                                                        {/* <span className="text-xs dark:text-white text-gray-500 flex-shrink-0 ml-2">{new Date(chat.updatedAt).toISOString().split("T")[0]}</span> */}
                                                        <h3 className="font-semibold text-gray-900 dark:text-gray-300 truncate">{chat.specilization || chat.course}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                ))}
                            </div>
                        )
                    }


                    {/* VIEW CONTACT LISTS ON CONTACTS */}
                    {
                        viewContacts && (
                            <div className="p-4 text-center flex flex-col text-gray-500 dark:text-gray-400">
                                {
                                    chatContacts.length === 0 ? (
                                        <div>No contacts available at the moment.</div>
                                    )
                                    :
                                    (
                                        chatContacts.map((contactItem)=>
                                            <div key={contactItem._id} className="flex py-2 mb-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 flex-row items-start space-x-5 transition">
                                                <div className="relative">
                                                    <img
                                                        src={contactItem.avatar ? contactItem.avatar : "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop"}
                                                        alt={contactItem.fullName ? contactItem.fullName : "User Avatar"}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                                                </div>

                                                <div className="flex-col items-start min-w-0">
                                                    <h3 className="font-semibold text-left text-gray-900 dark:text-white truncate">{contactItem.fullName}</h3>
                                                    <h3 className="font-semibold text-left text-gray-900 dark:text-gray-300 truncate">{contactItem.specilization}</h3>
                                                </div>
                                            </div>
                                        )
                                    )
           
                                }
                            </div>
                        )
                    }

                </div>
            </div>

            {/* Main Chat Area */}
            {selectedChat && ( 
                <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        
                    {/* Chat Header */}
                    <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img
                                    src={"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop"}
                                    alt={"User Avatar"}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 dark:text-white">{myRole == "student" ? chatHeaderMain?.fullName : chatHeaderMain?.studentName}</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Offline</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                                <Video className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-y-auto p-6 space-y-4">
                        {
                            chatMessages.length > 0 ? chatMessages.map((message) => (
                                <div
                                    key={message._id}
                                    className={`flex ${message.senderRole == myRole ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-md`}>
                                        <div
                                            className={`rounded-lg px-4 py-2 ${
                                            message.senderRole == myRole
                                                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                                            } shadow-sm`}
                                        >
                                            <p className="text-sm">{message.message}</p>
                                        </div>
                                        <div className={`flex items-center space-x-1 mt-1 ${
                                            message.senderRole === myRole ? 'justify-end' : 'justify-start'
                                        }`}>
                                            <span className={`text-xs text-gray-500 dark:text-gray-400`}>{new Date(message.updatedAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hour12:false})}</span>
                                            {message.senderRole === myRole && (
                                            <span>
                                                {message.status === 'sent' && <Check className="w-3 h-3 text-gray-500 dark:text-gray-400" />}
                                                {message.status === 'delivered' && <CheckCheck className="w-3 h-3 text-gray-500 dark:text-gray-400" />}
                                                {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
                                            </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            (
                                <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                                    <div className="text-center">
                                        <div className="mb-4 flex justify-center">
                                            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                                <Heart className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Start Chatting
                                        </h2>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    {/* Message Input */}
                    <div className="bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-end space-x-3">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                                <Smile className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                                <Paperclip className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
                            </button>
                            
                            <div className="flex-1">
                                <textarea
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type a message..."
                                    rows="1"
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent resize-none"
                                    style={{ minHeight: '48px', maxHeight: '120px' }}
                                />
                            </div>
                            
                            <button
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                                className={`p-3 rounded-full transition ${
                                messageInput.trim()
                                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {
                !selectedChat &&
                (
                    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                        <div className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <Heart className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                MindBridge Messaging
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                                Select a conversation to start messaging with your psychiatrist or support team
                            </p>
                        </div>
                    </div>
                )   
            }
        </div>
    );
}
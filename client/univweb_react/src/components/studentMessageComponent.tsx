import React, { useEffect, useRef, useState } from 'react';
import { Search, MoreVertical, Paperclip, Smile, Send, Phone, Video, Check, CheckCheck, Heart } from 'lucide-react';
import {io, Socket} from "socket.io-client";

export default function MessagingComponent()
{
    let socketRef = useRef(null);
    
    useEffect(()=>{
        socketRef.current = io("http://localhost:5000", 
            {
                transports: ['websocket', 'polling'],
                autoConnect: true,
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000
            }
        );
        return ()=>{
            socketRef.current?.disconnect()
        }
    }, []);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample chat data
    const chats = [
        {
            id: 1,
            name: "Dr. Sarah Mwangi",
            role: "Psychiatrist",
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
            lastMessage: "Hi John, just checking in to see how you're doing with the strategies we discussed.",
            timestamp: "10:30 AM",
            unread: 2,
            online: true,
            messages: [
                {
                    id: 1,
                    sender: "them",
                    text: "Good morning John! How are you feeling today?",
                    timestamp: "9:15 AM",
                    status: "read"
                },
                {
                    id: 2,
                    sender: "me",
                    text: "Good morning Dr. Mwangi! I'm doing much better, thank you.",
                    timestamp: "9:20 AM",
                    status: "read"
                },
                {
                    id: 3,
                    sender: "them",
                    text: "That's great to hear! Have you been practicing the breathing exercises we talked about?",
                    timestamp: "9:22 AM",
                    status: "read"
                },
                {
                    id: 4,
                    sender: "me",
                    text: "Yes, I've been doing them every morning and they really help with my anxiety.",
                    timestamp: "9:25 AM",
                    status: "read"
                },
                {
                    id: 5,
                    sender: "them",
                    text: "Excellent! Keep up the good work. Remember, consistency is key.",
                    timestamp: "9:30 AM",
                    status: "read"
                },
                {
                    id: 6,
                    sender: "them",
                    text: "Hi John, just checking in to see how you're doing with the strategies we discussed.",
                    timestamp: "10:30 AM",
                    status: "delivered"
                }
            ]
        },
        {
            id: 2,
            name: "Dr. James Ochieng",
            role: "Clinical Psychologist",
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
            lastMessage: "Our next session is scheduled for Thursday at 2 PM.",
            timestamp: "Yesterday",
            unread: 0,
            online: false,
            messages: [
                {
                id: 1,
                sender: "them",
                text: "Hello John, I hope you're doing well.",
                timestamp: "Yesterday, 3:00 PM",
                status: "read"
                },
                {
                id: 2,
                sender: "me",
                text: "Hi Dr. Ochieng, yes I'm doing well. Thank you for asking.",
                timestamp: "Yesterday, 3:15 PM",
                status: "read"
                },
                {
                id: 3,
                sender: "them",
                text: "Our next session is scheduled for Thursday at 2 PM.",
                timestamp: "Yesterday, 3:20 PM",
                status: "read"
                }
            ]
        },
        {
            id: 3,
            name: "Dr. Amina Hassan",
            role: "Counseling Psychiatrist",
            avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop",
            lastMessage: "Thank you for sharing that with me. Your courage is admirable.",
            timestamp: "Monday",
            unread: 0,
            online: true,
            messages: [
                {
                id: 1,
                sender: "me",
                text: "Dr. Hassan, I wanted to talk about the issues I've been having with my roommate.",
                timestamp: "Monday, 11:00 AM",
                status: "read"
                },
                {
                id: 2,
                sender: "them",
                text: "Of course, I'm here to listen. Please tell me what's been happening.",
                timestamp: "Monday, 11:05 AM",
                status: "read"
                },
                {
                id: 3,
                sender: "them",
                text: "Thank you for sharing that with me. Your courage is admirable.",
                timestamp: "Monday, 11:45 AM",
                status: "read"
                }
            ]
        },
        {
            id: 4,
            name: "MindBridge Support",
            role: "Support Team",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
            lastMessage: "Your appointment for October 28th has been confirmed.",
            timestamp: "Oct 20",
            unread: 0,
            online: true,
            messages: [
                {
                id: 1,
                sender: "them",
                text: "Welcome to MindBridge! We're here to support your mental health journey.",
                timestamp: "Oct 15, 9:00 AM",
                status: "read"
                },
                {
                id: 2,
                sender: "them",
                text: "Your appointment for October 28th has been confirmed.",
                timestamp: "Oct 20, 2:30 PM",
                status: "read"
                }
            ]
        }
    ];

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // using local Storage but will be changed to cookies soon
    const studentId = localStorage.getItem("studentId");
    const handleSendMessage = () => {
        console.log('sending message');
        if (messageInput.trim() && selectedChat) 
        {
            // the above will always evaluate to true since string.trim() on any string that has space at the
            // beginning or end will be returned and even with no space 
            const newMessage = {
                id: Date.now(), // This should be replaced with a unique ID from the backend
                senderId: studentId,
                receiverId: "692bbcb9946ace680fc7e177", // setting a random number from my database but will change
                senderRole: "student",
                text: messageInput,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                status: "sent"
            };
            
            const updatedChat = {
                ...selectedChat,
                messages: [...selectedChat.messages, newMessage]
            };
            
            if (socketRef)
            {
                console.log('=== CLIENT: Before emit ===');
                console.log('Socket exists:', !!socketRef);
                console.log('socketRef connected:', socketRef.current.connected);
                console.log('socketRef ID:', socketRef.current.id);
                socketRef.current.emit("sendMessage", newMessage,  (response)=>{
                    console.log("argument from backend");
                    if(response.status = "ok")
                    {
                        console.log('Message sent successfully');
                    }
                })
            }
            else 
            {
                console.log('Socket is not initialized');
            }
            setSelectedChat(updatedChat);
            setMessageInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex h-screen   ">
            {/* Sidebar - Chat List */}
            <div className="w-96 bg-white dark:bg-slate-800 border-r border-gray-200 flex flex-col">
                {/* Sidebar Header */}
                <div className="bg-gray-50 dark:bg-slate-800 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <Heart className="w-6 h-6 dark:text-white text-blue-600" />
                            <h1 className="text-xl font-bold dark:text-white text-gray-900">Messages</h1>
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded-full transition">
                            <MoreVertical className="w-5 h-5 dark:text-white text-gray-600" />
                        </button>
                    </div>
                
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="w-5 dark:text-white  h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full dark:text-white dark:bg-slate-500  dark:placeholder-white pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>

                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredChats.map((chat) => (
                        <div // used div which is good i thought buttons would be in use
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-600 transition ${
                                selectedChat?.id === chat.id ? 'bg-blue-50 dark:bg-slate-600' : ''
                            }`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className="relative">
                                    <img
                                        src={chat.avatar}
                                        alt={chat.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    {chat.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold dark:text-white text-gray-900 truncate">{chat.name}</h3>
                                        <span className="text-xs dark:text-white text-gray-500 flex-shrink-0 ml-2">{chat.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-white truncate mb-1">{chat.role}</p>
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm truncate dark:text-white ${chat.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                            {chat.lastMessage}
                                        </p>
                                        {
                                            chat.unread > 0 && (
                                            <span className="ml-2 dark:text-white flex-shrink-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            {selectedChat ? (
                <div className="flex-1 flex dark:bg-slate-900 flex-col  bg-gray-50">
                    {/* Chat Header */}
                    <div className="bg-white dark:bg-slate-900  px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img
                                    src={selectedChat.avatar}
                                    alt={selectedChat.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                    {selectedChat.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                            </div>
                            <div>
                                <h2 className="font-bold dark:text-white text-gray-900">{selectedChat.name}</h2>
                                <p className="text-xs dark:text-white text-gray-500">{selectedChat.online ? 'Online' : 'Offline'}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100  dark:hover:bg-slate-500 rounded-full transition">
                                <Video className="w-5  dark:text-white h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-500 rounded-full transition">
                                <Phone className="w-5 h-5 dark:text-white text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-500 rounded-full transition">
                                <MoreVertical className="w-5 h-5 dark:text-white text-gray-600" />
                            </button>
                        </div>
                    </div>

                {/* Messages Area */}
                <div className="flex-1 dark:bg-slate-900 overflow-y-auto p-6 space-y-4">
                    {

                        selectedChat.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-md ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                                    <div
                                        className={`rounded-lg px-4 py-2 ${
                                        message.sender === 'me'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white dark:bg-slate-400 text-gray-900'
                                        } shadow-sm`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                    <div className={`flex items-center space-x-1 mt-1 ${
                                        message.sender === 'me' ? 'justify-end' : 'justify-start'
                                    }`}>
                                        <span className={`text-xs dark:text-white text-gray-500 `}>{message.timestamp}</span>
                                        {message.sender === 'me' && (
                                        <span>
                                            {message.status === 'sent' && <Check className="w-3 h-3 text-gray-500" />}
                                            {message.status === 'delivered' && <CheckCheck className="w-3 h-3 text-gray-500" />}
                                            {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-600" />}
                                        </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Message Input */}
                <div className="bg-white dark:bg-slate-900 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-end space-x-3">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-500  rounded-full transition">
                        <Smile className="w-6 h-6 dark:text-gray-400 dark:hover:text-white text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-500 rounded-full transition">
                        <Paperclip className="w-6 h-6 dark:text-gray-400 dark:hover:text-white text-gray-600" />
                    </button>
                    
                    <div className="flex-1">
                        <textarea
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type a message..."
                            rows="1"
                            className="w-full px-4 py-3 dark:bg-slate-500 dark:placeholder-white dark:text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                            style={{ minHeight: '48px', maxHeight: '120px' }}
                        />
                    </div>
                    
                    <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className={`p-3 rounded-full transition ${
                        messageInput.trim()
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                    </div>
                </div>
                </div>
            ) : (
                // Empty State
                <div className="flex-1 dark:bg-slate-800 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="w-32 h-32 bg-blue-100 dark:bg-sky-600 rounded-full flex items-center justify-center">
                            <Heart className="w-16 h-16 dark:text-white text-blue-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        MindBridge Messaging
                    </h2>
                    <p className="text-gray-600 dark:text-white max-w-sm">
                        Select a conversation to start messaging with your psychiatrist or support team
                    </p>
                </div>
                </div>
            )}
        </div>
  );
}
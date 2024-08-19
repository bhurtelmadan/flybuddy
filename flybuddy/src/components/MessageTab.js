import React, { useEffect, useState } from 'react';
import { getReceivedMessage, getSentMessage } from '../api';
import { Inbox, Send, ChevronRight } from 'lucide-react';

const MessageTab = () => {
    const [activeTab, setActiveTab] = useState('inbox');
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        setMessages([]);
        setSelectedMessage(null);
        fetchMessage(activeTab);
    }, [activeTab]);

    const fetchMessage = async (activeTab) => {
        try {
            const response = activeTab === 'inbox' ? await getReceivedMessage() : await getSentMessage();
            if (response?.result?.length > 0) setMessages(response?.result); else setMessages([]);
        } catch (error) {
            console.error("Failed to fetch message:", error);
        }
    };

    const MessageList = ({ messages }) => {
        return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {messages.map((msg) => (
                    <li key={msg.id}>
                        <button
                            onClick={() => setSelectedMessage(msg)}
                            className="block hover:bg-gray-50 w-full text-left"
                        >
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-600 truncate">
                                        {activeTab === 'inbox' ? msg.from : msg.to}
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {msg.createdAt}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            {msg.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )};

    const MessageDetail = ({ message }) => (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {activeTab === 'inbox' ? `From: ${message.from}` : `To: ${message.to}`}
                </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <p className="text-sm text-gray-500">{message.message}</p>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4 bg-white rounded-lg shadow-md">
                <button
                    className={`flex items-center px-4 py-2 ${activeTab === 'inbox' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('inbox')}
                >
                    <Inbox className="w-5 h-5 mr-2" />
                    Inbox
                </button>
                <button
                    className={`flex items-center px-4 py-2 ${activeTab === 'sent' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('sent')}
                >
                    <Send className="w-5 h-5 mr-2" />
                    Sent
                </button>
            </div>

            <div className="flex space-x-4">
                <div className="w-1/3">
                    <MessageList messages={messages} />
                </div>
                <div className="w-2/3">
                    {selectedMessage ? (
                        <MessageDetail message={selectedMessage} />
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center text-gray-500">
                            Select a message to view details
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageTab;


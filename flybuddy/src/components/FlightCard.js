import React, { useState } from "react";
import { Calendar, MapPin, MessageSquare, Plane } from "lucide-react";
import { sendMessage, updateFlight, deleteFlight } from "../api";
import MessagePopup from "./MessagePopup";
import AddFlightForm from "./AddFlightForm";

const FlightCard = ({ flight, showConnect = true, getAllFlight = null }) => {
    const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleSendMessage = async (message) => {
        try {
            await sendMessage({ receiverUserId: flight.userId, message });
            setIsMessagePopupOpen(false);
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error (e.g., show error message to user)
        }
    };


    const handleUpdateFlight = async (flightDetails) => {
        try {
            await updateFlight(flight._id, flightDetails);
            await getAllFlight();
            setShowEditForm(false);
        } catch (error) {
            console.error("Failed to update flight:", error);
        }
    };

    const handleDeleteFlight = async () => {
        try {
            if (window.confirm('Are you sure you want to delete this flight?')) {
                await deleteFlight(flight._id);
                await getAllFlight();
            } else {
                // Do nothing!
            }
        } catch (error) {
            console.error("Failed to delete flight:", error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-xl">{flight.name}, {flight.age}</h3>
                    <span className={`px-2 py-1 rounded text-sm ${flight.status === 'offering' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {flight.status === 'offering' ? 'Offering' : 'Seeking'}
                    </span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                    <Plane className="w-4 h-4 mr-2" />
                    <span>{flight.airline} {flight.flightNumber}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{flight.departure} to {flight.arrival}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{flight.date}</span>
                </div>
                {flight.status === 'offering' && flight.companionPreference && (
                    <p className="text-sm text-gray-600 mb-4">Preference: {flight.companionPreference}</p>
                )}
                {flight.status === 'seeking' && flight.additionalInfo && (
                    <p className="text-sm text-gray-600 mb-4">Info: {flight.additionalInfo}</p>
                )}
                {showConnect ? (
                    <button
                        onClick={() => setIsMessagePopupOpen(true)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
                    >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Connect
                    </button>
                ) : <div className="flex">
                    <button
                        onClick={() => setShowEditForm(true)}
                        className="w-full bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDeleteFlight}
                        className="w-full bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
                    >
                        Delete
                    </button>
                </div>}

                {showEditForm && (
                    <AddFlightForm
                        title="Update Your Flight"
                        onClose={() => setShowEditForm(false)}
                        onAddFlight={handleUpdateFlight}
                        defaultData={flight}
                    />
                )}

                <MessagePopup
                    isOpen={isMessagePopupOpen}
                    onClose={() => setIsMessagePopupOpen(false)}
                    onSend={handleSendMessage}
                    recipientName={flight.name}
                />
            </div>
        </div>
    )
};

export default FlightCard;

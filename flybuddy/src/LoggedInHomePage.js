import React, { useState, useEffect, useContext } from 'react';
import { Search, Users, Shield, Plane, MapPin, Calendar, User, Bell, MessageSquare, Plus, X } from 'lucide-react';
import { AuthHeader } from './layouts/AuthHeader';
import { AuthContext } from './context/AuthContext';
import { createFlight, getAllFlight } from './api';
import FlightCard from './components/FlightCard';
import MyFlightsTab from './components/MyFlightTab';
import MessagesTab from './components/MessageTab';
import AddFlightForm from './components/AddFlightForm';

const OfferingTab = ({ flights }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Offering Companionship</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    </div>
);

const SeekingTab = ({ flights }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Seeking Companionship</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    </div>
);

const ProfileTab = ({ user }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        {/* Add more profile information here */}
    </div>
);

const LoggedInHomePage = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('Offering');
    const [flights, setFlights] = useState([]);
    const [showAddFlightForm, setShowAddFlightForm] = useState(false);
    const tabs = ['Offering', 'Seeking', 'My Flights', 'Messages', 'Profile'];

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const flightData = await getAllFlight();
            setFlights(flightData?.result);
        } catch (error) {
            console.error("Failed to fetch flights:", error);
        }
    };

    const handleAddFlight = async (flightDetails) => {
        try {
            await createFlight(flightDetails);
            await fetchFlights();
            setShowAddFlightForm(false);
        } catch (error) {
            console.error("Failed to add flight:", error);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Offering':
                return <OfferingTab flights={flights.filter(f => f.status === 'offering' && f.userId != user?._id)} />;
            case 'Seeking':
                return <SeekingTab flights={flights.filter(f => f.status === 'seeking' && f.userId != user?._id)} />;
            case 'My Flights':
                return <MyFlightsTab flights={flights.filter(f => f.userId === user?._id)} allFlights={flights} getAllFlight={fetchFlights} />;
            case 'Messages':
                return <MessagesTab />;
            case 'Profile':
                return <ProfileTab user={user} />;
            default:
                return <div>Tab content not available</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AuthHeader />

            <main className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <ul className="flex space-x-4 border-b">
                        {tabs.map((tab) => (
                            <li key={tab}>
                                <button
                                    className={`py-2 px-4 font-medium ${activeTab === tab
                                        ? 'text-blue-500 border-b-2 border-blue-500'
                                        : 'text-gray-500 hover:text-blue-500'
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {renderTabContent()}

                {(activeTab === 'My Flights') && (
                    <button
                        onClick={() => setShowAddFlightForm(true)}
                        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center shadow-lg"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Your Flight
                    </button>
                )}

                {showAddFlightForm && (
                    <AddFlightForm
                        title="Add Your Flight"
                        onClose={() => setShowAddFlightForm(false)}
                        onAddFlight={handleAddFlight}
                        defaultData={null}
                    />
                )}
            </main>
        </div>
    );
};

export default LoggedInHomePage;

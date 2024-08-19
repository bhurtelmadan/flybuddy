import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const AddFlightForm = ({ title, onClose, onAddFlight, defaultData }) => {
    const [flightDetails, setFlightDetails] = useState({
        status: 'offering', // Default to 'offering'
        name: '',
        age: '',
        airline: '',
        flightNumber: '',
        departure: '',
        arrival: '',
        date: '',
        companionPreference: '',
        additionalInfo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddFlight(flightDetails);
    };

    useEffect(() => {
        if (defaultData) {
            setFlightDetails({
                status: defaultData.status,
                name: defaultData.name,
                age: defaultData.age,
                airline: defaultData.airline,
                flightNumber: defaultData.flightNumber,
                departure: defaultData.departure,
                arrival: defaultData.arrival,
                date: defaultData.date,
                companionPreference: defaultData.companionPreference,
                additionalInfo: defaultData.additionalInfo
            })
        }
    }, [defaultData])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full max-h-90vh overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            I am:
                        </label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="status"
                                    value="offering"
                                    checked={flightDetails.status === 'offering'}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Offering companionship</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="status"
                                    value="seeking"
                                    checked={flightDetails.status === 'seeking'}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Seeking a companion</span>
                            </label>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={flightDetails.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        value={flightDetails.age}
                        onChange={handleChange}
                        placeholder="Your Age"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="airline"
                        value={flightDetails.airline}
                        onChange={handleChange}
                        placeholder="Airline"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="flightNumber"
                        value={flightDetails.flightNumber}
                        onChange={handleChange}
                        placeholder="Flight Number"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="departure"
                        value={flightDetails.departure}
                        onChange={handleChange}
                        placeholder="Departure Airport"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="arrival"
                        value={flightDetails.arrival}
                        onChange={handleChange}
                        placeholder="Arrival Airport"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={flightDetails.date}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    {flightDetails.status === 'offering' && (
                        <textarea
                            name="companionPreference"
                            value={flightDetails.companionPreference}
                            onChange={handleChange}
                            placeholder="Describe your ideal companion (e.g., age range, interests)"
                            className="w-full p-2 mb-4 border rounded"
                            rows="3"
                        />
                    )}
                    {flightDetails.status === 'seeking' && (
                        <textarea
                            name="additionalInfo"
                            value={flightDetails.additionalInfo}
                            onChange={handleChange}
                            placeholder="Any additional information or preferences"
                            className="w-full p-2 mb-4 border rounded"
                            rows="3"
                        />
                    )}
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                           Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFlightForm;

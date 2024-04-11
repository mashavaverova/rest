import  { useState, useEffect } from 'react';
import Web3 from 'web3';
import ABI from '../contracts/ABI';
import { ConnectButton } from '../pages/ConnectButton';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const restaurantsContract = new web3.eth.Contract(ABI, contractAddress);

export const BookingsAdm = () => {
    const [bookingsDetails, setBookingsDetails] = useState([]); // Store full details here
    const restaurantId = 1;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingIds = await restaurantsContract.methods.getBookings(restaurantId).call();
                const bookings = await Promise.all(bookingIds.map(id =>
                    restaurantsContract.methods.bookings(id).call()
                ));
                setBookingsDetails(bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <ConnectButton />
            <h1>Bookings for Restaurant {restaurantId}</h1>
            <ul>
                {bookingsDetails.map((booking, index) => (
                    <li key={index}>
                        Booking ID: {parseFloat(booking.id)}, Guests: {parseFloat(booking.numberOfGuests)}, Name: {booking.name}, Date: {booking.date}, Time: {parseFloat(booking.time)}
                    </li>
                ))}
            </ul>
        </div>
    );
};



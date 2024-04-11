import { useState, useEffect } from 'react';
import { restContract } from '../service/web3';

const BookingPage = ({ selectedDate }) => {
  const [freeTables, setFreeTables] = useState({ slot1800: 3, slot2100: 3 });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingIds = await restContract.methods.getBookings(1).call();
        const fetchedBookings = await Promise.all(
          bookingIds.map(id => restContract.methods.bookings(id).call())
        );
        setBookings(fetchedBookings);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="booking-page">
      <div className="availability-container">
        <h1>Table Availability for {selectedDate}</h1>
        <p>18:00 slot - Free tables: {freeTables.slot1800}</p>
        <p>21:00 slot - Free tables: {freeTables.slot2100}</p>
      </div>
      <div className="booking-list-container">
        <h2>All Bookings for {selectedDate}</h2>
        {bookings.length === 0 ? (
          <p>No bookings found for this date.</p>
        ) : (
          <ul>
            {bookings.map((booking, index) => (
              <li key={index}>
                <p>Name: {booking.name}</p>
                <p>Time: {booking.time}</p>
                <p>Number of Guests: {booking.numberOfGuests}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookingPage;

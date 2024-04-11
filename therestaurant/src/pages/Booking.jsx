import { useState, useEffect } from "react";
import { BookingForm } from "./BookingForm";
import { createBooking, restContract } from "../service/web3";
import { ConnectButton } from "./ConnectButton";
import BookingPage from "./BookingPage";

export function Booking() {
  const initialFormData = {
    numberOfGuests: 0,
    name: "",
    date: "",
    time: 0,
    restaurantId: 1,
  };

  const [contractInstance, setContractInstance] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const checkBookingAvailability = async () => {
      if (formData.date && formData.time) {
        const formattedTime = parseInt(formData.time);
        const bookingIds = await restContract.methods.getBookings(1).call();
        const bookings = await Promise.all(
          bookingIds.map((id) => restContract.methods.bookings(id).call())
        );
        const bookingsForSlot = bookings.filter(
          (booking) =>
            booking.date === formData.date &&
            parseInt(booking.time) === formattedTime
        );
        setIsSlotAvailable(bookingsForSlot.length < 16);
      }
    };

    checkBookingAvailability().catch(console.error);

    const fetchCurrentAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
          } else {
            console.log("Please connect to MetaMask.");
          }
        } catch (error) {
          console.error(
            "An error occurred fetching the current account:",
            error
          );
        }
      }
    };

    fetchCurrentAccount();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount(null);
        console.log("Please connect to MetaMask.");
      }
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
    };
  }, [formData.date, formData.time]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    
      if (name === "date") {
        setSelectedDate(value);
      }
      setBookingConfirmation(null);
      console.log(`Selected ${name}:`, value);
    
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.numberOfGuests) {
      newErrors.numberOfGuests = "Number of guests is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentAccount) {
      alert("Please connect your wallet to book a table.");
      return;
    }

    if (!isSlotAvailable) {
      alert(
        "The selected slot is fully booked. Please choose another date and time."
      );
      return;
    }

    const selectedTime = parseInt(formData.time);
    if (!isValidTime(selectedTime)) {
      alert("Please select a valid time slot (18:00 or 21:00).");
      return;
    }

    if (!validateForm()) {
      alert("Please correct the errors in the form.");
      return;
    }

    try {
      await createBooking(
        parseInt(formData.numberOfGuests),
        formData.name,
        formData.date,
        selectedTime,
        parseInt(formData.restaurantId),
        currentAccount
      );

      handleBookingConfirmation();
      resetFormData();
      setSelectedDate("");
      alert("Booking successful!");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Booking failed, please try again.");
    }
  };

  const isValidTime = (time) => {
    return time === 1800 || time === 2100;
  };

  const handleBookingConfirmation = () => {
    console.log(
      "Booking created successfully!" + formData.date + " " + formData.time
    );
    setBookingConfirmation({
      numberOfGuests: formData.numberOfGuests,
      name: formData.name,
      date: formData.date,
      time: formData.time,
    });
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="booking-container">
      <div className="booking-section">
        <h1>1. Connect your wallet</h1>
        <ConnectButton
          setContractInstance={setContractInstance}
          setSelectedAccount={setSelectedAccount}
        />
      </div>

      <div className="booking-section">
        <h1>2. Book a table</h1>
        <BookingForm
          formData={formData}
          handleFormChange={handleFormChange}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </div>

      {!isSlotAvailable && (
        <div className="booking-section">
          <p>
            This time slot is fully booked. Please choose another time.
          </p>
        </div>
      )}

      {bookingConfirmation && (
        <div className="booking-section">
          <div className="booking-confirmation">
            <h2>Your Booking Confirmation</h2>
            <p>Name: {bookingConfirmation.name}</p>
            <p>Date: {bookingConfirmation.date}</p>
            <p>Time: {bookingConfirmation.time}</p>
            <p>Number of guests: {bookingConfirmation.numberOfGuests}</p>
          </div>
        </div>
      )}
 {selectedDate && !bookingConfirmation && (
        <BookingPage selectedDate={formData.date} />
      )}
     
    </div>
  );
}

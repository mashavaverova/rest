


export function BookingForm({ handleFormChange, formData, errors, handleSubmit }) {

  return (
    <div className="booking-form">
      <form onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="name" className="labelForm">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
            className="inputForm"
          />
          {errors.name && <div className="errorMessage">{errors.name}</div>}
        </div>

        <div className="select-date">
          <label htmlFor="date" className="labelForm">
            Select a date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
            required
            className="inputForm"
          />
          {errors.date && <div className="errorMessage">{errors.date}</div>}
        </div>

        <div className="select-time">
          <label htmlFor="time" className="labelForm">
            Time:
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleFormChange}
            required
            className="inputForm"
          >
            <option value="">Time</option>
            <option value="1800">18:00</option>
            <option value="2100">21:00</option>
          </select>
          {errors.time && <div className="errorMessage">{errors.time}</div>}
        </div>

        <div className="select-guests">
          <label htmlFor="numberOfGuests" className="labelForm">
            Select a number of guests:
          </label>
          <select
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleFormChange}
            required
            className="inputForm"
          >
            <option value="">Guests</option>
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
          {errors.numberOfGuests && (
            <div className="errorMessage">{errors.numberOfGuests}</div>
          )}
        </div>

        <button type="submit" className="reserveformButton">Make your reservation</button>
      </form>
    </div>
  );
}

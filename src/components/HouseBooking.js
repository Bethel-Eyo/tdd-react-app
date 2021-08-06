import moment from "moment";
import React, { useState, useEffect } from "react";
import { apiClient } from "../services/apiClient";
import { bookingDialogService } from "../services/bookingDialogService";
import { notificationService } from "../services/notificationService";

const HouseBooking = ({ house }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const price = house ? house.price : 0;
    const checkInDate = moment(checkIn, "YYYY-MM-DD");
    const checkOutDate = moment(checkOut, "YYYY-MM-DD");
    const nights = checkOutDate.diff(checkInDate, "days");
    const total = nights * price;
    setTotal(total);
  }, [checkIn, checkOut, house]);
  if (!house) {
    return <div data-testid="empty"></div>;
  }

  const handleBooking = () => {
    apiClient.bookHouse(house, checkIn, checkOut).then((res) => {
      bookingDialogService.close();
      notificationService.open(res.message);
    });
  };

  return (
    <div>
      <h2 data-testid="title">{house?.title}</h2>
      <div data-testid="price" className="mb-3">
        <span className="font-weight-bold text-primary text-large">
          ${house?.price}
        </span>{" "}
        per night
      </div>
      <div className="form-group">
        <label htmlFor="checkInDate">Choose your check-in date</label>
        <input
          id="checkInDate"
          className="form-control"
          data-testid="check-in"
          type="date"
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkOutDate">Choose your check-out date</label>
        <input
          id="checkOutDate"
          className="form-control"
          data-testid="check-out"
          type="date"
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div data-testid="total" className="my-3 text-right">
        <span className="font-weight-bold text-large">
          Total: ${total > 0 ? total : "--"}
        </span>
      </div>
      <div className="d-flex justify-content-end"></div>
      <button
        type="button"
        className="btn btn-primary"
        data-testid="book-btn"
        onClick={handleBooking}
      >
        Book
      </button>
    </div>
  );
};

export default HouseBooking;

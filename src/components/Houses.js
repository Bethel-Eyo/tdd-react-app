import { Dialog, DialogContent } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { apiClient } from "../services/apiClient";
import { bookingDialogService } from "../services/bookingDialogService";
import HouseBooking from "./HouseBooking";
import Notification from "./Notification";

const Houses = () => {
  const [houseData, setHouseData] = useState([]);
  const [bookingDialogState, setBookingDialogState] = useState({ open: false });

  useEffect(() => {
    const housesDataPromise = apiClient.getHomes();
    housesDataPromise.then((houses) => setHouseData(houses));
  }, []);

  useEffect(() => {
    const subscription = bookingDialogService.events$.subscribe((state) =>
      setBookingDialogState(state)
    );

    // unsubscribe for the observable to avoid memory leaks after navigating away
    return () => subscription.unsubscribe();
  }, []);

  let houses;

  houses = houseData.map((house, index) => {
    return (
      <div key={index} className="col-6 col-md-6 col-lg-4 col-xl-3 mb-3">
        <div data-testid="house" className="card w-100">
          <img
            data-testid="house-image"
            className="card-img-top"
            src={house.image}
            alt=""
          />
          <div className="card-body">
            <div data-testid="house-title" className="card-title h5">
              {house.title}
            </div>
            <div data-testid="house-location">{house.location}</div>
            <div data-testid="house-price">${house.price}/night</div>
            <div className="d-flex justify-content-end">
              <button
                data-testid="house-booking-btn"
                type="button"
                className="btn btn-primary"
                onClick={() => bookingDialogService.open(house)}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  // console.log("render houses", houses);

  return (
    <div className="container m-2">
      <h1>Houses</h1>
      <div className="row">{houses}</div>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={bookingDialogState.open}
        onClose={() => bookingDialogService.close()}
      >
        <DialogContent>
          <HouseBooking house={bookingDialogState.house} />
        </DialogContent>
      </Dialog>
      <Notification />
    </div>
  );
};

export default Houses;

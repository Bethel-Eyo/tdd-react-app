import React from "react";
import {
  act,
  fireEvent,
  getByTestId,
  getNodeText,
  render,
} from "@testing-library/react";
import HouseBooking from "./HouseBooking";
import { apiClient } from "../services/apiClient";
import { bookingDialogService } from "../services/bookingDialogService";
import { notificationService } from "../services/notificationService";

let container = null;

const mockedHome = {
  title: "Test house 1",
  image: "listing.jpg",
  location: "Test location 1",
  price: "123",
};

// to render the component before each test
beforeEach(() => {
  container = render(<HouseBooking house={mockedHome} />).container;
});

it("should show title", () => {
  expect(getByTestId(container, "title").textContent).toBe("Test house 1");
});

it("should show price", () => {
  expect(getByTestId(container, "price").textContent).toBe("$123 per night");
});

it("should show check-in date field", () => {
  expect(getByTestId(container, "check-in")).toBeTruthy();
});

it("should show check-out date field", () => {
  expect(getByTestId(container, "check-out")).toBeTruthy();
});

it("should show empty when no house is provided", () => {
  container = render(<HouseBooking house={null} />).container;
  expect(getByTestId(container, "empty")).toBeTruthy();
});

it("should calculate total", () => {
  // enter check-in date: 2021-08-07
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-08-07" },
  });
  // enter check-out date: 2021-08-10
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-08-10" },
  });
  // assert total = 3*123
  expect(getByTestId(container, "total").textContent).toBe("Total: $369");
});

it("should show '--' for invalid dates", () => {
  // enter check-in date: 2021-08-07
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-08-07" },
  });
  // enter check-out date: 2021-08-10
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-08-04" },
  });
  // assert total = 3*123
  expect(getByTestId(container, "total").textContent).toBe("Total: $--");
});

it("should book home after clicking the button", () => {
  // spy on apiClient
  jest.spyOn(apiClient, "bookHouse").mockImplementation(() => {
    return Promise.resolve({ message: "Mocked House Booked!"});
  });
  // select dates
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-08-07" },
  });
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-08-10" },
  });
  // click the book button
  getByTestId(container, "book-btn").click();
  // assert the apiClient booked the home
  expect(apiClient.bookHouse).toHaveBeenCalledWith(
    mockedHome,
    "2021-08-07",
    "2021-08-10"
  );
});

it("should close the dialog and show notification after booking home", async () => {
  // spy on apiClient
  jest.spyOn(apiClient, "bookHouse").mockImplementation(() => Promise.resolve({ message: "Mocked House Booked!"}));
  // spy on bookingDialogService
  jest.spyOn(bookingDialogService, 'close').mockImplementation(() => {});
  // spy on notification service
  jest.spyOn(notificationService, 'open').mockImplementation(() => {});
  // enter dates and click book btn
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-08-07" },
  });
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-08-10" },
  });
  getByTestId(container, "book-btn").click();
  // enables the test wait for promises to run before asserting
  await act(async () => {})
  // assert that dialog service close the dialog
  expect(bookingDialogService.close).toHaveBeenCalled();
  // assert that notification service posted a notification
  expect(notificationService.open).toHaveBeenCalledWith("Mocked House Booked!");
});

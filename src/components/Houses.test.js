import React from "react";
import { act, getAllByTestId, getNodeText, render } from "@testing-library/react";
import Houses from "./Houses";
import { apiClient } from "../services/apiClient";
import { bookingDialogService } from "../services/bookingDialogService";

let container = null;

// to render the component before each test
beforeEach(async () => {
  jest.spyOn(apiClient, "getHomes").mockImplementation(() => {
    return Promise.resolve([
      {
        title: "Test house 1",
        image: "listing.jpg",
        location: "Test location 1",
        price: "1",
      },
      {
        title: "Test house 2",
        image: "listing.jpg",
        location: "Test location 2",
        price: "2",
      },
      {
        title: "Test house 3",
        image: "listing.jpg",
        location: "Test location 3",
        price: "3",
      },
    ]);
  });
  container = render(<Houses />).container;

  // gives us the chance to execute the useEffect hook callback
  await act(async () => {});
});

it("should show houses", () => {
  // grab all the elements from the container that has the home id and
  // 'getAllByTestId' returns an array
  const houses = getAllByTestId(container, "house");
  // the component should display at least one house
  expect(houses.length).toBeGreaterThan(0);
});

it("should show house title", () => {
  const houseTitles = getAllByTestId(container, "house-title");
  expect(getNodeText(houseTitles[0])).toBe("Test house 1");
});

it("should show house image", () => {
  const houseImages = getAllByTestId(container, "house-image");
  expect(houseImages[0]).toBeTruthy();
});


it("should show house location", () => {
  const houseLocations = getAllByTestId(container, "house-location");
  expect(getNodeText(houseLocations[0])).toBe("Test location 1");
});

it("should show house price", () => {
  const housePrices = getAllByTestId(container, "house-price");
  expect(getNodeText(housePrices[0])).toBe("$1/night");
});

it("should show house booking button", () => {
  const houseBookingBtn = getAllByTestId(container, "house-booking-btn");
  expect(houseBookingBtn[0]).toBeTruthy();
});

it("should open house booking dialog when button is clicked", () => {
  jest.spyOn(bookingDialogService, 'open').mockImplementation(() => {});
  const houseBookingBtn = getAllByTestId(container, "house-booking-btn");
  houseBookingBtn[0].click();
  expect(bookingDialogService.open).toHaveBeenCalledWith({
    title: "Test house 1",
    image: "listing.jpg",
    location: "Test location 1",
    price: "1",
  });
});
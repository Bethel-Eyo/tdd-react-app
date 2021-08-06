import React from "react";

const Header = () => {
  return (
    <div>
      <nav className="py-3 border-bottom navbar navbar-expand navbar-light">
        <a className="navbar-brand" href="/#" data-testid="logo">
          <img src="logo192.png" width="40" alt="" />
        </a>
        <form className="mr-auto w-50 form-inline" data-testid="search">
          <input
            placeholder="Search homes"
            type="text"
            className="w-50 form-control"
          />
        </form>
        <div data-testid="menu" className="ml-auto text-uppercase navbar-nav">
          <a className="nav-link" href="/#">
            Become a host
          </a>
          <a className="nav-link" href="/#">
            Help
          </a>
          <a className="nav-link" href="/#">
            Sign Up
          </a>
          <a className="nav-link" href="/#">
            Login
          </a>
        </div>
        {/* <div data-testid="logo">Logo!</div> */}
      </nav>
      <div className="m-0 px-4 py-2 container-fluid mx-100 border-bottom container">
        <button
          data-testid="house-type"
          type="button"
          className="text-nowrap mx-2 py-1 btn btn-outline-secondary"
        >
          House Type
        </button>
        <button
          data-testid="dates"
          type="button"
          className="text-nowrap mx-2 py-1 btn btn-outline-secondary"
        >
          Dates
        </button>
        <button
          data-testid="guests"
          type="button"
          className="text-nowrap mx-2 py-1 btn btn-outline-secondary"
        >
          Guests
        </button>
        <button
          data-testid="price"
          type="button"
          className="text-nowrap mx-2 py-1 btn btn-outline-secondary"
        >
          Price
        </button>
        <button
          data-testid="rooms"
          type="button"
          className="text-nowrap mx-2 py-1 btn btn-outline-secondary"
        >
          Rooms
        </button>
        <button
          data-testid="amenities"
          type="button"
          className="text-nowrap mx-2 py-1 btn btn-outline-secondary"
        >
          Amenities
        </button>
      </div>
    </div>
  );
};

export default Header;

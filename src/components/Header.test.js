import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Header from './Header';

let container = null;

// to render the component before each test
beforeEach(() => {
  container = render(<Header />).container;
});

it('should show logo', () => {
  // check that the container contains an element with a test id 'logo'
  // tobeTruthy means that it found something that is considered to be the logo
  expect(getByTestId(container, 'logo')).toBeTruthy();
});

it('should show search', () => {
  expect(getByTestId(container, 'search')).toBeTruthy();
});

it('should show menu', () => {
  expect(getByTestId(container, 'menu')).toBeTruthy();
});

it('should show filters', () => {
  expect(getByTestId(container, 'house-type')).toBeTruthy();
  expect(getByTestId(container, 'dates')).toBeTruthy();
  expect(getByTestId(container, 'guests')).toBeTruthy();
  expect(getByTestId(container, 'price')).toBeTruthy();
  expect(getByTestId(container, 'rooms')).toBeTruthy();
  expect(getByTestId(container, 'amenities')).toBeTruthy();
});
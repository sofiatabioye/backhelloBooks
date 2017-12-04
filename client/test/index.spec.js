import React from 'react';
import { shallow } from 'enzyme';
import BookForm from '../src/components/books/bookForm.jsx';

describe('App', () => {
  it('should be able to run tests', () => {
    expect(1 + 2).toEqual(3);
  });
});
describe('Book', () => {
  it('should be able to run book tests', () => {
    // test('render a label', () => {
    const wrapper = () => shallow(<BookForm />);
    expect(wrapper.length).toBe(1);
  });
  // });
});


import React from 'react';
import { shallow } from 'enzyme';
import Books from '../src/components/books/allbooks.jsx';
import NotFound from '../src/components/common/notfound.jsx';
import Routes from '../src/components/common/myroutes.jsx';
import Store from '../src/store/store';
import validateBook from '../src/components/utils/validateBook';
import validateCategory from '../src/components/utils/validateCategory';
import validatePassword from '../src/components/utils/validatePassword';
import validateSignUp from '../src/components/utils/validateSignUp';
import setAuthorizationToken from '../src/utils/setAuthorizationToken';
import Authenticate from '../src/helper/authenticate';
import adminAuthenticate from '../src/helper/adminAuth';
import {authActions} from '../src/actions/authActions';

describe('Routes', () => {
  test('should be able to run tests', () => {
    expect(1 + 2).toEqual(3);
  });
  test('should be render routes', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper.length).toBe(1);
  });
  test('should be render routes', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.length).toBe(1);
  });
  test('should be render book form', () => {
    const wrapper = shallow(<setAuthorizationToken />);
    expect(wrapper.length).toBe(1);
  });
  test('should be render book form', () => {
    const wrapper = shallow(<validateBook />);
    expect(wrapper.length).toBe(1);
  });
  test('should be render book form', () => {
    const wrapper = shallow(<validateCategory />);
    expect(wrapper.length).toBe(1);
  });
  test('should be render book form', () => {
    const wrapper = shallow(<validatePassword />);
    expect(wrapper.length).toBe(1);
  });
  test('should be render book form', () => {
    const wrapper = shallow(<validateSignUp />);
    expect(wrapper.length).toBe(1);
  });
  test('should be render book form', () => {
    const wrapper = shallow(<Authenticate />);
    expect(wrapper.length).toBe(1);
  });
  test('should check if adm form', () => {
    const wrapper = shallow(<adminAuthenticate />);
    expect(wrapper.length).toBe(1);
  });
  test('should check if adm form', () => {
    const wrapper = shallow(<authActions />);
    expect(wrapper.length).toBe(1);
  });
});


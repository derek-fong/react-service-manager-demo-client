import { shallow } from 'enzyme';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import ReactDOM from 'react-dom';

import HomeCarousel from './HomeCarousel';
import HomeContainer from './HomeContainer';

describe('<HomeContainer />', () => {
  const wrapper = shallow(<HomeContainer />);

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<HomeContainer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('contains a <Jumbotron />', () => {
    expect(wrapper.exists(Jumbotron)).toBeTruthy();
  });

  it('contains a <HomeCarousel />', () => {
    expect(wrapper.exists(HomeCarousel)).toBeTruthy();
  });

  it('contains an open requests counter', () => {
    expect(wrapper.exists('#open-request-counter')).toBeTruthy();
  });

  it('contains a completed requests counter', () => {
    expect(wrapper.exists('#completed-request-counter')).toBeTruthy();
  });

  describe('open request counter', () => {
    const openRequestCounter = wrapper.find('#open-request-counter').first();

    it('counts requests only with status type "REGISTERED", "IN_PROGRESS" or "PENDING_CUSTOMER"', () => {
      expect(openRequestCounter.prop('requestStatusTypes')).toEqual([
        'REGISTERED',
        'IN_PROGRESS',
        'PENDING_CUSTOMER'
      ]);
    });
  });

  describe('completed request counter', () => {
    const completedRequestCounter = wrapper
      .find('#completed-request-counter')
      .first();

    it('counts requests only with status type "FULFILLED" or "CLOSED"', () => {
      expect(completedRequestCounter.prop('requestStatusTypes')).toEqual([
        'FULFILLED',
        'CLOSED'
      ]);
    });
  });
});

import { shallow } from 'enzyme';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import ReactDOM from 'react-dom';

import HomeCarousel from './HomeCarousel';

describe('<HomeCarousel />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<HomeCarousel />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('contains three Carousel items', () => {
    const wrapper = shallow(<HomeCarousel />);

    expect(wrapper.find(Carousel.Item)).toHaveLength(3);
  });
});

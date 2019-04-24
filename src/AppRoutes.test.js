import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';

import AppRoutes from './AppRoutes';
import NotFound from './core/NotFound';
import HomeContainer from './home/HomeContainer';
import RequestRoutes from './requests/RequestsRoutes';

describe('<AppRoutes />', () => {
  it('shows <HomeContainer /> for route "/"', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(component.exists(HomeContainer)).toBeTruthy();
  });

  it('shows <RequestRoutes /> for route "/requests"', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/requests']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(component.exists(RequestRoutes)).toBeTruthy();
  });

  it('shows <NotFound /> for route not defined', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(component.exists(NotFound)).toBeTruthy();
  });
});

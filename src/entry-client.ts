import './style.css';

import { renderComponent } from '@glimmerx/core';
import App from './App';
import Core from './services/core';

let userId = location.search;
let token =
  document?.querySelector<HTMLMetaElement>('meta[name=token]')?.content;

document?.addEventListener(
  'DOMContentLoaded',
  () => {
    const element = document.getElementById('app');
    renderComponent(App, {
      element: element!,
      services: {
        core: new Core({ userId, token }),
      },
    });
  },
  { once: true }
);

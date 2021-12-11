import './style.css';

import { renderComponent } from '@glimmerx/core';
// @ts-ignore
// globalThis[Symbol.for('GLIMMER_VALIDATOR_REGISTRATION')] = false;
import App from './App';
import Core from './services/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

let userId = location.search;
let token =
  document?.querySelector<HTMLMetaElement>('meta[name=token]')?.content;

document.addEventListener(
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

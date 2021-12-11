import Component, { hbs } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';
import { service } from '@glimmerx/service';
import { sync } from './decorators/sync';

import Core from './services/core';

import Test from './Test';

export default class App extends Component {
  @sync('INC', { defaultValue: 0 }) counter!: number;
  @service('core') core!: Core;

  static template = hbs`
    <h1>Test</h1>

    <button type='button' {{on 'click' this.increase}}>Increase</button>
    <button type='button' {{on 'click' this.increaseLocal}}>Increase Local</button>

    <hr/>
    {{this.counter}}
  `;

  constructor(owner: object, args: {}) {
    super(owner, args);

    this.core.subscribeChannel('counter', this);

    // this.core.client.type(
    //   'INC',
    //   (action: { type: 'INC'; value: number }, _meta: unknown) => {
    //     debugger;
    //     this.counter = action.value;
    //   }
    // );
  }

  increase = () =>
    this.core.client.sync({ type: 'INC', value: this.counter + 1 });
  increaseLocal = () =>
    this.core.client.log.add(
      { type: 'INC', value: this.counter + 1 },
      { tab: this.core.client.clientId }
    );
}

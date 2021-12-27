import Component, { hbs, tracked } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';
import { service } from '@glimmerx/service';
import { sync } from './decorators/sync';
import Core from './services/core';
import './counter.css';

import Test from './Test';

export default class Counter extends Component {
  @service('core') core!: Core;

  @sync('INC', { defaultValue: 0 }) counter!: number;
  // @tracked counter = 0;

  static template = hbs`
    <div class="counter">
        <button type='button' {{on 'click' this.increase}}>Increase</button>
        <button type='button' {{on 'click' this.increaseLocal}}>Increase Local</button>

        <hr/>
        {{this.counter}}
    </div>
  `;

  constructor(owner: object, args: {}) {
    super(owner, args);

    this.core.subscribeChannel('counter', this);

    // this.core.client.type(
    //   'INC',
    //   (action: { type: 'INC'; value: number }, _meta: unknown) => {
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

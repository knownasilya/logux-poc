import { tracked } from '@glimmer/tracking';
import Core from '../services/core';

interface Options {
  defaultValue?: unknown;
  key?: string;
}
type Context = { core: Core } & Record<string, unknown>;
type Action = { type: string } & Record<string, unknown>;

class Store {
  @tracked value: any = undefined;
}

export function sync(action: string, { defaultValue, key }: Options = {}): any {
  return function (_target: Context, name: string) {
    const internal = new Store();

    return {
      set(this: Context, value: unknown) {
        internal.value = value;
        // internal.value;
      },
      get(this: { core: Core } & Record<string, unknown>) {
        if (internal.value === undefined) {
          internal.value = defaultValue;

          this.core.client.type(action, (action: Action, _meta: unknown) => {
            debugger;
            this[name] = action[key ? key : 'value'];
          });
        }
        debugger;
        return internal.value;
      },
    };
  };
}

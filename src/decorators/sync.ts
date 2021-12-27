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
  return function (target: Context, name: string) {
    const storageKey = `_${name}`;
    const internal = new Store();

    return {
      set(this: Context, value: unknown) {
        internal.value = value;
      },
      get(this: { core: Core } & Record<string, unknown>) {
        if (internal.value === undefined) {
          internal.value = defaultValue;

          this.core.client.type(action, (action: Action, _meta: unknown) => {
            this[name] = action[key ? key : 'value'];
          });
        }

        return internal.value;
      },
    };
  };
}

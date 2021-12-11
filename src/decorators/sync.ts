import {
  createStorage,
  getValue,
  setValue,
  TrackedStorage,
} from '../_private/storage';

import Core from '../services/core';

interface Options {
  defaultValue?: unknown;
  key?: string;
}
type Context = { core: Core } & Record<string, unknown>;
type Action = { type: string } & Record<string, unknown>;

export function sync(action: string, { defaultValue, key }: Options = {}): any {
  return function (target: Context, name: string) {
    const storageKey = `#${name}`;
    return {
      set(this: Context, value: unknown) {
        setValue(this[storageKey] as TrackedStorage<unknown>, value);
      },
      get(this: { core: Core } & Record<string, unknown>) {
        if (!this[storageKey]) {
          this[storageKey] = createStorage(defaultValue);

          this.core.client.type(action, (action: Action, _meta: unknown) => {
            this[name] = action[key ? key : 'value'];
          });
        }

        return getValue(this[storageKey] as TrackedStorage<unknown>);
      },
    };
  };
}

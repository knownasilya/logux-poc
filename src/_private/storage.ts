import { tracked } from '@glimmer/tracking';

//@ts-ignore
const STORAGE!: unique symbol = Symbol('STORAGE');

export interface TrackedStorage<T> {
  [STORAGE]: T;
}

class TrackedStorageImpl<T> implements TrackedStorage<T> {
  [STORAGE]!: T;

  @tracked _value: T;
  _lastValue: T;
  _isEqual: (a: T, b: T) => boolean;

  constructor(initialValue: T, isEqual: (a: T, b: T) => boolean) {
    this._value = this._lastValue = initialValue;
    this._isEqual = isEqual;
  }
}

function tripleEq(a: unknown, b: unknown) {
  return a === b;
}

export function createStorage<T = unknown>(
  initialValue: T,
  isEqual: (a: T, b: T) => boolean = tripleEq
): TrackedStorage<T> {
  if (isEqual && typeof isEqual !== 'function') {
    throw new Error(
      'the second parameter to `createStorage` must be an equality function or undefined'
    );
  }

  return new TrackedStorageImpl(initialValue, isEqual);
}

export function getValue<T>(storage: TrackedStorage<T>): T {
  if (!(storage instanceof TrackedStorageImpl)) {
    throw new Error(
      'getValue must be passed a tracked store created with `createStorage`.'
    );
  }

  return storage._value;
}

type TrackedStorageValue<T extends TrackedStorage<unknown>> =
  T extends TrackedStorage<infer U> ? U : never;

export function setValue<T extends TrackedStorage<unknown>>(
  storage: T,
  value: TrackedStorageValue<T>
): void {
  //   assert(
  //     'setValue must be passed a tracked store created with `createStorage`.',
  //     storage instanceof TrackedStorageImpl
  //   );

  const { _isEqual: isEqual, _lastValue: lastValue } = storage;

  if (!isEqual(value, lastValue)) {
    storage._value = storage._lastValue = value;
  }
}

import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Converts an array of key-value pairs into an object.
 *
 * @param {any[]} pairs - An array of key-value pairs where each key is a `PropertyKey` and each value is of type `U`.
 * @returns {Record<string, any>} - An object where the keys are from the first element and values are from the second element.
 *
 * @example
 * const pairs = [['a', 1], ['b', 2]];
 * const result = fromPairs(pairs);
 * // result will be: { a: 1, b: 2 }
 */
export function fromPairs(pairs: any[]): Record<string, any>;
/**
 * Converts an array of key-value pairs into an object.
 *
 * @template T - The type of the keys in the resulting object. It must extend `PropertyKey`.
 * @template U - The type of the values in the resulting object.
 *
 * @param {Array<[T, U]>} pairs - An array of key-value pairs where each key is a `PropertyKey` and each value is of type `U`.
 * @returns {{ [key in T]: U }} - An object where the keys are of type `T` and the values are of type `U`.
 *
 * @example
 * const pairs = [['a', 1], ['b', 2]];
 * const result = fromPairs(pairs);
 * // result will be: { a: 1, b: 2 }
 */
export function fromPairs<T extends PropertyKey, U>(pairs: Array<[T, U]> | Map<T, U>): { [key in T]: U };
export function fromPairs<T extends PropertyKey, U>(data: Array<[T, U]> | Map<T, U>): { [key in T]: U } {
  if (!isArrayLike(data) && !(data instanceof Map)) {
    return {} as { [key in T]: U };
  }

  const result = {} as { [key in T]: U };

  for (const [key, value] of data) {
    result[key as T] = value;
  }

  return result;
}
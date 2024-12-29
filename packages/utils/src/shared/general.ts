/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export const NOOP = (): void => {}

export const extend = Object.assign

export const isArray = Array.isArray

export const objectToString = Object.prototype.toString
export const toTypeString = (val: unknown): string => objectToString.call(val)

export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]'

export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]'

export const isDate = (val: unknown): val is Date =>
  toTypeString(val) === '[object Date]'

export const isRegExp = (val: unknown): val is RegExp =>
  toTypeString(val) === '[object RegExp]'

/* eslint-disable-next-line @typescript-eslint/no-unsafe-function-type */
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

/**
 * "123-foo" will be parsed to 123
 * This is used for the .number modifier in v-model
 */
export const looseToNumber = (val: any): any => {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? val : n
}

/**
 * Only concerns number-like strings
 * "123-foo" will be returned as-is
 */
export const toNumber = (val: any): any => {
  const n = isString(val) ? Number(val) : Number.NaN
  return Number.isNaN(n) ? val : n
}

// compare whether a value has changed, accounting for NaN
export const hasChange = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue)

import type { Component } from 'vue'

export const isComponent = (value: unknown): value is Component =>
  !isString(value) && (isObject(value) || isFunction(value))

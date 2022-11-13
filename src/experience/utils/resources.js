/**
 * Centralized asset loading
 * - init all loader needed
 * - loop array of assets & load em
 * - trigger evt when assets load => extends evt emitter
 * asset[] => { name, type (loader), path }[]
 */

import EventEmitter from '../utils/event-emitter'

export default class Resources extends EventEmitter {
  constructor() {
    super()
  }
}

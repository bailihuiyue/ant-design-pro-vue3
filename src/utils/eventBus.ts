import mitt, { Emitter, EventType } from 'mitt'

export interface Mitter extends Emitter<Record<EventType, unknown>> {
  clearKey(name: string): void
  once(name: string, data: any): void
}

// TODO:解决ts报错问题
const emitter: Mitter  = mitt()

emitter.clearKey = (name) => {
  emitter.all.delete(name)
}

emitter.once = (name, data) => {
  emitter.clearKey(name)
  emitter.on(name, data)
}

export default emitter

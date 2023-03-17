import mitt, { Emitter, EventType } from 'mitt'

export interface Mitter extends Emitter<Record<EventType, unknown>> {
  clearKey(name: string): void
  once(name: string, data: any): void
}

// 可以把父类断言为子类
const emitter: Mitter = mitt() as Mitter

emitter.clearKey = (name) => {
  emitter.all.delete(name)
}

// 理论上不需要on事件了,因为热更新或者页面切换回来时,会导致一个事件on多次,多次监听会产生以外的bug,因此封装once方法,
// once在监听事件时,清空掉之前的监听,因此同一个key永远只会监听一次,即解决了bug,但是使用该方法后,想要一次发射事件,多次监听则不会生效了
// 只有最后一次监听才会生效,因为之前的监听都被clear了,因此可以对于同一方法,多次发射,取不同事件名称即可
emitter.once = (name, data) => {
  emitter.clearKey(name)
  emitter.on(name, data)
}

// 也可以使用class的方法重写mitt,让构造函数的prototype=mitt()然后再new构造函数
// const mitter=function(){
//   this.clearKey = function () { }
//   this.once = function () { }
// }
// mitter.prototype=mitt();
// mitter.prototype.constructor=mitter;

export default emitter

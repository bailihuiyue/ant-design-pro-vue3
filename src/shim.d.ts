declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component;
}

// 扩展window对象
declare interface Window {
  env: string
}

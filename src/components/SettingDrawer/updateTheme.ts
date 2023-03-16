import { ConfigProvider } from 'ant-design-vue';

export async function updateTheme(color: string) {
  ConfigProvider.config({
    theme: {
      primaryColor: color,
    },
  });
}

import type { App, Component } from "vue";
import SvgIcon from "./SvgIcon/index.vue";

interface IGlobalComponents {
  [key: string]: Component;
}
const globalComponents: IGlobalComponents = {
  SvgIcon,
};

export default {
  install(app: App) {
    Object.keys(globalComponents).forEach((key) => {
      app.component(key, globalComponents[key]);
    });
  },
};

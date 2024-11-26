import { createApp } from "vue"; 
import App from "./App.vue";
import "@/assets/styles/global.css"; 
const app = createApp(App);

app.config.warnHandler = (msg, vm, trace) => {
  console.warn(`[Vue warn]: ${msg}\nTrace: ${trace}`);
};

app.config.errorHandler = (err, vm, info) => {
  console.error(`[Vue error]: ${err}\nInfo: ${info}`);
};

app.mount("#app");

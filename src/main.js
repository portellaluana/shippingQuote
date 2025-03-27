import { createApp } from "vue";
import App from "./App.vue";
import VMask from "v-mask";
import BaseButton from "@/components/BaseButton.vue";

const app = createApp(App);

app.component("BaseButton", BaseButton);
app.use(VMask);
app.mount("#app");

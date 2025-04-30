import "./assets/main.css"

import {createPinia} from "pinia";
import { createApp } from "vue";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import App from "./App.vue";

setAssetPath(location.href);

const pinia = createPinia()

createApp(App).use(pinia).mount("#app");

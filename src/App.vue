<script setup>
import { onMounted, ref} from "vue";
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-table";
import "@esri/calcite-components/dist/components/calcite-table-row";
import "@esri/calcite-components/dist/components/calcite-table-cell";

import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import IdentityManager from "@arcgis/core/identity/IdentityManager";

import { formatDateTimeUnix } from "@/composables/date.js"

import LandDevelopmentList from "./components/LandDevelopmentList.vue";
import EarthDisturbanceList from "./components/EarthDisturbanceList.vue";
import CapitalProjectsList from "./components/CapitalProjectsList.vue";

import { useDataStore } from "@/stores/data";
const { fetchCapitalProjects, fetchLandDevelopmentProjects, fetchEarthDisturbanceProjects } = useDataStore();

const successfulLogin = ref(false)
const info = new OAuthInfo({
  appId: "wqLbRsh5jse6I5wu",
  portalUrl: "https://fallstwp.maps.arcgis.com/"
});

IdentityManager.registerOAuthInfos([info]);



onMounted(async () => {

    try {
      const credential = await IdentityManager.checkSignInStatus(info.portalUrl + "/sharing");

      if (credential) {
        successfulLogin.value = true
      }

      await Promise.all([
        fetchCapitalProjects(credential.token),
        fetchLandDevelopmentProjects(credential.token),
        fetchEarthDisturbanceProjects(credential.token)
      ]);
  
    } catch (error) {
      await IdentityManager.getCredential(info.portalUrl + "/sharing")
    }
  })


function generatePDF () {
  window.print()
}

</script>

<template>
  <calcite-shell v-if="successfulLogin">
    <calcite-navigation slot="header">
      <calcite-navigation-logo slot="logo" icon="file-report-generic" heading="Engineer's Report" description="Township of Falls | Bucks County, PA"></calcite-navigation-logo>
      <div slot="user">
        <calcite-button class="hideOnPrint" @click="generatePDF" icon-start="download">Generate Report</calcite-button>
        <calcite-chip class="showOnPrint">As of {{ formatDateTimeUnix(Date.now()) }}</calcite-chip>
      </div>
      <calcite-navigation class="hideOnPrint" slot="navigation-secondary">
        <p slot="content-center"><i>As of {{ formatDateTimeUnix(Date.now()) }}</i></p>
      </calcite-navigation>
    </calcite-navigation>
    <div id="reportWrapper">
      <h2>Land Development Projects</h2>
      <LandDevelopmentList></LandDevelopmentList>
      <hr>
      <h2>Earth Disturbance Projects</h2>
      <EarthDisturbanceList></EarthDisturbanceList>
      <hr>
      <h2>Capital Projects</h2>
      <CapitalProjectsList></CapitalProjectsList>
    </div>
  </calcite-shell>

</template>

<style>

.showOnPrint {
  display: none;
}


@media print {
  .hideOnPrint {
    display: none;
  }
  .showOnPrint {
  display:contents;
}
}

.projectTitle {
  font-size: 1rem;

  & span {
    font-weight: 500;
  }

}

.projectNarrative {
  text-decoration: none;

  & span {
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 500;
    
  }
}


li {
  margin-bottom: 2rem;
}

ol li::marker {
  font-size: 1rem;
  font-weight: 500;
}

calcite-table {
  width: 50%;
}

calcite-table {
  --calcite-color-border-3: white;
}

calcite-shell {
  height: fit-content;
}

#reportWrapper {
  padding: 1rem;
}

div[slot="user"] {
  display: flex;
  align-items: center;

  & calcite-button {
    padding-right: 1rem;
  }

}

h2 {
  margin: 0px;
}

hr {
  width: 80%;
  margin-inline: auto;
  margin-bottom: 1.25rem;
}

  calcite-shell {
    margin-inline: auto;
    max-width: 800px;
  }

</style>

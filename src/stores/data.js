import { defineStore } from "pinia";
import { ref } from "vue";

export const useDataStore = defineStore("data", () => {
    const landDevelopmentProjects = ref([]);
    const earthDisturbaceProjects = ref([]);
    const capitalProjects = ref([]);
    

  async function fetchLandDevelopmentProjects(token) {
    try {
      const query = encodeURIComponent("archive_project = 'No' AND application_type = 'Land Development'");
      const orderByFields = encodeURIComponent("CreationDate DESC")
      const returnGeometry = false
      const res = await fetch(
        `https://services9.arcgis.com/7sXuW6a1uvpvu9pU/arcgis/rest/services/survey123_c35eb48544ea4c0e8b119de8c4d4782e/FeatureServer/0/query?where=${query}&orderByFields=${orderByFields}&returnGeometry=${returnGeometry}&outFields=%2A&f=pjson&token=${token}`
      );
      const data = await res.json();
      return landDevelopmentProjects.value = await data.features.map((feature) => {
        return {
          'type': 'land-development-project',
          ...feature
        }
      });
    } catch (error) {
      return console.error("Error: ", error);
    }
  }

  async function fetchEarthDisturbanceProjects(token) {
    try {
      const query = encodeURIComponent("archive_project = 'No' AND application_type = 'Earth Disturbance'");
      const orderByFields = encodeURIComponent("CreationDate DESC")
      const returnGeometry = false
      const res = await fetch(
        `https://services9.arcgis.com/7sXuW6a1uvpvu9pU/arcgis/rest/services/survey123_c35eb48544ea4c0e8b119de8c4d4782e/FeatureServer/0/query?where=${query}&orderByFields=${orderByFields}&returnGeometry=${returnGeometry}&outFields=%2A&f=pjson&token=${token}`
      );
      const data = await res.json();
      return earthDisturbaceProjects.value = await data.features.map((feature) => {
        return {
          'type': 'earth-disturbance-project',
          ...feature
        }
      });
    } catch (error) {
      return console.error("Error: ", error);
    }
  }

  async function fetchCapitalProjects(token) {
    try {
      const query = encodeURIComponent("archive_project = 'No'");
      const orderByFields = encodeURIComponent("CreationDate DESC")
      const returnGeometry = false
      const res = await fetch(
        `https://services9.arcgis.com/7sXuW6a1uvpvu9pU/arcgis/rest/services/survey123_abe7e1936a6a4de1ba90e79ea35401cf/FeatureServer/0/query?where=${query}&orderByFields=${orderByFields}&returnGeometry=${returnGeometry}&outFields=%2A&f=pjson&token=${token}`
      );
      const data = await res.json();
      return capitalProjects.value = await data.features.map((feature) => {
        return {
          'type': 'capital-project',
          ...feature
        }
      });
    } catch (error) {
      return console.error("Error: ", error);
    }
  }



  return {
    capitalProjects,
    landDevelopmentProjects,
    earthDisturbaceProjects,
    fetchLandDevelopmentProjects,
    fetchEarthDisturbanceProjects,
    fetchCapitalProjects
  };
});
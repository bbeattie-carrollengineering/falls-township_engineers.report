import {defineStore} from "pinia";

export const useSchoolsStore = defineStore('schools', {
    state: () => ({
        schools: []
    }),
    getters: {
        getSchoolsCount(state) {
            return state.schools.length
        },
    },
    actions: {
        addSchool(school) {
            this.schools.push(school)
        },
        clearSchoolsStore() {
            this.schools = []
        },
    }
})
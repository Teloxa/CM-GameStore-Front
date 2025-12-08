import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    term: ''   // aquí guardamos lo que el usuario escribe en la barra
  }),
  actions: {
    setTerm(newTerm) {
      this.term = newTerm
    }
  }
})
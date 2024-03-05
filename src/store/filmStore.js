import { create } from 'zustand'
import { sortByKey } from './../utilities/Utilities';

export const useFilmStore = create((set, get) => ({
  baseFilms: [],
  films: [],
  order: 'name',
  filters: {
    name: '',
    year: '',
    rate: 0,
  },
  setFilms: (newFilms) => {
    set({ films: [...newFilms] })
  },
  setBaseFilms: (newFilms) => {
    set({ baseFilms: [...newFilms], films: [...newFilms] })
  },
  filterByName: (name) => {
    const base = get().baseFilms
    const filtered = get().filters.year ? base.filter(bf => bf.year == get().filters.year && parseInt(bf.rate) >= get().filters.rate && bf.name.toUpperCase().includes(name.toUpperCase())) :
    base.filter(bf => parseInt(bf.rate) >= get().filters.rate && bf.name.toUpperCase().includes(name.toUpperCase()))
    set({ films: [...sortByKey(filtered, get().order)], filters: { ...get().filters, name } })
  },
  filterByYear: (year) => {
    const base = get().baseFilms
    const filtered = year ? base.filter(bf => bf.year == year && parseInt(bf.rate) >= get().filters.rate && bf.name.toUpperCase().includes(get().filters.name.toUpperCase())) :
    base.filter(bf => parseInt(bf.rate) >= get().filters.rate && bf.name.toUpperCase().includes(get().filters.name.toUpperCase()))
    set({ films: [...sortByKey(filtered, get().order)], filters: { ...get().filters, year } })
  },
  filterByRate: (rate) => {
    const base = get().baseFilms
    const filtered = get().filters.year ? base.filter(bf => bf.year == get().filters.year && parseInt(bf.rate) >= rate && bf.name.toUpperCase().includes(get().filters.name.toUpperCase())) :
    base.filter(bf => parseInt(bf.rate) >= rate && bf.name.toUpperCase().includes(get().filters.name.toUpperCase()))
    set({ films: [...sortByKey(filtered, get().order)], filters: { ...get().filters, rate } })
  },
  orderByKey: (key) => {
    const sorted = sortByKey(get().films, key);
    set({ films: [...sorted]});
  },
  setOrder: (order) => {
    const sorted = sortByKey(get().films, order);
    set({films: [...sorted], order})
  },
  reset: () => {
    set({
      films: [...get().baseFilms], filters: {
        name: '',
        year: '',
        rate: 0,
      },
      order: 'name',
    })
  }
}))
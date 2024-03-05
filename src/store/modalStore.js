import { create } from 'zustand'

export const useModalStore = create((set) => ({
    open: false,
    description: '',
    title: '',
  openModal: () => {
    set({ open: true })
  },
  closeModal: () => {
    set({ open: false })
  },
  setValues: ({title, description}) => {
    set({ title, description })
  },
}))
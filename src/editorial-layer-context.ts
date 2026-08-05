import { createContext, useContext } from 'react'

export const EditorialLayerContext = createContext({
  showEditorial: false,
})

export function useEditorialLayer() {
  return useContext(EditorialLayerContext)
}

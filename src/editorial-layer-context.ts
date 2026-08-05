import { createContext, useContext } from 'react'

export const EditorialLayerContext = createContext({
  showEditorial: true,
})

export function useEditorialLayer() {
  return useContext(EditorialLayerContext)
}

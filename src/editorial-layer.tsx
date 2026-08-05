import type { ReactNode } from 'react'
import { EditorialLayerContext } from './editorial-layer-context.ts'

export function EditorialLayerProvider({
  showEditorial,
  children,
}: {
  showEditorial: boolean
  children: ReactNode
}) {
  return (
    <EditorialLayerContext.Provider value={{ showEditorial }}>
      {children}
    </EditorialLayerContext.Provider>
  )
}

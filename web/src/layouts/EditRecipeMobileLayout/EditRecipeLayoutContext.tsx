import { createContext, MutableRefObject, ReactNode } from 'react'

export interface EditRecipeLayoutParts {
  headerRef?: MutableRefObject<HTMLDivElement>
}

export interface EditRecipeLayoutProviderProps {
  children: ReactNode
  value: EditRecipeLayoutParts
}

export const EditRecipeLayoutContext = createContext<EditRecipeLayoutParts>({
  headerRef: null,
})

export const EditRecipeLayoutProvider = ({
  value,
  children,
}: EditRecipeLayoutProviderProps) => (
  <EditRecipeLayoutContext.Provider value={value}>
    {children}
  </EditRecipeLayoutContext.Provider>
)

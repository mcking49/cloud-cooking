import { createContext, MutableRefObject } from 'react'

export interface SideMenuLayoutParts {
  headerRef?: MutableRefObject<HTMLDivElement>
}

export interface SideMenuLayoutProviderProps {
  value: SideMenuLayoutParts
}

export const SideMenuLayoutContext = createContext<SideMenuLayoutParts>({
  headerRef: null,
})

export const SideMenuLayoutProvider: React.FC<SideMenuLayoutProviderProps> = ({
  value,
  children,
}) => (
  <SideMenuLayoutContext.Provider value={value}>
    {children}
  </SideMenuLayoutContext.Provider>
)

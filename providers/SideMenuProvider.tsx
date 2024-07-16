import React, { createContext,ReactNode, useContext, useMemo } from "react"
import useSideNavbar from "@/hooks/useSideNavbar"

interface SideMenuProviderProps {
    children: ReactNode;
}

interface SideMenuContextData {
    navActiveContainerClasses: string;
    iconActiveClasses:string;
    iconClasses:string;
    navContainerClasses:string;
    navClasses:string;
    selectedNav:string;
    knowledgeActive:boolean | undefined;
    setSelectedNav:React.Dispatch<React.SetStateAction<string>>;
    profileActive:boolean | undefined;
    dashboardActive:boolean | undefined;
    createActive:boolean | undefined;
    reviewsActive:boolean | undefined;
    requestActive:boolean | undefined;
    ticketsActive:boolean | undefined;
    usersActive:boolean | undefined;
    sessionRequestsActive:boolean | undefined;
    projectRequestsActive:boolean | undefined;
    activeProjectsActive:boolean | undefined;
}
const SideMenuContext = createContext<SideMenuContextData | null>(null)

const SideMenuProvider = ({ children }:SideMenuProviderProps) => {
  const sideMenuData = useSideNavbar()

  const value = useMemo(
    () => ({
      ...sideMenuData,
    }),
    [sideMenuData],
  )

  return <SideMenuContext.Provider value={value}>{children}</SideMenuContext.Provider>
}

export const useSideMenu = () => {  
  const context = useContext(SideMenuContext)
  if (!context) {
    throw new Error("useSideMenu must be used within a SideMenuProvider")
  }
  return context
}

export default SideMenuProvider

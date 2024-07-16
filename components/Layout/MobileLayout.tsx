import React from "react"
import { ILayout } from "./types"

const MobileLayout = ({ children }: ILayout) => (
  <div
    className="relative h-screen w-screen px-[10px] bg-white"
  >
    <div className="flex grow items-center justify-center w-full h-screen bg-white">
      <div className="w-full sm:w-[448px] md:w-[376px] lg:w-[376px] xl:w-[504px] flex flex-col gap-5">
        {children}
      </div>
    </div>
  </div>
)

export default MobileLayout

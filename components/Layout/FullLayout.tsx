import React from "react"
import Image from "next/image"
import { ILayout } from "./types"

const FullLayout = ({ children }: ILayout) => (
  <div
    className="relative flex
    h-screen w-screen
    overflow-hidden"
  >
    <div
        className="flex flex-col justify-between h-auto w-[640px] bg-[#141718]"
        >
        <div className="w-[405px] ml-[80px] mt-[80px] sm:ml-[80px] sm:mt-[80px]">
            <h2 className="text-[48px] sm:text-[48px] text-white font-inter font-[700]">
            Unlock the power of AI
            </h2>
            <p className="text-[24px] sm:text-[24px] text-[#6C7275] font-karla">
            Chat with the smartest AI - Experience the power of AI with us
            </p>
        </div>
        <Image
            src="/images/auth/auth_bg.png"
            width={600}
            height={640}
            alt="Auth Background"
        />
    </div>

    <div className="flex grow items-center justify-center h-screen bg-white">
      <div className="w-full sm:w-[448px] md:w-[376px] lg:w-[376px] xl:w-[504px] flex flex-col gap-5">
        {children}
      </div>
    </div>
  </div>
)

export default FullLayout

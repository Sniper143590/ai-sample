"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import LeftSidebar from "@/components/LeftSidebar";
import Icon from "@/components/Icon";
import Burger from "./Burger";

type LayoutProps = {
    smallSidebar?: boolean;
    hideRightSidebar?: boolean;
    backUrl?: string;
    children: React.ReactNode;
};

const ChatModuleLayout = ({
    smallSidebar,
    hideRightSidebar,
    backUrl,
    children,
}: LayoutProps) => {
    const [visibleSidebar, setVisibleSidebar] = useState<any>(
        smallSidebar || false
    );
    const [visibleRightSidebar, setVisibleRightSidebar] =
        useState<boolean>(false);

    const isDesktop = useMediaQuery({
        query: "(max-width: 1179px)",
    });

    const handleClickOverlay = () => {
        setVisibleSidebar(true);
        setVisibleRightSidebar(false);
        clearQueueScrollLocks();
        enablePageScroll();
    };

    useEffect(() => {
        setVisibleSidebar(smallSidebar || isDesktop);
    }, [isDesktop, smallSidebar]);

    return (
        <>
            <Head>
                <title>Pro Audio Files AI</title>
            </Head>
            <div
                className={`pr-6 sm:pr-1 bg-n-7 md:bg-n-1 dark:md:bg-n-6 md:overflow-hidden ${
                    visibleSidebar
                        ? "pl-24 sm:pl-16"
                        : smallSidebar
                        ? "pl-24 "
                        : "pl-80 xl:pl-24 "
                }`}
            >
                <LeftSidebar
                    value={visibleSidebar}
                    setValue={setVisibleSidebar}
                    visibleRightSidebar={visibleRightSidebar}
                    smallSidebar={smallSidebar}
                />
                <div
                    className={`flex py-6 md:py-0 h-screen h-screen-ios`}
                >
                    <div
                        className={`relative flex grow max-w-full bg-n-1 rounded-[1.25rem] md:rounded-none dark:bg-n-6`}
                    >
                        <div
                            className={`relative flex flex-col grow max-w-full`}
                        >
                            {children}
                        </div>
                    </div>
                </div>
                <div
                    className={twMerge(
                        `fixed inset-0 z-10 bg-n-7/80 invisible opacity-0 md:hidden ${
                            (!visibleSidebar && smallSidebar) ||
                            (visibleRightSidebar && "visible opacity-100")
                        }`
                    )}
                    onClick={handleClickOverlay}
                ></div>
            </div>
        </>
    );
};

export default ChatModuleLayout;

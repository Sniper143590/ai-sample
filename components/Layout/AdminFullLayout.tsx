import { useEffect, useState } from "react";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import LeftSidebar from "@/components/LeftSidebar";

type LayoutProps = {
    smallSidebar?: boolean;
    children: React.ReactNode;
};

const AdminFullLayout = ({
    smallSidebar,
    children,
}: LayoutProps) => {
    const [visibleSidebar, setVisibleSidebar] = useState<any>(
        smallSidebar || false
    );
    const isDesktop = useMediaQuery({
        query: "(max-width: 1179px)",
    });

    useEffect(() => {
        setVisibleSidebar(smallSidebar || isDesktop);
    }, [isDesktop, smallSidebar]);

    return (
        <>
            <Head>
                <title>Pro Audio Files AI</title>
            </Head>
            <div
                className={` pr-6 bg-n-7 md:bg-n-1 dark:md:bg-n-6 md:overflow-hidden ${
                    visibleSidebar
                        ? "pl-24 "
                        : smallSidebar
                        ? "pl-24 md:pl-0 "
                        : "pl-80 xl:pl-24 md:pl-0"
                }`}
            >
                <LeftSidebar
                    value={visibleSidebar}
                    setValue={setVisibleSidebar}
                    smallSidebar={smallSidebar}
                />
                <div className="flex py-6 md:py-0 min-h-screen min-h-screen-ios">
                    <div
                        className="relative flex grow max-w-full bg-n-1 rounded-[1.25rem] md:rounded-none dark:bg-n-6">
                        <div className="relative flex flex-col grow max-w-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminFullLayout;

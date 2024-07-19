import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import Navigation from "./Navigation";
import Profile from "./Profile";
import ToggleTheme from "./ToggleTheme";
import { twMerge } from "tailwind-merge";
import ChatList from "./ChatList";

type LeftSidebarProps = {
    value: boolean;
    setValue?: any;
    smallSidebar?: boolean;
    visibleRightSidebar?: boolean;
};

const LeftSidebar = ({
    value,
    setValue,
    visibleRightSidebar,
    smallSidebar,
}: LeftSidebarProps) => {
    const navigation = [
        {
            title: "Chat Modules",
            icon: "chat",
            color: "fill-accent-2",
            url: "/admin",
        },
        // {
        //     title: "Search",
        //     icon: "search",
        //     color: "fill-primary-2",
        //     onClick: () => setVisibleSearch(true),
        // },
        // {
        //     title: "Manage subscription",
        //     icon: "card",
        //     color: "fill-accent-4",
        //     url: "/pricing",
        // },
        // {
        //     title: "Updates & FAQ",
        //     icon: "barcode",
        //     color: "fill-accent-1",
        //     url: "/updates-and-faq",
        // },
        // {
        //     title: "Settings",
        //     icon: "settings",
        //     color: "fill-accent-3",
        //     onClick: () => setVisibleSettings(true),
        // },
    ];

    const handleClick = () => {
        setValue(!value);
        smallSidebar && value ? disablePageScroll() : enablePageScroll();
    };

    return (
        <>
            <div
                className={twMerge(
                    `fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-30 px-4 bg-n-7 md:transition-opacity ${
                        value
                            ? "w-24 pb-38 md:w-16 md:px-0 md:pb-30"
                            : "w-80 pb-58"
                    } ${visibleRightSidebar && "md:visible md:opacity-100"}`
                )}
            >
                <div
                    className={`absolute top-0 right-0 left-0 flex items-center h-30 pl-7 pr-6 ${
                        value ? "justify-center md:px-4" : "justify-between"
                    }`}
                >
                    {!value && <Logo />}
                    <button
                        className="group tap-highlight-color"
                        onClick={handleClick}
                    >
                        <Icon
                            className="fill-n-4 transition-colors group-hover:fill-n-3"
                            name={value ? "toggle-on" : "toggle-off"}
                        />
                    </button>
                </div>
                <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
                    <Navigation visible={value} items={navigation} />
                    <div
                        className={`my-4 h-0.25 bg-n-6 ${
                            value ? "-mx-4 md:mx-0" : "-mx-2 md:mx-0"
                        }`}
                    ></div>
                    <ChatList visible={value}/>
                </div>
                <div className="absolute left-0 bottom-0 right-0 pb-6 px-4 bg-n-7 before:absolute before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)] before:pointer-events-none md:px-3">
                    <Profile visible={value} />
                    <ToggleTheme visible={value} />
                </div>
            </div>
        </>
    );
};

export default LeftSidebar;

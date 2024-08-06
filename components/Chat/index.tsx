"use client"

import { useState, useEffect, useRef } from "react";
import ModalShareChat from "@/components/ModalShareChat";
import { useChat } from "@/providers/ChatModuleProvider";

type ChatProps = {
    title: string;
    children: React.ReactNode;
    chatContainerRef?: React.RefObject<HTMLDivElement>;
    onScroll:()=>void;
    onWheel:()=>void;
};

const Chat = ({ title, children, chatContainerRef,onWheel, onScroll }: ChatProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const {isBottom} = useChat()
    return (
        <>
            <div className="flex items-center min-h-[4.5rem] px-10 py-3 border-b border-n-3 shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.06)] 2xl:px-6 lg:-mt-18 lg:pr-20 md:pl-5 md:pr-18 dark:border-n-5 dark:shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.15)]">
                <div className="mr-auto h5 truncate md:h6">{title}</div>
            </div>
            <div className={`relative z-2 grow p-10 space-y-10 overflow-y-auto scroll-smooth scrollbar-none 2xl:p-6 md:p-5  ${isBottom?"!pb-[160px]":"!pb-[160px]"}`}  ref={chatContainerRef} onWheel={onWheel} onScroll={onScroll}>
                {children}
            </div>
            <ModalShareChat
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            />
        </>
    );
};

export default Chat;

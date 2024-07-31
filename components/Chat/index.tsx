"use client"

import { useState, useEffect, useRef } from "react";
import ModalShareChat from "@/components/ModalShareChat";

type ChatProps = {
    title: string;
    children: React.ReactNode;
};

const Chat = ({ title, children }: ChatProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    // const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // useEffect(() => {
    //     // Function to scroll to the bottom of the chat container
    //     const scrollToBottom = () => {
    //         if (chatContainerRef.current) {
    //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    //         }
    //     };

    //     // Initial scroll to bottom
    //     scrollToBottom();

    //     // Event listener for window resize
    //     const handleResize = () => {
    //         scrollToBottom();
    //     };

    //     // Add event listener for window resize
    //     window.addEventListener('resize', handleResize);

    //     // Cleanup function to remove the event listener
    //     return () => window.removeEventListener('resize', handleResize);
    // }, [children]); // Empty dependency array means this effect runs once on mount and cleanup on unmount


    return (
        <>
            <div className="flex items-center min-h-[4.5rem] px-10 py-3 border-b border-n-3 shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.06)] 2xl:px-6 lg:-mt-18 lg:pr-20 md:pl-5 md:pr-18 dark:border-n-5 dark:shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.15)]">
                <div className="mr-auto h5 truncate md:h6">{title}</div>
            </div>
            <div className="relative z-2 grow p-10 space-y-10 overflow-y-auto scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
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

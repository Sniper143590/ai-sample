import { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import AddChatList from "@/components/AddChatList";
import { useChat } from "@/providers/ChatModuleProvider";
import Image from "@/components/Image";

type ChatListProps = {
    visible?: boolean;
};

const ChatList = ({ visible }: ChatListProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    const pathname = usePathname();
    const router = useRouter()
    const { chatModules, setChatModuleFromId, selectChatModuleFromId, initChatModuleInfo, deleteChatModuleWithId } = useChat();
    const [chatModuleId, setChatModuleId] = useState("")

    const handleEditClick = (id:string) => {
        setChatModuleId(id)
        setChatModuleFromId(id)
        setVisibleModal(true)
    }

    const handleNewListClick = () => {
        setChatModuleId("")
        initChatModuleInfo()
        setVisibleModal(true)
    }

    const handleDelClick = (id:string) => {
        deleteChatModuleWithId(id)
    }
    
    const handleModuleClick = (id:string) => {
        selectChatModuleFromId(id)
        router.push(`/admin/${id}`)
    }

    return (
        <>
            <div className="mb-auto pb-6">
                <Disclosure defaultOpen={true}>
                    <Disclosure.Button
                        className={`flex items-center w-full h-12 text-left base2 text-n-4/75 transition-colors hover:text-n-3 ${
                            visible ? "justify-center px-3" : "px-5"
                        }`}
                    >
                        <Icon
                            className="fill-n-4 transition-transform ui-open:rotate-180"
                            name="arrow-down"
                        />
                        {!visible && <div className="ml-5">Chat list</div>}
                    </Disclosure.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                        >
                        <Disclosure.Panel className={`${visible && "px-2"}`}>
                            {chatModules.map((item) => (
                                <button
                                    className={twMerge(
                                        `cursor-pointer flex items-center  w-full h-12 rounded-lg text-n-3/75 base2 font-semibold transition-colors hover:text-n-1 ${
                                            visible ? "px-3" : "px-5"
                                        } ${
                                            pathname.includes(item._id) &&
                                            "text-n-1 bg-gradient-to-l from-[#323337] to-[rgba(80,62,110,0.29)]"
                                        }`
                                    )}
                                    key={item._id}
                                    onClick={()=>{handleModuleClick(item._id)}}
                                >
                                    <div className=" flex justify-center items-center w-6 h-6">
                                        <Image
                                            className="object-cover w-full h-full rounded-sm"
                                            src={item.avatar===""?"/images/chat.png":item.avatar}
                                            width={30}
                                            height={30}
                                            alt="Avatar"
                                        />
                                    </div>
                                    {!visible && (
                                        <>
                                            <div className="ml-5">
                                                {item.name}
                                            </div>
                                            <button className="ml-auto base2 z-10 font-semibold text-n-4" onClick={(event)=>{event.stopPropagation();handleEditClick(item._id)}} title="Edit">
                                                <Icon className="w-5 h-5 fill-n-4 transition-colors group-hover:fill-accent-1" name="scale" />
                                            </button>
                                            <button className="ml-2 base2 z-10 font-semibold text-n-4" onClick={(event)=>{event.stopPropagation();handleDelClick(item._id)}} title="Delete">
                                                <Icon
                                                    className="w-5 h-5 fill-n-4 transition-colors group-hover:fill-accent-1"
                                                    name="trash"
                                                />
                                            </button>
                                        </>
                                    )}
                                </button>
                            ))}
                        </Disclosure.Panel>
                    </Transition>
                </Disclosure>
                <button
                    className={`group flex items-center w-full h-12 text-left base2 text-n-3/75 transition-colors hover:text-n-3 ${
                        visible ? "justify-center px-3" : "px-5"
                    }`}
                    onClick={handleNewListClick}
                >
                    <Icon
                        className="fill-n-4 transition-colors group-hover:fill-n-3"
                        name="plus-circle"
                    />
                    {!visible && <div className="ml-5">New list</div>}
                </button>
            </div>
            <Modal
                className="md:!p-0"
                classWrap="max-w-[60rem] md:min-h-screen-ios md:rounded-none md:pb-8"
                classButtonClose="absolute top-6 right-6 w-10 h-10 rounded-full bg-n-2 md:right-5 dark:bg-n-4/25 dark:fill-n-4 dark:hover:fill-n-1"
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                > 
                <AddChatList onCancelFunc={() => setVisibleModal(false)} chatModuleId={chatModuleId}/>
            </Modal>
        </>
    );
};

export default ChatList;

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { useChat } from "@/providers/ChatModuleProvider";
import Image from "../Image";
import Link from "next/link";

type MenuProps = {
    className?: string;
};

const Menu = ({ className}: MenuProps) => {
    const router = useRouter()

    const { chatModules, selectChatModuleFromId } = useChat()

    const handleClick = (id:string) => {
        selectChatModuleFromId(id)
        router.push(`/admin/${id}`)
    }
    return ( <div className={className}>
        {chatModules.map((item, index) => (
            <Link
                className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
                href={`/admin/${item._id}`}
                onClick={()=>handleClick(item._id)}
                key={index}
            >
                <div className="relative flex justify-center items-center w-15 h-15 mr-6 rounded-xl">
                    <Image
                        className="object-cover rounded-xl w-full h-full"
                        src={item.avatar===""?"/images/chat.png":item.avatar}
                        width={50}
                        height={50}
                        alt="Avatar"
                    />
                </div>
                {item.name}
                <Icon
                    className="ml-auto fill-n-4 transition-colors group-hover:fill-n-7 dark:group-hover:fill-n-4"
                    name="arrow-next"
                />
            </Link>
        ))}
    </div>)
}

export default Menu;

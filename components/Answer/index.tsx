import Image from "@/components/Image";
import Loading from "./Loading";
import Action from "./Action";

type AnswerProps = {
    children?: React.ReactNode;
    loading?: boolean;
    isLast?:boolean;
    time?: string;
};

const Answer = ({ children, loading, time, isLast }: AnswerProps) => {

    // console.log(isLast)
    
    return (
        <div className="max-w-[50rem]">
            <div className="pt-6 px-6 pb-16 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-14 dark:bg-n-7">
                {loading ? <Loading /> : (children)}
            </div>
            <div className="-mt-8 flex items-end pl-6">
                <div
                    className={`relative shrink-0 w-16 h-16 mr-auto rounded-2xl overflow-hidden ${
                        !loading &&
                        "shadow-[0_0_0_0.25rem_#FEFEFE] dark:shadow-[0_0_0_0.25rem_#232627]"
                    }`}
                >
                    <Image
                        className="object-cover rounded-2xl"
                        src="/images/avatar-chat.png"
                        fill
                        alt="Avatar"
                    />
                </div>
                {(!loading && isLast) && (
                    
                    <div className="flex items-center w-4/5 md:2/3 sm:1/2">
                        <div className="caption1 text-n-4/50 dark:text-n-4">
                            {time}
                        </div>
                        <Action />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Answer;

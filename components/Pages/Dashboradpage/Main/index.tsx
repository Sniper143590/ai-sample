import Menu from "@/components/Menu";

type MainProps = {};

const Main = ({}: MainProps) => {
    // const [message, setMessage] = useState<string>("");

    return (
        <>
            <div className="grow px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none 2xl:py-12 md:px-4 md:pt-0 md:pb-6">
                <div className="mb-10 text-center">
                    <div className="h3 leading-[4rem] 2xl:mb-2 2xl:h4">
                        Choose a module to begin
                    </div>
                    <div className="body1 text-n-4 2xl:body1S">
                        AI assistant for audio engineers, producers and musicians
                    </div>
                </div>
                <Menu className="max-w-[30.75rem] mx-auto" />
            </div>
        </>
    );
};

export default Main;

import Link from "next/link";
import Image from "@/components/Image";

type TestProps = {
    className?: string;
    dark?: boolean;
};

const Test = ({ className }: TestProps) => (
    <Link className={`flex w-[14.88rem] h-[2.3rem] ${className}`} href="/">
        <Image
            className="w-full h-auto"
            src="/images/logo_long.png"
            width={190}
            height={40}
            alt="Brainwave"
        />
    </Link>
);

export default Test;

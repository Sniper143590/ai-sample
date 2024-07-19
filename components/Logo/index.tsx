import Link from "next/link";
import Image from "@/components/Image";

type TestProps = {
    className?: string;
    dark?: boolean;
};

const Test = ({ className }: TestProps) => (
    <Link className={`flex ${className}`} href="/">
        <Image
            className="object-contain"
            src="/images/logo_long.png"
            alt="Brainwave"
            width={220}
            height={50}
        />
    </Link>
);

export default Test;

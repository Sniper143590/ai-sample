import { default as NextImage, ImageProps } from "next/image";

const Image = ({ className, ...props }: ImageProps) => {

    return (
        <NextImage
            className={`inline-block align-top ${className}`}
            {...props}
        />
    );
};

export default Image;

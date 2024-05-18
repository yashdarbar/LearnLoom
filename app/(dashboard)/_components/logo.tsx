import Image from "next/image";

const Logo = () => {
    return (
        <div>
            <Image src="/logo.svg" alt="logo" height={60} width={80} />
        </div>
    );
};

export default Logo;

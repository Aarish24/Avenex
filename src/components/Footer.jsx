import React, {useRef, useState} from 'react'
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const links = [
    { href: "https://discord.com", icon: <FaDiscord /> },
    { href: "https://twitter.com", icon: <FaTwitter /> },
    { href: "https://youtube.com", icon: <FaYoutube /> },
    { href: "https://medium.com", icon: <FaMedium /> },
];


const Footer = () => {

    const textRef = useRef(null);
    const [transformStyle, setTransformStyle] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleMouseMove = (e) => {
        if (!textRef.current) return;
        const { top, left, width, height } = textRef.current.getBoundingClientRect();

        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const rotX = (y - 0.5) * 20;
        const rotY = (x - 0.5) * 10;

        setTransformStyle(`perspective(300px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.05,1.05,1.05)`);
    };

    const handleMouseLeave = () => {
        setTransformStyle(`
        perspective(300px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
        transition: transform 0.6s ease-in-out
    `);
    };

    const mouseClick=()=>{
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    }



    return (
        <footer className="w-screen h-[600px] bg-blue-800 py-4 text-black flex flex-col gap-4 items-center">
            <div ref={textRef} className="w-screen flex justify-center h-dvh text-8xl transition-transform duration-500 ease-out"
                 onMouseMove={handleMouseMove}
                 onMouseLeave={handleMouseLeave}
                 onClick={mouseClick}
                 style={{ transform: transformStyle }}>
                <h1 className=" cursor-pointer special-font text-center special-font text-white font-bold uppercase md:text-[300px]"><b>avenex</b></h1>
            </div>

            <p className={`text-white pb-20  text-lg transition-opacity font-semibold ${showMessage?"opacity-1":"opacity-0"}`}>
                Thanks for coming! Hope you like it. 😊
            </p>

            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row ">
                <p className="text-center text-sm md:text-left">
                    &copy; Nova 2024. All rights reserved
                </p>

                <div className="flex justify-center gap-4 md:justify-start h-[30px]">
                    {links.map((link)=>(
                        <a href={link.href}
                        key={link}
                        target="_blank" className="text-black transition-colors duration-500 ease-in-out hover:text-white">
                            {link.icon}
                        </a>
                    ))}
                </div>

                <a href="#privacy-policy" className="text-center text-sm md:text-right hover:underline">
                        Privacy Policy
                </a>
            </div>
        </footer>
    )
}
export default Footer

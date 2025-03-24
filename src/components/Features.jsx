import React, {useRef,useState,useEffect} from 'react'
import {TiLocationArrow} from "react-icons/ti";
import Button from "./Button.jsx";



const BentoTilt = ({children,className}) => {

    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef();

    const handleMouseMove = (e) => {
        if(!itemRef.current) return;

        // setTransformStyle(`rotate(${e.clientX / window.innerWidth * 10 - 5}deg)`);
        const {left,top,width,height} = itemRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const rotabx = (relativeY-0.5)*5;
        const rotaby = (relativeX-0.5)*5;

        const newStyle = `perspective(700px) rotateX(${rotabx}deg) rotateY(${rotaby}deg) scale3d(0.98,0.98,0.98)`

        setTransformStyle(newStyle);
    }

    const handleMouseLeave = () => {
        setTransformStyle('');
    }

    const handleTouchMove = (e) => {
        if (!itemRef.current) return;
        const touch = e.touches[0];
        if (!touch) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        const relativeX = (touch.clientX - left) / width;
        const relativeY = (touch.clientY - top) / height;

        const rotabx = (relativeY - 0.5) * 8; // Slightly stronger effect for touch
        const rotaby = (relativeX - 0.5) * 8;

        const newStyle = `perspective(800px) rotateX(${rotabx}deg) rotateY(${rotaby}deg) scale3d(0.97,0.97,0.97)`;

        setTransformStyle(newStyle);
    };

    const handleDeviceOrientation = (event) => {
        if (!itemRef.current) return;

        const { beta, gamma } = event;

        const rotabx = (beta / 30) * 10;
        const rotaby = (gamma / 30) * 10;

        const newStyle = `perspective(800px) rotateX(${rotabx}deg) rotateY(${rotaby}deg) scale3d(0.98,0.98,0.98)`;

        setTransformStyle(newStyle);
    };

    useEffect(() => {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
        }

        return () => {
            window.removeEventListener("deviceorientation", handleDeviceOrientation);
        };
    }, []);


    return(
        <div className={`${className}`}
        ref={itemRef}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleMouseLeave}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        style={{transform:transformStyle}}>
            {children}
        </div>
    )
}



const BentoCard = ({src,title,description,isComingSoon }) => {
    return(
        <div className="relative size-full">
            <video
            src={src}
            loop
            muted
            autoPlay
            className="absolute left-0 top-0 size-full object-cover"/>

            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs">{description}</p>
                    )}
                </div>

                {isComingSoon && (
                    <Button
                    title="coming soon"
                    leftIcon={<TiLocationArrow/>}
                    containerClass="!bg-black !text-gray-50 opacity-70 flex-center gap-1 scale-[0.7]"/>
                )}
            </div>
        </div>
    )
}

const Features = () => {
    return (
        <section id='prologue' className="bg-black pb-52">
            <div className="container  mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <p className="text-[16px] font-circular-web text-blue-50">
                        Into the Metagame Layer
                    </p>
                <p className="max-w-md font-circular-web text-[16px] text-lg text-blue-50 opacity-50">
                    Immerse yourself in the world of meta-gaming, where gamers explore new game mechanics, niche genres, and unconventional gameplay elements. Discover the unique challenges and opportunities
                </p>
                </div>


                <BentoTilt className="border-hsla relative mb-7 h-96 w-full rounded-md overflow-hidden md:h-[65vh]">
                    <BentoCard
                    src="videos/feature-1.mp4"
                    title={<>radi<b>n</b>t</>}
                    description="The game of games app transforming moments across Web2 &amp; Web3 titles into rewards"
                    isComingSoon
                    />
                </BentoTilt>

                <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
                    <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                        <BentoCard
                        src="videos/feature-2.mp4"
                        title={<>Zig<b>m</b>a</>}
                        description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
                        isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                        <BentoCard
                        src="videos/feature-3.mp4"
                        title={<>n<b>e</b>xus</>}
                        description ="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
                        isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 md:col-span-1 md:me-0 me-14">
                        <BentoCard
                        src="videos/feature-4.mp4"
                        title={<>az<b>u</b>l</>}
                        description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
                        isComingSoon/>
                    </BentoTilt >

                    <BentoTilt className="bento-tilt_2">
                        <div className="bg-violet-300 flex flex-col justify-between size-full p-5">
                            <h1 className="special-font bento-title max-w-64 text-black">M<b>o</b>re Co<b>m</b>ing <b>S</b>oon</h1>

                            <TiLocationArrow className="scale-[5] m-5 self-end"/>
                        </div>
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <video
                        src="videos/feature-5.mp4"
                        autoPlay
                        loop
                        muted
                        className="size-full object-cover object-center"/>
                    </BentoTilt>


                </div>
            </div>
        </section>
    )
}
export default Features

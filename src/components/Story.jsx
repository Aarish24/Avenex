import React, {useRef} from 'react'
import AnimatedTitle from "./AnimatedTitle.jsx";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners.jsx";
import Button from "./Button.jsx";

const Story = () => {
    const frameRef=useRef(null);

    const handleMouseLeave = () => {
        const element = frameRef.current;
        gsap.to(element,{
            duration:0.3,
            rotateX:0,
            rotateY:0,
            transformPerspective: "500",
            ease: "power1.inOut"
        })
    }

    const handleMouseMove = (e) => {
        const {clientX, clientY} = e;
        const element = frameRef.current;
        if(!element) return;

        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width/2;
        const centerY = rect.height/2;

        const rotateX= ((y - centerY) / centerY)*-10;
        const rotateY= ((x - centerX) / centerX)*10;

        gsap.to(element,{
            duration:0.3,
            rotateX:rotateX,
            rotateY:rotateY,
            transformPerspective: "500",
            ease: "power1.inOut"
        })
    }
    return (
        <section id="vault" className="min-h-dvh w-screen bg-black text-blue-50">
            <div className="flex size-full flex-col items-center py-10 pb-24 ">
                <p className="font-general text-sm uppercase md:text-[10px]">Multiversal ip World</p>
                <div className="relative size-full">
                    <AnimatedTitle
                    title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
                    containerClass="mt-5 mix-blend-difference pointer-events-none relative z-10"/>

                    <div className="story-img-container">
                        <div className="story-img-mask">
                            <div className="story-img-content">
                                <img
                                src ="/img/entrance.webp"
                                alt = "entrance"
                                ref={frameRef}
                                onMouseLeave={handleMouseLeave}
                                onMouseUp={handleMouseLeave}
                                onMouseEnter={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                                className="object-contain"/>
                            </div>
                        </div>
                        <RoundedCorners/>
                    </div>
                </div>
                <div className="flex justify-center -mt-80 w-full md:-mt-64 md:me-44 md:justify-end">
                    <div className="flex h-full w-fit items-center md:items-start flex-col">
                        <p className="mt-3 max-w-sm font-circular-web text-center text-violet-50 max-w-sm md:text-start">
                            Where realms converge, lies Zentry and the boundless pillar.
                            Discover its secrets and shape your fate amidst infinite
                            opportunities.
                        </p>

                        <Button id="realm-button"
                        title="discover prologue"
                        containerClass="mt-5"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Story

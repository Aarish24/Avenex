import React from 'react'
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/all";
import AnimatedTitle from "./AnimatedTitle.jsx";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(()=>{
        const clipAnimation = gsap.timeline({
            scrollTrigger:{
                trigger: '#clip',
                start:'center center',
                end:'+=800 center',
                scrub:0.5,
                pin:true,
                pinSpacing:true,
            },
        })
        clipAnimation.to('.mask-clip-path',{
            width:'100vw',
            height:'100vh',

        })
    })

    return (
        <div id="about" className="min-h-screen w-screen ">


            <div className="flex items-center relative mt-36 mb-8 flex-col pt-4">
                <h2 className="font-general text-sm  md:text-[10px] uppercase ">WELCOME TO ZENTRY</h2>
                <AnimatedTitle title="disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
                 containerClass="mt-5 !text-black text-center"/>

                <div className="about-subtext">
                    <p className="text-bold text-black text-[15px]">The Metagame begins—your life, now an epic MMORPG</p>
                    <p className="text-gray-600 text-[15px]">Zentry is the unified play layer driving attention and contribution through cross-world AI gamification.</p>
                </div>
            </div>


            <div className="h-dvh w-screen" id="clip">

                    <div className="mask-clip-path about-image relative">
                        <img
                            src="img/about.webp"
                            alt="Bakcground"
                            className="absolute top-0 left-0 size-full object-cover "
                        />
                    </div>

                <div className="relative about-image-stone">
                    <img
                        src="img/stones.webp"
                        alt="Floating Stones"
                        className="absolute fixed scale-[6]  z-50  top-3/4 left-0"
                    />
                </div>

            </div>
        </div>
    )
}
export default About

import React, {useEffect, useRef, useState} from 'react'
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/all";
import VideoPreview from "./VideoPreview.jsx";
gsap.registerPlugin(ScrollTrigger);



const Hero = () => {

    const words = ["Gaming", "Adventure", "Strategy", "Action", "Fun"];

    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVdRef = useRef(null);
    const bgVdRef = useRef(null);

    const handleWordChange = () => {
        const nextIndex = (currentWordIndex + 1) % words.length;
        const wordElement = document.querySelector(".flipping-word");

        gsap.to(wordElement, {
            rotateX:90,
            opacity:0,
            duration:0.6,
            onComplete: () => {
                setCurrentWordIndex(nextIndex);
                gsap.fromTo(wordElement,
                    {rotateX:-90,opacity:0},
                    {rotateX:0, opacity:1,
                        ease: 'power1.in',
                        duration:0.4}
                )
            }
        })
    };

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    const upcomingVideosIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideosIndex);
        handleWordChange();
    };


    useEffect(() => {
        if(loadedVideos === (totalVideos-1)) {
            setIsLoading(false);
        }
    },[loadedVideos]);

    useGSAP(()=>{
        if(hasClicked){

            const smallVideoRect = document.querySelector("#mini-video").getBoundingClientRect();

            gsap.set('#next-video',{
                width: smallVideoRect.width,
                height: smallVideoRect.height,
                borderColor: "#d6d6d6",
                borderStyle: "solid",
                ease: 'power1.inOut',
                visibility:'visible',
                duration:3.5,

            });

            gsap.to('#next-video', {
                transformOrigin:'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                borderWidth: 3,
                duration: 1.5,
                ease: 'power2.inOut',
                onStart: () => nextVdRef.current.play(),
                onComplete: () => {
                    gsap.to("#next-video", {
                        borderWidth: 0, // Smoothly fade out border
                        duration: 0.5,
                        ease: "power1.inOut",
                    });
                }

            })

            gsap.from('#current-video',{
                transformOrigin:'center center',
                ease: 'power1.inOut',
                scale:0,
                duration:1.5,
            })
        }

    },{dependencies:[currentIndex],revertOnUpdate:true});

    useGSAP(()=>{
        gsap.set('#video-frame',
            {
                clipPath: 'polygon(34% 0%, 72% 0%, 90% 90% ,0% 100%)',
                borderRadius: '0 0 40% 10%'
            });
        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100% ,0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger : '#video-frame',
                start : 'center center',
                end : 'bottom center',
                scrub : true,
            },
        })
    });

    useEffect(() => {
        if (bgVdRef.current) {
            bgVdRef.current.src = getVideoSrc(currentIndex);
            bgVdRef.current.load();
            bgVdRef.current.play();
        }
    }, []); // Runs **only once** on mount


    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div id="nexus" className="relative overflow-x-hidden w-screen h-dvh">
            {isLoading && (
                <div className="flex-center absolute z-[100]  overflow-hidden bg-violet-50  w-screen h-dvh">
                    <div className="three-body">
                        <div className="three-body__dot"/>
                        <div className="three-body__dot"/>
                        <div className="three-body__dot"/>
                    </div>
                </div>
            )}

            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                            <VideoPreview>
                                <div
                                    id="mini-video"
                                    onClick={handleMiniVdClick}
                                    className="origin-center scale-50 opacity-0 transition-all duration-100 ease-in hover:scale-100 hover:opacity-100"
                                >
                                    <video
                                        ref={nextVdRef}
                                        src={getVideoSrc(upcomingVideosIndex)}
                                        loop
                                        muted
                                        id="current-video"
                                        className="size-64 origin-center scale-150 object-cover object-center"
                                        onLoadedData={handleVideoLoad}
                                    />
                                </div>
                            </VideoPreview>
                    </div>

                    <video
                        ref={nextVdRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                    <video
                        ref={bgVdRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">Redefi<b>n</b>e</h1>
                        <p className="font-robert-regular text-blue-100 mb-5 max-w-64 ">Enter the MetaGame Layer
                            <br/>Unleash the Play Economy</p>
                        <Button id="watch-trailer" title="watch Trailer" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1"/>
                    </div>

                </div>

            </div>
            <h1 className="flipping-word special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                <b>{words[currentWordIndex]}</b>
            </h1>
        </div>
    )
}
export default Hero

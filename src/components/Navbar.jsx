//change logo and add some fading animations

import React, {useEffect, useRef, useState} from 'react'
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import {useWindowScroll} from "react-use";
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';

const navItems = ['Nexus','Vault','Prologue','About','Contact'];


const Navbar = () => {

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const { y: currentScrollY} = useWindowScroll();

    useEffect(()=>{
        if (!navContainerRef.current) return;

        if(currentScrollY ===0){
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        }
        else if(currentScrollY>lastScrollY){
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        }
        else if(currentScrollY<lastScrollY){
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }

        setLastScrollY(currentScrollY);
    },[currentScrollY,lastScrollY]);

    useEffect(()=>{
        gsap.to(navContainerRef.current,{
            y: isNavVisible?0:-100,
            opacity: isNavVisible?1:0,
            duration: 0.2,
        })
    },[isNavVisible])

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev)=>!prev);
        setIsIndicatorActive((prev)=>!prev);
    }

    useEffect(()=>{
        if(isAudioPlaying){
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    },[isAudioPlaying])

    return (
        <div className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 ">
            <header className="absolute top-1/2 w-full  -translate-y-1/2">
                <nav ref={navContainerRef} className="justify-between flex size-full items-center p-4">
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="Logo"
                             className={`w-16 transition-all duration-300 }`}/>

                        <Button
                        id="product-button"
                        title="Products"
                        rightIcon={<TiLocationArrow/>}
                        containerClass="flex bg-blue-50 items-center gap-1 justify-center "
                        />
                    </div>
                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((item)=>(
                                <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                                    {item}
                                </a>
                            ))}
                        </div>

                        <button onClick={toggleAudioIndicator} className="flex scale-[2] md:scale-100 ease-in-out items-center ml-10 space-x-0.5">
                            <audio src="/audio/loop.mp3"
                            loop className="hidden"
                            ref={audioElementRef}/>
                                {[1,2,3,4].map((bar)=>(
                                    <div key={bar}
                                         className={`indicator-line ${isIndicatorActive?'active':''}`}
                                    style={{animationDelay:`${bar*0.1}s`}}/>
                                ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}
export default Navbar

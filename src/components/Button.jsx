import React from 'react'

const Button = ({title,id,rightIcon,leftIcon,containerClass}) => {
    return (
        <button id={id} className={`hover-elevate group relative z-10 cursor-pointer overflow-hidden w-fit rounded-full bg-violet-50 px-7 text-black py-3 ${containerClass}`}>
            {leftIcon}
            <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
                <div>
                    {title}
                </div>
            </span>
            {rightIcon}
        </button>
    )
}
export default Button

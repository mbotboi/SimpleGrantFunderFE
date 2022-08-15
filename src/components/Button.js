import React from "react";


const Button = (props) => {
    const { onClick, text, buttonClass, inButtonClass } = props
    return (<button
        onClick={onClick}
        className={`items-center my-5 bg-[#2952e3] p-3 rounded-full 
        cursor-pointer hover:bg-[#2546bd] ${buttonClass}`}
    >
        <p className={`text-white text-base font-semibold mx-4 ${inButtonClass}`}>{text}</p>
    </button>)
}
export default Button

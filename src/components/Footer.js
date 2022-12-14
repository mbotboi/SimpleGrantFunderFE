import { useEffect, useState } from 'react'
import { Button } from '../components';

import blush from '../images/blush.png'
import feet from '../images/feet.jpeg'


const Footer = () => {
    const [toggleFeet, setToggleFeet] = useState(false)
    const setToggleFeet_ = () => (toggleFeet ? setToggleFeet(false) : setToggleFeet(true))
    return (
        <div className="gradient-bg-footer">
            <div className="mx-10">
                <Button text="Click For Feet" onClick={setToggleFeet_} buttonClass="w-full info-button-bg"></Button>
            </div>
            {
                toggleFeet && (
                    <div className="">
                        <div className={`
                hidden
                md:block
                w-full h-screen
                bg-hero bg-no-repeat bg-cover
                `}
                        >
                            <img src={blush} alt="blush" className="w-40" />

                            <p className="">~Oh no you found the feeet pics~</p>
                            <a href="https://www.deviantart.com/byzuko/art/Akame-ga-Kill-Akame-n-Mine-Soles-Fan-Art-748332116" target="_blank" rel="noreferrer">
                                <p className="text-xs text-blue-900">photo credits</p>
                            </a>
                        </div>
                        <div className="md:hidden">
                            <div className="
                            items-end justify-center flex
                            bg-hero2 bg-no-repeat bg-cover"
                            >
                                <div className="invisible pb-48">pizza</div>
                                <p className="mr-8">~Oh no you found the feeet pics~</p>
                            </div>
                            <img src={feet} alt="blush" />

                        </div>


                    </div>
                )
            }
        </div>

    )
}
export default Footer
import { Button, CV, FloatingCard } from '../components';
import { UserContext } from '../context/walletContext'
import React, { useContext, useState } from 'react'
import pfp from '../images/pfp.png'

const content = require('../content/landingPageContent.json')

const ProjectsText = ({ text }) => {
    return text.map(x => {
        if (x.includes("bold_")) {
            return <p className="font-semibold">{x.split("bold_")}</p>
        } else if (x === "break") {
            return <br />
        }
        else if (x.includes("list_")) {
            return <p className="pl-3">{x.split("list_")}</p>
        }
        else {
            return <p>{x}</p>
        }

    })
}

const Section = (props) => (
    <div className="w-11/12 md:w-1/2 md:p-10 mb-16 ">
        {props.content}
    </div>
)

const Welcome = () => {
    const { connectWallet, currentAccount } = useContext(UserContext)

    const [toggleAboutme, setToggleAboutme] = useState(false)
    const setToggleAboutme_ = () => (toggleAboutme ? setToggleAboutme(false) : setToggleAboutme(true))

    const [toggleArbDescription, setToggleArbDescription] = useState(false)
    const setToggleArbDescription_ = () => (toggleArbDescription ? setToggleArbDescription(false) : setToggleArbDescription(true))

    const [toggleTgBotDescription, setToggleTgBotDescription] = useState(false)
    const setToggleTgBotDescription_ = () => (toggleTgBotDescription ? setToggleTgBotDescription(false) : setToggleTgBotDescription(true))

    const [toggleSniperDescription, setToggleSniperDescription] = useState(false)
    const setToggleSniperDescription_ = () => (toggleSniperDescription ? setToggleSniperDescription(false) : setToggleSniperDescription(true))

    const [toggleLinks, setToggleLinks] = useState(false)
    const setToggleLinks_ = () => (toggleLinks ? setToggleLinks(false) : setToggleLinks(true))

    const togglesArray = [setToggleTgBotDescription_, setToggleSniperDescription_, setToggleArbDescription_]

    return (
        <div className="w-full h-full md:flex items-center justify-center">
            <div className="md:flex justify-center pb-4 mx-5">
                <Section content={
                    <div className="flex flex-1 justify-start flex-col md:mr-10 md:mt-72">
                        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                            Fund Cats <br /> across the world!
                        </h1>
                        <p className="mt-5 md:w9/12 w-11/12">{content.websiteSubText}</p>
                        {
                            !currentAccount && (
                                <Button text={"Connect Wallet"} onClick={connectWallet} ></Button>
                            )
                        }
                        <Button text="Project Links" buttonClass="info-button-bg" onClick={setToggleLinks_}></Button>
                        {
                            toggleLinks && (
                                <FloatingCard toggle={setToggleLinks_}
                                    cardPosition="ml-32 md:w-1/5"

                                    content={(
                                        <div>
                                            <h2 className="text-2xl font-semibold">Smart Contracts</h2>
                                            <div className="ml-3">
                                                <a href="https://goerli.etherscan.io/address/0xab1fc6b1e5fa0a8af497e6ecde33fb6b2973a381" target="_blank" rel="noreferrer">
                                                    <p className="text-lg text-blue-300">Factory</p></a>
                                                <a href="https://goerli.etherscan.io/address/0x967265c474561821e7518B13aA447834541b6091" target="_blank" rel="noreferrer">
                                                    <p className="text-lg text-blue-300">Query</p>
                                                </a>
                                                <a href="https://github.com/mbotboi/simpleGrantFunder" target="_blank" rel="noreferrer">
                                                    <p className="text-lg text-blue-300">Github Repo</p>
                                                </a>
                                            </div>
                                            <h2 className="text-2xl font-semibold">Front End</h2>
                                            <div className="ml-3">
                                                <a href="https://github.com/mbotboi/SimpleGrantFunderFE" target="_blank" rel="noreferrer">
                                                    <p className="text-lg text-blue-300">Github Repo</p>
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                ></FloatingCard>
                            )
                        }
                    </div>
                } />
                <Section content={
                    <div className="flex items-center">
                        <div className="mx-5">
                            <img src={pfp} alt="logo" className="w-40 cursor-pointer rounded-full" />
                        </div>
                        <CV title={"Mbotboi CV"}
                            aboutMeButton={<Button text="About Me" buttonClass="info-button-bg" onClick={setToggleAboutme_}></Button>}
                            buttons={
                                (
                                    ["Telegram Alert Bots", "Token Sniper / Evil Token Detector", "NFT Arb Bot",].map(
                                        (x, index) => (<Button text={x}
                                            buttonClass="info-button-bg mr-3 rounded-2xl w-28 h-32 my-0"
                                            inButtonClass="text-sm"
                                            onClick={togglesArray[index]}
                                        ></Button>)
                                    )
                                )
                            }></CV>
                    </div>
                } />
                {toggleAboutme && <FloatingCard toggle={setToggleAboutme_}
                    cardPosition="top-0 mt-32 md:mt-64 w-11/12 h-3/5 md:w-3/5 md:h-4/5"
                    title="About Me"
                    content={<ProjectsText text={content.aboutMe}></ProjectsText>}
                ></FloatingCard>
                }
                {toggleTgBotDescription && <FloatingCard toggle={setToggleTgBotDescription_}
                    cardPosition="top-0 mt-32 md:mt-64 w-11/12 h-3/5 md:w-3/5 md:h-4/5"
                    title="Telegram Alert Bots"
                    content={<ProjectsText text={content.telegramAlerts}></ProjectsText>}
                ></FloatingCard>
                }
                {toggleSniperDescription && <FloatingCard toggle={setToggleSniperDescription_}
                    cardPosition="top-0 mt-32 md:mt-64 w-11/12 h-3/5 md:w-3/5 md:h-4/5"
                    title="Token Sniper / Evil Token Detector"
                    content={<ProjectsText text={content.sniperAndEvilDetector}></ProjectsText>}
                ></FloatingCard>
                }
                {toggleArbDescription && <FloatingCard toggle={setToggleArbDescription_}
                    cardPosition="top-0 mt-32 md:mt-64 w-11/12 h-3/5 md:w-3/5 md:h-4/5"
                    title="NFT Arb Bot"
                    content={<ProjectsText text={content.nftArbBot}></ProjectsText>}
                ></FloatingCard>
                }
            </div>
        </div>
    )
}
export default Welcome


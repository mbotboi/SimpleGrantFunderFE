import React from 'react'

import hhLogo from '../images/hardhat_logo.svg'
import alchemy from '../images/alchemy.png'
import moralis from '../images/moralis.svg'
import {
    SiJavascript, SiPython, SiSolidity, SiReact, SiPandas,
    SiTwitter, SiGithub, SiTailwindcss
} from 'react-icons/si'

const SubCat = ({ text }) => { return (<p className="font-semibold text-lg">{text}</p>) }
const ContentRows = ({ contents, subTitle, type}) => {
    const sharedClass = "w-full flex p-2 items-center"
    return (<li className="mb-4">
        {type === "symbol" && (
            <div>
                <SubCat text={subTitle} />
                <ul className={`${sharedClass} grid grid-cols-3 gap-2 justify-around md:text-3xl`}>
                    {contents.map(x => (<li className="">{x}</li>))}
                </ul>
            </div>
        )}
        {type === "buttons" && (
            <div>
                <SubCat text={subTitle} />
                <ul className={`${sharedClass} grid grid-cols-2 md:grid-cols-3 gap-2 justify-around md:text-3xl`}>
                    {contents.map(x => (<li className="">{x}</li>))}
                </ul>
            </div>
        )}
        {type === "text" && (
            <div>
                <SubCat text={subTitle} />
                <div className="${sharedClass} text-3xl">
                    {contents}
                </div>
            </div>
        )}
    </li>)
}

const CV = (props) => {
    const { title, buttons, aboutMeButton } = props
    return (
        <div className="container mx-auto flex items-start w-full">
            <div className="w-full p-3 shadow-2x1 items-start rounded-2xl white-glassmorphism">
                <div className="w-full flex items-center justify-between px-3">
                    <h2 className="text-2xl fond-bold mb-2 ">{title}</h2>
                    {aboutMeButton}
                </div>
                <ul className="pl-3">
                    <ContentRows subTitle={"Programming Languages"} type="symbol" numItems={3} contents={[
                        <SiJavascript className="text-yellow-400" />,
                        <SiPython className="text-blue-400" />,
                        <SiSolidity className="text-gray-400" />
                    ]} />
                    <ContentRows subTitle={"Frameworks & Tools"} type="symbol" numItems={3} contents={[
                        <SiReact className="text-blue-300" />,
                        <SiPandas className="text-blue-400" />,
                        <SiTailwindcss className="text-blue-300" />,
                        <img src={moralis} alt="logo" className="w-32" />,
                        <img src={alchemy} alt="logo" className="w-24" />,
                        <img src={hhLogo} alt="logo" className="w-32" />
                    ]} />
                    <ContentRows subTitle={"Crypto Experience"} type="text" contents={[
                        <p className="text-base">
                            Crypto Degen ca. 2018 | DeFi Maxi??| NFT connoisseur | ???????? Money Lover
                        </p>
                    ]} />
                    <ContentRows subTitle={"Personal Projects"} type="buttons" contents={buttons} />
                    <ContentRows subTitle={"Language Proficiency"} type="text" contents={[
                        <p className="text-base">English | German | Malaysian</p>
                    ]} />
                    <ContentRows subTitle={"Work Experience"} type="text" contents={[
                        <p className="text-base">
                            Early Defillama contributor <br />
                            6 month internship at a german tech incubator<br />
                            4 month part-time working student at Siemens Energy
                        </p>
                    ]} />

                    <ContentRows subTitle={"Socials"} type="symbol" numItems={3} contents={[
                        <a href="https://twitter.com/m_botboi" target="_blank" rel="noreferrer"><SiTwitter className="text-blue-400" /></a>,
                        <a href="https://github.com/mbotboi" target="_blank" rel="noreferrer"><SiGithub /></a>,
                    ]} />
                </ul>
            </div>
        </div >)
}

export default CV

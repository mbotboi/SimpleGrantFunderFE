import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png'

import { Button } from './';
import { UserContext } from '../context/walletContext'
import { shortenAddress } from '../utils'

const NavBarItem = ({ title, classProps }) => {
    const link = title.toLowerCase().split(" ").join('-')
    return (
        <li className={`mx-4 cursor-pointer text-xl ${classProps}`} >
            <NavLink to={link}>
                {title}
            </NavLink>
        </li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const { connectWallet, currentAccount} = useContext(UserContext)

    const navBarText = ["Grants", "My Grants"]
    return (
        <nav className="w-full items-center px-8 py-3">
            <div className="flex justify-between">
                <div className="cursor-pointer">
                    <a href="/" className="flex items-center ">
                        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
                        <h1 className=" text-5xl ml-6">Cat Funder</h1>
                    </a>
                </div>
                <div>
                    <ul className="hidden md:flex list-none items-center h-full">
                        {
                            navBarText.map((item, index) => (
                                <NavBarItem key={item + index} title={item} />
                            ))
                        }
                        <li>
                            {currentAccount ?
                                <Button text={shortenAddress(currentAccount)} onClick={() => { }}></Button> :
                                <Button text={"Connect Wallet"} onClick={connectWallet}></Button>
                            }
                        </li>
                    </ul>
                </div>

                <div className="flex relative md:hidden ">
                    {
                        toggleMenu ?
                            <AiOutlineClose fontSize={28} className=" md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} /> :
                            <HiMenuAlt4 fontSize={28} className=" md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                    }

                    {
                        toggleMenu && (
                            <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2x1 list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism  animate-slide-in">
                                <li className="text-xl w-full my-2">
                                    <AiOutlineClose onClick={() => setToggleMenu(false)} />
                                </li>
                                {
                                    navBarText.map((item, index) => (
                                        <NavBarItem key={item + index} title={item} classProps="my-2 text-lg" />
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar


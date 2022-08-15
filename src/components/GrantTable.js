import { shortenAddress } from '../utils'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/walletContext'
import { Button, Loader } from '../components';
import { ethers } from 'ethers';

const ActionButton = ({ text, onClick, grantId, buttonClass }) => {
    const { setFundForm } = useContext(UserContext)
    if (text === "Claim") {
        const onClickHere = () => {
            console.log("grantId in when clicking", grantId)
            onClick(grantId)
        }
        return (<Button text={text} onClick={onClickHere} inButtonClass="text-sm"></Button>)

    } else if (text === "Fund") {
        const onClickHere = () => {
            console.log("grantId in when clicking", grantId)
            setFundForm((prevState) => ({ ...prevState, grantId: grantId }))
            onClick()
        }
        return (<Button text={text} onClick={onClickHere} inButtonClass="text-sm" buttonClass={buttonClass}></Button>)
    }
    else if (text === "Remove") {
        const onClickHere = () => {
            console.log("grantId in when clicking", grantId)
            setFundForm((prevState) => ({ ...prevState, grantId: grantId }))
            onClick()
        }
        return (<Button text={text} onClick={onClickHere} inButtonClass="text-sm" buttonClass={buttonClass}></Button>)
    }
}

function populate(x, theader, buttonProps, type) {
    const { text, onClick, } = buttonProps

    return <tr className="border-b border-b-gray-700 items-center justify-center">{
        theader.map(y => {
            let content;
            if (y == "unlock") {
                const date = new Date(x[y] * 1000);
                content = date.getDate() + "/" + (date.getMonth() + 1) +
                    "/" + date.getFullYear() + " " + date.getHours() +
                    ":" + date.getMinutes() + ":" + date.getSeconds();
            } else if (y === "recipient" || y === "tokenAddress") {
                content = shortenAddress(x[y])
            } else if (y == "balance") {
                content = x[y]
            } else {
                content = x[y]
            }
            return <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  text-gray-100">{content}</td>
        })
    }
        <ActionButton text={text} onClick={onClick} grantId={x.grantId}></ActionButton>
        {type === "active" && (
            <ActionButton text={"Remove"} onClick={onClick} grantId={x.grantId} buttonClass="ml-5"></ActionButton>
        )}

    </tr>
}

const GrantTable = (props) => {
    const { data } = useContext(UserContext)
    const theader = ["grantId", "recipient", "tokenAddress", "balance", "unlock",]
    const { walletAddress, buttonProps, type } = props
    return (
        <div className="p-10 z-10 drop-shadow-2xl white-glassmorphism rounded-xl m-4">
            <table className="p-10 min-w-full text-center sticky">
                <thead className="border-b">
                    <tr>
                        {theader.map(x => (
                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4">{x}</th>
                        ))}
                    </tr>
                </thead >
                <tbody className="">
                    {
                        !data ? (<Loader></Loader>) : (
                            data.map(x => {
                                if (walletAddress && !type) {
                                    if (x.recipient.toLowerCase() === walletAddress.toLowerCase()) return populate(x, theader, buttonProps)
                                } else if (type === 'active') {
                                    if (x.unlock > Date.now() / 1000) return populate(x, theader, buttonProps, type)
                                } else if (type === 'inactive') {
                                    if (x.unlock < Date.now() / 1000) return populate(x, theader, buttonProps)
                                }
                            })
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default GrantTable


import { shortenAddress } from '../utils'
import React, { useContext } from 'react'
import { UserContext } from '../context/walletContext'
import { Button, Loader } from '../components';

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

const GrantsMobile = (props) => {
    const { data } = useContext(UserContext)
    const keys = ["grantId", "recipient", "tokenAddress", "balance", "unlock",]
    const { walletAddress, buttonProps, type } = props
    // console.log(type)
    // console.log(buttonProps)
    const formatData = (key, grant) => {
        let content;
        if (key === "unlock") {
            const date = new Date(grant[key] * 1000);
            content = date.getDate() + "/" + (date.getMonth() + 1) +
                "/" + date.getFullYear() + " " + date.getHours() +
                ":" + date.getMinutes() + ":" + date.getSeconds();
        } else if (key === "recipient" || key === "tokenAddress") {
            content = shortenAddress(grant[key])
        } else if (key === "balance") {
            content = grant[key]
        } else {
            content = grant[key]
        }
        return content
    }

    function populateCards(row, type) {
        const { text, onClick, } = buttonProps
        return < div className="white-glassmorphism w-full h-full mb-6" >
            <div className="m-5">
                <h2> {`Grant Id: ${row.grantId}`}</h2>
                <div className="flex">
                    <div className="flex">
                        <p>{keys.slice(1, keys.length).map(key => {
                            return <p className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{key}</p>
                        })}</p>
                    </div>
                    <div className="flex">
                        <p>{
                            keys.slice(1, keys.length).map(key => {
                                const content = formatData(key, row)
                                return (
                                    <p className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{content}</p>
                                )
                            })}</p>
                    </div>
                </div>
                <div className="flex justify-around">
                    <ActionButton text={text} onClick={onClick} grantId={row.grantId}></ActionButton>
                    {console.log(type)}
                    {type === "active" && (
                        <ActionButton text={"Remove"} onClick={onClick} grantId={row.grantId} buttonClass="ml-5"></ActionButton>
                    )}
                </div>
            </div>
        </div >

    }

    return (
        <div>
            {!data ? (<Loader></Loader>) : (
                <div className="md:hidden">
                    {
                        data.map(row => {
                            if (walletAddress && !type) {
                                if (row.recipient.toLowerCase() === walletAddress.toLowerCase()) return populateCards(row)
                            } else if (type === 'active') {
                                if (row.unlock > Date.now() / 1000) return populateCards(row, type)
                            } else if (type === 'inactive') {
                                if (row.unlock < Date.now() / 1000) return populateCards(row)
                            }
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default GrantsMobile


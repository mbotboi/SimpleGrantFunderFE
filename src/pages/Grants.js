import React, { useState, useContext } from 'react'

import { Button, GrantTable, TxPopUp } from '../components';
import { UserContext } from '../context/walletContext'

const CreateGrant = (props) => {
    const { toggle } = props
    const { currentAccount, createGrantForm, createGrant, handleChangeCreateGrant } = useContext(UserContext)

    const handleSubmit = async (e) => {
        const { recipient, tokenaddress, unlock } = createGrantForm
        e.preventDefault()
        if (!recipient || !tokenaddress || !unlock) {
            return alert("please input parameters")
        } else if (!currentAccount) {
            return alert("please connect wallet")
        }
        createGrant()
    }
    return (<TxPopUp
        inputs={["Recipient", "Token Address", "Unlock"]}
        handleChange={handleChangeCreateGrant}
        handleSubmit={handleSubmit}
        toggle={toggle}
    ></TxPopUp>)
}

const FundGrant = (props) => {
    const { toggle } = props
    const { currentAccount, fundForm, handleChangeFundGrant, fundGrant } = useContext(UserContext)


    const handleSubmit = async (e) => {
        const { amount } = fundForm
        e.preventDefault()
        if (!amount) {
            return alert("please input parameters")
        } else if (!currentAccount) {
            return alert("please connect wallet")
        }
        fundGrant()
    }

    return (
        <TxPopUp
            inputs={["Amount"]}
            handleChange={handleChangeFundGrant}
            handleSubmit={handleSubmit}
            toggle={toggle}
        ></TxPopUp>
    )
}

const RemoveFund = (props) => {
    const { toggle } = props
    const { currentAccount, fundForm, handleChangeRemoveFund, removeFund } = useContext(UserContext)

    const handleSubmit = async (e) => {
        const { amount } = fundForm
        e.preventDefault()
        if (!amount) {
            return alert("please input parameters")
        } else if (!currentAccount) {
            return alert("please connect wallet")
        }
        removeFund()
    }

    return (
        <TxPopUp
            inputs={["Amount"]}
            handleChange={handleChangeRemoveFund}
            handleSubmit={handleSubmit}
            toggle={toggle}
        ></TxPopUp>
    )
}

const Grants = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const toggleCreate = () => {
        toggleMenu ? setToggleMenu(false) : setToggleMenu(true)
    }

    const [toggleFund, setToggleFund] = useState(false)
    const toggleFund_ = () => {
        toggleFund ? setToggleFund(false) : setToggleFund(true)
    }
    const [toggleRemove, setToggleRemove] = useState(false)
    const toggleRemove_ = () => {
        toggleRemove ? setToggleRemove(false) : setToggleRemove(true)
    }

    return (
        <div className="w-full justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <div className="w-4/6">
                    {
                        toggleMenu && (<CreateGrant toggle={toggleCreate}></CreateGrant>)
                    }
                    <div className="flex w-full justify-between">
                        <h1 className="flex text-4xl p-8">Active Grants</h1>
                        <Button text={"Create Grant"} onClick={toggleCreate} buttonClass="mr-8" inButtonClass="mx-3" ></Button>
                    </div>
                    {toggleFund && (<FundGrant toggle={toggleFund_}></FundGrant>)}
                    {toggleRemove && (<RemoveFund toggle={toggleRemove_}></RemoveFund>)}
                    <GrantTable type={"active"} buttonProps={{ text: "Fund", onClick: toggleFund_, }} />


                    <div className="flex w-full justify-between">
                        <h1 className="flex text-4xl p-8">Inactive Grants</h1>
                    </div>
                    <GrantTable type={"inactive"} buttonProps={{ text: "", onClick: "", }} />
                </div>
            </div>
        </div>
    )
}
export default Grants

// recipient, tokenAddress, timestamp
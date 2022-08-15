import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

export const UserContext = React.createContext()

const { ethereum } = window

const getFactoryContract = async () => {
    const { address, abi } = require('../contracts/GrantFactory.json')

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, abi, signer)
    return contract
}

const getGrantContract = (grantAddress) => {
    const abi = require('../contracts/Grants.json')
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(grantAddress, abi, signer)
    return contract
}

const getData = async () => {
    const { address, abi } = require('../contracts/GrantsQuery.json')
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const contract = new ethers.Contract(address, abi, provider)
    const allData = await contract.getAllGrants()
    const d = allData.map(x => {
        return {
            grantId: x.grantId.toNumber(),
            recipient: x.recipient,
            tokenAddress: x.tokenAddress,
            balance: Number(ethers.utils.formatEther(x.balance)).toFixed(2),
            unlock: x.timestamp.toNumber(),
            grantAddress: x.grantAddress
        }
    })
    return d
}

export const UserProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(undefined)
    const [data, setData] = useState(null)

    const [createGrantForm, setCreateGrantForm] = useState({ recipient: "", tokenaddress: "", unlock: "" })
    const [fundForm, setFundForm] = useState({ amount: "", grantId: "" })

    const walletConnected = async () => {
        try {
            if (!ethereum) return ("please install a web3 browser wallet")
            const accounts = await ethereum.request({ method: "eth_accounts" })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
                return true

            } else {
                console.log("No accounts found")
            }
        } catch (e) {
            console.error(e)
            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async () => {
        try {
            console.log("trying to connect")
            if (!ethereum) return ("please install a web3 browser wallet")
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })

            if (accounts.length) {
                setCurrentAccount(accounts[0])
                console.log("wallet connected", currentAccount)

            } else {
                console.log("No accounts found")
            }
        } catch (e) {
            console.error(e)
            throw new Error("No ethereum object")
        }
    }

    const handleChangeCreateGrant = (e) => {
        setCreateGrantForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const createGrant = async () => {
        try {
            if (!ethereum) return ("please install a web3 browser wallet")
            const { recipient, tokenaddress, unlock } = createGrantForm
            const contract = await getFactoryContract()
            console.log("sending transaction for", currentAccount)
            contract.createGrant(recipient, tokenaddress, unlock)

        } catch (e) {
            console.error(e)
            throw new Error("No ethereum object")
        }
    }

    const handleChangeFundGrant = (e) => {
        setFundForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const fundGrant = async () => {
        try {
            if (!ethereum) return ("please install a web3 browser wallet")
            const { amount, grantId } = fundForm
            const bnAmount = ethers.utils.parseEther(String(amount))

            const grantData = data.filter(x => x.grantId === grantId)[0]
            console.log("grant Address", grantData.grantAddress)

            const contract = getGrantContract(grantData.grantAddress)
            console.log("balance of contract", await contract.balance())
            const erc20 = new ethers.Contract(
                grantData.tokenAddress,
                require('../contracts/ERC20.json'),
                contract.signer
            )
            const allowance = await erc20.allowance(currentAccount, grantData.grantAddress)
            console.log("allowance", allowance)
            if (allowance.lt(bnAmount)) {
                erc20.approve(grantData.grantAddress, ethers.constants.MaxUint256)
                    .then(tx => {
                        console.log("approved")
                        tx.wait()
                            .then(contract.fundGrant(bnAmount))
                    })
            } else {
                contract.fundGrant(bnAmount)
            }
        } catch (e) {
            console.error(e)
            throw new Error("No ethereum object")
        }
    }

    const handleChangeRemoveFund = (e) => {
        setFundForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const removeFund = async () => {
        try {
            if (!ethereum) return ("please install a web3 browser wallet")
            const { amount, grantId } = fundForm
            const bnAmount = ethers.utils.parseEther(String(amount))

            const grantData = data.filter(x => x.grantId === grantId)[0]
            console.log("grant Address", grantData.grantAddress)

            const contract = getGrantContract(grantData.grantAddress)
            contract.removeFund(bnAmount)

        } catch (e) {
            console.error(e)
            throw new Error("No ethereum object")
        }
    }

    const claimGrant = async (grantId) => {
        try {
            if (!ethereum) return ("please install a web3 browser wallet")
            console.log("grantId", grantId)
            const grantData = data.filter(x => x.grantId === grantId)[0]
            console.log("grant Address", grantData.grantAddress)
            console.log('claimant acc', currentAccount)

            const contract = getGrantContract(grantData.grantAddress)
            console.log("unlocked", await contract.unlocked())
            console.log("caller is recipient", (await contract.recipient()).toLowerCase() === currentAccount.toLowerCase())
            contract.claimGrant()
        } catch (e) {
            console.error(e)
            throw new Error("No ethereum object")
        }
    }

    useEffect(() => {
        console.log('GETTING DATA')
        getData().then(data => {
            setData(data)
            console.log("got and set data")
        })
        walletConnected()
    }, [])

    return (
        <UserContext.Provider value={{
            connectWallet, currentAccount, data, setData,
            createGrantForm, createGrant, handleChangeCreateGrant,
            fundForm, fundGrant, handleChangeFundGrant, setFundForm,
            handleChangeRemoveFund, removeFund,
            claimGrant,
        }}>
            {children}
        </UserContext.Provider>
    )
}


// recipient: 0x9df27Aa6Dd8f1d1786200C1FeE2BD60538fE066d
// token: 0x332C7aC34580dfEF553B7726549cEc7015C4B39b
// ts: 1660137300
//old factory: 0xAd7cCD0888E276Ffca024D8984D7D040452dE820
//old query: 0xAd7cCD0888E276Ffca024D8984D7D040452dE820
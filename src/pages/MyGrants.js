import React, { useContext} from 'react'
import { UserContext } from '../context/walletContext'
import { GrantTable} from '../components';

const Grants = () => {
    const { currentAccount, claimGrant } = useContext(UserContext)

    const handleSubmit = (grantId) => {
        if (!currentAccount) {
            return alert("please connect wallet")
        }
        claimGrant(grantId)
    }
    return (
        <div className="w-full h-screen justify-center items-center">
            <div className="flex justify-center items-center">
                <div className="w-4/6">
                    <h1 className="flex text-4xl text-white p-8">My Grants</h1>
                    <GrantTable walletAddress={currentAccount} buttonProps={{ text: "Claim", onClick: handleSubmit }}
                    />
                </div>
            </div>
        </div>
    )
}
export default Grants
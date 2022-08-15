import { AiOutlineClose } from 'react-icons/ai'

const FloatingCard = ({toggle, content, cardPosition}) => {
    return (
        <div className={`fixed z-10 w-1/2 h-1/2 ${cardPosition}`}>
            <div className="p-3 shadow-2x1 list-none flex flex-col justify- items-start rounded-4xl blue-glassmorphism">
                <AiOutlineClose fontSize={28} className="cursor-pointer" onClick={toggle} />
                <div className="w-full px-4">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default FloatingCard;
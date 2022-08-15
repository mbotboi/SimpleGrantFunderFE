import blush from '../images/blush.png'

const Footer = () => {
    return (
        <div className={`
        w-full h-screen
        bg-hero
        `}
        >
            <img src={blush} alt="blush" className="w-40" />
            <p>~Oh no you found the feeet pics~</p>
            <a href="https://www.deviantart.com/byzuko/art/Akame-ga-Kill-Akame-n-Mine-Soles-Fan-Art-748332116" target="_blank" rel="noreferrer">
                <p className="text-xs text-blue-900">photo credits</p>
            </a>
        </div>
    )
}
export default Footer
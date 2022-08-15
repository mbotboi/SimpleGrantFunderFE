import blush from '../images/blush.png'
// import moralis from '../images/moralis.svg'
// import alchemy from '../images/alchemy.png'
// https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/45b62fa5-ff0a-458d-976a-c0bfb331a650/dcdjcr8-ee4d6c61-bd91-447f-9d6d-21a81eba1370.png/v1/fill/w_1024,h_707,q_80,strp/akame_ga_kill____akame__n__mine_soles_fan_art__by_byzuko_dcdjcr8-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzA3IiwicGF0aCI6IlwvZlwvNDViNjJmYTUtZmYwYS00NThkLTk3NmEtYzBiZmIzMzFhNjUwXC9kY2RqY3I4LWVlNGQ2YzYxLWJkOTEtNDQ3Zi05ZDZkLTIxYTgxZWJhMTM3MC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.T3KjDD8ThtjS_2nuRN3-Nei-1NChDQv2yXC1nJ2Lq9Q

const Footer = () => {

    return (
        // <div>Footer</div>
        <div className={`
        w-full h-screen
        bg-hero
        `}
        >
            <img src={blush} alt="blush" className="w-40" />
            <p>~Oh no you found the feeet pics~</p>
            <a href="https://www.deviantart.com/byzuko/art/Akame-ga-Kill-Akame-n-Mine-Soles-Fan-Art-748332116" target="_blank">
                <p className="text-xs text-blue-900">photo credits</p>
            </a>
        </div>
    )
}
export default Footer
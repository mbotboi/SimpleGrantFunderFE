import { Button, FloatingCard } from '.';

const TxPopUp = (props) => {
    const { inputs, handleChange, handleSubmit, toggle } = props
    return (
        <FloatingCard toggle={toggle}
            content={
                <div >
                    <ul className="w-full mt-5">
                        {
                            inputs.map(x => {
                                const name = x.toLowerCase().split(" ").join("")
                                return (<li className="mb-5">
                                    <h2>{x}</h2>
                                    <input placeholder={x}
                                        name={name}
                                        type="text"
                                        onChange={handleChange}
                                        className="my-2 w-full rounded-l p-2 outline-none bg-transparent border-none white-glassmorphism"
                                    ></input>
                                </li>)
                            })
                        }
                    </ul>
                    <Button text="Execeute" onClick={handleSubmit}></Button>
                </div>
            }
        />
    )
}
export default TxPopUp
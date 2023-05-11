

export const Button = ({label, onClick, type, className}) => {
    return (
        <button className={`btn text-white px-4 py-2 my-1 ${className}`} type={type}
                style={{backgroundColor: '#452c63', width:'200px'}} onClick={onClick}>
            {label}
        </button>
    )
}

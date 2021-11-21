function Cell({x, y, value, revealed, isBomb, reveal}) {

    const handleClick = () => {
        reveal({x, y, value, revealed, isBomb});
    }

    return (
        <button type="button" className="Cell" onClick={handleClick} style={{width: '50px', height: '50px'}}>
            <p style={{fontWeight: 'bold', color: 'blue'}}>
            {
                revealed ? value !== undefined ? value : '*' : null
            }
            </p>
            {/* <p style={{fontSize: '0.8rem', marginTop: '0.1rem', color: 'darkgray'}}>({x}{y})</p> */}
        </button>
    );
}

export default Cell;
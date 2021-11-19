function Cell({x, y, value, revealed, isBomb, reveal}) {

    const handleClick = () => {
        reveal({x, y, value, revealed, isBomb});
    }

    return (
        <button type="button" className="Cell" onClick={handleClick} style={{width: '50px', height: '50px'}}>
            {
                revealed ? value !== null ? value : '*' : null
            }
        </button>
    );
}

export default Cell;
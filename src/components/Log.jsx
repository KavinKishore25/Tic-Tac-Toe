export default function Log({ turns }) {
    return (
        <ol id="log">
            {
                turns.map(turn => <li key={`${turn.square.row}${turn.square.cell}`}>{turn.player} selected ({turn.square.row},{turn.square.cell})</li>)
            }
        </ol>
    )
}
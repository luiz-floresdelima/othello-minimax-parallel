export type CellProps = {
    children: React.ReactNode
    handleCellClick: (board:number[][],idx:number[]) => void
    idx: number[]
    highlight: boolean
    board: number[][]
}
import { CellProps } from "../../types/Cell"
import styles from "./Cell.module.scss"

export function Cell({ children, handleCellClick, idx, highlight,board }: CellProps) {
    return (
        <div className={`${styles.cell} ${highlight ? styles.highlight : ""}`} onClick={() => handleCellClick(board,idx)}>{children}</div>
    )
}
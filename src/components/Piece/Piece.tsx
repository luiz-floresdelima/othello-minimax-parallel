import { PieceProps } from "../../types/Piece"
import styles from "./Piece.module.scss"

export function Piece({color}:PieceProps){

    return (
        <div className={`${styles.piece} ${styles[`piece-${color}`]}`}></div>
    )
}
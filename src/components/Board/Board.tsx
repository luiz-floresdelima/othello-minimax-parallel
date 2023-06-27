import { BoardProps } from "../../types/Board"
import styles from "./Board.module.scss"

export function Board({children}:BoardProps){
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
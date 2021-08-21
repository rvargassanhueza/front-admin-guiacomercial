import React from 'react'
// Css Global
import { useStyles } from "../css/UsuariosStyles";

const ContainerModal = ({children}) => {
    const styles = useStyles();

    return (
        <div className={styles.modal}>
            {children}
        </div>
    )
}

export default ContainerModal

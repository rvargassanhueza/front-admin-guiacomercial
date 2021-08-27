import React from 'react'
import { Button } from '@material-ui/core';
import { useStyles } from "../css/ComercioAdheridoStyles";

const EliminarComercio = ({comercioSeleccionado, deleteComercioAdherido, abrirCerrarModalEliminar}) => {

    const styles = useStyles();

    return (
        <div className={styles.modal}>
            <p>Estás seguro que deseas eliminar al Comercio <b>{comercioSeleccionado && comercioSeleccionado.nombre_comercio_adherido}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={ deleteComercioAdherido } >Sí</Button>
                <Button onClick={ abrirCerrarModalEliminar }>No</Button>
            </div>
        </div>
    )
}

export default EliminarComercio

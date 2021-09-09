import React from 'react';
import { Link } from "react-router-dom"; 
import { TableRow, TableCell, Button } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { useStyles } from "../css/ComercioAdheridoStyles";

const Comercios = ({ usuario, seleccionarUsuario }) => {

    const styles = useStyles();

    const { id_comercio_adherido, nombre_comercio_adherido, descripcion_comercio_adherido,
        direccion_comercio_adherido, numero_direccion_comercio_adherido, nombre_localidad } = usuario;

    return (
        <TableRow key={id_comercio_adherido}>
            <TableCell>{nombre_comercio_adherido}</TableCell>
            <TableCell>{descripcion_comercio_adherido}</TableCell>
            <TableCell>{direccion_comercio_adherido}</TableCell>
            <TableCell>{numero_direccion_comercio_adherido}</TableCell>
            <TableCell>{nombre_localidad}</TableCell>
            <TableCell>
                <Button className={styles.root} onClick={() => seleccionarUsuario(usuario, 'Ver Mas')}>Ver Más</Button>
            </TableCell>
            <TableCell>
                <Link to={`/comercios/editar/${id_comercio_adherido}`} className={styles.iconos}>
                    Editar
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Delete className={styles.iconos} onClick={() => seleccionarUsuario(usuario, 'Eliminar')} />
            </TableCell>
        </TableRow>
    )
}

export default Comercios

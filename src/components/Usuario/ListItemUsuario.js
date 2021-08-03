import React, { useContext } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { useStyles } from "../css/UsuariosStyles";

const ListItemUsuario = ({ usuario, abrirCerrarModalEliminar, seleccionarUsuario }) => {

  const { id_usuario, nombre_usuario, descripcion_usuario } = usuario;

  const styles = useStyles();

  return (
    <TableRow>
      <TableCell>{id_usuario ? id_usuario : '-'} </TableCell>
      <TableCell>{nombre_usuario}</TableCell>
      <TableCell>{descripcion_usuario}</TableCell>
      <TableCell>
        <Edit className={styles.iconos} onClick={() => console.log("Editar")} />
        &nbsp;&nbsp;&nbsp;
        <Delete className={styles.iconos} onClick={() => seleccionarUsuario(id_usuario, abrirCerrarModalEliminar)} />
      </TableCell>
    </TableRow>
  );
};

export default ListItemUsuario;

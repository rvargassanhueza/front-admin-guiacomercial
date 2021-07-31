import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { useStyles } from "../css/UsuariosStyles";

const ListItemUsuario = ({ usuario, seleccionarUsuario }) => {
  const styles = useStyles();

  return (
    <TableRow>
      <TableCell>{usuario.id_usuario}</TableCell>
      <TableCell>{usuario.nombre_usuario}</TableCell>
      <TableCell>{usuario.descripcion_usuario}</TableCell>
      <TableCell>
        <Edit className={styles.iconos} onClick={() => console.log("Editar")} />
        &nbsp;&nbsp;&nbsp;
        <Delete
          className={styles.iconos}
          onClick={() => seleccionarUsuario(usuario, "Eliminar")}
        />
      </TableCell>
    </TableRow>
  );
};

export default ListItemUsuario;

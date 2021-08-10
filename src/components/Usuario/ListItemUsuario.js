import React from "react";
import PropTypes from 'prop-types';
import { TableCell, TableRow } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { useStyles } from "../css/UsuariosStyles";

const ListItemUsuario = ({ usuario, abrirCerrarModalEliminar, seleccionarUsuario }) => {

  const {id_usuario, nombre_tipo_usuario, nombre_usuario, descripcion_usuario } = usuario;

  const styles = useStyles();

  return (
    <TableRow>
      <TableCell>{nombre_tipo_usuario ? nombre_tipo_usuario : '-'}</TableCell>
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

ListItemUsuario.defaultProps = {
  usuario: {},
  abrirCerrarModalEliminar: () => {},
  seleccionarUsuario: () => {},
};

ListItemUsuario.propTypes = {
  usuario: PropTypes.object.isRequired,
  abrirCerrarModalEliminar: PropTypes.func.isRequired,
  seleccionarUsuario: PropTypes.func.isRequired
};

export default ListItemUsuario;

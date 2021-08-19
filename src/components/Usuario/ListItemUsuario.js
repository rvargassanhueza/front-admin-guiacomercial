import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { TableCell, TableRow } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useStyles } from "../css/UsuariosStyles";

const ListItemUsuario = ({ usuario, abrirCerrarModalEliminar, seleccionarUsuario }) => {

  const { id_usuario, nombre_tipo_usuario, nombre_usuario, descripcion_usuario } = usuario;
  const styles = useStyles();

  return (
    <TableRow>
      <TableCell>{nombre_tipo_usuario ? nombre_tipo_usuario : '-'}</TableCell>
      <TableCell>{nombre_usuario}</TableCell>
      <TableCell>{descripcion_usuario}</TableCell>
      <TableCell>
        <Link to={`/usuario/editar/${id_usuario}`} className={styles.iconos}>
          Editar
        </Link>
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

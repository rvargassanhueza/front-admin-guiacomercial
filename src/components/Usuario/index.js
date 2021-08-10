import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "@material-ui/core";

//Context
import UserContext from "../../context/usuarios/UserContext";

//Components
import FormInsertUsuario from "./FormInsertUsuario";
import TableUsuario from "./TableUsuario";

import http from "../common/http-common";

// Css Global
import { useStyles } from "../css/UsuariosStyles";

const urlTipoUsuario = "/tipo-usuario/";

const Usuarios = () => {

  const styles = useStyles();
  const { dataUsuarios, isLoadingData, usuarioSeleccionado, borrarUsuario } = useContext(UserContext);

  const [items, setItems] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  useEffect(() => {
    getTipoUsuario();
  }, []);

  async function getTipoUsuario() {
    const datos_ = await http.get(urlTipoUsuario);
    const { data } = datos_.data;

    setItems(data);
  }

  const abrirCerrarModalEliminar = () => setModalEliminar(!modalEliminar)

  const abrirCerrarModalInsertar = () => setModalInsertar(!modalInsertar)

  const bodyInsertar = ( 
    <FormInsertUsuario  
      items={items} 
      abrirCerrarModalInsertar={abrirCerrarModalInsertar}
    />
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar al usuario{" "}
        <b>{usuarioSeleccionado && usuarioSeleccionado.nombre_usuario}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarUsuario(usuarioSeleccionado, abrirCerrarModalEliminar)}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="usuarios">
      <br />
      <Button
        className={styles.root}
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar
      </Button>
      <br />
      <br />

      <TableUsuario dataUsuarios={dataUsuarios} isLoadingData={isLoadingData} abrirCerrarModalEliminar={abrirCerrarModalEliminar} />

      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      {/* <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal> */}

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
};

export default Usuarios;

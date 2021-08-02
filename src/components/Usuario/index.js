import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, TextField, Select, MenuItem } from "@material-ui/core";

//Context
import UserContext from "../../context/usuarios/UserContext";

//Components
import FormInsertUsuario from "./FormInsertUsuario";
import TableUsuario from "./TableUsuario";

import http from "../common/http-common";

// Css Global
import { useStyles } from "../css/UsuariosStyles";

const baseUrl = "/usuario/";
const urlTipoUsuario = "/tipo-usuario/";

const Usuarios = () => {

  const styles = useStyles();
  const { data, setData, isLoadingData } = useContext(UserContext);

  const [items, setItems] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  useEffect(() => {
    getTipoUsuario();
  }, []);


  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id_usuario: "",
    id_tipo_usuario: "",
    nombre_usuario: "",
    descripcion_usuario: "",
    pass_usuario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const seleccionarUsuario = (usuario, caso) => {
    setUsuarioSeleccionado(usuario);
    // (caso==='Editar')?null:abrirCerrarModalEliminar()
    abrirCerrarModalEliminar();
  };

  async function getTipoUsuario() {
    const datos_ = await http.get(urlTipoUsuario);
    const { data } = datos_.data;

    setItems(data);
  }

  const deleteUserId = async () => {
    try {
      await http
        .delete(baseUrl + usuarioSeleccionado.id_usuario)
        .then((response) => {
          setData(
            data.filter(
              (usuario) => usuario.id_usuario !== usuarioSeleccionado.id_usuario
            )
          );
          // console.log("response delete: ",response)
          abrirCerrarModalEliminar();
          //getUser();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

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
        <Button color="secondary" onClick={deleteUserId}>
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

      <TableUsuario
        data={data}
        isLoadingData={isLoadingData}
        seleccionarUsuario={seleccionarUsuario}
      />

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

import React, {useEffect, useState} from 'react';

import './../../src/App.css';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import http from "../http-common";

const baseUrl='/usuario/';

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    },
    root: {
      background: 'linear-gradient(45deg, #060b26 30%, #060b26 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    }
  }));

  function FormularioUsuario(){

    const styles= useStyles();

    const [data, setData]=useState([]);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [modalInsertar, setModalInsertar]=useState(false);

    const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
      // id_usuario: '',
      id_tipo_usuario: '',
      nombre_usuario: '',
      descripcion_usuario:'',
      pass_usuario:''
    })

    const handleChange=e=>{
      const {name, value}=e.target;
      setUsuarioSeleccionado(prevState=>({
        ...prevState,
        [name]: value
      }))
      console.log(usuarioSeleccionado);
    }

    const seleccionarUsuario=(usuario, caso)=>{
      setUsuarioSeleccionado(usuario);
      // (caso==='Editar')?null:abrirCerrarModalEliminar()
      abrirCerrarModalEliminar();
    }

    const getUser = async()=>{
      await http.get(baseUrl)
      .then(response=>{
        const {data:{data}} = response;
        setData(data);
      })
    }

    const insertUser = async()=>{
      await http.post(baseUrl, usuarioSeleccionado)
      .then(response=>{
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
    }

    const deleteUserId = async()=>{
      await http.delete(baseUrl + usuarioSeleccionado.id_usuario)
      .then(response =>{
        setData(data.filter(usuario=>usuario.id_usuario!==usuarioSeleccionado.id_usuario));
        console.log("response delete: ",response)
        abrirCerrarModalEliminar();
        getUser();
      })
    }

    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }

    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }

    const bodyInsertar=(
      <div className={styles.modal}>
        <h3>Agregar Nuevo Usuario</h3>
        <TextField name="nombre_usuario" className={styles.inputMaterial} label="Nombre Usuario" onChange={handleChange}/>
        <br />
        <TextField name="id_tipo_usuario" className={styles.inputMaterial} label="Tipo Usuario" onChange={handleChange}/>
        <br />
        <TextField name="descripcion_usuario" className={styles.inputMaterial} label="Descripción Usuario" onChange={handleChange}/>
        <br />
        <TextField name="pass_usuario" className={styles.inputMaterial} label="Contraseña Usuario" onChange={handleChange} type="password"/>
        <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>insertUser()}>Insertar</Button>
          <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    )

    const bodyEliminar=(
      <div className={styles.modal}>
        <p>Estás seguro que deseas eliminar al usuario <b>{usuarioSeleccionado && usuarioSeleccionado.nombre_usuario}</b> ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>deleteUserId()} >Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        </div>
      </div>
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
      await getUser();
        },[])
return(

  <div className="usuarios">
  <br />
<Button  className={styles.root} onClick={()=>abrirCerrarModalInsertar() }>Insertar</Button>
  <br /><br />
 <TableContainer>
   <Table>
     <TableHead>
       <TableRow>
         <TableCell>Id Usuario</TableCell>
         <TableCell>Nombre Usuario</TableCell>
         <TableCell>Descripción Usuario</TableCell>

         <TableCell>Acciones</TableCell>
       </TableRow>
     </TableHead>

     <TableBody>
       {data.map(usuario=>(
         <TableRow key={usuario.id_usuario}>
           <TableCell>{usuario.id_usuario}</TableCell>
           <TableCell>{usuario.nombre_usuario}</TableCell>
           <TableCell>{usuario.descripcion_usuario}</TableCell>

           {/* <TableCell>{consola.lanzamiento}</TableCell>
           <TableCell>{consola.unidades_vendidas}</TableCell> */}
           <TableCell>
             <Edit className={styles.iconos} onClick={console.log("Editar")}/>
             &nbsp;&nbsp;&nbsp;
             <Delete  className={styles.iconos} onClick={()=>seleccionarUsuario(usuario, 'Eliminar')}/>
             </TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer>
 
  <Modal
 open={modalInsertar}
 onClose={abrirCerrarModalInsertar}>
    {bodyInsertar}
 </Modal>
{/*
 <Modal
 open={modalEditar}
 onClose={abrirCerrarModalEditar}>
    {bodyEditar}
 </Modal>*/}

 <Modal
 open={modalEliminar}
 onClose={abrirCerrarModalEliminar}>
    {bodyEliminar}
 </Modal> 
</div>
    );
  }

  export default FormularioUsuario;
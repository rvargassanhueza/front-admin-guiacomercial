import React, { useContext, useEffect, useState } from 'react';
    
import './../../../src/App.css';

import { Modal,Button, TextField, Select, MenuItem } from '@material-ui/core';

//Context
import { UserContext } from '../../context/UserContext';

import http from "../common/http-common";
import { useForm, Controller } from 'react-hook-form';
import TableUsuario from './TableUsuario';

import { useStyles } from '../css/UsuariosStyles';

    const baseUrl='/usuario/';
    const urlTipoUsuario='/tipo-usuario/';
    
      const Usuarios = () => {
    
        const styles = useStyles();
        
        const { data, setData, isLoadingData } = useContext(UserContext);
        
        const [items, setItems] = useState([]);
        const [itemSelected, setItemSelected] = useState();

          useEffect(() => {
            getTipoUsuario();
          }, []);

        const [modalEliminar, setModalEliminar] = useState(false);
        const [modalInsertar, setModalInsertar] = useState(false);
    
        const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
          id_usuario: '',
          id_tipo_usuario: '',
          nombre_usuario: '',
          descripcion_usuario:'',
          pass_usuario:''
        });

        const [error, setError] = useState(false);

        const { handleSubmit, control } = useForm();

        const onSubmit = (data) => {
          console.log("data: ",data);
        };

        const handleChange=e=>{
          const {name, value}=e.target;
          setUsuarioSeleccionado(prevState=>({
            ...prevState,
            [name]: value
          }))
        }

        const seleccionarUsuario=(usuario, caso)=>{
          setUsuarioSeleccionado(usuario);
          // (caso==='Editar')?null:abrirCerrarModalEliminar()
          abrirCerrarModalEliminar();
        }
    
        // const getUser = async()=>{
        //   await http.get(baseUrl)
        //   .then(response=>{
        //     const {data:{data}} = response;
        //     setData(data);
        //     // alert(JSON.stringify(data))
        //   })
        // }
    
        async function getTipoUsuario(){
          const datos_ = await http.get(urlTipoUsuario);
          const {data} = datos_.data;
          
          setItems(data);
        }
    
        const insertUser = async()=>{
          await http.post(baseUrl, usuarioSeleccionado)
          .then(response=>{
            setData([...data, data.concat(response.data)]);
            abrirCerrarModalInsertar();
          })
          .catch(error=>{
            console.error({error});
          });
        
        }
    
        const deleteUserId = async()=>{
          try {
            await http.delete(baseUrl + usuarioSeleccionado.id_usuario)
          .then(response =>{
            setData(data.filter(usuario=>usuario.id_usuario!==usuarioSeleccionado.id_usuario));
            // console.log("response delete: ",response)
            abrirCerrarModalEliminar();
            //getUser();
          })
          } catch (error) {
            console.log(error);
          }
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="nombre_usuario"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="Nombre Usuario"
                    variant="standard"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    className={styles.inputMaterial}
                  />
                )}
                rules={{ required: 'Campo Requerido' }}
              />
            <Controller
              name="id_tipo_usuario"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select
              labelId="Tipo Usuario"
              id="id_tipo_usuario"
              value={itemSelected}
              error={!!error}
              onChange={handleChange}
              className={styles.inputMaterial}
              name="id_tipo_usuario">

              {items.map((row, index) => (
              <MenuItem key={index} value={row.id_tipo_usuario}>
                {row.nombre_tipo_usuario}
              </MenuItem>))}
            </Select>
              )}
              rules={{ required: 'Campo Requerido' }}
            />
            <div align="right">
              <Button type="submit" color="primary" onClick={()=>insertUser()}>Insertar</Button>
              <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
            </form>
            <br />
            {/* <Select
              labelId="Tipo Usuario"
              id="id_tipo_usuario"
              value={itemSelected}
              onChange={handleChange}
              className={styles.inputMaterial}
              name="id_tipo_usuario">

              {items.map((row, index) => (
              <MenuItem key={index} value={row.id_tipo_usuario}>
                {row.nombre_tipo_usuario}
              </MenuItem>))}
            </Select>
            
            <TextField name="descripcion_usuario" className={styles.inputMaterial}     label="Descripción Usuario" onChange={handleChange}/>
            <br />
            <TextField name="pass_usuario" className={styles.inputMaterial}     label="Contraseña Usuario" onChange={handleChange} type="password"/>
            <br /><br /> */}
            
          </div>
        )
    
        const bodyEliminar=(
          <div className={styles.modal}>
            <p>Estás seguro que deseas eliminar al usuario <b>{usuarioSeleccionado &&     usuarioSeleccionado.nombre_usuario}</b> ? </p>
            <div align="right">
              <Button color="secondary" onClick={ deleteUserId }>Sí</Button>
              <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
            </div>
          </div>
        )
    
        
    return(
    
      <div className="usuarios">
      <br />
    <Button  className={styles.root} onClick={()=>abrirCerrarModalInsertar()}>Insertar</    Button>
      <br /><br />

     <TableUsuario data={data} isLoadingData={isLoadingData} seleccionarUsuario={seleccionarUsuario} />
     
      <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>
    
     {/* <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal> */}
    
     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal> 
    </div>
     );
    }
  
      export default Usuarios;
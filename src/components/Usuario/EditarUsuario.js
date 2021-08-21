import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, InputAdornment, IconButton, Input } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';

// Context
import UserContext from "../../context/usuarios/UserContext";

// Formulario
import { useForm } from "../../hooks/useForm";
import MessageForm from "../MessageForm";
import { MENSAJES_STR } from "../MessageForm/mensajes";

// Css Global
import ContainerModal from "../Container";
import { useStyles } from "../css/UsuariosStyles";

const EditarUsuario = ({history}) => {
  const styles = useStyles();
  const { id } = useParams();

  const { items, editarUsuario, getUsuarioByID, isLoadingUsuarioID, usuarioDetail } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const [errorNombre, setErrorNombre] = useState({
    obligatorio: false,
    caracteres: false
  });

  const [errorDescripcion, setErrorDescripcion] = useState({
    obligatorio: false,
    caracteres: false
  });

  const [errorPass, setErrorPass] = useState({
    obligatorio: false,
    caracteres: false
  });

  const [errorPassRepetir, setErrorPassRepetir] = useState({
    obligatorio: false,
    caracteres: false,
    coincidir: false
  });

  const [errorSelect, setErrorSelect] = useState(false);

  const [ formValues, handleInputChange, setFormState, handleResetForm ] = useForm({
    id_usuario: 0,
    id_tipo_usuario: 0,
    nombre_usuario: '',
    descripcion_usuario: '',
    pass_usuario: '',
    repeat_pass_usuario: ''
  });
  const { id_tipo_usuario, nombre_usuario, descripcion_usuario, pass_usuario, repeat_pass_usuario } = formValues;  

  useEffect(() => {
    if(!id) return
    getUsuarioByID(id);
  }, [id]);

  useEffect(() => {
    if(Object.keys(usuarioDetail).length > 0){
      setFormState({
        id_usuario: usuarioDetail.id_usuario || 0,
        id_tipo_usuario: usuarioDetail.id_tipo_usuario || 0,
        nombre_usuario: usuarioDetail.nombre_usuario || 'Cargando nombre',
        descripcion_usuario: usuarioDetail.descripcion_usuario || 'Cargando descripción',
        pass_usuario: usuarioDetail.pass_usuario || 'Cargando password',
        repeat_pass_usuario: usuarioDetail.pass_usuario || 'Cargando password'
      })
    }
  }, [usuarioDetail, setFormState]);

  const handleClickShowPassword = () => setShowPassword(!showPassword ); 

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = e => {
    e.preventDefault();

    if(!nombre_usuario){
      setErrorNombre({
        ...errorNombre,
        obligatorio: true,
      });
      return;
    }

    if(nombre_usuario.trim().length < 5) {
      setErrorNombre({
        ...errorNombre,
        caracteres: true,
      });
      return;
    }

    if(!descripcion_usuario){
      setErrorDescripcion({
        ...errorDescripcion,
        obligatorio: true,
      });
      return;
    }

    if(descripcion_usuario.trim().length < 5) {
      setErrorDescripcion({
        ...errorDescripcion,
        caracteres: true,
      });
      return;
    }

    if(!pass_usuario){
      setErrorPass({
        ...errorPass,
        obligatorio: true,
      });
      return;
    }

    if(pass_usuario.trim().length < 5) {
      setErrorPass({
        ...errorPass,
        caracteres: true,
      });
      return;
    }
    
    if(pass_usuario !== repeat_pass_usuario){
      setErrorPassRepetir({
        ...errorPassRepetir,
        coincidir: true,
      });
      return;
    }

    if(pass_usuario === repeat_pass_usuario){
      setErrorPassRepetir({
        ...errorPassRepetir,
        coincidir: false,
      });
    }

    if(!repeat_pass_usuario){
      setErrorPassRepetir({
        ...errorPassRepetir,
        obligatorio: true,
      });
      return;
    }

    if(repeat_pass_usuario.trim().length < 5) {
      setErrorPassRepetir({
        ...errorPassRepetir,
        caracteres: true,
      });
      return;
    }


    if(id_tipo_usuario === ''){
      setErrorSelect(true);
      return;
    }
    
    editarUsuario(formValues);

    //Reinicio todo el formulario y errores
    handleResetForm();
    setErrorNombre({ obligatorio: false, caracteres: false });
    setErrorDescripcion({ obligatorio: false, caracteres: false });
    setErrorPass({ obligatorio: false, caracteres: false });
    setErrorPassRepetir({ obligatorio: false, caracteres: false, coincidir: false });
    setErrorSelect(false);

    //Redirecciono a la pagina de usuarios
    history.push('/usuarios');
  }

  return (
    <>
    {
      !isLoadingUsuarioID ? (
          <ContainerModal>
            <h3>Editar usuario</h3>
            <form onSubmit={ handleSubmit }>
              <Input
                name="nombre_usuario"
                id="nombre_usuario"
                placeholder="Nombre"
                value={ nombre_usuario }
                onChange={handleInputChange}
                className={styles.inputMaterial}
              />

              {errorNombre.obligatorio && (
                <MessageForm
                  message={ MENSAJES_STR.editarUsuario.nombre.obligatorio } 
                  style={{ color: 'green', fontSize: 14 }} 
                />
              )}

              {errorNombre.caracteres && (
                <MessageForm
                  message={ MENSAJES_STR.editarUsuario.nombre.caracteres } 
                  style={{ color: 'green', fontSize: 14 }} 
                />
              )}

              <Input
                id="descripcion_usuario"
                name="descripcion_usuario"
                placeholder="Descripción"
                value={descripcion_usuario}
                onChange={handleInputChange}
                onBlur={handleInputChange}
                className={styles.inputMaterial}
              />

              {errorDescripcion.obligatorio && (
                <MessageForm
                  message={ MENSAJES_STR.editarUsuario.descripcion.obligatorio } 
                  style={{ color: 'red', fontSize: 14 }} 
                />
              )}

              {errorDescripcion.caracteres && (
                <MessageForm
                  message={ MENSAJES_STR.editarUsuario.descripcion.caracteres } 
                  style={{ color: 'black', fontSize: 14 }} 
                />
              )}

                <Input
                  name="pass_usuario"
                  id="pass_usuario"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={pass_usuario}
                  onChange={handleInputChange}
                  className={styles.inputMaterial}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

              {errorPass.obligatorio && (
                <MessageForm
                  message={ MENSAJES_STR.editarUsuario.password.obligatorio } 
                  style={{ color: 'red', fontSize: 14 }} 
                />
              )}

              {errorPass.caracteres && (
                <MessageForm
                  message={ MENSAJES_STR.editarUsuario.password.caracteres } 
                  style={{ color: 'black', fontSize: 14 }} 
                />
              )}

              <Input
                name="repeat_pass_usuario"
                id="repeat_pass_usuario"
                type={showPassword ? 'text' : 'password'}
                placeholder="Repetir contraseña"
                value={repeat_pass_usuario}
                onChange={handleInputChange}
                className={styles.inputMaterial}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {errorPassRepetir.obligatorio && (
                <MessageForm
                  message={ MENSAJES_STR.editarUsuario.password.obligatorio } 
                  style={{ color: 'red', fontSize: 14 }} 
                />
              )}

              {errorPassRepetir.caracteres && (
                <MessageForm
                  message={ MENSAJES_STR.editarUsuario.password.caracteres } 
                  style={{ color: 'pink', fontSize: 14 }} 
                />
              )}

              {errorPassRepetir.coincidir && ( <MessageForm message={ MENSAJES_STR.editarUsuario.password.distintas } /> )}

              <select
                id="id_tipo_usuario"
                name="id_tipo_usuario"
                value={id_tipo_usuario}
                onChange={handleInputChange}
                className={styles.inputMaterial}
              >
                <option value="">Seleccione tipo usuario</option>
                {
                  items.map((row, index) => (
                    <option key={index} value={row.id_tipo_usuario}>
                      {row.nombre_tipo_usuario}
                    </option>
                  ))
                }
              </select>

              {errorSelect && (<MessageForm message={ MENSAJES_STR.editarUsuario.select } /> )}

              <div align="right">
                <Button
                  type="submit"
                  color="primary"
                >
                  Editar
                </Button>
                <Button
                  color="secondary"
                  onClick={ () => history.push('/usuarios') }
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </ContainerModal>) : (<p>Cargando ...</p>)
      }
    </>
  );
};

export default EditarUsuario;

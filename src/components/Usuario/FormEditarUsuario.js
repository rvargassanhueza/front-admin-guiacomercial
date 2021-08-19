import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, InputAdornment, IconButton, Input } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';

// Context
import UserContext from "../../context/usuarios/UserContext";

// Formulario
import { useFormik } from "formik";
import * as Yup from "yup";
import MessageForm from "../MessageForm";

// Css Global
import { useStyles } from "../css/UsuariosStyles";

const FormEditarUsuario = ({history}) => {
  const styles = useStyles();
  const { id } = useParams();

  const { items, editarUsuario, getUsuarioByID, isLoadingUsuarioID, miUsuarioByID} = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
      getUsuarioByID(id);
  }, [id]);

  //Inicializacion
  const formik = useFormik({
    enableReinitialize:true,
    initialValues : {
      id_usuario: miUsuarioByID.current.id_usuario,
      nombre_usuario : miUsuarioByID.current.nombre_usuario,
      id_tipo_usuario: miUsuarioByID.current.id_tipo_usuario,
      descripcion_usuario: miUsuarioByID.current.descripcion_usuario,
      pass_usuario: miUsuarioByID.current.pass_usuario,
      repeat_pass_usuario: miUsuarioByID.current.pass_usuario
    },
    validationSchema: Yup.object({
      nombre_usuario: Yup.string()
                        .required('Nombre de usuario es obligatorio')
                        .min(5, 'Nombre minimo de 5 caracteres'),
      descripcion_usuario: Yup.string()
                        .required('Descripción es obligatorio')
                        .min(5, 'Descripción minimo de 5 caracteres'),
      pass_usuario: Yup.string()
                      .required('Contraseña es obligatoria'),
      repeat_pass_usuario: Yup.string()
                      .required('Repetir contraseña es obligatoria'),
      id_tipo_usuario: Yup.number()
                      .required('Tipo de usuario obligatorio')
    }),
    onSubmit: async (values, {resetForm}) => { 
      editarUsuario(values);
      setTimeout(() => {
        resetForm();
        history.push('/usuarios');
      }, 1000);
      
    }
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword ); 

  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <>
    {
      !isLoadingUsuarioID ? (
          <div className={styles.modal}>
            <h3>Editar usuario</h3>

            <form onSubmit={formik.handleSubmit}>
              <Input
                id="nombre_usuario"
                placeholder="Nombre"
                value={ formik.values.nombre_usuario || '' }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.inputMaterial}
              />

              {formik.touched.nombre_usuario && formik.errors.nombre_usuario && (
                <MessageForm
                  message={ formik.errors.nombre_usuario } 
                  style={{ color: 'green', fontSize: 14 }} 
                />
              )}

              <Input
                id="descripcion_usuario"
                placeholder="Descripción"
                value={ formik.values.descripcion_usuario || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.inputMaterial}
              />

              {formik.touched.descripcion_usuario && formik.errors.descripcion_usuario && (
                <MessageForm
                  message={ formik.errors.descripcion_usuario } 
                  style={{ color: 'orange', fontSize: 14 }} 
                />
              )}

                <Input
                  id="pass_usuario"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={ formik.values.pass_usuario || '' }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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

              {formik.touched.pass_usuario && formik.errors.pass_usuario && (
                <MessageForm
                  message={ formik.errors.pass_usuario } 
                  style={{ color: 'orange', fontSize: 14 }} 
                />
              )}

              <Input
                id="repeat_pass_usuario"
                type={showPassword ? 'text' : 'password'}
                placeholder="Repetir contraseña"
                value={ formik.values.repeat_pass_usuario || '' }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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

              {formik.touched.repeat_pass_usuario && formik.errors.repeat_pass_usuario && (
                <MessageForm
                  message={ formik.errors.repeat_pass_usuario } 
                  style={{ color: 'blue', fontSize: 14 }} 
                />
              )}

              { formik.values.pass_usuario !== formik.values.repeat_pass_usuario && (
                <MessageForm
                  message={ "Las contraseñas no son iguales" } 
                  style={{ color: 'peru', fontSize: 14, fontWeight: 'bold' }}  
                />
              )}

              <select
                id="id_tipo_usuario"
                value={formik.values.id_tipo_usuario || 0}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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


              {formik.touched.id_tipo_usuario && formik.errors.id_tipo_usuario && (
                <MessageForm
                  message={ formik.errors.id_tipo_usuario }   
                />
              )}
              
              <div align="right">
                <Button
                  type="submit"
                  color="primary"
                  onClick={ () => editarUsuario }
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
          </div>) : (<p>Cargando ...</p>)
      }
    </>
  );
};

export default FormEditarUsuario;

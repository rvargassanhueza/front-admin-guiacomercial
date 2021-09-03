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
import { MENSAJES_STR } from "../MessageForm/mensajes";

// Css Global
import ContainerModal from "../Container";
import { useStyles } from "../css/UsuariosStyles";

import { ClipLoader } from 'react-spinners';

const EditarUsuario = ({ history }) => {
  const styles = useStyles();
  const { id } = useParams();

  const { usuarioValues } = MENSAJES_STR;

  const { items, editarUsuario, getUsuarioByID, isLoadingUsuarioID, usuarioDetail } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  //Inicializacion
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id_usuario: usuarioDetail.id_usuario || 0,
      id_tipo_usuario: usuarioDetail.id_tipo_usuario || 0,
      nombre_tipo_usuario: usuarioDetail.nombre_tipo_usuario || 'Cargando ...',
      nombre_usuario: usuarioDetail.nombre_usuario || 'Cargando nombre',
      descripcion_usuario: usuarioDetail.descripcion_usuario || 'Cargando descripción',
      pass_usuario: usuarioDetail.pass_usuario || 'Cargando password',
      repeat_pass_usuario: usuarioDetail.pass_usuario || 'Cargando password',
    },
    validationSchema: Yup.object({
      nombre_usuario: Yup.string()
        .required(usuarioValues.nombre.obligatorio)
        .min(5, usuarioValues.nombre.caracteres),
      descripcion_usuario: Yup.string()
        .required(usuarioValues.descripcion.obligatorio)
        .min(5, usuarioValues.descripcion.caracteres),
      pass_usuario: Yup.string()
        .required(usuarioValues.password.obligatorio),
      repeat_pass_usuario: Yup.string()
        .required(usuarioValues.password.confirmar),
      id_tipo_usuario: Yup.number()
        .required(usuarioValues.select)
    }),
    onSubmit: async (values, { resetForm }) => {
      editarUsuario(values);
      resetForm();
      history.push('/usuarios');
    }
  });

  useEffect(() => {
    if (!id) return
    getUsuarioByID(id);
  }, [id]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <>
      {
        !isLoadingUsuarioID ? (
          <ContainerModal>
            <h3>Editar usuario</h3>
            <form onSubmit={formik.handleSubmit}>
              <Input
                name="nombre_usuario"
                id="nombre_usuario"
                placeholder="Nombre"
                value={formik.values.nombre_usuario || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.inputMaterial}
              />

              {formik.touched.nombre_usuario && formik.errors.nombre_usuario && (
                <MessageForm
                  message={formik.errors.nombre_usuario}
                  style={{ color: 'green', fontSize: 14 }}
                />
              )}

              <Input
                id="descripcion_usuario"
                name="descripcion_usuario"
                placeholder="Descripción"
                value={formik.values.descripcion_usuario || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.inputMaterial}
              />

              {formik.touched.descripcion_usuario && formik.errors.descripcion_usuario && (
                <MessageForm
                  message={formik.errors.descripcion_usuario}
                  style={{ color: 'orange', fontSize: 14 }}
                />
              )}

              <Input
                name="pass_usuario"
                id="pass_usuario"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={formik.values.pass_usuario || ''}
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
                  message={formik.errors.pass_usuario}
                  style={{ color: 'orange', fontSize: 14 }}
                />
              )}

              <Input
                name="repeat_pass_usuario"
                id="repeat_pass_usuario"
                type={showPassword ? 'text' : 'password'}
                placeholder="Repetir contraseña"
                value={formik.values.repeat_pass_usuario || ''}
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
                  message={formik.errors.repeat_pass_usuario}
                  style={{ color: 'blue', fontSize: 14 }}
                />
              )}

              {formik.values.pass_usuario !== formik.values.repeat_pass_usuario && (
                <MessageForm
                  message={"Las contraseñas no son iguales"}
                  style={{ color: 'peru', fontSize: 14, fontWeight: 'bold' }}
                />
              )}

              <select
                id="id_tipo_usuario"
                name="id_tipo_usuario"
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
                  message={formik.errors.id_tipo_usuario}
                />
              )}

              <div align="right">
                <Button
                  type="submit"
                  color="primary"
                >
                  Editar
                </Button>
                <Button
                  color="secondary"
                  onClick={() => history.push('/usuarios')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </ContainerModal>) : (<ClipLoader size={100} color="black" />)
      }
    </>
  );
};

export default EditarUsuario;

import React, { useContext } from "react";
import { Button } from "@material-ui/core";

//Formulario
import { useFormik } from "formik";
import * as Yup from "yup";

// Css Global
import { useStyles } from "../css/UsuariosStyles";

import http from "../common/http-common";
import UserContext from "../../context/usuarios/UserContext";

const baseUrl = "/usuario/";

const FormInsertUsuario = ({items, abrirCerrarModalInsertar}) => {

  const { data, setData } = useContext(UserContext);
  
  const styles = useStyles();

  //Inicializacion
  const formik = useFormik({
    initialValues:{
      nombre_usuario: '',
      id_tipo_usuario: '',
      descripcion_usuario:''
    },
    validationSchema: Yup.object({
      nombre_usuario: Yup.string()
                        .required('Nombre de usuario es obligatorio')
                        .min(5, 'Nombre minimo de 5 caracteres'),
      descripcion_usuario: Yup.string()
                        .required('Descripción es obligatorio')
                        .min(5, 'Descripción minimo de 5 caracteres'),
      id_tipo_usuario: Yup.string()
                      .required('Tipo de usuario obligatorio')
    }),
    onSubmit: async values => {
      insertUser(values);
      const { nombre_usuario, descripcion_usuario, id_tipo_usuario } = values;
      setData([
        ...data,
        {
          nombre_usuario,
          descripcion_usuario,
          id_tipo_usuario: parseInt(id_tipo_usuario)
        }
      ])
    }
  });

  const insertUser = async newUser => {
    try {
      await http.post(baseUrl, newUser);
    } catch (error) {
      console.log({error});
    } finally{
      abrirCerrarModalInsertar();
    }
  };

  return (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario</h3>

      <form onSubmit={formik.handleSubmit}>
        <input
          id="nombre_usuario"
          placeholder="Nombre usuario"
          value={formik.values.nombre_usuario}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.inputMaterial}
        />

        {formik.touched.nombre_usuario && formik.errors.nombre_usuario && (
          <div>
            <p style={{ color: "red" }}>{formik.errors.nombre_usuario}</p>
          </div>
        )}

        <input
          id="descripcion_usuario"
          placeholder="Descripcion usuario"
          value={formik.values.descripcion_usuario}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.inputMaterial}
        />

        {formik.touched.descripcion_usuario && formik.errors.descripcion_usuario && (
          <div>
            <p style={{ color: "red" }}>{formik.errors.descripcion_usuario}</p>
          </div>
        )}

        <select
          id="id_tipo_usuario"
          value={formik.values.id_tipo_usuario}
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
          <div>
            <p style={{ color: "red" }}>{formik.errors.id_tipo_usuario}</p>
          </div>
        )}
        
        <div align="right">
          <Button
            type="submit"
            color="primary"
            onClick={ () => insertUser }
          >
            Insertar
          </Button>
          <Button onClick={ abrirCerrarModalInsertar }>Cancelar</Button>
        </div>
      </form>
    </div>
  );
};

export default FormInsertUsuario;

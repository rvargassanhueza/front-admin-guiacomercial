import React, { useReducer, useEffect } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { BORRAR_USUARIO, INSERTAR_USUARIO, SELECCIONAR_USUARIO } from '../../types'
import useFetchUsuario from '../../hooks/useFetchUsuario'
import http from '../../components/common/http-common';

const baseUrl = "/usuario/";

//State de usuarios
const initialState = {
    dataUsuarios: [],
    usuarioSeleccionado: {}
}

const UserProvider= ({children}) => {
    const { data, setData, isLoadingData } = useFetchUsuario();

    initialState.dataUsuarios = data;
    const [ state, dispatch ] = useReducer(UserReducer, initialState);
    
    // const eliminarUsuario = (abrirCerrarModalEliminar) => {
    //     try {
    //       http.delete(baseUrl + usuarioSeleccionado.id_usuario)
    //         .then((resp) => {
    //           dispatch({
    //             type: BORRAR_USUARIO,
    //             payload: id_usuario
    //           });
    //           abrirCerrarModalEliminar();
    //         });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    const insertarUsuario = usuario => {
        dispatch({
            type: INSERTAR_USUARIO,
            payload: usuario
        });
    }

    const seleccionarUsuario = usuario => {
        dispatch({
            type: SELECCIONAR_USUARIO,
            payload: usuario
        })
    }

    return (
        <UserContext.Provider value={{
            dataUsuarios: state.dataUsuarios,
            usuarioSeleccionado: state.usuario,
            setData,
            isLoadingData,
            insertarUsuario,
            seleccionarUsuario
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
import React, { useReducer, useEffect } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { INSERTAR_USUARIO, BORRAR_USUARIO, USUARIO_ERROR, SELECCIONAR_USUARIO, EDITAR_USUARIO, OBTENER_USUARIO_EDITAR } from '../../types'
import useFetchUsuario from '../../hooks/useFetchUsuario'
import http, { BASE_URL_USUARIO } from '../../common/http-common';

//State de usuarios
const initialState = {
    dataUsuarios: [],
    errorUsuario: false,
    usuarioSeleccionado: 0,
    usuarioEditar: null
}

const UserProvider= ({children}) => {
    const { data, setData, isLoadingData } = useFetchUsuario(BASE_URL_USUARIO);

    useEffect(() => {
        initialState.dataUsuarios = data;
    }, [data]);

    const [ state, dispatch ] = useReducer(UserReducer, initialState);
    
    const insertarUsuario =  async (newUser, callbackModal) => {
        try {
            await http.post(BASE_URL_USUARIO, newUser);
            dispatch({
                type: INSERTAR_USUARIO,
                payload: newUser
            });
        } catch (error) {
            dispatch({
                type: USUARIO_ERROR
            });
            console.log({error});
        } finally{
            callbackModal();
        }
    }

    const editarUsuario =  async (usuario, callbackModal) => {
        try {
            await http.put(`${BASE_URL_USUARIO}${usuario.id_usuario}`, usuario);
            dispatch({
                type: EDITAR_USUARIO,
                payload: usuario
            });
        } catch (error) {
            dispatch({
                type: USUARIO_ERROR
            });
            console.log({error});
        } finally{
            callbackModal();
        }
    }

    const borrarUsuario = async (id, callbackModal) => {
        try {
            await http.delete(`${BASE_URL_USUARIO}${id}`);
            dispatch({
                type: BORRAR_USUARIO,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: USUARIO_ERROR
            });
            console.log({error});
        } finally{
            callbackModal();
        }
    }

    const obtenerUsuarioEditar = usuario => {
        dispatch({
            type: OBTENER_USUARIO_EDITAR,
            payload: usuario
        })
    }

    const seleccionarUsuario = (usuario, callbackModal) => {
        dispatch({
            type: SELECCIONAR_USUARIO,
            payload: usuario
        })

        callbackModal();
    }

    return (
        <UserContext.Provider value={{
            dataUsuarios: state.dataUsuarios,
            errorUsuario: state.errorUsuario,
            usuarioSeleccionado: state.usuarioSeleccionado,
            usuarioEditar: state.usuarioEditar,
            setData,
            isLoadingData,
            insertarUsuario,
            editarUsuario,
            borrarUsuario,
            seleccionarUsuario,
            obtenerUsuarioEditar
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
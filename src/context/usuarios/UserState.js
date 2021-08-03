import React, { useReducer, useEffect } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { INSERTAR_USUARIO, BORRAR_USUARIO, USUARIO_ERROR, SELECCIONAR_USUARIO } from '../../types'
import useFetchUsuario from '../../hooks/useFetchUsuario'
import http from '../../components/common/http-common';

const baseUrl = "/usuario/";

//State de usuarios
const initialState = {
    dataUsuarios: [],
    errorUsuario: false,
    usuarioSeleccionado: 0
}

const UserProvider= ({children}) => {
    const { data, setData, isLoadingData } = useFetchUsuario();

    useEffect(() => {
        initialState.dataUsuarios = data;
    }, [data]);

    const [ state, dispatch ] = useReducer(UserReducer, initialState);
    
    const insertarUsuario =  async (newUser, callbackModal) => {
        try {
            await http.post(baseUrl, newUser);
            dispatch({
                type: INSERTAR_USUARIO
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

    const borrarUsuario = async (idUser, callbackModal) => {
        try {
            await http.delete(`${baseUrl}${idUser}`);
            dispatch({
                type: BORRAR_USUARIO,
                payload: idUser
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
            setData,
            isLoadingData, 
            insertarUsuario,
            borrarUsuario,
            seleccionarUsuario
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
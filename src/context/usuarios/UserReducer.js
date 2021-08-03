import { INSERTAR_USUARIO, USUARIO_ERROR, SELECCIONAR_USUARIO, BORRAR_USUARIO,  } from '../../types'

const UserReducer = (state, action) => {
    switch (action.type) {
        case INSERTAR_USUARIO:
            return {
                ...state,
                errorUsuario: false
            }
        
        case USUARIO_ERROR:
            return {
                ...state,
                errorUsuario: true
            }
        
        case SELECCIONAR_USUARIO:
            return {
                ...state,
                usuarioSeleccionado: action.payload
            }
            
        case BORRAR_USUARIO:
            return {
                ...state,
                dataUsuarios: state.dataUsuarios.filter( item => item.id_usuario !== action.payload)
            }
        default:
            return state;
    }
}

export default UserReducer;
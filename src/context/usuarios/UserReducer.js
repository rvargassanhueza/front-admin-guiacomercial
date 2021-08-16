import { INSERTAR_USUARIO, BORRAR_USUARIO, USUARIO_ERROR, SELECCIONAR_USUARIO, EDITAR_USUARIO, OBTENER_USUARIO_EDITAR } from '../../types'

const UserReducer = (state, action) => {
    switch (action.type) {
        case INSERTAR_USUARIO:
            return {
                ...state,
                dataUsuarios:[...state.productos, action.payload]
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
        
        case EDITAR_USUARIO:
            return {
                ...state,
                dataUsuarios: state.dataUsuarios.map( item => 
                    item.id_usuario === action.payload.id_usuario ? item = action.payload : item
                )
            }
        case OBTENER_USUARIO_EDITAR:
            return {
                ...state,
                usuarioEditar: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;
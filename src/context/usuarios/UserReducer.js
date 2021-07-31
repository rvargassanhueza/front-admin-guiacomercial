import { BORRAR_USUARIO, INSERTAR_USUARIO, SELECCIONAR_USUARIO } from '../../types'

const UserReducer = (state, action) => {
    switch (action.type) {
        case INSERTAR_USUARIO:
            return {
                ...state,
                dataUsuarios: action.payload
            }
        
        case SELECCIONAR_USUARIO:
            return {
                ...state,
                usuarioSeleccionado: action.payload
            }
            
        case BORRAR_USUARIO:
            return {
                dataUsuarios: state.dataUsuarios.filter( item => item.id !== action.payload)
            }
        default:
            return state;
    }
}

export default UserReducer;
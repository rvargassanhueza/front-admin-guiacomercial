
import http from "../http-common";



// async function getUser() {
//     await http.get("/usuario");
// }

// let getUser = async function(){
//   await http.get('/usuario');
// }
// class ComunDataService {
//   async function getUser() {
    
//   }
// }
 const helpers = {
   getUser: function(){
    // await http.get('/usuario').then(response =>{
    //   console.log("usuario: ",response.data);
    //   return response.data;
    return http.get('/usuario')
            .then(function (response){
            return response.data;
    })
   }
 }

 export default helpers;

//   getUser() {
//     return http.get("/usuario");
//   }

//   getUserId(id) {
//     return http.get(`/usuario/${id}`);
//   }

//   createUser(data) {
//     return http.post("/usuario", data);
//   }

//   updateUser(id, data) {
//     return http.put(`/usuario/${id}`, data);
//   }

//   deleteUser(id) {
//     return http.delete(`/usuario/${id}`);
//   }


//   getTIpoUsuario(){
//     return http.get("/tipo-usuario");
//   }

//   getTipoUsuarioId(id){
//     return http.get(`/tipo-usuario/${id}`);
//   }

//   createTipoUsuario(data) {
//     return http.post("/tipo-usuario", data);
//   }

//   updateTipoUsuario(id, data) {
//     return http.put(`/tipo-usuario/${id}`, data);
//   }

//   deleteTipoUsuario(id) {
//     return http.delete(`/tipo-usuario/${id}`);
//   }



//   getTipoCliente(){
//     return http.get("/tipo-cliente");
//   }

//   getTipoClienteId(id){
//     return http.get(`/tipo-cliente/${id}`);
//   }

//   createTipoCliente(data) {
//     return http.post("/tipo-cliente", data);
//   }

//   updateTipoCliente(id, data) {
//     return http.put(`/tipo-cliente/${id}`, data);
//   }

//   deleteTipoCliente(id) {
//     return http.delete(`/tipo-cliente/${id}`);
//   }


//   getSubCategoriaId(id){
//     return http.get(`/subCategoria/${id}`);
//   }

//   getLocalidadSubCategoria(id){
//     return http.get(`/subCategoria/localidad/${id}`);
//   }

//   createSubCategoria(data) {
//     return http.post("/subCategoria", data);
//   }

//   updateSubCategoria(id, data) {
//     return http.put(`subCategoria/${id}`, data);
//   }

//   deleteSubCategoria(id) {
//     return http.delete(`/subCategoria/${id}`);
//   }


//   getLocalidadId(id){
//     return http.get(`/localidad/${id}`);
//   }

//   createLocalidad(data) {
//     return http.post("/localidad", data);
//   }

//   updateLocalidad(id, data) {
//     return http.put(`localidad/${id}`, data);
//   }

//   deleteLocalidad(id) {
//     return http.delete(`/localidad/${id}`);
//   }


//   getClienteId(id){
//     return http.get(`/cliente/${id}`);
//   }

//   createCliente(data) {
//     return http.post("/cliente", data);
//   }

//   updateCliente(id, data) {
//     return http.put(`cliente/${id}`, data);
//   }

//   deleteCliente(id) {
//     return http.delete(`/cliente/${id}`);
//   }


//   getCategoriaId(id){
//     return http.get(`/categoria/${id}`);
//   }

//   getCategoriaLocalidadId(id){
//     return http.get(`/categoria/localidad/${id}`);
//   }

//   createCategoria(data) {
//     return http.post("/categoria", data);
//   }

//   updateCategoria(id, data) {
//     return http.put(`categiria/${id}`, data);
//   }

//   deleteCategoria(id) {
//     return http.delete(`/categoria/${id}`);
//   }

//   createAsocLocalidadCategoria(data) {
//     return http.post("/asc-localidad-categoria", data);
//   }

//   createAsocCategoriaSubCategoria(data) {
//     return http.post("/asc-categoria-sub_categoria", data);
//   }

// }



// module.exports = {
//   getUser:getUser
// }
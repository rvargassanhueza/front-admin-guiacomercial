import React, { useState, useEffect  } from 'react';

// import ComunDataService from '../services/comun.services'

import Usuario from '../components/FormularioUsuario';


import { Link } from "react-router-dom";

// export default class Usuarios extends Component{
  // constructor(props){
  //   super(props);
  //   this.getUsuariosAll = this.getUsuariosAll.bind(this)

  //   this.state = {
  //     usuarios:[]
  //   };
  // }

  // componentDidMount() {
  //   this.getUsuariosAll();
  // }


  // getUsuariosAll() {
  //   ComunDataService.getUser()
  //     .then(response => {
  //       this.setState({
  //         usuarios: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }


  function Usuarios() {
    const [data, setData]=useState([]);
    
  
    return(
      // <div className="list row"></div>
      <Usuario />

    );
}

export default Usuarios;

// }
// const useStyles = makeStyles((theme) => ({
//   modal: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)'
//   },
//   iconos:{
//     cursor: 'pointer'
//   }, 
//   inputMaterial:{
//     width: '100%'
//   }
// }));

// function Usuarios() {

//   const [data, setData] = useState([]);
//   const [modalInsertar, setModalInsertar]=useState(false);
//   const [modalEditar, setModalEditar]=useState(false);
//   const [modalEliminar, setModalEliminar]=useState(false);



  
// useEffect(async()=>{
//     const response = await ComunDataService.getUser();
//     console.log("response: ",response);
//   },[])

//   return (
//     <div className='usuarios'>
//       <h1>Usuarios</h1>
//     </div>
//   );
// }


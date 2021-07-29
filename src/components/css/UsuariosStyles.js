import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }, 
    inputMaterial:{
      width: '100%'
    },
    iconos:{
        cursor: 'pointer'
    },
    root: {
      background: 'linear-gradient(45deg, #060b26 30%, #060b26 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    }
}));
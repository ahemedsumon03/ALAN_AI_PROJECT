import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    logoContainer: {
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
            textAlign: 'center',
        },
    },

    alanLogo: {
        height: '27vmin',
        borderRadius: '15%',
        padding: '0 5%',
        margin: '3% 0',
        [theme.breakpoints.down('sm')]: {
            height: '35vmin',
        },
    },
}));
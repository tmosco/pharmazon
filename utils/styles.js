import { makeStyles } from "@material-ui/core";

const useStyles= makeStyles({
    navbar:{
        backgroundColor:'#203040',
        '& a':{
            color:'#ffffff',
            marginLeft: 100,
        }
    },
    main:{
        minHeight:'80vh',
    },
    footer:{
        textAlign:'center'
    },
    media: {
        
        // paddingTop: '56.25%', // 16:9,
        marginTop:'30',
        width: '80%',
        height: '15vw',
        // objectFit: 'cover',
      }
})

export default useStyles;
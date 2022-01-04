import { makeStyles } from "@material-ui/core";

const useStyles= makeStyles({
    navbar:{
        backgroundColor:'#203040',
        '& a':{
            color:'#ffffff',
            marginLeft: 10,
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
      },
      brand:{
          fontWeight:'bold',
          fontSize:'1.5rem'
      },
      grow:{
          flexGrow:1
      }
      
          
      
})

export default useStyles;
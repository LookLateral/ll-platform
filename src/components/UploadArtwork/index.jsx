import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const styles = {
  root: { flexGrow: 1, marginBottom: 50, },
  title: { fontSize: 40, textAlign: 'center', }, 

  artContainer: { width: '80%', margin: '0 auto', border: '1px solid #f0f', minHeight: 600, },
  
  registerButton: { textDecoration: 'none', }, 
  register: {
    color: '#000', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#000', borderRadius: 4, border: 2,
  },
}

const UploadArtwork = (props) => {
  
    const { classes } = props;
    const { userState } = props;

    return (  
    
        <div className={classes.root}>
      
              <div className={classes.title}>Upload Artwork</div>

              
         
        
        </div>
    )
  }
  
  UploadArtwork.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(UploadArtwork);
  
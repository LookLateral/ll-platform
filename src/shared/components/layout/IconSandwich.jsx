import React from 'react'
import ViewHeadline from '@material-ui/icons/ViewHeadline';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    iconSandwich: { color: '#fff',
        marginRight: 20,
        fontSize: '2em',
        position: 'absolute',
        right: 0,
        top:32 
    },
}

const IconSandwich = (props) => {    
    
    const { classes } = props;       
    return (
        props.isOpen ?
        <div className={classes.iconSandwich}> 
            <ViewHeadline rotation={90} onClick={ props.onClick } />
        </div> :
        <div className={classes.iconSandwich}> 
            <ViewHeadline onClick={ props.onClick } />
        </div>               
    )
}
IconSandwich.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(IconSandwich) 
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {   
    fastLinkContainer: {
        marginTop: 20,
        textAlign: 'center',
    },
    fastLink: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#fff',
    },
    fastLinkImage: {
        margin: '0 8px',
        color: '#fff'
    }
}

const SidebarFastLink = (props) => {  
    const { classes } = props; 

    return (
        <div>
            { 
            props.userLogged ?  (
                
                <div className={classes.fastLinkContainer}>       
                    <Link to="/" className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'user']}  className={classes.fastLinkImage} />
                    </Link>
                    <Link to="/notification" className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'bell']}  className={classes.fastLinkImage} />
                    </Link>
                    <Link to="/search" className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'search']}  className={classes.fastLinkImage} />
                    </Link>
                        <FontAwesomeIcon icon={['fas', 'sign-out-alt']}  className={classes.fastLinkImage} onClick={()=>props.handleLogout()} />
                </div>
            
            ) : (

                <div className="sidebar-fast-links">   
                    <Link to="/login" className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'sign-in-alt']}  className={classes.fastLinkImage} />
                    </Link>
                    <Link to="/search" className={classes.fastLink}>
                        <FontAwesomeIcon icon={['fas', 'search']}  className={classes.fastLinkImage} />
                    </Link>
                </div>
            )}

        </div>
    )
}
SidebarFastLink.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SidebarFastLink) 

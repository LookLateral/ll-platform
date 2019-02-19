import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import profileImg from '../../shared/images/jacopo-caracci.jpg';

const styles = {
  root: { flexGrow: 1, marginBottom: 50, },
  subtitle: {
    fontSize: 40, marginBottom: 30,
    color: '#000',   
  },
  boxLeft: { backgroundColor: 'purple', width: '50%', height: 'calc(100% - 150px)', position: 'absolute', left: 0,}, 
  boxRight: { backgroundColor: 'orange', width: '50%', height: 'calc(100% - 150px)', position: 'absolute', right: 0,}, 

  topArea: { width: '100%',},
  pictureContainer: { margin: 3, width: 220, height: 220, textAlign: 'center', },
  resizeFitCenter: { maxWidth: '100%', maxHeight: '100%', verticalAlign: 'middle' }, 
  infoContainer: { width: 'calc(100% - 300px)', textAlign: 'left', paddingLeft: 20, },
  infoName: { fontSize: 40, marginBottom: 10, },
  infoDetail: { fontSize: 20, },

  bottomArea: { width: '80%', margin: '50px auto', border: '1px solid #f0f', minHeight: 100, },

  registerButton: { textDecoration: 'none', }, 
  register: {
    color: '#000', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#000', borderRadius: 4, border: 2,
  },
}

const Profile = (props) => {
  
    const { classes } = props;
    const { userState } = props;

    return (  
    
        <div className={classes.root}>
      
          <div className={classes.boxLeft}>

              <table className={classes.topArea}>
              <tbody>
                <tr>
                  <td className={classes.pictureContainer}>
                    <img src={profileImg} className={classes.resizeFitCenter} />
                  </td>
                  <td className={classes.infoContainer}>
                    <div className={classes.infoName}>{ userState.firstName + ' ' +  userState.lastName }</div> 
                    <div className={classes.infoDetail}>USER TYPE: Unverified user</div>                 
                    <div className={classes.infoDetail}>FIMART: not activated</div>
                    <div className={classes.infoDetail}>WALLET: -</div>   
                  </td>
                </tr>
              </tbody>
              </table>

              <Link className={classes.registerButton} to='/register'>
                <Button className={classes.register}>EDIT INFO</Button>
              </Link>

              <div className={classes.bottomArea}>
                  LOOK BOX: Looks hold, LL score, buy LOOKS btn, link to the looks page<br/> (list of all Look transactions: bought n on date x, used 1 for tag on date y, ..., also buy LOOKS!)
                  <br />
                  <div className={classes.infoDetail}>TOKENS HOLD: { userState.llToken }</div>
                  <div className={classes.infoDetail}>HOLDING DAYS: { userState.investDate !== false ? Math.floor( (Date.parse(Date('Y-m-d')) - Date.parse(userState.investDate)) / (1000 * 60 * 60 * 24)) : 0 }</div>
                  <div className={classes.infoDetail}>LOOK SCORE: { userState.llScore }</div>

                  <Link className={classes.registerButton} to='/my-art'>
                    <Button className={classes.register}>MY LOOKS HISTORY</Button>
                  </Link>
                </div>

          </div>


          <div className={classes.boxRight}>
        
             

            { //userState.userType === 3 || userState.userType === 2 ? (
                
                <div>

                  <div className={classes.bottomArea}>
                    My artworks (artworks i uploaded and still own some fracts)
                    <br /><br /><br />
                    <Link className={classes.registerButton} to='/my-art'>
                      <Button className={classes.register}>MY ARTWORKS</Button>
                    </Link>
                  </div>
                    

                  <br />

                  <div className={classes.bottomArea}>
                    Balance, wallet details and My artworks portfolio (fracts i own)
                    <br /><br /><br />
                    <Link className={classes.registerButton} to='/'>
                      <Button className={classes.register}>MY PORTFOLIO</Button>
                    </Link>  
                  </div>

                </div>

            //) :  null 
            }               
          
          </div>
          
                      
          
          <br />

         
        
        </div>
    )
  }
  
  Profile.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(Profile);
  
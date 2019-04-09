import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import profileImg from '../assets/images/jacopo-caracci.jpg';

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: '90%',
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  }),
  blu: {color: 'blue',},
  /*title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.protectedTitle
  },
  stripe_connect: {
    marginRight: '10px',
  },
  stripe_connected: {
    verticalAlign: 'super',
    marginRight: '10px'
  },*/
  spacer: { minHeight: 100, },
  bigAvatar: { margin:20, width: 120, height: 120, },
  bigPerson: { width: 120, height: 120, },
  userName: {fontSize: 20, fontWeight: 600, },
  userDetail: {fontSize: 20,},
  fullBtn: {
    fontSize: 12, marginTop:10,
    borderStyle: 'solid', borderRadius: 4,
    width: 120, padding: 5,
  },
  btnblu: { backgroundColor: 'blue', color: '#fff', opacity: 0.9, },
  btngreen: { backgroundColor: 'green', color: '#fff', opacity: 0.9, },
  btnFloat: {
    float: 'left', marginLeft: 20,
  },
  boxTopRight: {
    width:300, height:400,
    backgroundColor: 'pink', color: 'black', 
    margin: 'auto', fontSize: 20,
  },
  tblTokenTdLeft: {
    padding: 20,
    borderLeft: '1px solid #dedede',
    borderTop: '1px solid #dedede', borderBottom: '1px solid #dedede',
    fontSize: 20,
  },
  tblTokenTdRight: {
    padding: 20,
    borderRight: '1px solid #dedede',
    borderTop: '1px solid #dedede', borderBottom: '1px solid #dedede',
    fontWeight: 600,
    fontSize: 20,
  },
  section: {},
  sectionContainer: {},
  sectionTitle: {
    color: 'blue', fontSize: 22, 
    marginLeft: 20, marginBottom: 10, 
    fontWeight: 800,  
  },
  sectionText: {
    fontSize: 20, width: '75%', float: 'left',
  },
})

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
  
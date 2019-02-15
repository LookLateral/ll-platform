import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import BackgroundLeft from '../../shared/images/image-home-sx.jpg';
import WPContent from '../../shared/components/layout/WPcontent';

const styles = {
  root: { flexGrow: 1, marginTop: -150 },
  card: {
    height: 'calc(100% - 150px)',
    overflow: '',
    marginTop: 150, 
    padding: 0,
    textAlign: 'center',
    boxShadow: 'none',
  },
  cardContent1: {
    padding: 0, paddingBottom: '0px !important',
    backgroundImage: `url(${BackgroundLeft})`, backgroundSize: 'cover',
    height: '100%',
  },
  cardContent2: { padding: 0, paddingBottom: '0px !important', height: '100%', },
  spacer: { minHeight: 100, },
  subtitle: {
    fontSize: 36, marginBottom: 30,
    color: 'rgb(255,255,255,0.9)',   
  },
  pos: {
    fontSize: 20, color: 'rgb(255,255,255,0.6)', 
    marginBottom: 10, marginTop: 40, 
  },
  linkAroundBtn: { textDecoration: 'none', }, 
  borderedBtn: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#fff', borderRadius: 4, border: 2,
  },
  fullBtn: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', backgroundColor: 'purple', borderRadius: 4,
  },
}

const Home = (props) => {
  
    const { classes } = props;
    const { userState } = props;
    
    //let llToken = userState.llToken ? userState.llToken : 0;
    let holdingDays = userState.investDate !== false ? Math.floor( (Date.parse(Date('Y-m-d')) - Date.parse(userState.investDate)) / (1000 * 60 * 60 * 24)) : 0;
    //let llScore = llToken * holdingDays; 

    return (  
    
    <div className={classes.root}>
      
      <Grid container spacing={0}>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent1} >
                  
                  <div className={classes.spacer}></div>

                  
                    <Typography className={classes.subtitle}>
                        WELCOME TO THE TOKEN HOLDERS DASHBOARD
                    </Typography>            
                    
                    { 
                      userState.userDenied === true ? (
                        <div>                       
                          <Typography className={classes.pos}>
                            It seems that you didn't perform our kyc...<br/>
                            If you already completed our KYC, please use the email used before.<br/>
                            Otherwise, please follow next link to perform the process
                          </Typography>   
                          <br />
                          <a 
                            href="https://xbr.brightcoin.us/signup?coinId=fd6aa11a-2cb9-4272-b37f-9d0f0e0ab953" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={classes.linkAroundBtn}
                          >
                              <Button className={classes.borderedBtn}>Look Lateral KYC</Button>
                          </a>
                        </div>
                      ) : null
                    }
                      
                    {  
                      userState.userLogged === false ? (
                        <div>
                            <Link className={classes.linkAroundBtn} to='/login'>
                              <Button className={classes.fullBtn}>LOG IN</Button>
                            </Link>
                        </div>
                      ) : (

                        <div>
                          <Typography className={classes.pos}>
                            TOKENs HOLD: {userState.llToken}<br /><br />
                            HOLDING DAYS: {holdingDays}<br /><br />
                            LOOK SCORE: {userState.llScore}
                          </Typography>   
                          
                          <br />

                          <a 
                            href="https://www.looklateral.com/LLWhitePaper.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={classes.linkAroundBtn}
                          >
                            <Button className={classes.borderedBtn}>WHITE PAPER</Button>
                          </a>
                        </div>
                      )
                    }

                    {  
                      userState.llRegistered === true ? (                      
                        <div>
                          <Typography className={classes.pos}>
                          YOU ARE A LOOK LATERAL USER SINCE <br /> {userState.registrationDate}
                          </Typography>                                        
                        </div>
                      
                      ) : 
                        userState.userLogged === true ? (
                          <div>
                            <Typography className={classes.pos}>
                            Don't waste time, register to Look Lateral Platform
                            </Typography>                                        
                            <br />  
                            <Link className={classes.linkAroundBtn} to='/register'>
                              <Button className={classes.borderedBtn}>REGISTER</Button>
                            </Link>
                          </div>
                        ) : null
                    }
                  
                </CardContent>
              </Card>
          </Grid>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent2}>                  
                  <WPContent userState={userState} />       
                </CardContent>
              </Card>
          </Grid>
      
      </Grid>
      </div>
    )
  }
  
  Home.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(Home);
  
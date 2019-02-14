import React/*, { Component }*/ from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import BackgroundLeft from '../../shared/images/image-home-sx.jpg';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const styles = theme => ({
  root: { flexGrow: 1, marginTop: -150 },
  card: {
    height: 'calc(100% - 150px)',
    overflow: '',
    marginTop: 150, //marginBottom: 40, minWidth: 275, minHeight: 650,
    padding: 0,//padding: theme.spacing.unit * 2,
    textAlign: 'center',
    boxShadow: 'none',
  },
  cardContent1: {
    padding: 0, paddingBottom: '0px !important',
    backgroundImage: `url(${BackgroundLeft})`, backgroundSize: 'cover',
    height: '100%',
  },
  cardContent2: { padding: 0, paddingBottom: '0px !important', height: '100%', },

  cardLogin: {
    width: '70%', height: '70%',
    margin: 'auto',
  },
  spacer: { minHeight: 100, },
  titleLogin: { fontSize: 24, marginTop: 40, },
  textLogin: {fontSize: 20,},
  textSmLogin: {fontSize: 12,},
  linkAroundBtn: { textDecoration: 'none', }, 
  borderedBtn: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', borderColor: '#fff', borderRadius: 4, border: 2,
  },
  fullBtn: {
    color: '#fff', fontSize: 15, marginTop:40,
    borderStyle: 'solid', backgroundColor: 'purple', borderRadius: 4,
  },
  textField: {
    marginLeft: 'auto', marginRight: 'auto',
    width: '60%',
  },
})

const properties = {
  showArrows:false, showStatus:false, showIndicators:false, showThumbs:false,
  infiniteLoop:true, stopOnHover:false,emulateTouch:true,
  transitionTime: 250, interval:2000, autoPlay: true,
}


const Login = (props) => {
  
    const { classes } = props;
    const { userState } = props;
    const { handleChangeTextField } = props;
    const { handleLoginSubmit } = props;
    
    let categories = userState.categories.map ((category, index) => {       
      return <div key={index} style={{ height: userState.viewport.height-260 }}> 
                <img 
                    src={category._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} 
                    height={(userState.viewport.height -260)}
                    alt={category.acf.category_name} />
                <span className={classes.spanColored} style={{backgroundColor: category.acf.category_color}}>
                  <a 
                      href={category.acf.category_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={classes.textSpanColored}>
                  {category.acf.category_name}</a>
                </span> 
              </div> 
    });

    return (  
    
    <div className={classes.root}>
      
      <Grid container spacing={0}>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent1} >
                  
                  <div className={classes.spacer}></div>

                    <Card className={classes.cardLogin}>                  

                      <Typography className={classes.titleLogin}>LOG IN</Typography>

                      {
                        userState.logged === true ? (

                          <div>

                            <Typography className={classes.textLogin}>You're already logged.</Typography>

                            <Link className={classes.linkAroundBtn} to='/logout'>
                              <Button className={classes.fullBtn}>LOGOUT</Button>
                            </Link>

                          </div>

                        ) : (

                          <div>
                      
                            <TextField
                              required
                              placeholder="Email"
                              id="email"
                              label="Email"
                              className={classes.textField}
                              value={userState.emailLogin}
                              onChange={handleChangeTextField("emailLogin")}
                              margin="normal"
                            />
                            <TextField
                              placeholder="Password"
                              id="password"
                              label="Password"
                              className={classes.textField}
                              value={userState.pswLogin || ''}
                              onChange={handleChangeTextField("pswLogin")}
                              margin="normal"
                              type="password"
                            />
                            <br/><br/>

                            <Button className={classes.fullBtn} 
                              variant="contained"
                              component="span"
                              onClick={(e)=>handleLoginSubmit(e)}
                              >
                            LOG IN
                            </Button>
                            <br /><br />
                            <Typography className={classes.textSmLogin}>Forgot your password?</Typography>
                          </div>

                          

                        )
                      }

                    </Card>
                           
                </CardContent>
              </Card>
          </Grid>
         
          <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>           
                <CardContent className={classes.cardContent2}>
                    
                    <Carousel autoPlay {...properties}>
                      { categories }               
                    </Carousel>
                  
                </CardContent>
              </Card>
          </Grid>
      
      </Grid>
      </div>
    )
  }
  
  Login.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(Login);
  
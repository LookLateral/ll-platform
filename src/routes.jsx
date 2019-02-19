// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router'

// Components
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import MyArt from './components/MyArt';
import UploadArtwork from './components/UploadArtwork';
import Sidebar from './shared/components/layout/Sidebar';
import Error404 from './components/Error/404';

import aws_exports from './aws-exports';
import Amplify, { /*Auth,*/ API } from 'aws-amplify';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

Amplify.configure(aws_exports);
library.add(fab, fas);

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      userLogged: false, pswLogin: '', needToRenew: false, pswNew: '', //to change temp psw
      userLoginDatetime: false, //for session ??
      userDenied: false, //if true he tryed to login without success
      userLoaded: false, //after getUser()      
      kycCompleted: false, kycDate: false,
      llToken:0, llScore:0, investDate: false,
      llRegistered: false, registrationDate: false, registrationDateUpdate: false,
      userType: 0,      
      email:'', firstName:'', middleName:'', lastName:'', dateBirth:'',
      address:'', city:'', zipCode:'', regionState:'',
      countryCitizenship:'', countryResidence:'',
      occupation:'',    
      categories: [],
      viewport: { width: 0, height: 0, },
      sidebarOpened: false,
    }
    
    //this.getUser = this.getUser.bind(this);
    //this.login = this.login.bind(this);
    //this.post = this.post.bind(this);
    //this.renewPassword = this.renewPassword.bind(this);
    //this.resize = this.resize.bind(this);
    this.handleSidebar = this.handleSidebar.bind(this);
    this.handleChangeTextField = this.handleChangeTextField.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRenewPassword = this.handleRenewPassword.bind(this);
  }

  handleChangeTextField = name => event => { this.setState({ [name]: event.target.value }); };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.login().then( response => { 
  
      /* ZUNOTE: create a token in localStorage - need to use Auth0 [https://auth0.com/signup]?? - also, localStorage or sessionStorage? */
      if(response){
        sessionStorage.setItem("ll_user_email", this.state.email);

        /* ZUNOTE: if this.state.renew -> change password process */
        if(this.state.needToRenew) this.props.history.push('/login'); 
        else this.props.history.push('/'); 
      } 
    });
  }

  login = async () => {

    if(this.state.email==='' || this.state.pswLogin===''){
          alert('Please complete all required fields'); 
          return false; 
    } else {
      
      const response = await API.get('llplatformAPI', '/users/' + this.state.email);   
      if(!isEmpty(response)){

        /* ZUNOTE: need to find something like this in db:
        {
          "user_email": "simone.baroni83@gmail.com",
          "pswLogin": "Looklateral123!",
          "needToRenew": true,
          "kycCompleted": true,
          "kycDate": "2019-01-28", 
          "llToken": 246964,
          "investDate": "2019-01-30",
          "userType": 1
        } */
        
        if(this.state.pswLogin === response[0].pswLogin){
          
          if(this.state.userLoaded === false) { 
            let holdingDays = Math.floor( (Date.parse(Date('Y-m-d')) - Date.parse(response[0].investDate)) / (1000 * 60 * 60 * 24));
            let llScore = response[0].llToken * holdingDays; 
            if(response[0].user_email === '' || response[0].llToken === '' || response[0].investDate === '')
              console.log('Problems in login: psw correct but missing data\n' + JSON.stringify(response));

            this.setState({   
              userLogged: true, pswLogin: this.state.pswLogin, needToRenew: response[0].needToRenew,
              userLoginDatetime: Date('Y-m-d'), //for session ??
              userDenied: false, //he logged in with success
              userLoaded: response[0].llRegistered, //if registered i know is "completely" loaded
              llRegistered: response[0].llRegistered || false, registrationDate: response[0].registrationDate || false, registrationDateUpdate: response[0].registrationDateUpdate || false,
              userType: response[0].userType || 1,
              kycCompleted: response[0].kycCompleted || false, kycDate: response[0].kycDate || false,
              llToken: response[0].llToken, investDate: response[0].investDate, llScore: llScore,
              email: response[0].user_email,         
              firstName: response[0].firstName || '', middleName:response[0].middleName || '', lastName: response[0].lastName || '', dateBirth: response[0].dateBirth || '',
              address:response[0].address || '', city:response[0].city || '', zipCode:response[0].zipCode || '', regionState:response[0].regionState || '',
              countryCitizenship:response[0].countryCitizenship || '', countryResidence:response[0].countryResidence || '',
              occupation:response[0].occupation || ''      
            },  function () { 
              //console.log('routes.js login:\n' + JSON.stringify(this.state)); 
            });         
          } 
        } else { alert('Wrong Password'); this.setState({ userDenied: true }); return false; }  
      } else { alert('Wrong Email'); this.setState({ userDenied: true }); return false; }  
    }
    return true;
  }

  handleLogout = () => {
    sessionStorage.removeItem("ll_user_email");
    this.setState({   
      userLogged: false, pswLogin: '', needToRenew: false, userLoginDatetime: false, 
      userDenied: false, userLoaded: false,     
      kycCompleted: false, kycDate: false,
      llToken:0, llScore:0, investDate: false,
      llRegistered: false, registrationDate: false, registrationDateUpdate: false, userType: 0,      
      email:'', firstName:'', middleName:'', lastName:'', dateBirth:'',
      address:'', city:'', zipCode:'', regionState:'',
      countryCitizenship:'', countryResidence:'',  occupation:''      
    }, function () {
      this.props.history.push('/');
    });
  }

  getUser = async () => {
    console.log('getUser from email saved in sessionStorage');
    const response = await API.get('llplatformAPI', '/users/' + this.state.email);
    if(response){
      let holdingDays = Math.floor( (Date.parse(Date('Y-m-d')) - Date.parse(response[0].investDate)) / (1000 * 60 * 60 * 24));
      let llScore = response[0].llToken * holdingDays; 
      
      this.setState({   
        userLogged: true, pswLogin: response[0].pswLogin, needToRenew: response[0].needToRenew,
        userLoginDatetime: Date('Y-m-d'), //for session ??
        userDenied: false, //he logged in with success
        userLoaded: response[0].llRegistered, //if registered i know is completely loaded
        llRegistered: response[0].llRegistered || false, registrationDate: response[0].registrationDate || false, registrationDateUpdate: response[0].registrationDateUpdate || false,
        userType: response[0].userType || 1,
        kycCompleted: response[0].kycCompleted || false, kycDate: response[0].kycDate || false,
        llToken: response[0].llToken, investDate: response[0].investDate, llScore: llScore,          
        firstName: response[0].firstName, middleName:response[0].middleName, lastName: response[0].lastName, dateBirth: response[0].dateBirth,
        address:response[0].address, city:response[0].city, zipCode:response[0].zipCode, regionState:response[0].regionState,
        countryCitizenship:response[0].countryCitizenship, countryResidence:response[0].countryResidence,
        occupation:response[0].occupation,      
        
      },  function () { 
        //console.log('routes.js getUser:\n' + JSON.stringify(this.state)); 
        /* ZUNOTE: need to check the getCurrentLocation and the state.. i.e. can't see profile page if not logged.. */
        let page = window.location.href.toString().split(window.location.host)[1];
        if( (page==='/register' || page==='/profile') && !this.state.userLogged ) window.location.href = '/login';
      });
    } 
  }

  handleRegistrationSubmit = (e) => {
    e.preventDefault();
    this.post();
    console.log('posting registration');
  }
  
  post = async () => {
    if(this.state.firstName==='' || this.state.lastName===''){
        alert('Please complete all required fields'); 
        return false;

    } else {    
      /* ZUNOTE: need to use update instead of post */
      const response = await API.post('llplatformAPI', '/users/', {
        body: {
          user_email:this.state.email, pswLogin: this.state.pswLogin, needToRenew: this.state.needToRenew,
          firstName:this.state.firstName || null, middleName:this.state.middleName || null, lastName:this.state.lastName || null,          
          address:this.state.address || null, city:this.state.city || null, zipCode:this.state.zipCode || null, regionState:this.state.regionState || null,
          countryCitizenship:this.state.countryCitizenship || null, countryResidence:this.state.countryResidence || null,
          dateBirth:this.state.dateBirth || null, occupation:this.state.occupation || null,  
          kycCompleted: this.state.kycCompleted, kycDate: this.state.kycDate,
          llToken:this.state.llToken, llScore:this.state.llScore, investDate: this.state.investDate,
          llRegistered: true, registrationDate: Date('Y-m-d'), registrationDateUpdate: Date('Y-m-d'), 
          userType: this.state.userType 
        }
      });      

      this.setState({
        llRegistered: true, 
        registrationDate: Date('Y-m-d'), 
        registrationDateUpdate: Date('Y-m-d')    
      }, function () { 
        this.props.history.push('/'); 
        //console.log('post response:\n' + JSON.stringify(response)); 
      });
    }
  }

  handleRenewPassword = (e) => {
    e.preventDefault();
    this.renewPassword();
    console.log('changing password');
  }

  renewPassword = async () => {
    if(this.state.pswNew !== '' && this.state.pswNew !== this.state.pswLogin){
      const response = await API.post('llplatformAPI', '/users/', {
        body: {
          user_email:this.state.email, pswLogin: this.state.pswNew, needToRenew: false,
          firstName:this.state.firstName || null, middleName:this.state.middleName || null, lastName:this.state.lastName || null,          
          address:this.state.address || null, city:this.state.city || null, zipCode:this.state.zipCode || null, regionState:this.state.regionState || null,
          countryCitizenship:this.state.countryCitizenship || null, countryResidence:this.state.countryResidence || null,
          dateBirth:this.state.dateBirth || null, occupation:this.state.occupation || null,  
          kycCompleted: this.state.kycCompleted, kycDate: this.state.kycDate,
          llToken:this.state.llToken, llScore:this.state.llScore, investDate: this.state.investDate,
          llRegistered: this.state.llRegistered, registrationDate: this.state.registrationDate, registrationDateUpdate: this.state.registrationDateUpdate, 
          userType: this.state.userType 
        }
      });      
      this.setState({
        needToRenew: false, 
        pswLogin: this.state.pswNew,
      }, function () { this.props.history.push('/'); });
    } else {
      alert('Please fill in a valid password');
      return false;
    }
  }

  handleSidebar = () => { this.setState({ sidebarOpened: !this.state.sidebarOpened }) }

  componentDidMount() { window.addEventListener('resize', this.resize); }
  
  componentWillUnmount() { window.removeEventListener('resize', this.resize); }

  resize = () => {
    if(this.state.viewport.width !== document.documentElement.clientWidth || this.state.viewport.height !== document.documentElement.clientHeight){
      this.setState({
        viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
      }, function () { this.forceUpdate() }); 
    }
  }

  componentWillMount () {     

    var ll_user_email = sessionStorage.getItem("ll_user_email");
    if(ll_user_email) 
      this.setState({ email: ll_user_email }, function() { this.getUser(); });

    let dataURL = "http://blog.looklateral.com/wp-json/wp/v2/platformcategories?_embed"; 
    fetch (dataURL) 
      .then (res => res.json ()) 
      .then (res => { 
        this.setState ({ categories: res }); 
      }) 

    if(this.state.viewport.width !== document.documentElement.clientWidth){
      this.setState({
        viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
      }); 
    }
  }
  
  render() {

    return (
        
        <App userState={this.state} handleSidebar={this.handleSidebar} >
          <Switch>
            
            <Route path="/" exact render={(props) => <Home userState={this.state} {...props} /> } />
            
            <Route path="/login" exact render={(props) => <Login 
                                                              userState={this.state} 
                                                              handleChangeTextField={this.handleChangeTextField}
                                                              handleLoginSubmit={this.handleLoginSubmit}
                                                              handleLogout={this.handleLogout}
                                                              handleRenewPassword={this.handleRenewPassword}
                                                              {...props} /> } />
            
            <Route path="/register" exact render={(props) => <Register 
                                                              userState={this.state} 
                                                              handleChangeTextField={this.handleChangeTextField}
                                                              handleRegistrationSubmit={this.handleRegistrationSubmit}
                                                              {...props} /> } />
            
            <Route path="/profile" exact render={(props) => <Profile userState={this.state} {...props} /> } />
            
            <Route path="/my-art" exact render={(props) => <MyArt userState={this.state} {...props} /> } />
            
            <Route path="/upload-artwork" exact render={(props) => <UploadArtwork userState={this.state} {...props} /> } />
            
            <Route component={Error404} />
          
          </Switch>

          <Sidebar 
                    isOpen={this.state.sidebarOpened}
                    userLogged={ this.state.userLogged} 
                    userType={ this.state.userType}
                    handleLogout={this.handleLogout}
                /> 
        </App>
    )
  }
}
export default withRouter(AppRoutes);    

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
  
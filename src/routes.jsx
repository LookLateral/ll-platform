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

Amplify.configure(aws_exports);

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     

      // User state flags
      userLogged: false, userLoaded: false,
      userLoginDatetime: null,
      needToRenewPsw: false, pswToRenew: null,

      // user model in db
      email:null, pswLogin: null,           
          
      userRegistered: false, 
      userFullyRegistered: false,
      registrationDate: null, 
      registrationDateUpdate: null,
  
      userType: 0, 
      investorStatus: false, 
      userCanUpload: false,   
      userFimartActive: false,   
      llToken:0, llScore:0, investDate: null,
      userPublicKey: null, userPrivateKey: null,

      firstName:null, middleName:null, lastName:null, 
      dateBirth:null,
      address:null, city:null, zipCode:null, 
      regionState:null, countryCitizenship:null, countryResidence:null,
      occupation:null,    
      
      // useful stuff
      categories: [],
      viewport: { width: 0, height: 0, },
      sidebarOpened: false,
    }
    
    //this.getUser = this.getUser.bind(this);
    //this.login = this.login.bind(this);
    //this.register = this.register.bind(this);
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

    if(this.state.email===null || this.state.pswLogin===null){
          alert('Please complete all required fields'); 
          return false; 
    } else {
      
      const response = await API.get('llplatformAPI', '/users/' + this.state.email);   
      if(!isEmpty(response)){
 
        if(this.state.pswLogin === response[0].pswLogin){
          
          if(this.state.userLoaded === false) { 
      
            if(response[0].user_email === '')
              console.log('Problems in login: psw correct but missing data\n' + JSON.stringify(response));

            this.setState({                  
              email: response[0].user_email, pswLogin: this.state.pswLogin,                     
              userLogged: true, 
              //needToRenewPsw: false, pswToRenew: null,
              userLoginDatetime: Date('Y-m-d h:m:s'),
              userLoaded: true,
              userRegistered: response[0].userRegistered || false, 
              userFullyRegistered: response[0].userFullyRegistered || false,
              registrationDate: response[0].registrationDate || null, 
              registrationDateUpdate: response[0].registrationDateUpdate || null, 

              userType: response[0].userType || 0, 
              investorStatus: response[0].investorStatus || null, 
              userCanUpload: response[0].userCanUpload || false,   
              userFimartActive: response[0].userFimartActive || false,   
              llToken:response[0].llToken || 0, llScore:response[0].llScore || 0, 
              investDate: response[0].investDate || null,
              userPublicKey: response[0].userPublicKey || null, userPrivateKey: response[0].userPrivateKey || null,

              firstName:response[0].firstName || null, middleName:response[0].middleName || null, lastName:response[0].lastName || null,
              address:response[0].address || null, city:response[0].city || null, zipCode:response[0].zipCode || null, regionState:response[0].regionState || null,
              countryCitizenship:response[0].countryCitizenship || null, countryResidence:response[0].countryResidence || null,
              dateBirth:response[0].dateBirth || null, occupation:response[0].occupation || null
            },  function () { 
              console.log('routes.js login:\n' + JSON.stringify(this.state)); 
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
      userLogged: false, 
      email:null, pswLogin: null, 
      needToRenewPsw: false, pswToRenew: null,
      userLoginDatetime: false,
      userLoaded: false,    
      userRegistered: false, 
      userFullyRegistered: false,
      registrationDate: null, 
      registrationDateUpdate: null,

      userType: 0, 
      investorStatus: false, 
      userCanUpload: false,   
      userFimartActive: false,   
      llToken:0, llScore:0, investDate: null,
      userPublicKey: null, userPrivateKey: null,

      firstName:null, middleName:null, lastName:null, 
      dateBirth:null,
      address:null, city:null, zipCode:null, 
      regionState:null, countryCitizenship:null, countryResidence:null,
      occupation:null,   

      sidebarOpened: false,

    }, function () {
      this.props.history.push('/');
    });
  }

  handleRegistrationSubmit = (e) => {
    e.preventDefault();
    this.register();
    console.log('posting registration');
  }
  
  register = async () => {
    if(this.state.firstName===null || this.state.lastName===null || this.state.email===null || this.state.pswLogin===null){
        alert('Please complete all required fields'); 
        return false;

    } else {    
      /* ZUNOTE: need to use update instead of post */
      const response = await API.post('llplatformAPI', '/users/', {
        body: {
          // only attributes in "user model in db"
          user_email:this.state.email, pswLogin: this.state.pswLogin,          
          userRegistered: true, 
          userFullyRegistered: this.state.userFullyRegistered || false,
          registrationDate: this.state.registrationDate !== null ? this.state.registrationDate : Date('Y-m-d'), 
          registrationDateUpdate: Date('Y-m-d'), 

          userType: this.state.userType || 0, 
          investorStatus: this.state.investorStatus || false, 
          userCanUpload: this.state.userCanUpload || false,   
          userFimartActive: this.state.userFimartActive || false,   
          llToken:this.state.llToken || 0, llScore:this.state.llScore || 0, 
          investDate: this.state.investDate || null,
          userPublicKey: this.state.userPublicKey || null, userPrivateKey: this.state.userPrivateKey || null,

          firstName:this.state.firstName || null, middleName:this.state.middleName || null, lastName:this.state.lastName || null,
          address:this.state.address || null, city:this.state.city || null, zipCode:this.state.zipCode || null, regionState:this.state.regionState || null,
          countryCitizenship:this.state.countryCitizenship || null, countryResidence:this.state.countryResidence || null,
          dateBirth:this.state.dateBirth || null, occupation:this.state.occupation || null 
  
        }
      });      

      this.setState({
        userRegistered: true, 
        registrationDate: this.state.registrationDate !== null ? this.state.registrationDate : Date('Y-m-d'), 
        registrationDateUpdate: Date('Y-m-d')    
      }, function () { 
        this.props.history.push('/signin'); 
        console.log('register response:\n' + JSON.stringify(response)); 
      });
    }
  }

  handleRenewPassword = (e) => {
    e.preventDefault();
    this.renewPassword();
    console.log('changing password');
  }

  renewPassword = async () => {
    if(this.state.pswToRenew !== null && this.state.pswToRenew !== this.state.pswLogin){
      const response = await API.post('llplatformAPI', '/users/', {
        body: {
          // only attributes in "user model in db"
          user_email:this.state.email, pswLogin: this.state.pswToRenew,                    
          userRegistered: this.state.userRegistered || false, 
          userFullyRegistered: this.state.userFullyRegistered || false,
          registrationDate: this.state.registrationDate !== null ? this.state.registrationDate : Date('Y-m-d'), 
          registrationDateUpdate: Date('Y-m-d'), 

          userType: this.state.userType || 0, 
          investorStatus: this.state.investorStatus || false, 
          userCanUpload: this.state.userCanUpload || false,   
          userFimartActive: this.state.userFimartActive || false,   
          llToken:this.state.llToken || 0, llScore:this.state.llScore || 0, 
          investDate: this.state.investDate || null,
          userPublicKey: this.state.userPublicKey || null, userPrivateKey: this.state.userPrivateKey || null,

          firstName:this.state.firstName || null, middleName:this.state.middleName || null, lastName:this.state.lastName || null,
          address:this.state.address || null, city:this.state.city || null, zipCode:this.state.zipCode || null, regionState:this.state.regionState || null,
          countryCitizenship:this.state.countryCitizenship || null, countryResidence:this.state.countryResidence || null,
          dateBirth:this.state.dateBirth || null, occupation:this.state.occupation || null 
        }
      });      
      this.setState({
        needToRenewPsw: false, 
        pswLogin: this.state.pswToRenew,
        pswToRenew: null,
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

  getUser = async () => {
    console.log('getUser from email saved in sessionStorage');
    const response = await API.get('llplatformAPI', '/users/' + this.state.email);
    if(response){
      
      this.setState({   
        //email:response[0].email, 
        pswLogin: response[0].pswLogin,          
        
        userLogged: true, 
        needToRenewPsw: false, pswToRenew: null,
        userLoginDatetime: Date('Y-m-d h:m:s'),
        userLoaded: true,
        userRegistered: response[0].userRegistered || false, 
        userFullyRegistered: response[0].userFullyRegistered || false,
        registrationDate: response[0].registrationDate || null, 
        registrationDateUpdate: response[0].registrationDateUpdate || null, 

        userType: response[0].userType || 0, 
        investorStatus: response[0].investorStatus || false, 
        userCanUpload: response[0].userCanUpload || false,   
        userFimartActive: response[0].userFimartActive || false,   
        llToken:response[0].llToken || 0, llScore:response[0].llScore || 0, 
        investDate: response[0].investDate || null,
        userPublicKey: response[0].userPublicKey || null, userPrivateKey: response[0].userPrivateKey || null,

        firstName:response[0].firstName || null, middleName:response[0].middleName || null, lastName:response[0].lastName || null,
        address:response[0].address || null, city:response[0].city || null, zipCode:response[0].zipCode || null, regionState:response[0].regionState || null,
        countryCitizenship:response[0].countryCitizenship || null, countryResidence:response[0].countryResidence || null,
        dateBirth:response[0].dateBirth || null, occupation:response[0].occupation || null
        
      },  function () { 
        //console.log('routes.js getUser:\n' + JSON.stringify(this.state)); 
        /* ZUNOTE: need to check the getCurrentLocation and the state.. i.e. can't see profile page if not logged.. */
        let page = window.location.href.toString().split(window.location.host)[1];
        if( (page==='/signup' || page==='/profile') && !this.state.userLogged ){
          //window.location.href = '/signin';
          this.props.history.push('/signin');
        }
      });
    } 
  }
  
  render() {

    return (
        
        <App userState={this.state} handleSidebar={this.handleSidebar} >
          <Switch>
            
            <Route path="/" exact render={(props) => <Home userState={this.state} {...props} /> } />
            
            <Route path="/signin" exact render={(props) => <Login 
                                                              userState={this.state} 
                                                              handleChangeTextField={this.handleChangeTextField}
                                                              handleLoginSubmit={this.handleLoginSubmit}
                                                              handleLogout={this.handleLogout}
                                                              handleRenewPassword={this.handleRenewPassword}
                                                              {...props} /> } />
            
            <Route path="/signup" exact render={(props) => <Register 
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
                    userState={this.state}
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
  
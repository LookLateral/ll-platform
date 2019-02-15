import React from 'react';
import Header from '../shared/components/layout/Header';
import Content from '../shared/components/layout/Content';
import Footer from '../shared/components/layout/Footer';
import IconSandwich from '../shared/components/layout/IconSandwich'
import './App.css';

class App extends React.Component {
  
  render() {
    const userState = this.props.userState;  
    //if (this.props.authState === "signedIn") {
      return (     
        <div className="App">
          <Header userState={userState} />         
          <IconSandwich isOpen={userState.sidebarOpened} onClick={() => this.props.handleSidebar() } />            
          <Content children={this.props.children} />            
          <Footer userState={userState} />
        </div>
      );
    //} else return null;
  }
}
export default App;

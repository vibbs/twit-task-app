import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import TweetsApp from './components/TweetsApp';

import {AppConsumer, AppProvider }from './components/AppContext';

firebase.initializeApp({
  apiKey: "AIzaSyC3RDSnOVpeWaH9LKey9hr3E1_5inGp-7s",
  authDomain: "twit-task.firebaseapp.com",
  projectId: "twit-task",
})


// export const AppContext = React.createContext();

// class AppProvider extends Component{
//   state = { 
//     userId : null,
//     setUserId :(userId) =>{
//       if(this.state.userId == null && userId){
//         this.setState({ userId : userId });
//         console.log("UserId set at the AppContext level");
//         console.log(userId);
//       }
      
//     }
//   }
//   render () {
//     return <AppContext.Provider value={this.state}>
//       {this.props.children}
//     </AppContext.Provider>
//   }
// }


class App extends Component {
 
  state = { 
    isSignedIn: false , 
    userID : null
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      
      this.setState({ isSignedIn: !!user });
      if(this.state.userID == null)
      this.setState({ userID : user.providerData[0].uid });

      console.log("Main SignIN page : ");
      console.log(this.state.userID);
    })
  }

  render() {
    return (
      <AppProvider>
        <div className="App">

        

          <div >
          {this.state.isSignedIn ? (
            <div>
              <nav className="navbar navbar-light bg-light">
              <span className="navbar-brand mb-0 h1">Twitter-Task</span>
              <span>
                <div>Signed In!</div>
                <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                <img
                  alt="profile picture"
                  src={firebase.auth().currentUser.photoURL}
                />
              </span>
              <AppConsumer>
                {(context) => context.setUserId(this.state.userID)}
              </AppConsumer>
              </nav>

                <div className="container">
                  {/* <AppConsumer>
                  {(context) => context.userID}
                  </AppConsumer> */}
                  <TweetsApp />
                  
                </div>

            </div>
          ) : (
            <div>
              <nav className="navbar navbar-light bg-light">
              <span className="navbar-brand mb-0 h1">Twitter-Task</span>
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
                </nav>
              <div  className="container">
                    <h3>Please signIn to see twitter stream!</h3>
                </div>

            </div>
          )}
          </div>
          
        

        
          
          
        </div>
      </AppProvider>
    );
  }
}

export default App;

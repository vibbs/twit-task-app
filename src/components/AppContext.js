import React,{Component} from 'react';

const AppContext = React.createContext();

export class AppProvider extends Component{
  state = { 
    userId : null,   
    setUserId :(userId) =>{
      if(this.state.userId == null && userId){
        this.setState({ userId : userId });
        // console.log("UserId set at the AppContext level");
        // console.log(userId);
      }
      
    }
  }
  render () {
    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  }
}


// export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
import React, {Component}  from 'react';
import Tweets from './Tweets.js';
import {AppConsumer, AppProvider }from './AppContext';


class TweetsApp extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         userId : props.userId
    //     }
    // }
    
    render(){
        //const AppContext = this.props.AppContext;
        return(  
            <div>
                 
                <h3>Tweets List</h3>

                <AppConsumer>
                    
                    {(context) => <Tweets userId={context.userId}></Tweets>}
                </AppConsumer> 
                
                
            </div>

        )
    }

}



export default TweetsApp;
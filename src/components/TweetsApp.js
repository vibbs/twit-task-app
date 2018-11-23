import React, {Component}  from 'react';
import Tweets from './Tweets.js'



class TweetsApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId : props.userId
        }
    }
    
    render(){
        return(  
            <div>
                <h3>Tweets List</h3>
                <Tweets userId={this.state.userId}></Tweets>
            </div>

        )
    }

}



export default TweetsApp;
import React, {Component}  from 'react';
import axios from 'axios';
import io from "socket.io-client";
import Tweet from './Tweet';
import { css } from 'react-emotion';
import { CircleLoader } from 'react-spinners';
import {AppConsumer, AppProvider }from './AppContext';
var _ = require('underscore');

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class Tweets extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId : props.userId,
            tweets : [],
            loading: true
        }
    }
    componentDidMount(){
        
        setTimeout(() => {
            console.log("UserId : " + this.props.userId);
            this.streamTweets(this.props.userId);
            this.getTweets(this.props.userId);
          }, 100);
	}
    streamTweets(userId){
        
        const socket = io(process.env.REACT_APP_BACKEND_API, {query:"userId="+userId});

        socket.on('connect', () => {
            console.log("Socket Connected");
            socket.on(userId, data => {
                let new_tweets = [data].concat(this.state.tweets);
                var new_tweets_unq = _.uniq(new_tweets, 'id_str')

                //sorting by created_at for better rendering
                new_tweets_unq = _.sortBy(new_tweets_unq, function(o) { return new Date(o.created_at); })
                this.setState({ tweets: new_tweets_unq.reverse() , loading :false});
            });
        });
        socket.on('disconnect', () => {
            socket.removeAllListeners("tweets");
            console.log("Socket Disconnected");
        });
    } 
    getTweets(userId){
        axios.get(process.env.REACT_APP_BACKEND_API + "api?userId="+userId)
		.then(response => {
            // console.log(response.data);
            
            let new_tweets = response.data.concat(this.state.tweets);
                var new_tweets_unq = _.uniq(new_tweets, 'id_str')

                //sorting by created_at for better rendering
                new_tweets_unq = _.sortBy(new_tweets_unq, function(o) { return new Date(o.created_at); })
                this.setState({ tweets: new_tweets_unq.reverse() , loading :false});
		}).catch(err => console.log(err))
    }
    render(){
        const tweetItems = this.state.tweets.map((tweet, i) => {
			return (
				<Tweet item={tweet} key= {tweet.id_str}/>
			)
		})
        const linkProps = {target: '_blank', rel: 'noreferrer'}
        return (  
            
            <div>
                {/* <AppConsumer>
                    {(context) => context.userId}
                </AppConsumer> */}
                <div className='sweet-loading'>
                    <CircleLoader
                    className={override}
                    sizeUnit={"px"}
                    size={50}
                    color={'#123abc'}
                    loading={this.state.loading}
                    />
                </div> 
                <ul className="collection">
                    {tweetItems}
                </ul>
			</div>
        )
    }

}



export default Tweets;



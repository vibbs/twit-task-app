import React, {Component}  from 'react';
import io from "socket.io-client";
import Tweet from './Tweet';
import { css } from 'react-emotion';
import { CircleLoader } from 'react-spinners';
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
		this.getTweets();
	}
    getTweets(){
        
        const socket = io(process.env.REACT_APP_BACKEND_API, {query:"userId="+this.state.userId});

        socket.on('connect', () => {
            console.log("Socket Connected");
            socket.on("tweets", data => {
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
    render(){
        const tweetItems = this.state.tweets.map((tweet, i) => {
			return (
				<Tweet item={tweet} key= {tweet.id_str}/>
			)
		})
        const linkProps = {target: '_blank', rel: 'noreferrer'}
        return (  
            
            <div>
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



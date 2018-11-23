import React, {Component}  from 'react';
import {TwitterTweetEmbed} from 'react-twitter-embed';


// const tweetData = {
//     id_str: '1058010455640363009',
//     user: {
//         name: 'R',
//         screen_name: 'rprabha',
//         profile_image_url:
//         'http://pbs.twimg.com/profile_images/1218664259/IMG_2410_normal.JPG',
//     },
//     text:
//    'RT @rasbt: Just learned that there\'s a sklearn_porter package -- a tool to "transpile trained scikit-learn estimators to C, Java, JavaScrip…',
  
//     created_at: 'Thu Nov 01 14:58:44 +0000 2018',
//     favorite_count: 0,
//     retweet_count: 10,
//     entities: {
//         urls: [],
//         user_mentions: [],
//         hashtags: [],
//         symbols: []
//       } 
//   };

class TweetClass extends Component {
    constructor(props){
		super(props);
		this.state = {
			item : props.item
        }
        console.log(props.item);
	}
    render(){

        const linkProps = {target: '_blank', rel: 'noreferrer'}
        return (  
            <div>
                {/* <Tweet data={this.state.item} linkProps={linkProps} /> */}
                <TwitterTweetEmbed
                    tweetId={this.state.item.id_str}
                />
            </div>
            
        )
    }

}



export default TweetClass;

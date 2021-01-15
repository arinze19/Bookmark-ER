const app = Vue.createApp({
    data() {
      return {
        maxCharactersLength: 280,
        tweetCharacters: "",
        remainingCharacters: 280,
        liked: false,
        tweets: [],
        favTweets: [],
        sourceImg: 'https://pbs.twimg.com/profile_images/1278577817014411264/wRS_3jPo_400x400.jpg'
      };
    },
    methods: {
      like() {
        this.liked = !this.liked;
      },
      addTweet() {
          const id       = new Date().toISOString()
          const newTweet = {
              value: this.tweetCharacters,
              id: id
          }
          this.tweets.push(newTweet)
          this.tweetCharacters = ''
      },
      removeItem(event) {
          const tweetId = event.path[4].id
          this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId)
      }
    },
    computed: {
      checkTweetLength() {
        if (this.remainingCharacters === 0) {
          return;
        } else {
          return (this.remainingCharacters =
            this.maxCharactersLength - this.tweetCharacters.length);
        }
      },
      getTimestamp() {
        const day = String(new Date());
        const stringDay = day.split("");
        const returnDay = stringDay.splice(4, 7).join("");
  
        return returnDay;
      },
    },
  });
  
  app.mount("#app");
  
  
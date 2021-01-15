const app = Vue.createApp({
  data() {
    return {
      maxCharactersLength: 280,
      tweetCharacters: "",
      remainingCharacters: 280,
      liked: false,
      clipCopied: false,
      tweets: JSON.parse(localStorage.getItem('tweets')) || [],
      sourceImg:
        "https://pbs.twimg.com/profile_images/1278577817014411264/wRS_3jPo_400x400.jpg",
    };
  },

  methods: {
    like() {
      this.liked = !this.liked;
    },

    addTweet() {
      if(this.tweetCharacters === "") return

      const id = new Date().toISOString();
      const newTweet = {
        value: this.tweetCharacters,
        id: id
      };

      this.tweets.push(newTweet);
      this.storeTweet(this.tweets)
      this.tweetCharacters = "";
    },

    storeTweet(tweets) {
      localStorage.setItem('tweets', JSON.stringify(tweets))
    },

    deleteLocalTweet(tweetId) {
      let storedTweets   = JSON.parse(localStorage.getItem('tweets'))
      storedTweets       = storedTweets.filter(tweet => tweet.id !== tweetId)

      localStorage.setItem('tweets', JSON.stringify(storedTweets))
    },

    removeItem(event) {
      const tweetId = event.path[4].id;
      this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);

      this.deleteLocalTweet(tweetId)
    },

    async clipItem(e) {
      if(!navigator.clipboard) return
      const tweetId = e.path[4].id
      const tweet   = this.tweets.find((tweet) => tweet.id === tweetId)
      const value   = tweet.value

      await navigator.clipboard.writeText(value)
      this.clipCopied = true
      setTimeout(() => {
        this.clipCopied = false
      }, 500)
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
    validateTweet() {

    }
  },
});

app.mount("#app");

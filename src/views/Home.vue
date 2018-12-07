<template>
  <div class="columns">
    <div class="column">
      <tweetComponent v-for="tweet in tweets" :tweet="tweet"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import tweetComponent from "@/components/tweetComponent.vue";

export default {
  name: "home",
  components: {
    tweetComponent
  },
  data(){
    return {
    tweets: [
      {
        id: 1,
        name: 'James',
        handle: '@jokerjames',
        img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
        tweet: "If you don't succeed, dust yourself off and try again.",
        likes: 10,
      },
      { 
        id: 2,
        name: 'Fatima',
        handle: '@fantasticfatima',
        img: 'https://semantic-ui.com/images/avatar2/large/molly.png',
        tweet: 'Better late than never but never late is better.',
        likes: 12,
      },
      {
        id: 3,
        name: 'Xin',
        handle: '@xeroxin',
        img: 'https://semantic-ui.com/images/avatar2/large/elyse.png',
        tweet: 'Beauty in the struggle, ugliness in the success.',
        likes: 18,
      }
    ]
    }
  }
};
</script>

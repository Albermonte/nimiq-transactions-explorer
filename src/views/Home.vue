<template>
  <div class="columns">
    <div class="column">
      <formComponent v-on:formIsOk="set_form_to_OK" v-if="!formOK"/>
      <tweetComponent v-else v-for="tweet in tweets" :tweet="tweet"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import tweetComponent from "@/components/tweetComponent.vue";
import formComponent from "@/components/formComponent.vue";

export default {
  name: "home",
  components: {
    tweetComponent,
    formComponent
  },
  data() {
    return {
      formOK: false,
      tweets: [
        {
          id: 1,
          name: "James",
          handle: "@jokerjames",
          img: "https://semantic-ui.com/images/avatar2/large/matthew.png",
          tweet: "If you don't succeed, dust yourself off and try again.",
          likes: 10
        },
        {
          id: 2,
          name: "Fatima",
          handle: "@fantasticfatima",
          img: "https://semantic-ui.com/images/avatar2/large/molly.png",
          tweet: "Better late than never but never late is better.",
          likes: 12
        },
        {
          id: 3,
          name: "Xin",
          handle: "@xeroxin",
          img: "https://semantic-ui.com/images/avatar2/large/elyse.png",
          tweet: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        }
      ]
    };
  },
  methods: {
    set_form_to_OK() {
      this.formOK = true
    }
  }
};
</script>

<style scoped>
.columns {
  margin-top: 0.75rem;
}
</style>

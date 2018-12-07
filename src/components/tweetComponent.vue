<template>
  <div class="tweet">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="tweet.img" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{tweet.name}}</strong> <small>{{tweet.handle}}</small>
                <br>
                {{tweet.tweet}}
              </p>
            </div>
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fas fa-heart"></i></span>
                  <span class="likes">{{tweet.likes}}</span>
                </a>
              </div>
          </div>
        </article>
      </div>
    </div> 
</template>

<script>
export default {
  name: "tweetComponent",
  props: {
    tweet: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .button {
  margin-bottom: 20px;
}

 .tweet {
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 15px;
}

 .box {
  margin-bottom: 0;
  border-radius: 0;
}

 .content small {
  color: #00d1b2;
}

 img {
  border-radius: 30px;
}

 .level-item {
  padding-left: 10px;
  color: #00d1b2;
}

 input:focus {
  border-color: #00d1b2;  
}

 .likes {
  padding: 0 7.5px;
}

 input {
  font-weight: bold;
}

.tweets-move {
  transition: transform 1s;
}
</style>

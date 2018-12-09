<template>
  <div class="tx">
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img v-bind:src="'https://icon.mopsus.com/icon/' + tx.from_address + '.128.png'" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{tx.from_address}}</strong>
              <br>
              {{tx.hash}}
            </p>
          </div>
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small">
                <i class="fas fa-dollar-sign"></i>
              </span>
              <span class="NIM">{{tx.value/100000}} NIM</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "receivedComponent",
  props: {
    tx: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  margin-bottom: 20px;
}

.tx {
  max-width: 680px;
  margin: 0 auto;
  padding-bottom: 0;
  padding-top: 15px;
}

.box {
  margin-bottom: 0;
  border-radius: 0;
}

.content {
  /* 2% del viewpoint */
  font-size: 2vw;
}

/* Ajusta tamaño de letra cuando el width es más grande que la caja, así nunca se saldrá el texto de ella*/
@media screen and (min-width: 680px) { 
  .content {
     font-size: 16px;
  }
}

.content small {
  color: #00d1b2;
}

img {
  border-radius: 30px;
}

.level-item {
  display: inline-block;
  margin-left: 2px;
  color: #00d1b2;
}

input:focus {
  border-color: #00d1b2;
}

.NIM {
  padding: 0 2.5px;
}

input {
  font-weight: bold;
}

.tweets-move {
  transition: transform 1s;
}
</style>

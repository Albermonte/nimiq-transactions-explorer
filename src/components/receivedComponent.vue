<template>
  <div class="tx">
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img
              v-bind:src="'https://icon.mopsus.com/icon/' + tx.from_address + '.128.png'"
              alt="Image"
            >
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{tx.from_address}}</strong>
              <br>
              <span style="cursor: pointer" v-on:click="openInNewTab(tx.hash)">{{tx.hash}}</span>
            </p>
          </div>
          <div class="level">
          <div class="level-left">
            <div class="level-item nq-green">
              <span class="icon is-small">
                <i class="fas fa-dollar-sign"></i>
              </span>
              <span>{{tx.value/100000}} NIM</span>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item nq-blue">
              <span class="icon is-small">
                <i class="fas fa-calendar-day"></i>
              </span>
              <span class="NIM">{{(new Date(tx.timestamp * 1000)).toLocaleString()}}</span>
            </div>
          </div>
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
  },
  methods: {
    openInNewTab(hash) {
      var win = window.open(`https://nimiq.watch/#${hash}`, "_blank");
      win.focus();
    }
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

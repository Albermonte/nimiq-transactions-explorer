<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding-top: 10px;
  background-image: linear-gradient(30deg, #0582CA, #265DD7);
  background-size: cover;
}

#app {
  height: 100%;
  padding-top: 0px;
  text-align: center;
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <transition name="fade" mode="out-in">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    </transition>
  </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding-top: 10px;
  background-image: linear-gradient(225deg, #265dd7, #0582ca); /* 180º + 45 º */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#app {
  height: 100%;
  padding-top: 0px;
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>

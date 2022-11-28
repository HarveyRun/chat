<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  padding:0px;
  margin:0px;
}
input:focus, textarea:focus {
    outline: none;
}
ul li{
  list-style-type:none;
  height:24px;
  line-height: 24px;
}
::-webkit-scrollbar {
  display: none;
}
</style>

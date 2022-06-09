<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Fuekland</router-link> &nbsp;
      <router-link to="/profile">Amis</router-link> &nbsp;
      <router-link to="/map">Carte</router-link> &nbsp;
      <router-link to="/event">Evènements</router-link> &nbsp;
      <router-link to="/settings">Paramètres</router-link>
    </nav>
    <router-view />
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 !important;
}

body {
  background: radial-gradient(
    circle,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}

.navbar {
  background-color: #bbdee7;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #04aa6d;
  font-size: 26px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #2c3e50;
}
</style>

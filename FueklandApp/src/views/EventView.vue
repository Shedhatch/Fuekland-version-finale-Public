<template>
<div>
<div class="buttons">
<h1>Choisissez ce que vous voulez faire</h1>
<router-link class="button button2 redirect" to="/createEvent">Créer un événement</router-link><br>
<router-link class="button button2 redirect" to="/displayEvents">Liste des événements</router-link><br>
</div>
</div>
</template>

<style scoped>

.button {
  background-color: #04aa6d; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.button1 {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.button2:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

.buttons {
  margin: auto;
  width: 60%;
  padding: 10px;
  margin-top: auto;
}

</style>
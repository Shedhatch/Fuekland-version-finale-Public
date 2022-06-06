<template>

  <div class="profile">
  <div class="dislayEvents">
  <h1>Liste de vos événements ({{ listOfUsers.length }})</h1>
  <h2>{{joinedUsers}}</h2 >
  </div>
    <br />
    <p class="displayBox">

      <DisplaySingleEvent v-for="event in listOfUsers" :key="event.idEvent" :event="event" />
    
    </p>
  </div>
</template>

<script>
import axios from "axios";
import DisplaySingleEvent from '../components/DisplaySingleEvent.vue'
export default {
  name: 'ProfileView',
  components: {
    DisplaySingleEvent
  },
  data() {
    return {
      listOfUsers: [],
      joinedUsers: []
    };
  },
  created() {
    this.getEvents();
    this.getJoiningUsers();
  },
  methods: {
    async getEvents() {
      const response = await axios.get(
        "http://localhost:3000/" + sessionStorage.getItem("id") + "/_getEvents"
      );

      console.log("reponse ", response.data);
      
      this.listOfUsers = response.data;

    },
    async getJoiningUsers() {
        const response = await axios.get(
        "http://localhost:3000/" + sessionStorage.getItem("id") + "/_getJoiningUsers"
      );

      console.log("reponse ", response.data);
      
      this.joinedUsers = response.data;

    },
  },
};
</script>

<style scoped>
.searchBar {
  display: inline-block;
  text-align: left;
  width: 50%;
  margin: 0;
  padding: 14px;
  font-size: 18px;
}

.displayBox {
  display: inline-block;
  background-color: #04aa6d;
  width: 800px;
  padding: 10px;
  text-align: start;
  overflow:hidden;
  top:100px;
  left:50%;
}
</style>
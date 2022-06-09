<template>

  <div class="profile">
  <div class="dislayEvents">
  <h1>Événements non rejoints ({{ listOfEvents.length }})</h1>
  </div>
    <br />
    <p class="displayBox">

      <DisplaySingleEvent @refresh="refresh" v-for="event in myEvents" :key="event.idEvent" :event="event" :mine="true" :participating="false"/>
      <DisplaySingleEvent @refresh="refresh" v-for="event in listOfEvents" :key="event.idEvent" :event="event" :mine="false" :participating="false"/>
      <DisplaySingleEvent @refresh="refresh" v-for="event in participatingEvents" :key="event.idEvent" :event="event" :mine="false" :participating="true" />
    
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
      listOfEvents: [],
      joinedUsers: [],
      myEvents: [],
      participatingEvents: []
    };
  },
  created() {
    this.getEvents();
    this.getAttendees();
  },
  methods: {
    async getEvents() {
      const response = await axios.get(
        "http://localhost:3000/" + sessionStorage.getItem("id") + "/_getEvents"

      );

      console.log("reponse ", response.data);
      
      this.myEvents = response.data[0]
      this.listOfEvents = response.data[1]
      this.participatingEvents = response.data[2]

    },
    async getAttendees() {
        const response = await axios.get(
        "http://localhost:3000/" + sessionStorage.getItem("id") + "/_getAttendees"
      );

      console.log("reponse 11", response.data);
      
      this.joinedUsers = response.data;

    },
    refresh () {
      this.getEvents()
    }
  }
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
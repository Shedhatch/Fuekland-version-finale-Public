<template>
  <div class="profile">
    <img
      alt="Image manquante D:"
      :src="require('../assets/raccoon' + profileIcon + '.png')"
    />
    <h1>Bienvenue {{ iname }} {{ fname }}</h1>
    <h3>Trouvé {{ listOfUsers.length }}</h3>
    <br />
    <!-- <button @click="showProfile">Click me</button>
    <button @click="test">test</button> -->
    <input
      type="text"
      v-model="myInput"
      class="searchBar"
      placeholder="Rechercher un ami 🦝"
      name="searchForUser"
      required
    /><br />
    <p class="displayBox">
      <DisplaySingleUser v-for="user in listOfUsers" :key="user.userId" :user="user" />
    </p>
  </div>
</template>

<script>
import axios from "axios";
import DisplaySingleUser from '../components/DisplaySingleUser.vue'
export default {
  name: 'ProfileView',
  components: {
    DisplaySingleUser
  },
  data() {
    return {
      fname: "",
      iname: "",
      listOfUsers: [],
      profileIcon: "1",
      myInput: ""
    };
  },
  watch: {
    myInput(newValue) {
      if (newValue !== "") {
        this.getUsernames(newValue);
      }
      else {
        this.listOfUsers = []
      }
    },
  },
  created() {
    this.showProfile();
  },
  methods: {
    async showProfile() {
      const response = await axios.get(
        "http://localhost:3000/" + sessionStorage.getItem("id") + "/_getInfos"
      );

      this.fname = response.data[0].fname;
      this.iname = response.data[0].iname;
      this.profileIcon = response.data[0].profileIcon;
    },
    async getUsernames(name) {
      const response = await axios.get(
        "http://localhost:3000/" + name + "/_getUsernames"
      );

      console.log(response.data);
      this.listOfUsers = response.data;

    },
    async test() {
      alert(sessionStorage.getItem("id"));
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
  background-color: lightgrey;
  width: 600px;
  padding: 50px;
  text-align: start;
	overflow:hidden;
	top:100px;
	left:50%;

}
</style>
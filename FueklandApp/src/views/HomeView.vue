<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/banner.png" />
    <MainTitle msg="Bienvenue sur Fuekland" />
  </div>
</template>

<script>
// @ is an alias to /src
import MainTitle from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    MainTitle,
  },
  methods: {
    async getWebS() {
      const response = await axios.get("http://localhost:3000/ABC1/_salut");
      alert(response.data);
    },
  },
};
</script>

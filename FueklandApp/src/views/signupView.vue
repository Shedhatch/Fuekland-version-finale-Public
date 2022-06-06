<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/banner2.png" />
    <SignInForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignInForm from "@/components/DisplaySignInForm.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    SignInForm,
  },
  methods: {
    async getWebS() {
      const response = await axios.get("http://localhost:3000/ABC1/_salut");
      alert(response.data);
    },
  },
};
</script>
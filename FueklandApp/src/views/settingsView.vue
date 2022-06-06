<template>
  <div class="home">
    <SettingsForm />
  </div>
</template>

<script>
import SettingsForm from "@/components/DisplaySettingsForm.vue";

export default {
  name: "SettingsPage",
  components: {
    SettingsForm,
  }
};
</script>
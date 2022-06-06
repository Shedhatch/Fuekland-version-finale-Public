<template>
  <div class="createEvent">
    <EventForm />
  </div>
</template>

<script>
import EventForm from "@/components/DisplayEventForm.vue";

export default {
  name: "CreateEventPage",
  components: {
    EventForm,
  }
};
</script>
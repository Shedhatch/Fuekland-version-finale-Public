<template>
  <div class="userTab">
    <div id="friends">
      <div class="friend">
        <img alt="Image manquante D:" :src="require('../assets/event.png')" />
        <p>
          <strong
            >{{ event.eventName }}
            <span title="Vous êtes le propriétaire" v-if="mine"
              >🌟</span
            ></strong
          ><br />
          <span class="button">
            <button v-if="!mine && !participating" @click="joinEvent">
              Rejoindre
            </button>
            <button v-else-if="!mine && participating" @click="leaveEvent">
              ❌ Se retirer
            </button>
            <button class="subtitle" @click="seeDetails">
              Voir les détails
            </button></span
          >
        </p>
        <div class="status away"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "DisplaySingleEvent",
  props: {
    event: Object,
    mine: Boolean,
    users: Object,
    participating: Boolean,
  },
  methods: {
    async joinEvent() {
      const bodyFormData = new FormData();

      bodyFormData.append("idEvent", this.event.idEvent);
      bodyFormData.append("id", sessionStorage.getItem("id"));

      const response = await axios.post(
        "http://localhost:3000/_insertAttendees",
        bodyFormData
      );

      console.log(response.data);

      if (response.data) {
        this.statut = null;
      }
      this.$emit("refresh");
    },
    async leaveEvent() {
      const bodyFormData = new FormData();

      bodyFormData.append("idEvent", this.event.idEvent);
      bodyFormData.append("id", sessionStorage.getItem("id"));

      const response = await axios.post(
        "http://localhost:3000/_leaveEvent",
        bodyFormData
      );

      console.log(response.data);

      if (response.data) {
        this.statut = null;
      }
      this.$emit("refresh");
    },
    seeDetails() {
      Vue.use(VueSweetalert2);

      var eventStart = new Date(this.event.eventStart);
      var eventEnd = new Date(this.event.eventEnd);

      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      this.$swal(
        "🎉 " + " - " + this.event.eventName,
        this.event.eventDesc +
          "<br><br><u>Date debut</u>: " +
          eventStart.toLocaleDateString("fr-FR", options) +
          "<br><br><u>Date fin</u>: " +
          eventEnd.toLocaleDateString("fr-FR", options) +
          "<br><br>Lieu: " +
          this.event.eventLoc +
          "<br><br>Créateur: " +
          this.event.username
      );
    },
  },
};
</script>

<style>
.swal2-modal {
  background: radial-gradient(
    circle,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>

<style scoped>
.friend p span[data-v-2b304740] {
  color: #2c3e50;
}

.button {
  display: flex;
  gap: 5px;
}

.userTab {
  background-color: white;
  display: ruby;
  align-items: center;
  justify-content: left;
}

.swal2-styled.swal2-confirm {
  background-color: #db431d !important;
}

.displayBox {
  color: #fff;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 26px;
}

* {
  margin: 0px;
  padding: 0px;
}

#view-code {
  color: #89a2b5;
  opacity: 0.7;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 700;
  text-decoration: none;
  position: absolute;
  top: 660px;
  left: 50%;
  margin-left: -50px;
  z-index: 200;
}

#view-code:hover {
  opacity: 1;
}

#chatbox {
  width: 290px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  height: 484px;
  position: absolute;
  top: 100px;
  left: 50%;
  margin-left: -155px;
}

#friendslist {
  position: absolute;
  top: 0;
  left: 0;
  width: 290px;
  height: 484px;
}

#topmenu {
  height: 69px;
  width: 290px;
  border-bottom: 1px solid #d8dfe3;
}

#topmenu span {
  float: left;
  width: 96px;
  height: 70px;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/top-menu.png") -3px -118px
    no-repeat;
}

#topmenu span.friends {
  margin-bottom: -1px;
}

#topmenu span.chats {
  background-position: -95px 25px;
  cursor: pointer;
}

#topmenu span.chats:hover {
  background-position: -95px -46px;
  cursor: pointer;
}

#topmenu span.history {
  background-position: -190px 24px;
  cursor: pointer;
}

#topmenu span.history:hover {
  background-position: -190px -47px;
  cursor: pointer;
}

.friend {
  height: 70px;
  border-bottom: 1px solid #e7ebee;
  position: relative;
}

.friend:hover {
  background: #f1f4f6;
  cursor: pointer;
}

.friend img {
  width: 40px;
  border-radius: 50%;
  margin: 15px;
  float: left;
}

.floatingImg {
  width: 40px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 12px;
  border: 3px solid #fff;
}

.friend p {
  padding: 15px 0 0 0;
  float: left;
  width: 220px;
}

.friend p strong {
  font-weight: 600;
  font-size: 15px;
  color: #597a96;
}

.friend p span {
  font-size: 13px;
  font-weight: 400;
  color: #aab8c2;
}

.friend .status {
  background: #26c281;
  border-radius: 50%;
  width: 9px;
  height: 9px;
  position: absolute;
  top: 31px;
  right: 17px;
}

.friend .status.away {
  background: #ffce54;
}

.friend .status.inactive {
  background: #eaeef0;
}
</style>
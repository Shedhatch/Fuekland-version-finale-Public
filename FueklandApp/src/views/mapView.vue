<template>
  <div>
    <br>
    <l-map style="height: 700px; width: 1265px" :center="markerLatLng" :zoom="zoom">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker
        :lat-lng="markerLatLng"
        :icon="icon[userProfile - 1]"
      ></l-marker>
      <l-marker
        v-for="(friendLoc, index) in friendsLoc"
        :key="index"
        :lat-lng="friendLoc[0]"
        @mouseover="showInfos(index)"
        @mouseleave="closeInfos"
        @click="showCurrentFriend(index)"
        :icon="icon[friendLoc[1] - 1]"
      ></l-marker> </l-map
    ><br /><br />
      <div class="infos">
        <span style="background-color: #04aa6d; color: #2c3e50; border: 5px solid #04aa6d; border-radius:10px;" v-if="locationActivated == 1">Votre localisation est activée</span>
        <span style="background-color: #db4a6b; color: #2c3e50 border: 5px solid #db4a6b; border-radius:10px;" v-else>Votre localisation est désactivée</span>
  </div>
  </div>
</template>
  <script src="https://kit.fontawesome.com/0adc6b23f3.js" crossorigin="anonymous"></script>
<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { latLng, Icon, icon } from "leaflet";
import axios from "axios";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("../assets/raccoon1.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "MyAwesomeMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data: function () {
    return {
      markerLatLng: latLng(0, 0),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      friendsLoc: [],
      friendsInfos: [],
      userProfile: "",
      isShowingProfile: false,
      name: "",
      zoom: 15,
      locationActivated: 0,
      icon: [
        icon({
          iconUrl: require("../assets/raccoon1.png"),
          iconSize: [40, 45],
          iconAnchor: [16, 37],
        }),
        icon({
          iconUrl: require("../assets/raccoon2.png"),
          iconSize: [40, 45],
          iconAnchor: [16, 37],
        }),
        icon({
          iconUrl: require("../assets/raccoon3.png"),
          iconSize: [40, 45],
          iconAnchor: [16, 37],
        }),
        icon({
          iconUrl: require("../assets/raccoon4.png"),
          iconSize: [40, 45],
          iconAnchor: [16, 37],
        }),
        icon({
          iconUrl: require("../assets/raccoon5.png"),
          iconSize: [40, 45],
          iconAnchor: [16, 37],
        })
      ],
    };
  },
  created() {
    this.getCurrentPos();
    setInterval(() => {
      this.getCurrentPos();
      this.setCurrentpos();
      this.getCurrentPosFromFriends();
    }, 3000);
  },
  methods: {
    async getCurrentPos() {
      const response = await axios.get(
        "http://localhost:3000/" +
          sessionStorage.getItem("id") +
          "/_getCurrentPos"
      );
      this.markerLatLng = latLng(
        response.data[0]?.latPos,
        response.data[0]?.longPos
      );
      this.userProfile = response.data[0].profileIcon
      this.locationActivated = response.data[0].locationActivated
    },
    async getCurrentPosFromFriends() {
      const response = await axios.get(
        "http://localhost:3000/" +
          sessionStorage.getItem("id") +
          "/_getCurrentPosFromFriends"
      );

      this.latPos = response.data[0]?.latPos;
      this.longPos = response.data[0]?.longPos;
      this.profileicon = response.data[0]?.profileicon;
      this.iname = response.data[0]?.iname;

      this.friendsInfos = [];
      this.friendsLoc = [];
      response.data.forEach((element) => {
        this.friendsLoc.push([
          latLng(element.latPos, element.longPos),
          element.profileIcon,
        ]);
        this.friendsInfos.push(element.iname);
      });
    },
    showCurrentFriend: function (index) {
      Vue.use(VueSweetalert2);

      
      this.$swal(
        this.friendsInfos[index] + " est ici !",
      );
    },

    setCurrentpos: function () {
      var getPos = navigator.geolocation.getCurrentPosition(
        this.success,
        this.error
      );
      console.log("ma position", getPos);
    },

    error: function (err) {
      console.warn(`ERREUR (${err.code}): ${err.message}`);
    },

    showInfos: function (index) {
      this.name = this.friendsInfos[index];
      this.isShowingProfile = true;
    },

    closeInfos: function () {
      this.isShowingProfile = false;
    },

    async success(pos) {
      var currentLat = pos.coords.latitude;
      var currentLong = pos.coords.longitude;
      const bodyFormData = new FormData();
      bodyFormData.append("lat", currentLat);
      bodyFormData.append("long", currentLong);
      console.log("lat ", bodyFormData.get("lat"), bodyFormData.get("long"));

      const response = await axios.post(
        "http://localhost:3000/" + sessionStorage.getItem("id") + "/_setNewPos",
        bodyFormData
      );
      console.log(response.status);
    },
  },
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.infos {
  width: 50%;
  font-size: 24px;
  margin: auto;
}
</style>
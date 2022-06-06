<template>
  <div class="userTab">
    <div id="friends">
      <div class="friend">
      <img
      alt="Image manquante D:"
      :src="require('../assets/raccoon' + user.profileIcon + '.png')"
    />
<p>
<strong>{{ user.username + "#" + user.userId }}</strong><br>
<button @click="addUser">Ajouter En Ami</button>
</p>
<div class="status away"></div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: "DisplaySingleUser",
  props: {
    user: Object,
  },
  methods: {
    addUser() {
      const id = this.user.userId;
      alert(id);
    },
  },
};
</script>

<style scoped>
.userTab {
  background-color: white;
  display: ruby;
  align-items: center;
  justify-content: left;
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
	background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/top-menu.png") -3px -118px no-repeat;
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
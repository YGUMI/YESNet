<template>
    <div class='rootComponent'>

    <div class="navbar">
      <img class="logo_white" src="../assets/logo_white3.png">
      <div class="dropdown">
        <div class='accountImageTopMenuWrapper'>
          <div class='accountImageTopMenuCell'>
            <img src='../assets/account.jpeg' class='accountImageTopMenu'>
          </div>
        </div>
        <button class="dropbtn">{{name}}&nbsp;&nbsp; <i class="el-icon-arrow-down"></i></button>
        <div class="dropdown-content">
          <p @click="goMyPage">마이페이지</p>
          <p @click="logout">로그아웃</p>
      </div>
    </div>
  </div>

  <div class = "sideMenu">

      <el-menu v-bind:default-active="itemIndex" @select="sideMenuRouting" class="el-menu-vertical-demo" background-color="#fff" text-color="#535353" active-text-color="#535353">

        <div class='account' @click='goMyPage'>
          <p style="text-align: center;">
            <img src='../assets/account.jpeg' class='accountImage'>
          </p>
          <div class='accountName'>
            {{email}}
          </div>
        </div>

          <el-menu-item index="1">
              <i class="el-icon-tickets"></i>
              <a>Dashboard</a>
          </el-menu-item>
          <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <a>DApps</a>
          </el-menu-item>
          <el-menu-item index="3">
              <i class="el-icon-upload"></i>
              <a>Deploy Dapp</a>
          </el-menu-item>
          <el-menu-item index="4">
              <i class="el-icon-search"></i>
              <a>Watch TX</a>
          </el-menu-item>
          <el-menu-item index="5">
              <i class="el-icon-search"></i>
              <a>Watch Block</a>
          </el-menu-item>
          <!--
          <el-menu-item index="6">
              <i class="el-icon-search"></i>
              <a>test Page</a>
          </el-menu-item>
          -->
      </el-menu>
  </div>

        <div class='routerView'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      itemIndex: '1',
      email: "",
      name: ""
    }
  },
  beforeCreate() {
    if(this.$session.exists()){
        console.log("login confirmed")
    } else {
        this.$router.push("/Login")
    }
  },
  created () {
    this.$http.post("/api/session_getUserInfo", {
      session_id: this.$session.get("session-id")
    })
    .then((response) => {
      this.email = response.data.email
      this.name = response.data.name
    })
  },
  methods: {
    LoginImg: function () {
      this.$router.push('/Login')
    },
    goMyPage: function () {
      this.$router.push('/Main/MyPage')
    },
    logout: function () {
      this.$session.destroy()
      this.$router.push('/Login')
    },
    sideMenuRouting: function (index) {
      if (index == 1) {
        this.$router.push('/Main/Dashboard')
      } else if (index == 2) {
        this.$router.push('/Main/DevelopedApp')
      } else if (index == 3) {
        this.$router.push('/Main/DeployPage')
      } else if (index == 4) {
        this.$router.push('/Main/WatchTx')
      } else if (index == 5) {
        this.$router.push('/Main/WatchBlock')
      } else if (index == 6) {
        this.$router.push('/Main/testPage')
      } else {
        // none...
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

  * {font-family: 'Noto Sans KR', sans-serif;}
.rootComponent {
    margin: 1;
    padding: 0;
}

.site-name-menu {
    float: left;
    text-align: center;
    margin: 0px 0px 0px 50px;
    padding: 10px 0px 0px 0px;
    font-size: 25px;
    color: white;
}

.logo_white {
  width:10%;
  margin-top: 0.8%;
  margin-left: 1.5%; 
}

.navbar {
  overflow: hidden;
  background-color: #474644;
  border-bottom: 1px solid rgba(0,0,0,.1);
}

/* Links inside the navbar */
.navbar a {
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* The dropdown container */
.dropdown {
  float: right;
  margin: 3px 100px 0px 0px;
  padding-top: -5px;
  overflow: hidden;
}

/* Dropdown button */
.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: #fff;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */
}

/* Add a red background color to navbar links on hover */
.navbar a:hover, .dropdown:hover .dropbtn {
  background-color:#ddd;
}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content p {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Add a grey background color to dropdown links on hover */
.dropdown-content p:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {

   width: 240px;
   min-height: 900px;
}

.sideMenu {
    float: left;
    padding-right: 1em;
}

.routerView {
 margin-left: 240px;
}

.account {
  padding-top: 10px;
  padding-bottom: 25px;
}

.account:hover {
  background-color: #CCCCCC;
}

.accountImage {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
}

.accountImageTopMenuWrapper {
  display: table;
  float: left;
  width: 30px;
  height: 45px;
}

.accountImageTopMenuCell {
  display: table-cell;
  vertical-align: middle;
}

.accountImageTopMenu {

  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 10px;
  background-color: white;
}

.accountName {
  color: #535353;
  text-align: center;
  margin-top:-5px;
}


</style>

<template>
<div id = "background">
    <div id ="form">
        <form action = "/api/login" method = "post">
        <!--로컬 로그인-->
        <img class="img-logo" src="../assets/logo_black3.png">
        <div class="loginform">
            <el-input type="text" v-model="uid" name="uid" placeholder ="이메일" />
        </div>
        <div class="loginform">
            <el-input type="password" v-model="password" name="password" placeholder="비밀번호"/>
        </div>
        <div class="loginbform">
            <el-button type="primary" size="default" @click="LoginBtn" id="loginButton">로그인</el-button>
        </div>

        <el-button type="text" @click="SignBtn" class="signupText">회원가입</el-button>

        </form>
    </div>
</div>
</template>

<script>

export default {
  data() {
    return {
        uid: "",
        password: ""
    }
  },
  beforeCreate() {
      if(this.$session.exists()){
          this.$router.push("/Main/Dashboard")
      } else {
          console.log("no, not exists")
      }
  },
  methods: {
      
    LoginBtn: function () {

      this.$http.post("/api/login", {
          uid: this.uid,
          password: this.password

      }).then((response) => {

          console.log(response.data.result)

          if(response.data.result == 1) {

            this.$session.start()
            //this.$session.set('uid', response.data.result)
            const session_id = this.$session.get("session-id")
            console.log("session_id" + session_id)

            this.$http.post("/api/session_setting", {
                uid: this.uid,
                session_id: session_id
            })
            .then((response) => {
                if(response.data.result == 1) {
                    console.log("session_id setting id done")
                }
            })

            this.$router.push('/Main/Dashboard')

          } else {

            alert("잘못되었습니다.")
            this.uid = ""
            this.password = ""
          }
      })
    },
    SignBtn: function () {
      this.$router.push('/Agree')
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

  * {font-family: 'Noto Sans KR', sans-serif;}
#background {
    height: 900px;
    padding: 1px;
    background: #efefef;
}

#form {
        display : table;
        margin-left : auto;
        margin-right : auto;
        margin-top: 13%;
        padding-bottom: 1%;
        background-color: white;
        width: 30%;
        border-radius: 5px;
        box-shadow: 1px 2px 3.5px #aaaaaa;
    }
    .img-logo {
        width: 45%;
        margin-top: 6.5%;
        margin-bottom: 2%;
        margin-left: 29%;
    }

    .login-mainName {
        text-align: center;
        color:black;
        margin-top: 5%;
    }
    .loginform {
        width : 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 3%;
    }
    .signupText {
        float: right;
        margin-top: -1%;
        margin-left: auto;
        margin-right: 9.5%;
        font-size: small;
    }
    .loginbform {
        width : 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top : 4%;
    }

    #loginButton {
        width : 100%;
        margin-top: 3%;
        padding: 4%;
        font-size: 18px;
    }

    #signupButton {
        width : 100%;
    }

</style>

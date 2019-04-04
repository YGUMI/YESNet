<template>
    <div id="background">
        <h1>MyPage</h1>
        <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="always">
          <div class="box-icon">
            <div class="box-contents">
              <p class="box-balance">
                 <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                    <br>
                    <div class="column">
                <p id="title"> 이메일 </p>
                    <p id="titleSub">{{email}}</p><br>
                <p id="title"> 이름 </p>
                    <p id="titleSub">{{name}}</p>
                <p id="title"> Ether_Account </p>
                    <p id="titleSub">{{account}}</p><br>
                <p id="title"> Ether 계좌 잔액 </p>
                    <p id="titleSub">{{balance}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button class="etherCharge" type="primary" size="small" @click="fillEth">ether 충전</el-button></p> 
                    </div>
              <div class="box-footer">
              </div>
            </div>
          </div>
        </el-card>
    </div>
</template>

<script>

export default {
  data () {
    return {
      balance: "loading...",
      imageUrl: '',
      email: "",
      name: "",
      account: ""
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

      const uid = response.data._id
      const account = response.data.accounts
      const name = response.data.name
      const email = response.data.email

      this.email = email
      this.name = name
      this.account = account

      this.$http.post('/api/getBalance', {
        uid: uid,
        account: account
      })
      .then((response) => {
        console.log(response.data)
        this.balance = response.data
      })
      
    })
  },
  methods: {
    Login_Btn: function () {
      this.$router.push('/Login')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isJPG && isLt2M;
    },
    fillEth() {
      this.$http.post("/api/session_getUserInfo", {
        session_id: this.$session.get("session-id")
      })
      .then((response) => {

        const uid = response.data._id
        const account = response.data.accounts

        this.$http.post('/api/fillEth', {
          uid: uid,
          account: account
        })
        .then((response) => {
        
          alert('Success\n' + response.data)

          this.$http.post('/api/getBalance', {
            uid: uid,
            account: account
          })
          .then((response) => {
            this.balance = response.data
          })
        })
      })
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

  * {font-family: 'Noto Sans KR', sans-serif;}

.column {
  column-count: 2;    
}

#background {
  height: 900px;
  padding: 1px;
  background-color: #F7F7F7;
}

.box-card {
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0px;
  margin-top: 10px;
  margin-left: 0px;
  width: 1200px;
  height: 440px;
  background-color:white;
}

#title {
    margin-top: 0px;
    font-size: 14px;
    color:#757575;
}

#titleSub {
    margin-top: -10px;
    color: #424242;

}

.form {
    display : table;
    margin-top: 20px;
    padding-bottom: 25%;
    background-color: white;
    width: 1000px;
    border-radius: 5px;
    box-shadow: 1px 2px 3.5px #aaaaaa;
    float: center;
    padding: 20px;
    margin-left : auto;
    margin-right : auto;
}

#passwordSub{
    margin-top: 4px;
    font-size: small;
    color:darkgrey;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

</style>
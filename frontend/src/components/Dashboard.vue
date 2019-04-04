<template>
<div id = "contentZone">
    <div id ="form">
        <h1 class="main-title"><i class="el-icon-tickets"></i> Dashboard</h1>
        <div class="wrap">
          <el-row :gutter="20">
            <el-col :span="5.5">
              <el-card class="ether-card" :body-style="{ padding: '0px' }" shadow="always">
                <img class="img-wallet" src="../assets/wallet.png">
                  <div class="card-content">
                    <p class="card-name">현재 Ether 잔액</p>
                    <span class="card-value">{{balance}} ETH</span>
                  </div>
              </el-card>
            </el-col>
            <el-col :span="5.5">
               <el-card class="small-ether-card" :body-style="{ padding: '0px' }" shadow="always">
                <img class="img-cloud" src="../assets/cloud-upload.png">
                  <div class="small-card-content2">
                    <p class="card-name2">Deploy App</p>
                    <div class="valueWrap2">
                    <a class="card-rightValue">&nbsp;개</a><span class="card-rightValue">{{personal_DApp_Count}}</span>
                    </div>
                  </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="wrap">
          <el-row :gutter="20">
            <el-col :span="5.5">
              <el-card class="ether-card" :body-style="{ padding: '0px' }" shadow="always">
                <img class="img-activity" src="../assets/activity.png">
                  <div class="card-content">
                    <p class="card-name">hashrate</p>
                    <span class="card-value">295911.9974 GH/s</span>
                  </div>
              </el-card>
             
            </el-col>
            <el-col :span="5.5">
              <el-card class="small-ether-card" :body-style="{ padding: '0px' }" shadow="always">
                <img class="img-web" src="../assets/web.png">
                  <div class="small-card-content2">
                    <p class="card-name3">Total App</p>
                    <div class="valueWrap">
                      <a class="card-rightValue">&nbsp;개</a><span class="card-rightValue">{{total_DApp_Count}}</span>
                    </div>
                  </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
    </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      listValues: [],
      balance: "loading...",
      personal_DApp_Count: "5",
      total_DApp_Count: "5"
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

      console.log(account)

      this.$http.post('/api/getBalance', {
        uid: uid,
        account: account
      })
      .then((response) => {
        this.balance = response.data
      })
      .then(() => {
        this.$http.post('/api/readDApps')
        .then((response) => {
          this.listValues = response.data

          console.log(this.listValues.length)

          //개인 앱과 전체 앱을 계산해서 나눠줄 것(본인 id인것만 카운트)
          personal_DApp_Count = this.listValues.length + "";
          total_DApp_Count = this.listValues.length + "";
        })
      })
    })
  },
  methods: {

  }
}

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

  * {font-family: 'Noto Sans KR', sans-serif;}

  .wrap {
    height: 150px;
    margin-top: 11px;
    margin-left: 30px;
  }
  
  .main-title {
    margin-left:28px;
  }
  .ether-card {
    padding-top: 0px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 0px;
    margin-top: 10px;
    margin-left: 0px;
    margin-right: 5px;
    width: 500px;
    height: 130px;
    background-color:white;
  }

  .card-content {
    float: left;
    margin-top: 2.8%;
    padding-right: 5%;
    margin-left: 6%;
  }

  .img-wallet {
    margin: 32px 0px 0px 7px;
    width: 65px;
    float: left;
  }

  .img-activity {
    margin: 47px 0px 0px 7px;
    width: 65px;
    float: left;
  }

  .img-cloud{
    margin: 35px 0px 0px 7px;
    width: 65px;
    float: left;
  }

  .img-web {
    margin: 28px 0px 0px 7px;
    width: 60px;
    float: left;
  }

  .card-name {
    margin-bottom: -2px;
    font-size: 18px;
    color: #484848;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

    .card-name2 {
    margin-bottom: -2px;
    font-size: 18px;
    color: #484848;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

    .card-name3 {
    margin-bottom: -2px;
    font-size: 18px;
    color: #484848;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

.valueWrap {
  margin-right: 10px;
}

.valueWrap2 {
  margin-right: 5px;
}

  .card-value {
    font-size: 25px;
    color: #484848;
    font-weight: 600;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  .card-rightValue {
    font-size: 25px;
    color: #484848;
    float: right;
    margin-right: 0%;
    font-weight: 600;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  .small-ether-card {
    padding-top: 0px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 0px;
    margin-top: 10px;
    margin-left: 0px;
    margin-right: 5px;
    width: 300px;
    height: 130px;
    background-color:white;
  }
  
  .small-card-content {
    float: left;
    margin-top: 5%;
    padding-right: 0%;
    margin-left: 40%;
  }

  .small-card-content2 {
    width: 200px;
    float: right;
    margin-top: 5%;
  }

  #form h1{
    letter-spacing: -1.5px;
    color: #353535;
  }

  .item {
    padding: 10px 0;
  }



.el-row {
    padding-bottom: 200px;
  }
 #contentZone {
    height: 900px;
    padding: 1px;
    background: #f7f7f7;
}

</style>
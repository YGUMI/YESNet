<template>
<div id="background" style="color:white">
<div class="entry" style="color:orange">
  <table>
    <tr>
      <br><br><br><br><br><br><br><br><br><br><br><br><br>
      <p>블록체인을 이용한 DApp 테스트넷</p>
      <el-button class="button" @click="LoginBtn" type="warning"> 바로가기</el-button>
    </tr>
  </table>
</div>


<hr>
<el-row>
    <el-col :span="24"><h1>Features</h1></el-col>
    <el-col :span="24">CaptureImage</el-col>
</el-row>
<br><br><br><br><br>

<el-row>
    <el-col :span="24"><h1>Distinct</h1></el-col>
</el-row>
<br><br><br><br>
<el-row>
    <el-col :span="12"><img src='../assets/guitar.jpeg' width="80" height="80"></el-col> 
    <el-col :span="12"><img src='../assets/testnet.jpeg' width="80" height="80"></el-col>
    <el-col :span="12"><br><br>저전력/저성능 사물인터넷과의 연동을 위해 경량화된 트랜잭션 구조, 합의 알고리즘 블록체인이 기반이 된 테스트넷</el-col>
    <el-col :span="12"><br><br>최소 3개 이상의 노드로 구성하는 블록 및 트랜잭션의 현황을 파악할 수 있는 기존 DApp 개발환경과 호환되는 테스트넷</el-col>
    <el-col :span="24"><br><br><br><br><br><br></el-col>
    <el-col :span="12"><img src='../assets/connect.jpeg' width="80" height="80"></el-col>
    <el-col :span="12"><img src='../assets/analysis.jpeg' width="80" height="80"></el-col>
    <el-col :span="12"><br><br>IoT 환경을 테스트 할 수 있는 다양한 IoT디바이스와의 연동 테스트</el-col>
    <el-col :span="12"><br><br>기존 블록체인 합의 알고리즘 분석 및 IoT 환경에 적합한 블록체인 합의 알고리즘 요구사항 분석</el-col></el-row>

</div>
</template>

<script>

export default {
  methods: {
    LoginBtn: function () {
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');
* {font-family: 'Noto Sans KR', sans-serif;}

.el-row {
    text-align: center;
}

 #background {
    background:#404040;
    background-image: src('../assets/558599.jpg')
 }

 #h1features {
        text-align: center;
        color:white;
        margin-top: 5%;
    }
.entry{
  background-image:url('../assets/page1.jpeg');
  width:1500px; height:1000px;
  margin-left: auto;margin-right: auto;
  }
table{
  font-size: 30px;
  padding-right: 10%;
  float: right;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

  .button {
    font-size: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-right: 180px;
    padding-left: 180px;
  }
/*#hori{
  color: #e6a23c;
}*/
</style>

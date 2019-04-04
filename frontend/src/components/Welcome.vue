<template>
    <div id="background">
        <div id="signupHeader">
            <h1 class="signup-mainName">YESNet</h1>
            <el-steps :space="200" :active="3" finish-status="success" simple style="margin-top: 20px">
                <el-step title="약관 동의" ></el-step>
                <el-step title="정보입력" ></el-step>
                <el-step title="가입완료" ></el-step>
            </el-steps>
        </div>
        <div id="form">
            <div id="signupWrap">
                <h3>환영합니다. </h3>
            
                <br><br>
                <el-button type="primary" @click="Login_Btn">로그인하기</el-button>

                <!--
                <table>
                    <tr><td colspan="3"><input type="text" id="ID" value="아이디" width="100%"></td></tr>
                    <tr><td colspan="3"><input type="text" id="PASSWORD" value="비밀번호" width="100%"></td></tr>
                    <tr><td colspan="3"><input type="text" id="PASSWORDCHECK" value="비밀번호확인" width="100%"></td></tr>
                    <tr><td colspan="3"><input type="text" id="NAME" value="이름" width="100%"></td></tr>
                    <tr><td><input type="number" id="YEAR" value="년(4자)" width="100%"></td>
                        <td><select><option value="Jan">1</option>
                            <option value="Feb">2</option>
                            <option value="Mar">3</option>
                            <option value="Apr">4</option>
                            <option value="May">5</option>
                            <option value="Jun">6</option>
                            <option value="Jul">7</option>
                            <option value="Aug">8</option>
                            <option value="Sep">9</option>
                            <option value="Oct">10</option>
                            <option value="Nov">11</option>
                            <option value="Dec">12</option></select></td>
                        <td><input type="number" id="DATE" value="일" width="100%" min="1" manx="31"></td></tr>
                    <tr><td colspan="3">
                    <select><option value="GENDER">성별</option>
                        <option value="FEM">여자</option>
                        <option value="MAL">남자</option></select></td></tr>
                    <tr><td colspan="3"><input type="text" id="EMAIL" value="이메일" width="100%"></td></tr>
                    <tr><td colspan="3"><input type="number" id="PHONENUM" value="휴대전화" width="100%"></td></tr>
                    <tr><td colspan="3"><button type="button" v-on:click="Login_Btn" width="100%">확인</button></td></tr>
                </table>
                !-->
            </div>
        </div>
    </div>
</template>

<script>

export default {
  methods: {
    Login_Btn: function () {
      this.$router.push('/Login')
    }
  },
    beforeCreate() {
      if(this.$session.exists()){
          this.$router.push("/Main/Dashboard")
      } else {
          console.log("no, not exists")
      }
  },
}

</script>

<style scoped>
 #background {
    height: 900px;
    padding: 1px;
    background: #efefef;
 }

#form {
    display : table;
    margin-left : auto;
    margin-right : auto;
    margin-top: 1%;
    padding-bottom: 25%;
    background-color: white;
    width: 600px;
    border-radius: 5px;
    box-shadow: 1px 2px 3.5px #aaaaaa;
    float: center;
    padding: 20px;
}

#signupWrap {
    padding-left: 40px;
}

.signup-mainName {
    text-align: center;
    color:black;
    margin-top: 2%;
}

#signupHeader {
    max-width: 640px;
    margin: auto;
}

.el-input {
    width: 300px;
  }
.el-button {
    float: right;
    margin-right:10px;
}
.el-steps {
    background: white;
    box-shadow: 1px 1px 2px #aaaaaa;
}

#passwordSub{
    margin-top: 4px;
    font-size: small;
    color:darkgrey;
}
</style>

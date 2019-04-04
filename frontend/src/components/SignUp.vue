<template>
    <div id="background">
        <div id="signupHeader">
            <h1 class="signup-mainName">YESNet</h1>
            <el-steps :space="200" :active="1" finish-status="success" simple style="margin-top: 20px">
                <el-step title="약관 동의" ></el-step>
                <el-step title="정보입력" ></el-step>
                <el-step title="가입완료" ></el-step>
            </el-steps>
        </div>

        <div id="form">
          <div id="signupWrap">
              <el-form :model="signupForm" status-icon :rules="signup" ref="signupForm">
                <el-form-item label="아이디" prop="uid"><br>
                  <el-input type="text" v-model="signupForm.uid" aria-autocomplete="off"/>
                </el-form-item>
                <el-form-item label="비밀번호" prop="password"><br>
                    <el-input type="password" v-model="signupForm.password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="비밀번호 확인" prop="confirmPassword"><br>
                    <el-input type="password" v-model="signupForm.confirmPassword" autocomplete="off" />
                </el-form-item>
                <el-form-item label="이름" prop="name"><br>
                  <el-input type="name" v-model="signupForm.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="이메일" prop="email"><br>
                  <el-input v-model="signupForm.email" aria-autocomplete="off"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('signupForm')">Submit</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data () {
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('비밀번호를 입력해주세요'))
      } else {
        if (this.signupForm.confirmPassword !== '') {
          this.$refs.signupForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validateConfirm = (rule, value, callback) => {
      if (!value) {
        callback(new Error('비밀번호를 다시 입력해주세요'))
      } else if (value !== this.signupForm.password) {
        callback(new Error('입력하신 비밀번호와 일치하지 않습니다.'))
      } else {
        callback()
      }
    }
    return {
      signupForm: {
        uid: '',
        password: '',
        confirmPassword: '',
        email: '',
        name: ''
      },
      signup: {
        uid: [
          { required: true, message: '아이디를 입력해주세요', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirm, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '이름을 입력해주세요', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '이메일을 입력해주세요', trigger: 'blur' },
          {
            type: 'email',
            message: '정확한 이메일 주소를 입력해주세요',
            trigger: 'blur'
          }
        ]
      }
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
    submitForm: function (formName) {
      this.$router.push('/Welcome')

      this.$refs[formName].validate(valid => {
        if (valid) {

          this.$http.post('/api/createAccount', {
            uid: this.signupForm.uid,
            password: this.signupForm.password
          })
          .then((returned_Account) => {

            console.log(returned_Account)

            this.$http.post('/api/signup', {
              uid: this.signupForm.uid,
              passwd: this.signupForm.password,
              accounts: returned_Account.data,
              eth_pass: this.signupForm.password,
              name: this.signupForm.name,
              last_login: this.last_login,
              email: this.signupForm.email
            })
            .then(response => {
              if (response.data.result === 0) {
                alert('다시 시도해주세요')
                this.$router.push('/SignUp')
              }
              if (response.data.result === 1) {
                this.$router.push('/Welcome')
              }
            })
            .catch(function (err) {
              alert('error' + error)
            })
          })
        } else {
          alert('필수 입력칸을 모두 입력해주세요')
          return false
        }
      })
      
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
  display: table;
  margin-left: auto;
  margin-right: auto;
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
  color: black;
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
  margin-right: 10px;
}
.el-steps {
  background: white;
  box-shadow: 1px 1px 2px #aaaaaa;
}

#passwordSub {
  margin-top: 4px;
  font-size: small;
  color: darkgrey;
}
</style>

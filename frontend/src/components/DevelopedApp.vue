<template>
  <div class = "ContentZone">

    <h1><i class="el-icon-menu"></i> DApps </h1>

    <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="always">
      <div class="box-icon">
        <div class="box-contents">
          <p class="box-balance">
            <template>
              <el-table :data="listValues_ForDisplay" height="545" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                      <div class="background">
                        <div class="table-contents">

                          <p class='DAppLabel'>Abi</p>
                          <template>
                            <el-table :data="listValues_ForDisplay[props.$index].abi" style="width: 99%">
                              <el-table-column prop="type" label="Type" width="100">
                              </el-table-column>
                              <el-table-column prop="name" label="Name" width="100">
                              </el-table-column>
                              <el-table-column prop="constant" label="Constant" width="90">
                              </el-table-column>
                              <el-table-column prop="inputs" label="Inputs" width="310">
                              </el-table-column>
                              <el-table-column prop="outputs" label="Outputs" width="310">
                              </el-table-column>
                              <el-table-column prop="payable" label="Payable" width="80">
                              </el-table-column>
                              <el-table-column prop="stateMutability" label="StateMutability" width="130">
                              </el-table-column>
                            </el-table>
                          </template>

                        <p class='DAppLabel'>Bin</p>
                        <p class='DAppValue'>{{ props.row.bin }}</p>
                        <hr style="border: solid #dedede; border-width: 1px 0 0;">

                        <p class='DAppLabel'>TX Hash</p>
                        <p class='DAppValue'>{{ props.row.tx_hash }}</p>
                        <hr style="border: solid #dedede; border-width: 1px 0 0;">

                        <p class='DAppLabel'>Contract Address</p>
                        <p class='DAppValue'>{{ props.row.contract_address }}</p>
                        <hr style="border: solid #dedede; border-width: 1px 0 0;">

                        <p class='DAppLabel'>Deployed Time</p>
                        <p class='DAppValue'>{{ props.row.deployed_time }}</p>
                        <hr style="border: solid #dedede; border-width: 1px 0 0;">

                        <p class='DAppLabel'>Function</p>
                          <div v-for="(name, index) in props.row.functions">
                            <p id ='Fnvaluestyle'>
                                <slot name ="">{{name}}</slot>
                            </p>
                            <el-button type="primary" size="mini" @click="runBtnClick(props.$index, index)" id="RunLocate">Run</el-button>
                          </div>
                        </div>
                          </div>
                    </template>
                </el-table-column>
                <el-table-column 
                    prop="deployed_time" label="Deployed_time" width="250">
                </el-table-column>
                <el-table-column
                    prop="app_name" label="Name" width="180">
                </el-table-column>
                <el-table-column prop="description" label="Description">
                </el-table-column>
              </el-table>
            </template>
          <div class="box-footer">
          </div>
        </div>
      </div>
    </el-card>

    <option-dialog v-if="showModal" @close="showModal = false">
      <h3 slot = "header">경고</h3>
      <p slot='body'></p>
      <span slot="footer" @click="showModal = false">
          파일이 선택되지 않았습니다.
          <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </option-dialog>

    <el-dialog v-bind:title="dialogName" :visible.sync="dialogFormVisible">
      <el-form :model="form">
          <el-form-item label="파라미터 이름" :label-width="formLabelWidth">
              <el-input v-model="form.parameter1" placeholder="파라미터를 입력해주세요." autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="파라미터 이름2" :label-width="formLabelWidth">
              <el-input v-model="form.parameter2" placeholder="파라미터를 입력해주세요.." autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="result" :label-width="formLabelWidth">
              <el-input v-model="result" placeholder="" autocomplete="off"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary"  @click="runMethod" v-loading.fullscreen.lock="fullscreenLoading">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {

  data () {
    return {
      listValues: [],
      listValues_ForDisplay: [],
      eventStatus: require('../variable.js'),
      featuresOpen: false,
      sel: 0,
      showModal: false,
      ifFloat:false,
      dialogFormVisible: false,
      form: {
          parameter1: '',
          parameter2: '',
          result: '',
      
      },
      formLabelWidth: '140px',
      fullscreenLoading: false,
      result: "",

      dialogName: "",
      selected_ListValuesIndex: null,
      selected_FunctionIndex: null
    }
  },
  created () {
    this.$http.post('/api/readDApps')
      .then((response) => {
        this.listValues_ForDisplay = response.data
        for(var i = 0; i < this.listValues_ForDisplay.length; i++) {
          this.listValues_ForDisplay[i].abi = JSON.parse(this.listValues_ForDisplay[i].abi)

          const date = new Date()
          date.setTime(this.listValues_ForDisplay[i].deployed_time)
          this.listValues_ForDisplay[i].deployed_time = date.toUTCString()

          for(var j = 0; j < this.listValues_ForDisplay[i].abi.length; j++){
            this.listValues_ForDisplay[i].abi[j].inputs = JSON.stringify(this.listValues_ForDisplay[i].abi[j].inputs)
            this.listValues_ForDisplay[i].abi[j].outputs = JSON.stringify(this.listValues_ForDisplay[i].abi[j].outputs)
            this.listValues_ForDisplay[i].abi[j].constant = JSON.stringify(this.listValues_ForDisplay[i].abi[j].constant)
            this.listValues_ForDisplay[i].abi[j].payable = JSON.stringify(this.listValues_ForDisplay[i].abi[j].payable)
          }
        }
      })
    this.$http.post('/api/readDApps')
      .then((response) => {
        this.listValues = response.data
      })
  },
  methods: {

    AddArray: function (data) {
      localStorage.setItem(localStorage.length, data)
    },
    DeployPage: function () {
      this.$router.push('/Main/DeployPage')
    },

    toggleFeatures: function () {
      this.featuresOpen = !this.featuresOpen
    },

    testOptionModal: function () {
      this.showModal = !this.showModal
    },

    runBtnClick: function(listValues_Index, function_Index) {
      this.selected_ListValuesIndex = listValues_Index
      this.selected_FunctionIndex = function_Index
      this.dialogName = "Run Function : " + this.listValues[listValues_Index].functions[function_Index]
      this.dialogFormVisible = true
    },

    //ListContent
    runMethod() {
      this.fullscreenLoading = true

      this.$http.post('/api/session_getUserInfo', {
          session_id: this.$session.get("session-id")
      })
      .then((userInfo) => {

        const uid = userInfo.data_id
        const account = userInfo.data.accounts
        const passwd = userInfo.data.passwd
        const hash_hex = this.listValues[this.selected_ListValuesIndex].tx_hash
        const abi = this.listValues[this.selected_ListValuesIndex].abi
        const functionName = this.listValues[this.selected_ListValuesIndex].functions[this.selected_FunctionIndex]

        this.$http.post('/api/callMethod', {
            uid: uid,
            account: account,
            passwd: passwd,
            hash_hex: hash_hex,
            abi: abi,
            functionName: functionName
        })
        .then((response) => {
            console.log(response)
            this.result = response.data
            this.fullscreenLoading = false 
        })
      })   
    }
  },

}

</script>

<style scoped>



@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');
* {font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.background {
    background-color:#f7f7f7;
    margin-top: -20px;
    margin-left:-100px;
    width:1233px;
}

.table-contents {
  padding-top: 10px;
  margin-left: 100px;
  padding-bottom: 20px;
  margin-bottom:-21px;
}
.box-card {
    padding-top: 0px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 0px;
    margin-top: 10px;
    margin-left: 0px;
    width: 1200px;
    height: 580px;
    background-color:white;
}

.DAppLabel {
  font-size: 14px;
  font-weight: 600;
  color:#515151;
  
}

.DAppValue {
  font-size: 13px;
  font-weight: 400;
  color:#515151;
  margin-top: -13px;
}

.DAppButton {
    margin-top: -8px;
}


.ContentZone {
    height: 900px;
    padding: 1px;
    padding-left: 20px;
    background: #f7f7f7;
}

#Fnvaluestyle {
  margin-top: 1em;
}

#RunLocate {
  margin-left: 8em;
  margin-top: -3em;
  float: left;
}

</style>

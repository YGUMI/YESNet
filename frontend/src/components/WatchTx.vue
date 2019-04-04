<template>
<div id = "contentZone">
    <div id ="form">
        <h1><i class="el-icon-search"></i>&nbsp;&nbsp;Watch TX</h1>
        <div class="input-search">
          <el-input
            placeholder="주소를 입력해주세요."
            prefix-icon="el-icon-search"
            v-model="urlInput"
            v-on:keyup.enter.native="getTXInfo"
            >
          </el-input>
        </div>
        <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="always" v-if="boxVisible" >
          <div class="box-icon">
            <div class="box-contents">
              <p class="box-balance">
                <!--blockHash, blockNumber, from, gas, gasPrice, hash, input, nonce, to, transactionIndex, value, v, r, s, -->
                          <el-table :data="tx_Content" style="width: 100%">
                            <el-table-column prop="blockHash" label="blockHash" width="550">
                            </el-table-column>
                            <el-table-column prop="blockNumber" label="blockNumber" width="125">
                            </el-table-column>
                            <el-table-column prop="from" label="from" width="360">
                            </el-table-column>
                            <el-table-column prop="gas" label="gas" width="70">
                            </el-table-column>
                            <el-table-column prop="gasPrice" label="gasPrice" width="100">
                            </el-table-column>
                          </el-table>

                          <el-table :data="tx_Content" style="width: 100%">
                            <el-table-column prop="hash" label="hash" width="550">
                            </el-table-column>
                            <el-table-column prop="input" label="input" width="70">
                            </el-table-column>
                            <el-table-column prop="nonce" label="nonce" width="70">
                            </el-table-column>
                            <el-table-column prop="to" label="to" width="360">
                            </el-table-column>
                            <el-table-column prop="transactionIndex" label="transactionIndex" width="150">
                            </el-table-column>
                          </el-table>

                          <el-table :data="tx_Content" style="width: 100%">
                            <el-table-column prop="value" label="value" width="60">
                            </el-table-column>
                            <el-table-column prop="v" label="v" width="50">
                            </el-table-column>
                            <el-table-column prop="r" label="r" width="550">
                            </el-table-column>
                            <el-table-column prop="s" label="s" width="550">
                            </el-table-column>
                          </el-table>
                        
                <!--
                <textarea
                      class="tx_textarea"
                      v-model="tx_Content">
                    </textarea>
                -->
              </p>
              <div class="box-footer">
              </div>
            </div>
          </div>
        </el-card>
    </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      urlInput: "0x491b1a587634b6e62a9b6fe082ae27885d0d87b68e10328e702d7337d01d6e11",//"81d7b7dbcf2ea1f0185cd455e0320b8c7017c1cfa62f680de3240bd70a8d8d0f",
      tx_Content: [],
      boxVisible: false
    }
  },
  beforeCreate() {
      if(this.$session.exists()){
          console.log("login confirmed")
      } else {
          this.$router.push("/Login")
      }
  },
  methods: {
    getTXInfo: function() {
      this.$http.post('/api/session_getUserInfo', {
        session_id: this.$session.get("session-id")
      })
      .then((response) => {

        const id = response.data_id;

        this.$http.post('/api/getTXInfo', {
          urlInput: this.urlInput,
          id: id
        })
        .then((response) => {
          console.log(response.data)
          //this.tx_Content = JSON.stringify(response.data)
          this.tx_Content.pop()
          this.tx_Content.push(response.data)
          this.boxVisible = true
        })
      })
    }
  }
}

</script>

<style scoped>

  .tx_textarea {
    width: 1500px;
    height: 500px;
    outline: none; 
    border-style: none; 
    border-color: Transparent; 
    overflow: auto;
  }

  .preview-textarea{
    width: 100%;
  }

  .input-search {
    padding : 0;
    margin-left : 1.22%;
    width : 96%;
  }

  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

  * {font-family: 'Noto Sans KR', sans-serif;}

  body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

  .box-contents {
    float: left;
    padding: 0px;
    margin: 30px 10px 10px 10px;
    font-size: 16px;
  }

  .box-title {
    color: #484848;
    /*
    font-weight: 400;
    font-size: 17px;
    line-height: 30px;*/
    letter-spacing: -1.5px;
    margin: 0px;
    float: left;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
   .box-balance {
    font-weight: 400;
    color: #303030;
    margin: 10px 0px 10px 10px;
    font-size: 14.5px;
    line-height: 30px;
    letter-spacing: 0px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  #form h1{
    letter-spacing: -1.5px;
    color: #353535;
  }

  .item {
    padding: 10px 0;
  }

  .box-card {
    padding-top: 0px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 0px;
    margin-top: 10px;
    margin-left: 0px;
    width: 1560px;
    height: 570px;
    background-color:white;
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
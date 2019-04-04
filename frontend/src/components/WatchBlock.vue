<template>
<div id = "contentZone">
    <div id ="form">
        <h1><i class="el-icon-search"></i>&nbsp;&nbsp;Watch Block</h1>
        <div class="input-search">
          <el-input
            placeholder="주소를 입력해주세요."
            prefix-icon="el-icon-search"
            v-model="blockNum"
            v-on:keyup.enter.native="getBlockInfo">
          </el-input>
        </div>
            <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="always" v-if="boxVisible">
              <div class="box-icon">
                <div class="box-contents">
                  <p class="box-balance">
<!-- difficulty, extraData, gasLimit, gasUsed, hash, 
logsBloom, miner, mixhash, nonce, number, parentHash, 
receiptsRoot, sha3Uncles, size, stateRoot, timestamp, 
totalDifficulty, transactions, transactionsRoot, uncles-->
                          <el-table :data="block_Content" style="width: 100%">
                            <el-table-column prop="difficulty" label="difficulty" width="100">
                            </el-table-column>
                            <el-table-column prop="extraData" label="extraData" width="500">
                            </el-table-column>
                            <el-table-column prop="gasLimit" label="gasLimit" width="100">
                            </el-table-column>
                            <el-table-column prop="gasUsed" label="gasUsed" width="100">
                            </el-table-column>
                            <el-table-column prop="hash" label="hash" width="550">
                            </el-table-column>
                          </el-table>

                          <el-table :data="block_Content" style="width: 100%">
                            <el-table-column prop="logsBloom" label="logsBloom" width="1400">
                            </el-table-column>
                          </el-table>
<!-- difficulty, extraData, gasLimit, gasUsed, hash, 
logsBloom, miner, mixhash, nonce, number, parentHash, 
receiptsRoot, sha3Uncles, size, stateRoot, timestamp, 
totalDifficulty, transactions, transactionsRoot, uncles-->

                          <el-table :data="block_Content" style="width: 100%">
                            <el-table-column prop="miner" label="miner" width="360">
                            </el-table-column>
                            <el-table-column prop="mixhash" label="mixhash" width="100">
                            </el-table-column>
                            <el-table-column prop="nonce" label="nonce" width="200">
                            </el-table-column>
                            <el-table-column prop="number" label="number" width="150">
                            </el-table-column>
                            <el-table-column prop="parentHash" label="parentHash" width="550">
                            </el-table-column>
                            
                          </el-table>

                          <el-table :data="block_Content" style="width: 100%">
                            <el-table-column prop="receiptsRoot" label="receiptsRoot" width="550">
                            </el-table-column>
                            <el-table-column prop="sha3Uncles" label="sha3Uncles" width="550">
                            </el-table-column>
                            <el-table-column prop="size" label="size" width="100">
                            </el-table-column>
                          </el-table>

                          <el-table :data="block_Content" style="width: 100%">
                            <el-table-column prop="stateRoot" label="stateRoot" width="550">
                            </el-table-column>
                            <el-table-column prop="timestamp" label="timestamp" width="150">
                            </el-table-column>
                            <el-table-column prop="totalDifficulty" label="totalDifficulty" width="150">
                            </el-table-column>
                            <el-table-column prop="transactions" label="transactions" width="150">
                            </el-table-column>
                          </el-table>

                          <el-table :data="block_Content" style="width: 100%">
                            <el-table-column prop="transactionsRoot" label="transactionsRoot" width="550">
                            </el-table-column>
                            <el-table-column prop="uncles" label="uncles" width="550">
                            </el-table-column>
                          </el-table>
                    <!--
                      <textarea
                      class="block_textarea"
                      v-model="block_Content">
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
      blockNum: "1",
      block_Content: [],
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
    getBlockInfo: function() {
      this.$http.post('/api/session_getUserInfo', {

        session_id: this.$session.get("session-id")
      })
      .then((response) => {

        const uid = response.data._id

        this.$http.post('/api/getBlockInfo', {
          blockNum: this.blockNum,
          uid: uid
        })
        .then((response) => {
          //this.block_Content = JSON.stringify(response.data)
          this.block_Content.pop()
          this.block_Content.push(response.data)
          this.boxVisible = true
        })
      })
    }
  }
}

</script>

<style scoped>

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
    height: 700px;
    background-color:white;
  }

  .block_textarea {
    width: 1520px;
    height: 300px;
    outline: none; 
    border-style: none; 
    border-color: Transparent; 
    overflow: auto;
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

``

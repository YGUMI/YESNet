<template>
<div id = "contentZone">
    <div id ="form">
        <h1><i class="el-icon-view"></i>&nbsp;&nbsp;test Page</h1>
            <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="always">

                <br>

                <el-input
                    class="preview-textarea"
                    type="textarea"
                    :autosize="{ minRows: 10, maxRows: 10}"
                    placeholder=""
                    v-model="data">
                </el-input>

                <el-table :data="tableData" style="width: 98%">
                <el-table-column label="Type" width="100">
                    {{tmp}}
                </el-table-column>
                </el-table>

            </el-card>

            <button @click="testStart1">createAccount</button>
            <button @click="testStart2">fillEth</button>
            
            <button @click="testStart3">abi_test</button>
            <!--
            <button @click="testStart4">deploy_DApp</button>
            -->
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            tmp: 'hi',
            data: ""
        }
    },
    methods: {
        testStart1: function() {
            this.$http.post('/api/createAccount')
            .then((response) => {
                console.log(response)
                this.data = response.data
            })
        },
        testStart2: function() {
            this.$http.post('/api/fillEth')
            .then((response) => {
                console.log(response)
                console.log(response.data)
                this.data = JSON.stringify(response.data)
            })
        },
        
        testStart3: function() {
            this.$http.post('/api/test')
            .then((response) => {
                this.data = JSON.stringify(response.data)
            })
        },
        /*
        testStart4: function() {
            this.$http.post('/api/requestDeploy')
            .then((response) => {
                console.log(JSON.stringify(response.data))
                this.data = JSON.stringify(response.data)
            })
        }*/
        
    }
}
</script>

<style scoped>

.preview-textarea{
    width: 90%;
}

  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
  * { font-family: 'Spoqa Han Sans', 'Sans-serif'; }

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
    width: 1200px;
    height: 390px;
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

``

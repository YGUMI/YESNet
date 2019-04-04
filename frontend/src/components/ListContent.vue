<template>
    <div id = "listContent">
        <div id = "contentLeftAlign">

            <div class='DAppContent'>
                <p class='DAppLabel'>description</p>
                <p class='DAppValue'>
                    <slot name='description'>default description</slot>
                </p>
            </div>

            <div class='DAppContent'>
                <p class='DAppLabel'>abi</p>
                <p class='DAppValue'>
                    <slot name='abi'>default abi</slot>
                </p>
            </div>

            <div class='DAppContent'>
                <p class='DAppLabel'>bin</p>
                <p class='DAppValue'>
                    <slot name='bin'>default bin</slot>
                </p>
            </div>

            <div class='DAppContent'>
                <p class='DAppLabel'>tx_hash</p>
                <p class='DAppValue'>
                    <slot name='tx_hash'>default tx_hash</slot>
                </p>
            </div>

            <div class='DAppContent'>
                <p class='DAppLabel'>contract_addr</p>
                <p class='DAppValue'>
                    <slot name='contract_address'>default contract_address</slot>
                </p>
            </div>

            <div class='DAppContent'>
                <p class='DAppLabel'>Deployed_time</p>
                <p class='DAppValue'>
                    <slot name='deployed_time'>default deployed_time</slot>
                </p>
            </div>

            <hr id="divisionLine">

            <div id="FnLocate">
                <b id ='Fnstyle'>Function</b>
                <p id ='Fnvaluestyle'>
                    <slot name ="">greeting</slot>
                </p>
                <el-button type="primary" size="mini" @click="dialogFormVisible = true" id="RunLocate">Run</el-button>

            </div>

            <el-dialog title="Run Function: Greeting" :visible.sync="dialogFormVisible">
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
    </div>
</template>


<script>

export default {
    data() {
        return {
            dialogFormVisible: false,
            form: {
                parameter1: '',
                parameter2: '',
                result: '',
            
            },
            formLabelWidth: '140px',
            fullscreenLoading: false,
            result: ""
        };
    },
    methods: {
        /*
        openFullScreen() {
            this.fullscreenLoading = true
            setTimeout(() => {
                this.fullscreenLoading = false
            }, 3000);
        },
        */
        runMethod() {
            this.fullscreenLoading = true
            this.$http.post('/api/callMethod')
            .then((response) => {
                console.log(response)
                this.result = response.data
                this.fullscreenLoading = false 
            })
        }
    }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+KR");
* {
  font-family: "Noto Sans KR", sans-serif;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.DAppContent {
  margin-left: 10px;
  float: left;
  width: 1200px;
  /*
    background-color: #fbf9f6;
    box-shadow: 1px 2px 3.5px #aaaaaa;*/
}

.DAppLabel {
  /*padding-top: 24px;*/
  font-size: 16px;
  font-weight: 600;
}

.DAppValue {
  text-align: left;
  font-size: 14px;
}

#contentLabel {
  color: #605c60;
  font-weight: 400;
  font-size: 14px;
}

#listContent {
  width: 600px;
  height: 95px;
}

#contentLeftAlign {
  color: #393430;
  font-size: 14px;
  padding: 1em;
  float: left;
  margin: 0 auto;
}

#contentrightAlign {
  font-weight: 400;
  color: #393430;
  font-size: 14px;
  padding: 1em;
  float: right;
}

#contentrightAlign_sub {
  font-weight: 500;
  color: #605c60;
  font-size: 14px;
  padding-right: 1em;
  padding-left: 1em;
  float: right;
}
#RunLocate {
  margin-left: 8em;
  margin-top: -3em;
  float: left;
}
#FnLocate {
  margin: 10px;
  padding-top: 1em;
  float: left;
  width: 240px;
}
#divisionLine {
  margin-left: 10px;
  margin-top: 1em;
  float: left;
  width: 265%;
  border: solid 0.7px #9e9e9e;
}
#Fnstyle {
  font-size: 20px;
}
#Fnvaluestyle {
  margin-top: 1em;
}

#run_result{
    margin-left:150px;
    margin-top:-53px;
}

/*
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');

  * {font-family: 'Noto Sans KR', sans-serif;}
  body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

.DAppContent {
    
    margin: 10px;
    float: left;
    width: 300px;
}

.DAppLabel {
}

.DAppValue {
    text-align: left;
    font-size: 14px;
    padding-top: 5px;
}

#contentLabel {
    color: #605C60;
    font-weight:400;
    font-size:14px;
}

#listContent {
    width: 600px;
    height: 95px;
}

#contentLeftAlign {
    line-height: 1px;
    color: #393430;
    font-size: 14px;
    padding: 1em;
    float: left;
    margin: 0 auto;
}

#contentrightAlign {
    line-height: 1px;
    font-weight:400;
    color: #393430;
    font-size: 14px;
    padding: 1em;
    float: right;
}

#contentrightAlign_sub {
    line-height: 1px;
    font-weight:500;
    color: #605C60;
    font-size: 14px;
    padding-right: 1em;
    padding-left: 1em;
    float: right;
}
*/
</style>

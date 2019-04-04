<template>

    <!-- 가져다 쓸때, 이렇게 쓰면 된다.

    <option-dialog v-if="showModal" @close="showModal = false">
            <h3 slot = "header">경고</h3>
            <p slot='body'></p>
            <span slot="footer" @click="showModal = false">
                파일이 선택되지 않았습니다.
                <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
            </span>
    </option-dialog>
    -->

    <transition name = 'OptionDialog'>
        <div class = 'modal-mask'>
            <div class= 'modal-wrapper'>
                <div class = 'modal-container'>
                    <h3>OptionDialog</h3>
                    <p class = 'padding'>
                        option 1
                        <el-switch v-model="value1"> </el-switch>
                    </p>
                    <p class = 'padding'>
                        option 2
                        <el-switch v-model="value2"> </el-switch>
                    </p>
                    <p>
                        <p class = 'padding'>RadioGroup</p>
                        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                            <el-radio-button :label="1">radio1</el-radio-button>
                            <el-radio-button :label="2">radio2</el-radio-button>
                            <el-radio-button :label="3">radio3</el-radio-button>
                        </el-radio-group>
                    </p>
                    <button @click="$emit('close')">ok</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
  data () {
    return {
      value1: false,
      value2: false,
      isCollapse: 0
    }
  }
}

</script>

<style>

.padding {
    padding: 1em;
}

.boxLine {
    border: 1px solid gray;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>

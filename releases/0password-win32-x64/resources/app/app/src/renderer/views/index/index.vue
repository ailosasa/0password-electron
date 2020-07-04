<template>
  <Row class="wrapper">
    <div class="cover"
         v-show="ifCover">
      <img src="../../../../icons/waitting.jpg"
           class="img">
    </div>
    <Col span="6">
    <left-bar></left-bar>
    </Col>
    <Col span="8"
         class="container">
    <div class="header">
      <div>
        <!-- <header style="padding-top: 10px;padding-left: 10px">0password</header> -->
        <Row style="padding-left:14px;padding-bottom:10px;padding-top:10px">
          <Col span="18">
          <Input long
                 v-model="searchKey"
                 style="
             height:45px;
             width: 100%"
                 type="text" /></Input>
          </Col>
          <Col span="6">
          <button class="new-password-button"
                  v-on:click="addInWeb">
            <i class="add-icon el-icon-circle-plus-outline"></i>
          </button>
          </Col>
        </Row>
      </div>
      <div>
        <Row v-for="(item, index) in searchOverview"
             :key="index">
          <button v-bind:class="{
                overviewbutton: active_overview != index,
                clickedbutton: active_overview == index
              }"
                  type="primary"
                  v-on:click="changeActiveOverview(index)">
            <Row>
              <Col span="6">
              <img v-bind:src="'https:'+item.details.weburl +'/favicon.ico'"
                   style="width:50%; height:auto" />
              </Col>
              <Col>
              <li class="label_list">{{ item.details.title }}</li>
              <li class="ainfo_list">{{ item.details.username }}</li>
              </Col>
            </Row>
          </button>
        </Row>
      </div>
    </div>
    </Col>
    <Col span="10"
         style="height: 100%">
    <right-bar></right-bar>
    </Col>
  </Row>
</template>

<script>
import LeftBar from '@/views/siderBar/leftBar'
import RightBar from '@/views/siderBar/rightBar'
// import { debug } from 'util'
// import { debug } from 'util'
// import { dll } from '@/common/js/file'
// var sqlite3 = require('sqlite3').verbose()
// import { CreateDb } from '@/common/js/file'
export default {
  components: {
    LeftBar,
    RightBar
  },
  data () {
    return {
      ifCover: false,
      active_overview: 0, // 选中的overview
      PwdData: [],
      searchKey: '',
      searchOverview: []
    }
  },
  methods: {
    changeActiveOverview (index) {
      this.active_overview = index
      this.$store.commit('setChosedPwd', {
        chosedPwd: index
      })
      debugger
    },
    addInWeb () {
      debugger
      this.createOneNew()
      var lastIndex = this.PwdData.length
      this.$store.commit('setChosedPwd', {
        chosedPwd: lastIndex - 1
      })
      this.addInDb(lastIndex)
      debugger
    },
    addInDb (index) {
      debugger
      var pwdData = JSON.stringify(this.PwdData[index - 1].details)
      let reg = new RegExp('"', 'g')
      let reg1 = new RegExp(' ', 'g')
      // let partData = pwdData.slice(1, -1)
      let newData = pwdData.replace(reg, '\\"')
      newData = newData.replace(reg1, '')
      let key = JSON.stringify(this.$store.state.vaultAccessKey)
      let newKey = key.replace(reg, '\\"')
      newKey = newKey.replace(reg1, '')
      this.ifCover = true
      var that = this
      var exec = require('child_process').exec
      // var id = this.pass_msg.id
      var cmd =
        '0password -c encrypt -f ./0password.sqlite' +
        ' -d ' +
        newData +
        ' -k ' +
        newKey
      exec(cmd, function (error, stdout, stderr) {
        debugger
        if (error) {
          console.error('error: ' + error)
          return
        }
        console.log('receive: ' + stdout)
        var output = JSON.parse(stdout)
        var id = output.id
        that.PwdData[that.PwdData.length - 1].id = id
        that.ifCover = false
      })
    },
    createOneNew () {
      debugger
      var newPwdMsgs = JSON.parse(JSON.stringify(this.$store.state.dbData))
      newPwdMsgs.push({
        id: '',
        details: {
          title: '请输入标题',
          username: '请输入用户名',
          password: '请输入密码',
          weburl: '请输入网站名',
          // website: '请输入网址对应根url',
          ps: []
        }
      })
      this.$store.commit('getDbData', {
        dbData: newPwdMsgs
      })
    },
    setDbData () {
      this.$store.commit('getDbData', {
        dbData: [
          {
            fields: [
              {
                name: 'username',
                designation: 'username',
                value: 'zhy_universe',
                id: '',
                type: ''
              },
              {
                name: 'password',
                designation: 'password',
                value: 'srCT#T^HaNKstVR_',
                id: '',
                type: ''
              }
            ],
            notesPlain: '',
            sections: [
              {
                name: 'linked items',
                title: '相关项目'
              }
            ],
            passwordHistory: [
              {
                value: 'st0225@zhyST',
                time: 1588553276
              }
            ]
          },
          {
            fields: [
              {
                name: 'username',
                designation: 'username',
                value: 'sb',
                id: '',
                type: ''
              },
              {
                name: 'password',
                designation: 'password',
                value: 'srCT#T^HaNKstVR_',
                id: '',
                type: ''
              }
            ],
            notesPlain: '',
            sections: [
              {
                name: 'linked items',
                title: '相关项目'
              }
            ],
            passwordHistory: [
              {
                value: 'st0225@zhyST',
                time: 1588553276
              }
            ]
          }
        ]
      })
    },
    PwdJsonify () {
      debugger
      var str
      var PwdJson
      for (let i = 0; i < this.PwdData.length; i++) {
        str = this.PwdData[i].details
        PwdJson = JSON.parse(str)
        this.PwdData[i].details = PwdJson
      }
    }
  },
  computed: {
    DD () {
      return this.$store.state.dbData
    },
    overviewClass () {
      return {
        overviewBar: this.cover,
        cOverviewBar: !(this.cover)
      }
    },
    C () {
      return this.$store.state.ifCover
    }
  },
  watch: {
    searchKey (val) {
      this.searchOverview = []
      if (this.searchKey === '') {
        this.searchOverview = this.PwdData
      } else {
        var keyLen = this.searchKey.length
        for (var e of this.PwdData) {
          debugger
          e.details.title.substr(0, keyLen)
          if (e.details.title.substr(0, keyLen) === this.searchKey) {
            this.searchOverview.push(e)
          }
        }
      }
    },
    DD (val) {
      debugger
      this.PwdData = JSON.parse(JSON.stringify(this.$store.state.dbData))
      this.searchOverview = this.PwdData
    },
    C (val) {
      this.ifCover = JSON.parse(JSON.stringify(this.$store.state.ifCover))
    }
  },
  mounted () { },
  created () {
    debugger
    this.ifCover = true
    this.$store.commit('getLogin', {
      email: '644792544',
      password: 'hty061699',
      SecretKey: 'A1-W686NK-VXM58G-GDA02-PRF60-60FL5-JVJGS'
    })
    var exec = require('child_process').exec
    var that = this
    exec('0password -c decrypt -f ./0password.sqlite -p' + that.$store.state.password, function (error, stdout, stderr) {
      debugger
      if (error) {
        console.error('error: ' + error)
        return
      }
      console.log(
        'receive: ' + stdout
      )
      var data = JSON.parse(stdout)
      that.PwdData = data.items
      that.$store.commit('setVAK', {
        VAK: data.vault_access_key
      })
      that.PwdJsonify()
      that.searchOverview = that.PwdData
      that.$store.commit('getDbData', {
        dbData: that.PwdData
      })
      that.changeActiveOverview(0)
      that.ifCover = false
    })
  }
}
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave {
  opacity: 0;
}
.wrapper {
  height: 100%;
  overflow-y: auto;
}
.ivu-col-span-6 {
  height: 100%;
}
.header {
  header {
    font: bold 20px/150% "Microsoft Yahei";
  }
}
.container {
  position: relative;
  height: 100%;
  .footer-bread {
    position: fixed;
    left: 26%;
    top: 10px;
    z-index: 100;
  }
}
.ivu-table-wrapper {
  border: none !important;
}
.overviewBar {
  background-color: #deddda;
}
.cover {
  background-color: #888888;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  text-align: center;
  .img {
    padding-top: 30%;
    width: 20%;
    height: auto;
  }
}
.add-icon {
  font-size: 36px;
}
.overviewbutton {
  width: 100%;
  background-color: #ffffff;
}
.clickedbutton {
  width: 100%;
  background-color: #dddddd;
  border-color: #aaaaaa;
}
.label_list {
  list-style-type: none;
  font-weight: bold;
  color: #000000;
}
.ainfo_list {
  list-style-type: none;
  font-weight: bold;
  color: #aaaaaa;
}
.new-password-button {
  border: none;
  padding-top: 10px;
}
.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
}
</style>

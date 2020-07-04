<template>
  <div class="right-bar">
    <div class="topbar">
      <Row>
        <Col span="6">
        <el-button v-on:click="edit()">编辑</el-button>
        </Col>
        <!-- <col span="4"> </col> -->
        <Col span="10">
        <el-button v-on:click="deletePwd()">删除</el-button>
        </Col>
        <!-- <col span="4"> </col> -->
        <Col span="6">
        <el-button type="file"
                   v-on:click="uploadClick()">
          上传
          <input type="file"
                 v-show="0 === 1"
                 ref="realUploadButton"
                 @change="upload" />
        </el-button>
        </Col>
      </Row>
    </div>
    <div v-show="if_have_password == true">

      <div class="main_table">
        <div>
          <Row style="padding:20px">
            <Col span="8">
            <img v-bind:src="'https:'+pass_msg.details.weburl+'/favicon.ico'"
                 style="width:50%; height:auto" />
            </Col>
            <Col span="8">
            <Row style="font-size:40px">
              {{ title }}
            </Row>
            <Row> </Row>
            </Col>
          </Row>
        </div>
        <div>
          <el-button v-on:click="changePasswordType()"> 查看密码 </el-button>
          <el-button v-on:click="generatePassword()"> 生成随机密码 </el-button>
          <el-button v-on:click="quitEdition()"> 放弃修改 </el-button>
        </div>
        <!-- <div v-if="
                     if_editable==false">
            <row style="padding-left:20px; padding-right:20px">
              <li style="list-style:none">
                {{ pass_msg.details.title }}
              </li>
            </row>
            <row style="padding-left:20px; padding-right:20px">
              <li style="list-style:none">
                {{ pass_msg.details.username }}
              </li>
            </row>
            <row style="padding-left:20px; padding-right:20px">
              <li style="list-style:none">
                {{ pass_msg.details.password }}
              </li>
            </row>
            <row v-for="(field, index) in pass_msg.details.ps"
                 :key="index"
                 style="padding-left:20px; padding-right:20px">
              <li style="list-style:none">
                {{ field.value }}
              </li>
            </row>
        </div> -->
        <div>
          <row style="padding-left:20px; padding-right:20px">
            <input type="text"
                   style="width: 100%; height:30px"
                   v-model="pass_msg.details.title" />
          </row>
          <row style="padding-left:20px; padding-right:20px">
            <input type="text"
                   style="width: 100%; height:30px"
                   v-model="pass_msg.details.username" />
          </row>
          <row style="padding-left:20px; padding-right:20px">
            <input type="text"
                   ref="password"
                   style="width: 100%; height:30px"
                   v-model="pass_msg.details.password" />
          </row>
          <row style="padding-left:20px; padding-right:20px">
            <input type="text"
                   style="width: 100%; height:30px"
                   v-model="pass_msg.details.weburl" />
          </row>
          <row v-for="(field, index) in pass_msg.details.ps"
               :key="index"
               style="padding-left:20px; padding-right:20px">
            <input long
                   type="text"
                   style="width: 80%; height:30px"
                   v-model="field.value" />
            <button v-on:click="deletePs(index)">删除备注</button>
          </row>

        </div>
        <div>
          <el-button v-on:click="addPs">添加备注</el-button>
        </div>
        <div style="
                 padding:
                 20px"
             v-show="0 === 1">
          详细信息
          <li>
            <div>
              website
            </div>
          </li>

          <li>
            <div>
              上次修改时间
            </div>
          </li>
          <li>
            <div>
              创建日期
            </div>
          </li>
        </div>
      </div>
    </div>
    <div v-show="if_have_password == false">
      没有保存的密码，请添加
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   data: {
  //     type: Object,
  //     default: {}
  //   },
  //   show: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  data () {
    return {
      if_have_password: false,
      pass_msg: {
        id: 0,
        details: {
          title: '',
          username: '',
          password: '',
          ps: []
        }
      },
      pass_msgs: [],
      title: 'steam',
      url: 'https://store.steampowered.com/'
    }
  },
  computed: {
    DD () {
      // mean dbData
      return this.$store.state.dbData
    },
    ChosedPwdIndex () {
      return this.$store.state.chosedPwd
    },
    PwdNum () {
      return this.pass_msgs.length
    }
  },
  watch: {
    pass_msg (val) {
      debugger
    },
    pass_msgs (val) {
      debugger
    },
    DD (val) {
      // dbDate变化时
      debugger
      this.pass_msgs = JSON.parse(JSON.stringify(this.$store.state.dbData))
      this.pass_msg = JSON.parse(JSON.stringify(this.pass_msgs[this.$store.state.chosedPwd]))
    },
    ChosedPwdIndex (val) {
      debugger
      var index = this.$store.state.chosedPwd
      this.pass_msg = this.pass_msgs[index]
    },
    PwdNum (val) {
      debugger
      if (this.pass_msgs.length !== 0) {
        this.if_have_password = true
      } else {
        this.if_have_password = false
      }
    }
  },
  methods: {
    editInDb (index) {
      debugger
      var pwdData = JSON.stringify(this.pass_msg.details)
      let reg = new RegExp('"', 'g')
      let reg1 = new RegExp(' ', 'g')
      // let partData = pwdData.slice(1, -1)
      let newData = pwdData.replace(reg, '\\"')
      newData = newData.replace(reg1, '')
      let key = JSON.stringify(this.$store.state.vaultAccessKey)
      let newKey = key.replace(reg, '\\"')
      newKey = newKey.replace(reg1, '')
      this.$store.commit('setIfCover', {
        ifCover: true
      })
      var exec = require('child_process').exec
      // var id = this.pass_msg.id
      var cmd =
        '0password -c encrypt -f ./0password.sqlite' +
        ' -d ' +
        newData +
        ' -k ' +
        newKey +
        ' -i ' +
        index
      var that = this
      exec(cmd, function (error, stdout, stderr) {
        debugger
        if (error) {
          console.error('error: ' + error)
          return
        }
        console.log('receive: ' + stdout)
        that.$store.commit('setIfCover', {
          ifCover: false
        })
      })
    },
    deletePwd () {
      debugger
      var index = this.$store.state.chosedPwd
      var id = JSON.parse(JSON.stringify(this.pass_msgs[index].id))
      this.pass_msgs.splice(index, 1)
      this.$store.commit('getDbData', {
        dbData: this.pass_msgs
      })

      var exec = require('child_process').exec
      var cmd =
        '0password -c encrypt -f ./0password.sqlite' +
        ' -i ' +
        id
      var that = this
      exec(cmd, function (error, stdout, stderr) {
        debugger
        if (error) {
          console.error('error: ' + error)
          return
        }
        console.log('receive: ' + stdout)
        that.$store.commit('setIfCover', {
          ifCover: false
        })
      })
    },
    edit () {
      debugger

      this.if_editable = false
      var index = this.$store.state.chosedPwd
      this.pass_msgs[index] = this.pass_msg
      this.$store.commit('getDbData', {
        dbData: this.pass_msgs
      })
      // 将修改内容写入数据库
      // this.$options.methods.editInDb()
      var id = this.pass_msg[index].id
      this.editInDb(id)
    },
    addPs () {
      debugger
      var index = this.$store.state.chosedPwd
      this.pass_msg.details.ps.push({
        value: '新添加的备注'
      })
      this.pass_msgs[index] = this.pass_msg
      this.$store.commit('getDbData', {
        dbData: this.pass_msgs
      })
      var id = this.pass_msg[index].id
      this.editInDb(id)
    },
    deletePs (index) {
      debugger
      var itemIndex = this.$store.state.chosedPwd
      this.pass_msg.details.ps.splice(index, 1)
      this.pass_msgs[itemIndex] = this.pass_msg
      this.$store.commit('getDbData', {
        dbData: this.pass_msgs
      })
      var id = this.pass_msg[index].id
      this.editInDb(id)
    },
    changePasswordType () {
      if (this.$refs.password.type === 'text') {
        this.$refs.password.type = 'password'
      } else {
        this.$refs.password.type = 'text'
      }
    },
    generatePassword () {
      debugger
      var len = 16
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      this.pass_msg.details.password = pwd
    },
    quitEdition () {
      this.pass_msg = JSON.parse(JSON.stringify(this.$store.state.dbData[this.$store.state.chosedPwd]))
    },
    uploadClick () {
      this.$refs.realUploadButton.dispatchEvent(new MouseEvent('click'))
    },
    upload () {
      debugger
      this.file = event.target.files
      let formdata = new FormData()
      formdata.append('email', this.$store.state.email)
      formdata.append('secret_key', this.$store.state.SecretKey)
      formdata.append('password', this.$store.state.password)

      formdata.append('attachment', this.file[0])
      var that = this
      var url = 'http://49.235.114.122:8000/0password/api/v1/auth/upload'
      this.$store.commit('setIfCover', {
        ifCover: true
      })
      this.$http
        .post(url, formdata, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then(function (res) {
          debugger
          that.$store.commit('setIfCover', {
            ifCover: false
          })
        })
        .catch(function (error) {
          debugger
          that.$store.commit('setIfCover', {
            ifCover: false
          })
          console.log(error)
        })
      // var fs = require('fs')
      // fs.readFile('.\\\\test.db', (err, data) => {
      //   if (err) throw err
      //   debugger
      //   console.log(data)

      //   var jsonOfFile = {
      //     parameter: 0,
      //     data: data.toString()
      //   }
      //   this.$axios
      //     .post(url, jsonOfFile)
      //     .then(function (res) {})
      //     .catch(function (error) {
      //       debugger
      //       console.log(error)
      //     })
      // })
    }
  },
  created () {
    debugger
    this.pass_msg = JSON.parse(JSON.stringify(this.pass_msgs[0]))
    if (this.pass_msgs.length !== 0) {
      this.if_have_password = true
    }
    // this.$store.commit('getDbData', {
    //   dbData: this.pass_msgs
    // })
  },
  mounted () { }
}
</script>
<style lang="less" scoped>
.right-bar {
  width: 100%;
  height: 100%;
  background-color: #c1c0c0;
  border-right: 1px solid #dddee1;
  overflow-y: auto;
  .card-hdd {
    height: 100%;
    overflow-y: auto;
    .head-hdd {
      text-align: center;
      p {
        line-height: 28px;
        height: 28px;
      }
    }
    .img-hdd {
      max-width: 100%;
      max-height: 100%;
      width: 150px;
      height: 150px;
    }
    .detail-hdd {
      padding: 20px 0 0 20px;
      label {
        padding: 5px 0;
        line-height: 24px;
        height: 24px;
        display: block;
        font-size: 14px;
        color: #bbb;
      }
      p {
        line-height: 24px;
        height: 24px;
      }
    }
  }
}
.topbar {
  padding: 10px;
}
.detailicon {
  font-size: 72px;
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

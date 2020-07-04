<template>
  <section class="login-wrap">
    <Form ref="form"
          class="login-form">
      <div class="login-info">登录你的1password账号</div>
      <div class="fields">
        <Form-item prop="email"
                   style="margin-bottom: 0">
          邮箱
          <Input class="field"
                 v-model="login.email"
                 width="320px"> </Input>
        </Form-item>

        <Form-item prop="secretkey"
                   style="margin-bottom: 0">
          密钥
          <Input class="field"
                 v-model="login.password"
                 type="password"
                 width="320px"
                 @keyup.native.enter="check">
          </Input>
        </Form-item>

        <Form-item prop="masterpassword"
                   style="margin-bottom: 0">
          主密码
          <Input class="field"
                 v-model="login.SecretKey"
                 type="password"
                 width="320px"
                 @keyup.native.enter="check">
          </Input>
        </Form-item>
      </div>
      <div class="submit">
        <li>
          <input type="checkbox"
                 id="public_pc_checkbox" />
          这是一个公共的或者共享的电脑
        </li>
        <Row>
          <Col span="7">
          <Button long
                  @click.native="synchronization"
                  type="primary"
                  :loading="loading"
                  class="submit-button">
            {{ loading ? '登录中' : '登录' }}
          </Button>
          </Col>
          <Col span="8">
          <div class="padding-div">这是一个空格快</div>
          </Col>
          <Col span="9">
          <Button long
                  @click.native="to_signup_page"
                  :loading="loading"
                  class="sign-up-button">sign up an account</Button>
          </Col>
        </Row>
      </div>
    </Form>
  </section>
</template>

<script>
import { CreateDb } from '@/common/js/file'
// var Datastore = require('nedb')
// var db = new Datastore({ filename: './test.db', autoload: true })
export default {
  data () {
    return {
      login: {
        email: '',
        SecretKey: '',
        password: ''
      },
      remember: [],
      loading: false
    }
  },
  computed: {
    SK () {
      return this.$store.state.SecretKey
    }
  },
  methods: {
    synchronization () {
      // var settings = {
      //   email: '644792544@qq.com',
      //   password: 'hty061699',
      //   secret_key: 'A1-H2IBYK-WL0N8L-TZLHF-L8AXA-IRC4J-JJUP8'
      // }
      var settings = {
        email: this.login.email,
        password: this.login.password,
        secret_key: this.login.SecretKey,
        fmt: ''
      }
      var that = this
      this.$axios
        .post(
          'http://49.235.114.122:8000/0password/api/v1/auth/sync',
          settings
        )
        .then(function (res) {
          debugger
          if (res.data.message === '该邮箱未注册') {
            alert('该邮箱未注册')
            return
          }
          if (res.data.message === '密码或 Secret key 错误') {
            alert('密码或 Secret key 错误')
            return
          }
          var me = that
          CreateDb('.\\\\0password.sqlite', Buffer.from(res.data), 'ascii').then(stat => {
            debugger
            me.tableData.push(stat)
          })
          console.log(Buffer.from(res.data))
          that.$store.commit('getLogin', {
            email: that.login.email,
            password: that.login.password,
            SecretKey: that.login.SecretKey
          })
          that.$router.push({
            name: 'index'
          })
        })
        .catch(function (error) {
          debugger
          console.log(error)
        })
    },
    to_signup_page () {
      this.$router.push({
        name: 'signup_page'
      })
    }
  },
  watch: {
    $route () { },
    SK (val) {
      this.login.email = this.$store.state.email
      this.login.password = this.$store.state.password
      this.login.SecretKey = this.$store.state.SecretKey
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang="less" scoped>
.login-wrap {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url(../assets/login_background.png);
}
.login-form {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 150px;
  right: 0;
  margin: auto;
  padding: 0px 20px 0;
  width: 360px;
  height: 500px;
  font-size: 14px;
  background: transparent;
  // border: 0px solid #ccc;
  // border-radius: 12px;
  // box-shadow: 2px 2px 32px 1px rgba(0, 0, 0, 0.45);
  opacity: 0.75;
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    padding: 12px 0;
    font-weight: normal;
    font-size: 22px;
    text-align: center;
  }
  .field {
    display: block;
    margin: 0 auto;
    padding: 6px 0;
    background: #ffffff;
  }
  .submit {
    // padding: 12px 0;
    border: 10px;
    border-radius: 30px;
    li {
      list-style: none;
      width: 100%;
      padding: 20px 0 20px 0;
    }
    .padding-div {
      color: #ffffff;
    }
    .submit-button {
      border-radius: 35px;
      width: 100%;
    }
    .sign-up-button {
      color: #1a8eff;
      border: 0px;
    }
  }
  .login-info {
    padding: 20px 0 10px 0;
    font-size: 20px;
  }
}
</style>

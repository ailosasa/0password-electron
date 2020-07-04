<template>
  <section class="signup-wrap">
    <Form ref="form"
          class="signup-form"
          v-if="step == 0">
      <div class="signup-info">介绍您自己</div>
      <div class="fields">
        <Form-item prop="LastName"
                   style="margin-bottom: 0">
          请问您姓什么？
          <Input class="field"
                 v-model.trim="signup.LastName"
                 width="320px">
          </Input>
        </Form-item>

        <Form-item prop="first_name"
                   style="margin-bottom: 0">
          请问您叫什么名字？
          <Input class="field"
                 v-model.trim="signup.FirstName"
                 width="320px">
          </Input>
        </Form-item>

        <Form-item prop="email"
                   style="margin-bottom: 0">
          您的电子邮箱地址是什么？
          <Input class="field"
                 v-model.trim="signup.email"
                 width="320px">
          </Input>
        </Form-item>

        <Form-item prop="password"
                   style="margin-bottom: 0">
          设置您的主密码
          <Input class="field"
                 v-model.trim="signup.password"
                 type="password"
                 width="320px">
          </Input>
        </Form-item>
      </div>
      <div class="submit">
        <Button long
                @click.native="next"
                type="primary"
                :loading="loading"
                class="next-button">
          下一步
        </Button>
      </div>
      <div class="back">
        <Button long
                @click.native="back_to_login"
                type="primary"
                :loading="loading"
                class="back-button">
          回到登陆页面
        </Button>
      </div>
    </Form>
    <Form ref="form"
          class="signup-form"
          v-if="step == 1">
      <div class="signup-info">查看您的电子邮箱收到的6位代码</div>
      <div>
        验证码已发送
        {{ this.mail }}
      </div>
      <div class="fields">
        <Form-item prop="verification_code"
                   style="margin-bottom: 0">
          输入您的6位代码
          <Input class="field"
                 v-model.trim="signup.VerificationCode"
                 width="320px">
          </Input>
        </Form-item>
      </div>
      <div class="submit">
        <Button long
                @click.native="next"
                type="primary"
                :loading="loading"
                class="next-button">
          下一步
        </Button>
      </div>
    </Form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      signup: {
        LastName: '',
        FirstName: '',
        password: '',
        email: '',
        secret_key: '',
        token: '',
        VerificationCode: ''
      },
      remember: [],
      loading: false,
      mail: '',
      step: 0
    }
  },
  methods: {
    next () {
      if (this.step === 0) {
        var LastName = this.signup.LastName
        var FirstName = this.signup.FirstName
        var email = this.signup.email
        var password = this.signup.password
        // var LastName = 'he'
        // var FirstName = 'tianyu'
        // var email = '644792544@qq.com'
        // var password = '123456'
        // this.signup.LastName = LastName
        // this.signup.FirstName = FirstName
        // this.signup.email = email
        // this.signup.password = password

        var CheckFormLigal = true
        if (LastName === '' || LastName === null) {
          CheckFormLigal = false
          alert('姓氏不能为空!')
        }

        if (FirstName === '' || FirstName === null) {
          CheckFormLigal = false
          alert('名字不能为空!')
        }

        var EmailFormat = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
        if (email === '' || email === null) {
          CheckFormLigal = false
          alert('邮箱不能为空!')
        } else {
          if (!EmailFormat.test(email)) {
            CheckFormLigal = false
            alert('邮箱地址不合法')
          }
        }

        var passwordFormat = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/
        if (password === '' || password === null) {
          CheckFormLigal = false
          alert('密码不能为空!')
        } else {
          if (!passwordFormat.test(password)) {
            CheckFormLigal = false
            alert('密码必须师6-18位数字字母')
          }
        }

        if (CheckFormLigal === true) {
          var signupSettings = {
            email: email,
            first_name: FirstName,
            last_name: LastName,
            password: password
          }

          var that = this
          this.$axios
            .post(
              'http://49.235.114.122:8000/0password/api/v1/auth/register',
              signupSettings
            )
            .then(function (res) {
              that.signup.secret_key = res.data.secret_key
              // 'res.data.secret_key'
              var verifiedEmailSendSetting = {
                email: that.signup.email,
                password: that.signup.password,
                secret_key: that.signup.secret_key
              }
              that.$axios
                .post(
                  'http://49.235.114.122:8000/0password/api/v1/auth/send-verify-email',
                  verifiedEmailSendSetting
                )
                .then(function (res) {
                  that.step = 1
                  that.token = res.data.token
                })
                .catch(function (error) {
                  console.log(error)
                })

              // this.$axios.post()
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      } else if (this.step === 1) {
        var VerifySettings = {
          verify: this.signup.VerificationCode
        }
        that = this
        var url =
          'http://49.235.114.122:8000/0password/api/v1/auth/verify/' + this.token
        this.$axios
          .post(url, VerifySettings)
          .then(function (res) {
            if (res.data.message === 'success') {
              alert('注册成功！您的secret_key是：' + that.signup.secret_key)
              that.step = 0
              that.$store.commit('getLogin', {
                email: that.signup.email,
                password: that.signup.password,
                SecretKey: that.signup.secret_key
              })
              that.signup = {
                LastName: '',
                FirstName: '',
                password: '',
                email: '',
                secret_key: '',
                token: '',
                VerificationCode: ''
              }
              that.back_to_login()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    back_to_login () {
      this.$router.push({
        name: 'login'
      })
    }
  }

}
</script>

<style lang="less" scoped>
.signup-wrap {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url(../assets/signup_background.png);
}
.signup-form {
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
  .back {
    padding: 40px 0;
  }
  .signup-info {
    padding: 20px 0 10px 0;
    font-size: 20px;
  }
}
</style>

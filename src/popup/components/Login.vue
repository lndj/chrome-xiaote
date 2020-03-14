<template>
  <div>
    <van-popup v-model="isShowPopup" round lock-scroll position="bottom" :style="{ height: '90%' }" :get-container="getContainer" @open="open">
      <div class="login-form-block" v-if="!hasSentSms">
        <van-icon class="return-button" size="24px" name="arrow-left" @click="doClose" />
        <div class="login-title">
          <span>您的</span>
          <span>手机号码</span>
        </div>
        <van-form @submit="onSubmitPhone" class="login-form">
          <van-field class="login-form-field" :formatter="phoneFormatter" autofocus v-model="phone" label="手机号" type="tel" placeholder="请输入手机号" @focus="onFocus" />
        </van-form>
        <div class="divider-line"><van-divider /></div>
        <div class="login-tips">
          <p>输入手机号，获取验证码登陆</p>
        </div>
        <div :class="'login-button ' + (active ? 'login-button-active' : 'login-button-inactive') + ' ' + buttonClass" @click="onSubmitPhone">
          <van-icon size="24px" name="arrow" />
        </div>
      </div>

      <div class="login-form-block" v-else>
        <van-icon class="return-button" size="24px" name="arrow-left" @click="hasSentSms = false" />
        <div class="login-title">
          <span>输入</span>
          <span>短信验证码</span>
        </div>
        <van-form @submit="onSubmitCode" class="login-form">
          <van-field class="login-form-field" autofocus v-model="smsCode" label="验证码" type="digit" placeholder="请输入验证码" @focus="onCodeFocus" />
        </van-form>
        <div class="divider-line"><van-divider /></div>
        <div class="login-tips">
          <p v-if="countdownSeconds > 0">重新发送验证码（{{ countdownSeconds }}s）</p>
          <p v-else class="login-tips-action" @click="onSubmitPhone">重新发送验证码</p>
        </div>
      </div>

      <van-number-keyboard :show="showPhoneKeyboard" v-model="phone" close-button-text="完成" extra-key="+" theme="custom" @blur="showPhoneKeyboard = false" />
      <van-number-keyboard :show="showCodeKeyboard" v-model="smsCode" close-button-text="完成" theme="custom" @blur="showCodeKeyboard = false" />
    </van-popup>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { smsCode, usersByMobilePhone } from '@/api/index';
const LOGIN_PHONE_COOKIE_KEY = 'phone';
const SEND_SMS_TIME_INTERVAL = 10;

export default {
  name: 'LoginPage',
  data() {
    return {
      phone: '',
      smsCode: '',
      buttonClass: '',
      showPhoneKeyboard: false,
      showCodeKeyboard: false,
      active: false,
      lastSendTime: 0,
      hasSentSms: false,
      countdownSeconds: 0,
      intervalId: null,
      isShowPopup: false,
    };
  },
  computed: {},
  props: ['show'],
  watch: {
    phone(n, o) {
      if (!n) {
        this.active = false;
        return;
      }
      const no_space = n.replace(/\s/g, '');
      if (no_space.length === 11) {
        this.active = true;
      } else {
        this.active = false;
      }
    },
    smsCode(n, o) {
      if (n && n.length === 6) {
        this.onSubmitCode();
      }
    },
    show(v) {
      this.isShowPopup = v;
    }
  },
  created() {
    const cachePhoene = Cookies.get(LOGIN_PHONE_COOKIE_KEY) || '';
    this.phone = this.phoneFormatter(cachePhoene);
  },
  methods: {
    getContainer() {
      return document.querySelector('.container');
    },
    open() {},
    doClose() {
      this.$emit('loginPageClose');
      this.isShowPopup = false;
    },
    onSubmitPhone() {
      this.buttonClass = 'animated pulse';
      if (!this.active) {
        setTimeout(_ => {
          this.buttonClass = '';
        }, 1000);
        return;
      }
      if (!this.phone) {
        this.$toast.fail('请输入手机号码');
        setTimeout(_ => {
          this.buttonClass = '';
        }, 2000);
        return;
      }
      // 判断是否已经发送过，以及上次的发送时间
      const now = parseInt(new Date().getTime() / 1000);
      if (this.lastSendTime !== 0 && now - this.lastSendTime < SEND_SMS_TIME_INTERVAL) {
        const restSeconds = SEND_SMS_TIME_INTERVAL - (this.lastSendTime ? now - this.lastSendTime : 0);
        console.log(this.lastSendTime, SEND_SMS_TIME_INTERVAL, now);
        this.$toast.fail('获取验证码过于频繁，请' + restSeconds + '秒后再次获取');
        setTimeout(_ => {
          this.buttonClass = '';
        }, 2000);
        return;
      }
      const phoneFormat = '+86' + this.phone.replace(/\s/g, '');
      smsCode(phoneFormat)
        .then(res => {
          Cookies.set(LOGIN_PHONE_COOKIE_KEY, this.phone);
          this.lastSendTime = parseInt(new Date().getTime() / 1000);
          this.hasSentSms = true;
          this.countdownSeconds = SEND_SMS_TIME_INTERVAL;
          this.smsCode = '';
          this.intervalId = setInterval(() => {
            this.countdownSeconds -= 1;
            if (this.countdownSeconds === 0) {
              clearInterval(this.intervalId);
            }
          }, 1000);
        })
        .catch(err => {
          console.error(err);
          this.$toast.fail('获取验证码失败，请稍后重试！');
        });
      if (this.hasSentSms) {
        this.$toast.success('验证码已发送');
      }

      // Cookies.set(LOGIN_PHONE_COOKIE_KEY, this.phone);
      // this.lastSendTime = parseInt(new Date().getTime() / 1000);
      // this.hasSentSms = true;
      // this.countdownSeconds = SEND_SMS_TIME_INTERVAL;
      // this.intervalId = setInterval(() => {
      //   this.countdownSeconds -= 1;
      //   if (this.countdownSeconds === 0) {
      //     clearInterval(this.intervalId);
      //   }
      // }, 1000);
      // if (this.hasSentSms) {
      //   this.$toast.success('验证码已发送');
      // }
    },
    onSubmitCode() {
      const toast = this.$toast.loading({
        message: '正在登陆中...',
        forbidClick: true,
      });
      // 此处不需要国家码
      const phoneFormat = this.phone.replace(/\s/g, '');
      usersByMobilePhone(this.smsCode, phoneFormat).then(res => {
        toast.close();
        this.show = false;
        this.$store.dispatch('Login', res).then(() => {
          this.$store.dispatch('ToggleLoginPage', false);
          this.$store.dispatch('GetStatistics', res.objectId);
        });
      });
    },
    onFocus() {
      this.showPhoneKeyboard = true;
    },
    onCodeFocus() {
      this.showCodeKeyboard = true;
    },
    phoneFormatter(v) {
      console.log(v);
      const no_space = v.replace(/\s/g, '');
      // no_space = no_space.replace(/\s*/g, '');
      console.log(no_space);
      const length = no_space.length;
      const sep = ' ';
      if (length <= 3) {
        return no_space;
      } else if (length > 3 && length <= 7) {
        return no_space.substr(0, 3) + sep + no_space.substr(3);
      } else {
        return no_space.substr(0, 3) + sep + no_space.substr(3, 4) + sep + no_space.substr(7);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-title {
  margin: 15% 0 0 40px;
}
.login-title > span {
  font-size: 25px;
  font-weight: 600;
  display: block;
}
.login-form {
  margin: 3% 0 0 40px;
}
.login-form-field {
  padding-left: 0;
}
.divider-line {
  margin: -18px 40px 0 40px;
}
.login-tips {
  font-size: 12px;
  margin-left: 40px;
  margin-top: -7px;
  color: #323233;
}
.login-tips-action {
  color: #f53248;
}
.login-button {
  margin-left: 40px;
  margin-top: 120px;
  width: 48px;
  height: 48px;
  border-radius: 48px;
  position: relative;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
.login-button-active {
  background-color: red;
}
.login-button-inactive {
  background-color: #d0cbcb;
}
.login-button > i {
  margin: auto;
  display: block;
  position: absolute;
  left: 25%;
  top: 25%;
  color: #fff;
}
.return-button {
  font-size: 24px;
  display: block;
  left: 36px;
  top: 20px;
}
.login-form-block {
  position: relative;
}
</style>

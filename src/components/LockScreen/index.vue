<template>
  <section class="LockScreen" v-if="true" :style="{backgroundImage: `url(${lockImg})`}">
    <div class="content">
      <a-upload :before-upload="onChangeBg" :showUploadList="false">
        <div class="uploadTxt">
          <SearchOutlined class="changeBg" />
          <div class="txt">点击更换背景图片</div>
        </div>
      </a-upload>
      <div class="timeZone">
        <div class="currentTime">{{currentTime}}</div>
        <div class="dateTime">{{dateTime}}</div>
      </div>
      <div class="deviceStatus">
        <span class="onlineStatus">
          <img src="/icons/onLine.ico" v-show="isOnline" />
          <img src="/icons/offLine.ico" v-show="!isOnline" />
        </span>
        <SvgIcon
          :name="charging?'batteryCharge':'battery'"
          color="#fff"
          width="33px"
          height="33px"
          class="charge"
        />
      </div>
    </div>
    <div @click="onUnlockScreen">解锁</div>
  </section>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { lockScreen } from '@/store/useSiteSettings'
import { SET_LOCK_SCREEN } from '@/store/mutation-types'
import indexdb from '@/utils/indexDB'
import moment from 'moment'
import { getWeek } from '@/utils/util'
import { useBattery, useNetwork } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { SearchOutlined } from '@ant-design/icons-vue'

const initBg =
  'https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g6/M00/03/0B/ChMkKWECB-OIKeSVAFU590PRoH0AASPhQB7J0oAVToP393.jpg'

export default defineComponent({
  name: 'LockScreen',
  components: {
    SvgIcon,
    SearchOutlined
  },
  setup() {
    const { state, commit } = useStore()
    const onUnlockScreen = () => {
      commit('SET_LOCK_SCREEN', false)
    }

    // 获取锁屏壁纸
    const lockImg = ref(null)
    onMounted(async () => {
      setTimeout(async () => {
        const bg = await indexdb.get('lockImg')
        lockImg.value = bg?.value || initBg
      }, 100)
    })

    // 获取左下角日期时间
    const getDateTime = () => {
      const week = moment().weekday()
      const formatedWeek = getWeek(week, false)
      const day = moment().date()
      const month = moment().month() + 1
      return month + '月' + day + '日' + ', ' + formatedWeek
    }
    const dateTime = ref(getDateTime())
    const currentTime = ref(moment().format('HH:mm'))
    setInterval(() => {
      currentTime.value = moment().format('HH:mm')
      dateTime.value = getDateTime()
    }, 1000)

    // 获取电池状态
    const { charging } = useBattery()
    // 获取网络状态
    const { isOnline } = useNetwork()

    const onChangeBg = (file) => {
      if (file.type.indexOf('image') < 0) {
        alert('只能传图片!')
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        indexdb.set('lockImg', this.result)
        lockImg.value = this.result
      }
      return false
    }

    return {
      lockScreen,
      onUnlockScreen,
      lockImg,
      currentTime,
      dateTime,
      charging,
      isOnline,
      onChangeBg
    }
  }
})
</script>
<style lang="less" scoped>
.LockScreen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 106;
  background-color: #fff;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    .uploadTxt {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 45%;
      top: 50%;
      color: #fff;
      &:hover {
        color: #0094ff;
      }
      .changeBg {
        font-size: 20px;
        cursor: pointer;
        margin-right: 15px;
      }
      .txt {
        cursor: pointer;
      }
    }
    .timeZone {
      position: absolute;
      bottom: 50px;
      left: 20px;
      color: #fff;
      .currentTime {
        font-size: 100px;
        font-weight: 100;
        height: 90px;
        line-height: 90px;
      }
      .dateTime {
        font-size: 60px;
        font-weight: 300;
      }
    }
    .deviceStatus {
      position: absolute;
      bottom: 30px;
      right: 50px;
    }
    .onlineStatus {
      margin-right: 20px;
      display: inline-block;
      img {
        width: 25px;
        height: 25px;
      }
    }
    .onlineStatus,
    .charge {
      vertical-align: middle;
    }
  }
}
</style>

<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UpdataExcel
        :beforeUpload="beforeUpload"
        :onSuccess="onSuccess"
      ></UpdataExcel>
    </div>
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
import employees from '@/constant/employees'
const { mapKeyPath } = employees
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    beforeUpload({ name }) {
      if (!name.endsWith) {
        this.$message.error('请上传正确格式')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in mapKeyPath) {
          if (key === '入职时间' || key === '转正时间') {
            const timestamp = item[key]
            const data = new Data((timestamp - 1) * 24 * 3600000)
            data.setFullYear(data.getFullYear() + 70)
            obj[(mapKeyPath[key] = formatTime)]
          } else {
            obj[mapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      console.log(newArr)
      await importEmployee(newArr)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less"></style>

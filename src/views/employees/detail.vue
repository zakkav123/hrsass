<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handelClcik">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="userInfo.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="userInfo.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailById"
                  >更新</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="user" label="个人详情">
            <userInfo></userInfo>
          </el-tab-pane>
          <el-tab-pane name="job" label="岗位信息" />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/employees'
import userInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      userInfo: {},
      id: this.$route.params.id,
      activeName: Cookies.get('employeesActiveName') || 'active'
    }
  },
  components: {
    userInfo
  },
  created() {
    this.getUserDetailById()
  },

  methods: {
    async getUserDetailById() {
      const res = await getUserDetailById(this.id)
      this.userInfo = res
    },
    async saveUserDetailById() {
      await saveUserDetailById(this.userInfo)
      this.$message.success('更新成功')
    },
    handelClcik() {
      Cookies.set('employeesActiveName', this.activeName)
    }
  }
}
</script>

<style scoped lang="less"></style>

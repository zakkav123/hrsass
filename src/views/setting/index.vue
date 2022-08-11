<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" @click="dialogVisible = true"
            >新增角色</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="描述" width="180">
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <el-button size="small" type="primary">主要按钮</el-button>
              <el-button size="small" type="primary">主要按钮</el-button>
              <el-button size="small" type="primary">主要按钮</el-button>
              <template> </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="sizeChange"
            layout="sizes, prev ,pager, next"
            :total="total"
            :page-size="pageSize"
            :page-sizes="[5, 15, 20, 25]"
            @current-change="currentChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top: 50px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled style="width: 400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="formData.companyAddress"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="formData.mailbox"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="formData.remarks"
                type="textarea"
                :rows="3"
                disabled
                style="width: 400px"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 弹出层 -->
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      width="30%"
      @close="btnCancel"
    >
      <el-form
        ref="roleForm"
        :rules="rules"
        :model="addRoleFrom"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleFrom.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleFrom.region" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleFroms">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRoleList, getRoleDetail } from '@/api/setting'

export default {
  data() {
    return {
      tableData: [],
      activeName: 'first',
      total: 0,
      pageSize: 3,
      page: 1,
      dialogVisible: false,
      addRoleFrom: {
        name: '',
        region: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      formData: {}
    }
  },

  created() {
    this.getRoleList(), this.getRoleDetail()
  },

  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList({
        page: this.page,
        pagesize: this.pageSize
      })
      this.total = total
      this.tableData = rows
    },
    currentChange(val) {
      this.page = val
      this.getRoleList()
    },
    sizeChange(val) {
      this.pageSize = val
      this.getRoleList()
    },
    async addRoleFroms() {
      await this.$refs.roleForm.validate()
      await addRoleList(this.addRoleFrom)
      this.dialogVisible = false
      this.$message.success('添加成功')
      this.getRoleList()
    },
    btnCancel() {
      this.$refs.roleForm.resetFields()
      this.addRoleFrom.region = ''
    },
    async getRoleDetail() {
      const res = await getRoleDetail(this.$store.state.user.userInfo.companyId)
      console.log(res)
      this.formData = res
    }
  }
}
</script>

<style scoped lang="less"></style>

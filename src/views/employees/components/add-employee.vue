<template>
  <el-dialog title="新增员工" :visible="visible" @close="onClose">
    <!-- 表单 -->
    <el-form
      :model="formData"
      :rules="rules"
      ref="fromView"
      label-width="120px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择"
          @focus="getDepartmentss"
          ref="depts"
        >
          <el-option
            v-loading="lodings"
            value=""
            style="height: 100px; background-color: #fff; overflow: unset"
          >
            <el-tree
              @node-click="treeNodeClick"
              :data="depts"
              :props="table"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="onClose">取消</el-button>
          <el-button type="primary" size="small" @click="addOnServe"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { addEmployee } from '@/api/employees'
import { transListToTree } from '@/utils'
import employees from '@/constant/employees'
const { hireType } = employees

export default {
  data() {
    return {
      hireType, // 在data中定义数据
      // 表单数据
      table: {
        label: 'name'
      },
      lodings: false,
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },

      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      depts: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    // 获取树形数据
    async getDepartmentss() {
      this.lodings = true
      const { depts } = await getDepartments()

      this.depts = transListToTree(depts, '')
      console.log(this.depts)
      this.lodings = false
    },
    // 赋值获取数据
    treeNodeClick(row) {
      this.formData.departmentName = row.name
      this.$refs.depts.blur()
    },
    addOnServe() {
      this.$refs.fromView.validate(async (validate) => {
        if (!validate) return
        await addEmployee(this.formData)
        this.$message.success('添加成功')
        this.$emit('addemp')
      })
    }
  }
}
</script>

<style></style>

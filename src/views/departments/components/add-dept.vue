<template>
  <el-dialog title="提示" @close="onClose" :visible="dialogVisible" width="50%">
    <el-form label-width="120px" :rules="rules" :model="formData" ref="form">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input
          style="width: 80%"
          v-model="formData.code"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select
          style="width: 80%"
          v-model="formData.manager"
          placeholder="请选择"
        >
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          v-model="formData.introduce"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="addDept">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { getManager, setManager } from '@/api/simple'
export default {
  data() {
    const validators = (rule, value, callback) => {
      if (!this.addNode.children) return callback()
      const isNode = this.addNode.children.some((item) => item.name == value)
      isNode ? callback(new Error('部门重复')) : callback()
    }

    const checkNameRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments()
      // depts是所有的部门数据
      // 如何去找技术部所有的子节点
      const isRepeat = depts.some((item) => item.code === value)
      isRepeat
        ? callback(new Error(`同级部门下已经有${value}的部门了`))
        : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 定义校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            validator: validators,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            validator: checkNameRepeat,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' }
        ]
      },
      managerList: []
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    addNode: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getManager()
  },

  methods: {
    // 获取人员列表数据
    async getManager() {
      const res = await getManager()
      this.managerList = res
    },
    onClose() {
      this.$emit('update:dialogVisible', false)
    },
    async addDept() {
      await this.$refs.form.validate()
      this.formData.pid = this.addNode.id
      const res = await setManager(this.formData)
      this.$message.success('新增成功')
      this.onClose()
      this.$emit('addSuccess')
    }
  }
}
</script>

<style scoped lang="less"></style>

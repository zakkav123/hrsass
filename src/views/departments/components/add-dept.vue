<template>
  <el-dialog
    :title="showTitle"
    @close="onClose"
    :visible="dialogVisible"
    width="50%"
  >
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
import { getDepartments, putDepartments, Departments } from '@/api/departments'
import { getManager, setManager } from '@/api/simple'
export default {
  data() {
    const validators = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDepartments()
        depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id
          )
          .some((item) => item.name == value)
          ? callback(new Error('部门重复'))
          : callback()
      } else {
        if (!this.addNode.children) return callback()
        const isNode = this.addNode.children.some((item) => item.name == value)
        isNode ? callback(new Error('部门重复')) : callback()
      }
    }

    const checkNameRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments()
      // depts是所有的部门数据
      // 如何去找技术部所有的子节点
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id != this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }

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
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },

  methods: {
    // 获取人员列表数据
    async getManager() {
      const res = await getManager()
      this.managerList = res
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    onClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.form.resetFields()
    },
    async addDept() {
      try {
        if (this.formData.id) {
          console.log('编辑部门')
          await this.$refs.form.validate()
          this.formData.pid = this.addNode.id
          await Departments(this.formData)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('addSuccess')
        } else {
          await this.$refs.form.validate()
          this.formData.pid = this.addNode.id
          await setManager(this.formData)
          this.$message.success('新增成功')
          this.onClose()
          this.$emit('addSuccess')
        }
      } catch {}
    },
    async getDeptById(id) {
      this.formData = await putDepartments(id)
    }
  }
}
</script>

<style scoped lang="less"></style>

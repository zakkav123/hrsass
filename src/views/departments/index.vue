<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loding="isLoading" class="tree-card">
        <!-- 头部 -->
        <Treetools
          :isRoot="true"
          :treeNode="{ name: '传智教育', manager: '负责人' }"
          @add="addNodeShow"
          @edit="editShow"
        ></Treetools>
        <!-- 树状结构 -->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <template v-slot="{ data }">
            <Treetools
              :treeNode="data"
              @add="addNodeShow"
              @edit="editShow"
              @delDepts="getDepartments"
            ></Treetools>
          </template>
        </el-tree>
      </el-card>
      <!-- 弹出层添加 -->
      <AddDept
        ref="addDept"
        @addSuccess="getDepartments"
        :dialogVisible.sync="Visible"
        :addNode="cuttenNode"
      ></AddDept>
    </div>
  </div>
</template>

<script>
import Treetools from './components/Treetools.vue'
import { getDepartments } from '@/api/departments'
import { transListToTree } from '@/utils/index'
import AddDept from './components/add-dept.vue'
export default {
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      isLoading: false,
      defaultProps: {
        label: 'name'
      },
      Visible: false,
      cuttenNode: {}
    }
  },
  components: {
    Treetools,
    AddDept
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.isLoading = true
      const res = await getDepartments()
      this.treeData = transListToTree(res.depts, '')
      this.isLoading = false
    },
    addNodeShow(val) {
      this.cuttenNode = val
      this.Visible = true
    },
    editShow(val) {
      this.Visible = true
      this.$refs.addDept.getDeptById(val.id)
    }
  }
}
</script>

<style scoped></style>

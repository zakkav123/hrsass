<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 -->
        <Treetools
          :isRoot="true"
          :treeNode="{ name: '传智教育', manager: '负责人' }"
          @add="Visible = true"
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
              @delDepts="getDepartments"
            ></Treetools>
          </template>
        </el-tree>
      </el-card>
      <!-- 弹出层添加 -->
      <AddDept
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
      const res = await getDepartments()
      this.treeData = transListToTree(res.depts, '')
    },
    addNodeShow(val) {
      this.cuttenNode = val
      this.Visible = true
    }
  }
}
</script>

<style scoped></style>

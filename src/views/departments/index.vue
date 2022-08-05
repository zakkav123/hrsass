<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 -->
        <Treetools
          :isRoot="true"
          :treeNode="{ name: '传智教育', manager: '负责人' }"
        ></Treetools>
        <!-- 树状结构 -->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <template v-slot="{ data }">
            <Treetools :treeNode="data"></Treetools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import Treetools from './components/Treetools.vue'
import { getDepartments } from '@/api/departments'
import { transListToTree } from '@/utils/index'
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
      }
    }
  },
  components: {
    Treetools
  },
  created() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
      this.treeData = transListToTree(res.depts, '')
    }
  }
}
</script>

<style scoped></style>

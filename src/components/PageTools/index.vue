<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag v-if="isShowIcon">
          <i :class="leftIcon"></i>
          <slot name="left-tag" />
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'pagetools',
  data() {
    return {}
  },
  props: {
    leftIcon: {
      type: String,
      default: 'el-icon-info'
    },
    isShowIcon: {
      type: Boolean,
      default: true
    }
  },
  created() {},

  methods: {}
}
</script>

<style scoped lang="less"></style>

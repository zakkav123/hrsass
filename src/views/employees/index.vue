<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template #left-tag>
          <span slot="before">共{{ total }}条记录</span>
        </template>
        <template #right>
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <!-- 放置新增组件 -->
          <addEmployee :visible.sync="showDialog" @addemp="addemp" />
          <el-button
            icon="plus"
            type="primary"
            size="small"
            @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                alt=""
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formaTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState !== 1"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 15, 20, 25]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'

const { exportExcelMapPath, hireType } = employees
import addEmployee from './components/add-employee'
export default {
  name: 'employess',
  data() {
    return {
      employees: [],
      total: 0,
      value1: false,
      showDialog: false,
      pages: {
        page: 1,
        size: 5
      }
    }
  },
  components: {
    addEmployee
  },
  created() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.pages)
      this.total = total
      this.employees = rows
    },
    handleCurrentChange(val) {
      this.pages.page = val
      this.getEmployeeList()
    },
    handleSizeChange(val) {
      this.pages.size = val
      this.getEmployeeList()
    },
    formOfEmployment(row, column, cellValue, index) {
      const fiadItem = employees.hireType.find((item) => item.id === cellValue)
      return fiadItem ? fiadItem.value : '未知'
    },
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    addemp() {
      this.getEmployeeList()
      this.showDialog = false
    },
    // 新增表格
    async exportExcel() {
      const res = await import('@/ventor/Export2Excel')
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      console.log(header)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      res.export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    }
  }
}
</script>

<style scoped lang="less"></style>

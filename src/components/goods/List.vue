<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input v-model="queryInfo.query" placeholder="请输入搜索内容" clearable @clear="getGoods">
            <el-button slot="append" icon="el-icon-search" @click="getGoods"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goods" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="110px"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="80px"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="170px">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.goods_id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[2, 5, 10, 20]" :page-size="queryInfo.pagesize" :total="total"></el-pagination>
    </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0
    }
  },
  created() {
    this.getGoods()
  },
  methods: {
    async getGoods() {
      const { data: res } = await this.$https.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('获取商品信息失败！')
      this.goods = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoods()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoods()
    },
    deleteById(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$https.delete(`goods/${id}`)
        if (res.meta.status !== 200) return this.$message.error('删除商品失败！')
        this.getGoods()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    goAddPage() {
      this.$router.push('/goods/add')
    },
    async showEditDialog(id) {
      const { data: res } = await this.$https.get(`goods/${id}`)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

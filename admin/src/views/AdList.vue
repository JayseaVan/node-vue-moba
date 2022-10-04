<template>
    <div>
      <h1>广告位列表</h1>
      <el-table :data="items">
          <el-table-column prop="_id" label="ID" width="220"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
                <el-button type="primary" size="small"
                @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
                <!-- /ads/edit/${scope.row._id} 表示获取当前行的id -->
                <el-button type="danger" size="small"
                @click="remove(scope.row)">删除</el-button>
                <!-- 将scope.row整行的数据作为参数传递给remove方法 -->
            </template>
          </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                items: [],
            }
        },
        methods: {
            // 分类列表的接口，从服务端获取数据
            async fetch() {
                const res = await this.$http.get('rest/ads')
                this.items = res.data
            },
            async remove(row) {
                this.$confirm(`是否确定要删除 "${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(async () => {
                    // 请求接口
                    const res = await this.$http.delete(`rest/ads/${row._id}`)

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                    // 删除后需要再执行一次fetch，更新页面
                    this.fetch()
                })
            }
        },
        created() {
            this.fetch()
        },
    }
</script>
  
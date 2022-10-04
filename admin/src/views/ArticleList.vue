<template>
    <div>
      <h1>文章列表</h1>
      <el-table :data="items">
          <el-table-column prop="_id" label="ID" width="220"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
                <el-button type="primary" size="small"
                @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
                <!-- /articles/edit/${scope.row._id} 表示获取当前行的id -->
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
                const res = await this.$http.get('rest/articles')
                this.items = res.data
            },
            async remove(row) {
                this.$confirm(`是否确定要删除文章 "${row.title}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(async () => {
                    // 请求接口
                    const res = await this.$http.delete(`rest/articles/${row._id}`)

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
  
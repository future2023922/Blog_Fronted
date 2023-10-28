<template>
  <d2-container>

    <div class="container-header">

      <h1>博客管理<small>博客列表</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>博客管理</el-breadcrumb-item>
        <el-breadcrumb-item>博客列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container-content">
      <div class="blog-box">
      <!--条件查询表单-->
        <el-form :inline="true" class="blog-content">

          <el-form-item>
            <el-input v-model="queryBlog.title" placeholder="博客名称"/>
          </el-form-item>

          <el-form-item>
            <el-input v-model="queryBlog.categoryName" placeholder="分类名"/>
          </el-form-item>

          <el-button type="primary" icon="el-icon-search" @click="getList()"></el-button>

          <el-button type="default" @click="resetData()">清空</el-button>

        </el-form>

        <!--数据展示表单-->
        <el-table
          :data="list"
          style="width: 100%"
          :default-sort = "{prop: 'createTime', order: 'descending'}"
          class="blog-content"
          :row-style="{height: '60px'}"
        >
          <el-table-column type="index" width="50"/>

          <el-table-column prop="title" label="博客名称" width="140" sortable :show-overflow-tooltip="true"/>

          <el-table-column prop="categoryName" label="分类名" width="100" sortable/>

          <el-table-column prop="content" label="文章内容" width="130" :show-overflow-tooltip="true"/>

          <el-table-column prop="copyright" label="版权" width="80" sortable/>

          <el-table-column prop="createTime" label="发布时间" width="150" sortable/>

          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <router-link :to="'/blogInfo/'+scope.row.id">
                <el-button size="mini" style="margin-right: 10px;">编辑</el-button>
              </router-link>
              <el-button type="danger" size="mini" @click="deleteById(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <el-pagination
          :current-page="current"
          :page-size="limit"
          :total="total"
          background
          style="padding: 30px 0; text-align: center;"
          layout="prev, pager, next, jumper"
          @current-change="getList"
        >
        </el-pagination>
      </div>
    </div>

  </d2-container>
</template>

<script>
import blog from '@/api/info/blog'

export default {
  name: 'blogList',
  data () {
    return {
      // 查询之后接口返回的集合
      list: null,
      total: 0,
      current: 1,
      limit: 7,
      //条件查询的条件
      queryBlog: {},
    }
  },
  created() {
    this.getList();

  },
  methods: {
    //查询所有博客
    getList(page = 1) {
      this.current = page;
      console.log(this.queryBlog);
      blog.getBlogList(this.current, this.limit, this.queryBlog)
        .then(response => { //请求成功
          this.list = response.list;
          this.total = response.total
      }).catch(error => { //错误信息
        console.log(error)
      })
    },
    //清空查询博客页面
    resetData(){
      this.queryBlog = {};
      this.getList()
    },

    //删除博客
    deleteById(id) {
      this.$confirm('确认删除此篇博客?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        blog.deleteBlogById(id).then(response =>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //删除后重新调用查询方法刷新页面
          this.getList()
        })
      })
    }

  }
}
</script>

<style scoped>
  @import "../../../../assets/style/blog/style.css";
</style>

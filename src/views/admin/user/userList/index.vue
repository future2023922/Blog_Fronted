<template>
  <d2-container>
<!--    <template slot="header">Page 1 header</template>-->
<!--    Hello World-->
    <div class="container-header">

      <h1>用户管理<small>查看用户</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container-content">
      <div class="blog-box">
      <!--条件查询表单-->
        <el-form :inline="true" class="blog-content">

          <el-form-item>
            <el-input v-model="queryUser.username" placeholder="用户名称"/>
          </el-form-item>

          <el-form-item>
            <el-input v-model="queryUser.role" placeholder="角色"/>
          </el-form-item>

          <el-form-item>
            <el-input v-model="queryUser.email" placeholder="邮箱"/>
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
        >
          <el-table-column type="index" width="50"/>

          <el-table-column prop="username" label="用户名称" width="100" sortable/>

          <el-table-column prop="email" label="邮箱" width="120" sortable/>

          <el-table-column prop="role" label="用户角色" width="100" sortable/>

          <el-table-column prop="createTime" label="注册时间" width="200" sortable/>

          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <router-link :to="'/blogInfo/'+scope.row.id">
                <el-button type="info" size="mini" icon="el-icon-view">禁用</el-button>
              </router-link>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteById(scope.row.id)">删除</el-button>
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
import api from '@/api'

export default {
  name: 'userList',
  data () {
    return {
      // 查询之后接口返回的集合
      list: null,
      total: 0,
      current: 1,
      limit: 7,
      //条件查询的条件
      queryUser: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //查询所有用户
    getList(page = 1) {
      this.current = page
      api.getAllUser(this.current, this.limit)
        .then(response => { //请求成功
          //response接口返回的数据
          this.list = response.list.records
          console.log(this.list)
          this.total = response.list.total
          console.log(this.total)
      }).catch(error => { //错误信息
        console.log(error)
      })
    },
    //清空查询博客页面
    resetData(){
      this.queryUser = {}
      this.getList()
    },
    //删除博客
    deleteById(id) {
      this.$confirm('确认删除这条分类?', '提示', {
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

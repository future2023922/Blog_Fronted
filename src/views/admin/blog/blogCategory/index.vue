<template>
  <d2-container>
    <div class="container-header">

      <h1>博客管理<small>分类管理</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>博客管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container-content">
      <div class="blog-box">
        <!--条件查询表单-->
        <el-form :inline="true" class="blog-content" ref="addForm" :model="formData">
<!--          <el-button type="default" class="but" @click="open" style="margin-bottom: 20px">添加分类</el-button>-->
          <el-button type="default" class="but" @click="showCategoryDialog = true" style="margin-bottom: 20px">添加分类</el-button>

        </el-form>

        <!--数据展示表单-->
        <el-table
          :data="list"
          style="width: 100%"
          :default-sort = "{prop: 'createTime', order: 'descending'}"
          class="blog-content"
        >
          <el-table-column type="index" min-width="50" align="center" label="序号"></el-table-column>

          <el-table-column prop="categoryName" label="分类名称" align="center"></el-table-column>

          <el-table-column prop="userName" label="作者名称" align="center"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">

              <el-button size="mini" type="default" @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.categoryName != '默认分类'" style="margin-right: 10px;">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="deleteById(scope.row.categoryId)" v-if="scope.row.categoryName != '默认分类'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
    <insert-category-dialog :show-category-dialog="showCategoryDialog"></insert-category-dialog>
    <update-category-dialog :showUpdateCategory="showUpdateCategory"></update-category-dialog>
  </d2-container>
</template>

<script>
  import category from '@/api/info/category'
  import TransformData from "../../../../libs/transformData";
  import insertCategoryDialog from "../../../../components/dialog/insertCategory";
  import updateCategoryDialog from "../../../../components/dialog/updateCategory";

  export default {
    name: 'blogCategory',
    components: {
      insertCategoryDialog,
      updateCategoryDialog
    },
    data () {
      return {
        // 查询之后接口返回的集合
        list: null,
        formData: {
          categoryName: ''
        },
        showCategoryDialog: false,
        showUpdateCategory: false
      }
    },
    methods: {
      //查询所有分类
      async getCategorys() {
        await category.getCategoryList().then(
          res =>{
            console.log(res)
            this.list = res.categoryList
            console.log(this.list)
            // this.total = res.list.total
          }
        ).catch(error => { //错误信息
          console.log(error)
        })

      },
      //删除分类
      deleteById(id) {
        this.$confirm('确认删除这项分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          category.deleteCategoryById(id).then(response =>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //删除后重新调用查询方法刷新页面
            this.getCategorys()
          }).catch(error =>{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          })
        })
      },
    //  编辑分类
    handleEdit(index, row) {
      this.showUpdateCategory = true;
      TransformData.$emit('updateCategory', row);
    }
    },
    created() {
      this.getCategorys()
    },
    mounted() {
      //取消添加分类
      TransformData.$on('cancelUpdateCategory', () => {
        this.showCategoryDialog = false;
      });
      //取消修改分类
      TransformData.$on('cancelUpdateCategory', () => {
        this.showUpdateCategory = false;
      });
      //刷新列表
      TransformData.$on('updateCategoryInfo', () => {
        this.getCategorys();
      });
    }
  }
</script>

<style scoped>
  @import "../../../../assets/style/blog/style.css";
</style>


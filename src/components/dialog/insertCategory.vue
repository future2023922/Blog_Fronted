<template>
    <el-dialog title="添加分类" :visible.sync="showCategoryDialog" :close-on-press-escape="false"
               :show-close="false" width="35%"
               :close-on-click-modal="false">
        <el-form :model="category" label-width="60px" :rules="rules" size="medium" ref="form">
            <el-form-item label="名称" prop="categoryName" label-width="">
                <el-input v-model="category.categoryName"
                          placeholder="分类名称"
                          @keyup.native.enter="onSubmit"
                          autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel" size="mini">取 消</el-button>
            <el-button type="primary" @click="onSubmit" size="mini">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
import TransformData from "../../libs/transformData";
import category from '@/api/info/category'

export default {
        name: "categoryDialog",
        props: {
          showCategoryDialog: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
              category: {
                categoryName: '',
              },

                rules: {
                  categoryName: [
                        {required: true, message: '分类名称不能为空', trigger: 'blur'},
                        {min: 2, message: '最少2个字符', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
          onSubmit() {
            this.$refs.form.validate((valid) => {
              if (!valid) {
                this.$message.error("输入不合法");
                return false;
              } else {
                category.addCategory(this.category)
                  .then(res => {
                    let msg = sessionStorage.getItem("msg");
                    if(msg === "已存在同名分类"){
                      this.$message({
                        type: "error",
                        message: msg
                      })
                      TransformData.$emit('cancelUpdateCategory');
                      TransformData.$emit('updateCategoryInfo');//刷新列表
                    }else {
                      this.$message({
                        type: 'success',
                        message: '添加成功!'
                      });
                      TransformData.$emit('cancelUpdateCategory');
                      TransformData.$emit('updateCategoryInfo');//刷新列表
                    }
                  })
              }
            })
          },
          cancel() {
            TransformData.$emit('cancelUpdateCategory');
          }
        },
        created() {
            TransformData.$on('updateCategory', (item) => {
                this.category = {...item};
                console.log(this.category)
            })
        }
    }
</script>

<style scoped lang="scss">

</style>

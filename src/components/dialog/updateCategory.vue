<template>
    <el-dialog title="修改分类" :visible.sync="showUpdateCategory" :close-on-press-escape="false"
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
        name: "updateCategoryDialog",
        props: {
          showUpdateCategory: {
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
                  category.updateCategory(this.category).then(res => {
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    });
                    TransformData.$emit('cancelUpdateCategory');
                    TransformData.$emit('updateCategory');//刷新列表
                  }).catch(error => {
                        this.$message({
                          type: 'error',
                          message: '修改失败!'
                        });
                  });
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
            })
        }
    }
</script>

<style scoped lang="scss">

</style>

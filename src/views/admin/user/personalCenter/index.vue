<template>
  <d2-container>
    <div class="container-header">

    <h1>用户中心<small>用户信息</small></h1>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>

    </div>

    <div class="container-content">

      <div class="blog-box">

        <div class="blog-content">

            <el-form ref="addForm" :model="formData" :rules="rules" :inline="true"  >

<!--              文章来源，标题，分类-->
              <div class="inputContent">

                <el-form-item prop="blogStatement">
                  <el-select v-model="formData.blogStatement" placeholder="原创" style="margin-right: 10px; width: 100px;">
                    <el-option
                      v-for="item in statementList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item prop="title">
                  <el-input v-model="formData.title" placeholder="请输入标题"  style="width: 300px"/>
                </el-form-item>

                <el-form-item prop="typeId">

                  <el-row>
                    <el-select v-model="formData.typeId" placeholder="请选择分类" >
                      <el-option
                        v-for="item in typeList"
                        :key="item.typeId"
                        :label="item.typeName"
                        :value="item.typeId">
                      </el-option>
                    </el-select>
                  </el-row>
                </el-form-item>

              </div>

<!--              md文本编辑器-->
              <div class="mavonEditor" style="margin-top: 10px;">
                <el-form-item prop="content">
                  <mavon-editor :codeStyle="markdownOption.codeStyle"
                                style="max-height: 500px;min-height: 562px;"
                                :scrollStyle="true"
                                :ishljs="true"
                                @imgAdd="handleEditorImgAdd"
                                @imgDel="handleEditorImgDel"
                                :toolbars="markdownOption"

                                v-model="formData.content"/>
                </el-form-item>
              </div>

<!--              赞赏、评论-->
              <div class="inline fields" style="margin-top: 10px;">
                <el-checkbox v-model="formData.appreciation">赞赏</el-checkbox>
                <el-checkbox v-model="formData.commentabled">评论</el-checkbox>
              </div>

<!--              发布博客-->
              <div class="release">
                <el-button round @click="add" style="margin-top: 30px;background-color: rgba(64,158,255,0.8);color: white">发布</el-button>
              </div>

            </el-form>



        </div>

      </div>

    </div>

  </d2-container>
</template>

<script>
import blog from '@/api/info/blog'
import {response} from "../../../../api/tools";
import category from '@/api/info/category'


export default {
  name: 'blogInfo',
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入正文内容', trigger: 'blur' },
          { min: 10, message: '长度最少是 10 个字符', trigger: 'blur' }
        ],
        // typeId: [
        //   { required: true, message: '必须选择分类', trigger: 'blur' }
        // ],
        blogStatement: [
          { required: true, message: '必须选择文章来源', trigger: 'blur' }
        ]
      },
      formData: {
        blogStatement: '', //文章版权
        title: '', //文章标题
        content: '#### 使用 markdown 编辑器来开始书写你的博客吧!&emsp;已经支持markdown编辑器上传图片的功能', // 正文文本
        typeId: '', // 分类id
        appreciation: false, // 是否开启赞赏
        commentabled: true, // 是否开启评论
      },
      statementList: [
        {
          id: 1,
          name: '原创'
        },
        {
          id: 2,
          name: '转载',
        }
      ],
      typeList: [],
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
        codeStyle: 'monokai-sublime'
      }

    }
  },
  created() {
    this.getTypeList()
  },
  methods: {
    handleEditorImgAdd (pos, $file) {
      const formData = new FormData()
      formData.append('file', $file)
      this.imgFile[pos] = $file
      this.$http.post('/serverApi/oss/articleImage', formData).then(res => {
        if (res.data.flag) {
          this.$message.success('上传成功')
          const url = res.data.data.url
          let name = $file.name
          if (name.includes('-')) {
            name = name.replace(/-/g, '')
          }
          const content = this.formData.content
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
          if (content.includes(name)) {
            const oStr = `(${pos})`
            const nStr = `(${url})`
            const index = content.indexOf(oStr)
            const str = content.replace(oStr, '')
            const insertStr = (soure, start, newStr) => {
              return soure.slice(0, start) + newStr + soure.slice(start)
            }
            this.formData.content = insertStr(str, index, nStr)
          }
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleEditorImgDel (pos) {
      delete this.imgFile[pos]
      this.$message.error('暂时无法删除图片！')
    },
    // 获取所有的分类并回显
    async getTypeList () {
      category.getCategoryList().then(response => {
        this.typeList = response.data
      //前端如何发送request
      }).catch(error => {
        console.log(error)
      })

    },

    add() {
      // 添加博客前先校验一下该填的信息是否已填
      this.$refs.addForm.validate(
        (valid) => {
          if(valid){
            blog.addBlog(this.formData)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
              })
            this.$router.push({path: '/blogList'})
          } else {
            this.$message.error("还有些信息未填哦")
          }
        }
      )

    }
  }
}
</script>

<style scoped>
  @import "../../../../assets/style/blog/style.css";
  .mavonEditor {
    width: 93%;
    height: 100%;
    margin: 0 auto;
  }
</style>

<template>
  <div class="blog">
    <div class="blog-banner banner">
      <h1 class="blog-title animated zoomIn">
        博客详情
      </h1>
    </div>
    <!--中间内容-->
    <div id="waypoint" class="m-container-small m-blog animated fadeInLeft">
      <div class="ui container">
        <div class="ui top attached segment">
          <div class="ui horizontal link list">
            <div class="item">
              <div class="content"><a class="header">{{dataList.userName}}</a></div>
            </div>
            <div class="item">
              <i class="calendar icon"></i> {{dataList.createTime}}
            </div>
          </div>
        </div>

<!--        博客内容-->
        <div class="ui  attached padded segment">
          <!--内容版权-->
<!--          <div class="ui right aligned basic segment">-->
<!--            <div class="ui orange basic label">{{dataList.blogStatement}}</div>-->
<!--          </div>-->
          <h2 class="ui center aligned header" v-text="dataList.title"></h2>
          <br>
            <mavon-editor
              :value="dataList.content"
              defaultOpen="preview"
              :boxShadow="false"
              style="z-index:1;height:50vh"
              :editable="false"
              :subfield="false"
              :toolbarsFlag="false"
            >
            </mavon-editor>

        </div>

        <!--博客作者及发表时间-->
        <div class="ui attached positive message">
          <div class="ui middle aligned grid">
            <div class="eleven wide column">
              <ui class="list">
                <li>作者：{{dataList.userName}}</li>
                <li>发表时间：{{dataList.createTime}}</li>
<!--                <li>版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）</li>-->
              </ui>
            </div>
            <div class="five wide column">
            </div>
          </div>
        </div>

        <!--留言区域列表-->
        <div id="comment-container" class="ui bottom attached segment">
<!--          评论列表-->
          <div class="ui blue segment">
            <div class="ui threaded comments" style="max-width: 100%">
              <h3 class="ui dividing header">Comments</h3>
              <div class="comment" v-for="item in dataList2" :key="item.id">
                <div class="content">
                  <a class="author">{{item.username}}</a>
                  <div class="metadata">
                    <span class="date">{{item.createTime}}</span>
                  </div>
                  <br>
                  <div class="text" v-text="item.content"  style = "display: inline-block">
                  </div>
                  <div class="actions" style = "display: inline;margin-left: 10px">
                    <a class="reply" @click="replyComment(item)">回复</a>
                    <a class="reply" @click="deleteComment(item)" v-show="item.userId==userInfo.uid">删除</a>
                  </div>
                </div>
                <div class="comments" >
                  <div class="comment" v-for="item2 in item.children" :key="item2.id">
                    <div class="content">
                      <a class="author">{{item2.username}}</a>
                      <div class="metadata">
                        <span class="date">{{item2.createTime}}</span>
                      </div>
                      <br>
                      <div class="text" v-text="item2.content" style = "display: inline-block">
                      </div>
                      <div class="actions" style = "display: inline;margin-left: 10px">
                        <a class="reply" @click="replyComment(item2)">回复</a>
                        <a class="reply" @click="deleteComment(item2)" v-show="item2.userId==userInfo.uid">删除</a>
                      </div>
                    </div>
                    <div class="comments">
                      <div class="comment" v-for="item3 in item2.children" :key="item3.id">
                      <div class="content">
                        <a class="author">{{item3.username}}</a>
                        <div class="metadata">
                          <span class="date">{{item3.createTime}}</span>
                        </div>
                        <br>
                        <div class="text" v-text="item3.content"  style = "display: inline-block">
                        </div>
                        <div class="actions" style = "display: inline;margin-left: 10px">
                          <a class="reply" @click="replyComment(item3)">回复</a>
                          <a class="reply" @click="deleteComment(item3)" v-show="item3.userId==userInfo.uid">删除</a>
                        </div>
                      </div>
                        <div class="comments">
                          <div class="comment" v-for="item4 in item3.children" :key="item4.id">

                          <div class="content">
                            <a class="author">{{item4.username}}</a>
                            <div class="metadata">
                              <span class="date">{{item4.createTime}}</span>
                            </div>
                            <br>
                            <div class="text" v-text="item4.content"  style = "display: inline-block">
                            </div>
                            <div class="actions" style = "display: inline;margin-left: 10px">
                              <a class="reply" @click="replyComment(item4)">回复</a>
                              <a class="reply" @click="deleteComment(item4)" v-show="item4.userId==userInfo.uid">删除</a>
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
<!--          发布评论-->
          <div class="ui form">
            <el-form ref="addForm" :model="formData">
              <div class="field">
                <textarea name="content" placeholder="请输入评论信息..." v-model="formData.content"></textarea>
              </div>
            </el-form>
            <div class="fields">
              <div class="field  m-margin-bottom-small m-mobile-wide">
                <button class="ui blue button m-mobile-wide" @click="addComment"><i class="edit icon"></i>发布</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="toolbar" class="m-padded m-fixed m-right-bottom" >
      <div class="ui vertical icon buttons ">
        <button type="button" class="ui toc blue button" >目录</button>
        <a href="#comment-container" class="ui blue button" >留言</a>
<!--        <button class="ui wechat icon button"><i class="weixin icon"></i></button>-->
        <button class="ui icon button" @click="thumbsUp">
          <i v-if="thumbsFlag" class="thumbs up icon"></i>
          <i v-else class="thumbs up outline icon"></i>
        </button>
        <div id="toTop-button" class="ui icon button" ><i class="chevron up icon"></i></div>
      </div>
    </div>
    <div class="ui toc-container flowing popup transition hidden" style="width: 250px!important;">
      <ol class="js-toc">
      </ol>
    </div>

    <div id="qrcode" class="ui wechat-qr flowing popup transition hidden " style="width: 130px !important;">
<!--      <img src="../assets/images/wechat.jpg" alt="" class="ui rounded image" style="width: 120px !important;">-->
    </div>

    <br>
    <br>
    <Footer></Footer>
  </div>

</template>
<script>
import Prism from '../../../assets/lib/prism/prism'
import comment from '@/api/info/comment'
import QRCode from 'qrcodejs2'
import Footer from '../../../components/layout/Footer'
import blog from '@/api/info/blog'
import util from "../../../libs/util";

export default {
  name: 'blogDetail',
  // 注册组件
  components: {
    Footer
  },
  data () {
    return {
      formData: {
        blogId: '',
        content: '', // 评论内容
        parentCommentId: ''
      },

      userInfo: {
        uid: '',
        nickname: ''
      },

      // 被激活的链接地址
      avatar: '',
      dataList: [],//博客信息
      dataList2: [],//评论列表
      thumbsFlag: false
    }
  },
  created () {
    this.getOneBlog()
    this.getCommentList()
  },
  methods: {
    async thumbsUp () {
      if (this.toLogin()) {
        const blogId = sessionStorage.getItem('blogId')
        const { data: res } = await this.$http.get(`/api/server/blog/${blogId}/${this.uid}`)
        if (res.flag) {
          this.$message.success(res.message)
          this.thumbsFlag = true
        } else {
          this.$message.info(res.message)
          this.thumbsFlag = false
        }
      }
    },
    toLogin () {
      const tokenStr = util.cookies.get('token')
      // 后端指定接口验证了token的正确性
      if (!tokenStr) {
        this.$confirm('登录后才能发表评论或者点赞，请问是否先登录？', '提示', { // 确认框
          type: 'info'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '你选择不登录'
          })
          return false
        })
      }
      return !!tokenStr
    },
    async deleteComment (item) {
      this.$confirm('若该评论有子评论的话会被一起删除，你确定要继续删除吗？', '提示', { // 确认框
        type: 'warning'
      }).then(() => {
        const commentId = item.id;
        const code = sessionStorage.getItem("code");
        comment.deletedComments(commentId)
          .then(res => {
            if(code == 0){
              this.getCommentList();
              sessionStorage.setItem('parentCommentId', -1);
              this.formData.content = '';
              // 弹出提示信息
              this.$message({
                message: '删除评论成功',
                type: 'success'
              })
            }else { // 执行失败
              this.$message.error(res.data.message)
            }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除操作已取消'
        })
      });
    },

    //发布评论
    async addComment () {
      if (this.toLogin()) {
        const parentCommentId = sessionStorage.getItem('parentCommentId')
        this.formData.blogId = sessionStorage.getItem('blogId')
        this.formData.parentCommentId = parentCommentId
        // 表单校验通过，发ajax请求
         comment.replyComments(this.formData).then((res) => {
           const code = sessionStorage.getItem("code",code);
          if (code == 0) {
            this.getCommentList()
            sessionStorage.setItem('parentCommentId', -1)
            this.formData.content = '';
            // 弹出提示信息
            this.$message({
              message: '回复评论成功',
              type: 'success'
            })
          } else { // 执行失败
            this.$message.error('回复评论失败')
          }
        })
      }
    },
    // 获取被评论者的id作为父id
    replyComment (item) {
      this.formData.content = '对' + item.username + '说点啥吧：(回复时，请删除本行)'
      sessionStorage.setItem('parentCommentId', item.id)
    },
    async getCommentList () {
      const blogId = sessionStorage.getItem('blogId');
      comment.getCommentOfBlogList(blogId)
        .then(res => {
          const code = sessionStorage.getItem('code');
          if(code == 0){
            this.dataList2 = res.commentList;
          }else {
            this.$message.error('获取评论列表信息失败！')
          }
      });
    },
    reloadPrism () {
      process.browser && document.querySelectorAll('pre code').forEach(block => Prism.highlightElement(block))
    },

    //获取博客及博客的作者信息
    getOneBlog() {
      const blogId = sessionStorage.getItem('blogId')
      blog.getBlog(blogId).then(
        res =>{
          this.dataList = res.blogInfo
          this.userInfo.nickname = res.blogInfo.userName;
          this.userInfo.uid = res.userId;
        }).catch(error => {
          this.$message.error('获取博客信息失败！')
      })
    },

    //获取用户信息
    // getUser () {
    //   this.user = window.sessionStorage.getItem('user')
    //   if (this.user != null) {
    //     this.uid = JSON.parse(this.user).uid
    //     this.nickname = JSON.parse(this.user).nickname
    //   }
    // },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/home')
      // 刷新页面，删除vuex数据
      window.location.reload()
    }
  },
  mounted () {
    // 有效
    setTimeout(() => {
      this.reloadPrism()
      // eslint-disable-next-line no-undef
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: '.js-toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: '.js-toc-content',
        // Which headings to grab inside of the contentSelector element.
        headingSelector: 'h1, h2, h3'
      })
    }, 1000)
    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })
    $('#payButton').popup({
      popup: $('.payQR.popup'),
      on: 'click',
      position: 'bottom center'
    })
    $('.toc.button').popup({
      popup: $('.toc-container.popup'),
      on: 'click',
      position: 'left center'
    })
    $('.wechat').popup({
      popup: $('.wechat-qr'),
      position: 'left center'
    })
    $('#toTop-button').click(function () {
      console.log('111')
      $(window).scrollTo(0, 500)
    })
    // eslint-disable-next-line no-unused-vars
    var qrcode = new QRCode('qrcode', {
      text: 'https://blog.csdn.net/Dlihctcefrep',
      width: 110,
      height: 110,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    })
  }
}
</script>

<style scoped>
  @import "../../../assets/css/typo.css";
  @import "../../../assets/css/animate.css";
  .container{
    animation: main 1s;
  }
  .m-blog {
    padding-top: 3vh !important;
    padding-bottom: 0px !important;
  }
  .blog-banner {
    text-align: center;
    height: 67vh;
    background: url(../../../../public/image/back3.jpg) center
    center / cover no-repeat;
    background-color: #49b1f5;
    color: #fff !important;
    padding: 23vh;
  }

  /*.blog-banner {*/
  /*  position: absolute;*/
  /*  top: 100px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  height: 67vh;*/
  /*  background: url("../../../../public/image/back2.png") center center /*/
  /*  cover no-repeat;*/
  /*  background-color: #49b1f5;*/
  /*  background-attachment: fixed;*/
  /*  text-align: center;*/
  /*  color: #fff !important;*/
  /*  animation: header-effect 1s !important;*/
  /*}*/
</style>

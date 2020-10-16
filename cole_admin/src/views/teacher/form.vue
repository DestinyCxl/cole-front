<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-date-picker v-model="teacher.joinDate" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
            -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro"/>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/admin/oss/file/upload?module=avatar'"
          class="avatar-uploader">
          <img v-if="teacher.avatar" :src="teacher.avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/teacher'

export default {
  data() {
    return {
      // 初始化讲师(对象)默认数据
      teacher: {
        sort: 0,
        level: 1
      },
      // 默认按钮可用
      saveBtnDisabled: false,
      BASE_API: process.env.BASE_API
    }
  },

  created() {
    // 如果路由地址中含有id，则将id传给fetchDataById方法（更新教师的第一步，根据id查找教师）
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },

  methods: {

    // 文件上传失败（http网络问题）
    handleAvatarError() {
      console.log('error')
      this.$message.error('上传失败（与服务器失去连接...）')
    },

    // 文件上传成功
    handleAvatarSuccess(response, file) {
      console.log(response)
      if (response.success) {
        // console.log(res)
        this.teacher.avatar = response.data.url
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败 （非20000错误）')
      }
    },

    // 文件上传前的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    saveOrUpdate() {
      console.log(this.teacher)
      // 再点击一次"保存"按钮后，将"保存"按钮置为不可用，防止重复提交
      this.saveBtnDisabled = true
      if (!this.teacher.id) {
        this.saveData()
      } else {
        this.updateTeacher()
      }
    },

    // 新增教师方法的调用
    saveData() {
      teacherApi.addTeacher(this.teacher)
        .then(response => {
          // 弹出成功提示
          this.$message({
            message: response.message,
            type: 'success'
          })
          // 保存成功后页面跳转到教师列表
          this.$router.push({
            path: '/teacher'
          })
        })
    },

    // 更新教师信息
    // 1.根据教师id查询数据
    fetchDataById(id) {
      teacherApi.getTeacherById(id)
        .then(response => {
          this.teacher = response.data.items
        })
    },

    // 2.保存更新好的教师信息
    updateTeacher() {
      teacherApi.updateTeacher(this.teacher)
        .then(response => {
          // 弹出成功提示
          this.$message({
            message: response.message,
            type: 'success'
          })
          // 保存成功后页面跳转到教师列表
          this.$router.push({
            path: '/teacher'
          })
        })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader img {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

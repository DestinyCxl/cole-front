// @ 符号在build/webpack.base.conf.js 中配置 表示 'src' 路径
import request from '@/utils/request'

export default {

  // 8、 根据关键字查询讲师列表
  selectNameListByKey(key) {
    return request({
      url: `/admin/edu/teacher/list/name/${key}`,
      method: 'get'
    })
  },

  // /7、根据id批量删除讲师api
  removeTeachersById(idList) {
    return request({
      url: '/admin/edu/teacher/removeTeachersById',
      method: 'delete',
      data: idList
    })
  },
  // 6、获取所有讲师api
  getAllTeacher() {
    return request({
      url: '/admin/edu/teacher/getAllTeacher',
      method: 'get'
    })
  },

  // 5、分页api
  pageList(current, limit, searchObj) {
    return request({
      url: `/admin/edu/teacher/pageList/${current}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  // 4、 根据id删除讲师api
  removeTeacherById(id) {
    return request({
      url: `/admin/edu/teacher/removeTeacherById/${id}`,
      method: 'delete'
    })
  },

  // 3、新增讲师
  addTeacher(teacher) {
    return request({
      url: `/admin/edu/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },

  // 2、新增讲师（查找讲师）
  getTeacherById(id) {
    return request({
      url: `/admin/edu/teacher/getTeacherById/${id}`,
      method: 'get'
    })
  },

  // 1、更新讲师信息
  updateTeacher(teacher) {
    return request({
      url: `/admin/edu/teacher/updateTeacher`,
      method: 'put',
      data: teacher
    })
  }
}

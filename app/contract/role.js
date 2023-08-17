/*
 * @Date: 2023-08-17 17:49:09
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-17 17:52:52
 * @FilePath: /ytb/app/contract/role.js
 * @description:
 */

module.exports = {
  // 创建todo任务
  CreateRole: {
    role_name: {
      type: 'string',
      example: 'admin',
      description: '角色名称',
    },
    description: {
      type: 'string',
      example: '超级管理员',
      description: '角色描述',
    },
    menu: {
      type: 'Array',
      example: [ 1, 2, 3 ],
      description: '菜单id',
    },
  },

};

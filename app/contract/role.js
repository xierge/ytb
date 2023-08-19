/*
 * @Date: 2023-08-17 17:49:09
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-19 10:28:26
 * @FilePath: /lx_ytb/app/contract/role.js
 * @description:
 */

module.exports = {
  // 创建role
  CreateRole: {
    roleName: {
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

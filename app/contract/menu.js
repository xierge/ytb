/*
 * @Date: 2023-08-17 17:49:09
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2023-08-19 10:39:06
 * @FilePath: /lx_ytb/app/contract/menu.js
 * @description:
 */

module.exports = {
  // 创建role
  CreateMenu: {
    menuName: {
      type: 'string',
      example: '系统管理',
      description: '菜单名称',
      require: true,
    },
    path: {
      type: 'string',
      example: 'system/usr',
      description: '菜单路径',
    },
    menuType: {
      type: 'string',
      example: 'M',
      description: '菜单类型  M是菜单  B是按钮',
      require: true,
    },
    perm: {
      type: 'string',
      example: 'sys:user:add',
      description: '权限标识',
    },
    pid: {
      type: 'string',
      example: '0',
      require: true,
      description: '父id   一级目录父id传0',
    },
    order: {
      type: 'number',
      example: 1,
      description: '排序',
      require: true,
    },
  },

};

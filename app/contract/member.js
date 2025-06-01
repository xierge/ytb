/*
 * @Date: 2023-08-17 17:49:09
 * @LastEditors: Carlos 2899952565@qq.com
 * @LastEditTime: 2025-06-01 22:21:47
 * @FilePath: /lx_ytb/app/contract/member.js
 * @description:
 */

module.exports = {
  // 创建role
  createMember: {
    name: {
      type: 'string',
      example: '用户姓名',
      description: '用户姓名',
      require: true,
    },
    phone: {
      type: 'string',
      example: '15290882887',
      description: '用户手机号',
      require: true,
    },
    remark: {
      type: 'string',
      example: '备注',
      description: '备注',
    },
    birth: {
      type: 'string',
      example: '生日',
      description: '生日',
    },

  },
};

module.exports = {
  // 获取音频上传地址和凭证
  CreateUploadVideo: {
    CoverURL: {
      type: 'string',
      example: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667117189&t=8fff947ebdc7c1b4277739adf03853c1',
      description: '自定义视频封面的URL地址',
    },
    Description: {
      type: 'string',
      example: '测试vod',
      description: '音/视频描述',
    },
    FileName: {
      type: 'string',
      example: 'lx.mp4',
      description: '音/视频源文件名 必须带扩展名',
      require: true,
    },
    FileSize: {
      type: 'Long',
      example: 123,
      description: '音/视频文件大小 单位：字节',
    },
    Title: {
      type: 'string',
      example: 'lx_test',
      description: '音/视频标题',
      require: true,
    },
  },

};

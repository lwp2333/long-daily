export default defineAppConfig({
  pages: ['pages/index', 'pages/upload', 'pages/my', 'pages/album','pages/album-detail', 'pages/edit-userInfo'],
  tabBar: {
    color: '#000',
    selectedColor: '#66a6ff',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/index',
        text: '动态',
        iconPath: './static/icon/icon_gray.png',
        selectedIconPath: './static/icon/icon.png'
      },
      {
        pagePath: 'pages/album',
        text: '相册',
        iconPath: './static/icon/icon2_gray.png',
        selectedIconPath: './static/icon/icon2.png'
      },
      {
        pagePath: 'pages/my',
        text: '我的',
        iconPath: './static/icon/icon3_gray.png',
        selectedIconPath: './static/icon/icon3.png'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'long-darily',
    navigationBarTextStyle: 'black'
  }
})

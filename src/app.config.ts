export default defineAppConfig({
  pages: [
    'pages/splash',
    'pages/index',
    'pages/time-machine',
    'pages/memorial-day',
    'pages/life-inventory',
    'pages/preview',
    'pages/upload',
    'pages/album',
    'pages/album-create',
    'pages/album-detail',
    'pages/my',
    'pages/edit-userInfo'
  ],
  tabBar: {
    color: '#000',
    selectedColor: '#66a6ff',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/index',
        text: '首页',
        iconPath: './static/icon/icon2_gray.png',
        selectedIconPath: './static/icon/icon2.png'
      },
      {
        pagePath: 'pages/time-machine',
        text: '时光机',
        iconPath: './static/icon/icon_gray.png',
        selectedIconPath: './static/icon/icon.png'
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

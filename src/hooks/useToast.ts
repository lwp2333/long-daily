import Taro from '@tarojs/taro'

type Icon = 'success' | 'error' | 'loading' | 'none'

const useToast = () => {
  const showToast = (title: string, icon: Icon = 'none', image?: string) => {
    Taro.showToast({
      title,
      icon,
      image
    })
  }

  const showLoading = (title = '') => {
    Taro.showLoading({
      title
    })
  }

  const hideLoading = () => {
    Taro.hideLoading()
  }
  return {
    showToast,
    showLoading,
    hideLoading
  }
}

export default useToast

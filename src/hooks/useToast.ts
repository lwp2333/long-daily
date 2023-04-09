import Taro from '@tarojs/taro'

type Icon = 'success' | 'error' | 'loading' | 'none'

const useToast = () => {
  const showToast = (title: string, icon: Icon = 'none', image?: string) => {
    Taro.showToast({
      title,
      icon,
      image,
      mask: true
    })
  }

  const showLoading = (title = '') => {
    Taro.showLoading({
      title,
      mask: true
    })
  }

  const hideLoading = (text?: string) => {
    Taro.hideLoading()
    text && showToast(text)
  }
  return {
    showToast,
    showLoading,
    hideLoading
  }
}

export default useToast

export function showToast(title,icon="none") {
  return wx.showToast({
    title: title,
    icon: icon
  })
}
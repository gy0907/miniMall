function login () {
  return new Promise ((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result) => {
        resolve(result)
      },
      fail: reject
    });
  })
}

export default login
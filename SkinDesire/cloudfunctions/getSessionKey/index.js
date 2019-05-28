// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request');
const crypto = require('crypto');

cloud.init();
const db = cloud.database();
const getSessionKey = (code) => {
  // https://api.weixin.qq.com/sns/jscode2session?
  // appid=APPID&secret=SECRET
  // &js_code=JSCODE
  // &grant_type=authorization_code
  const opts = {
    appid: "wx85aa5d377812ee0d",
    secret: "dac666fe429b9482fc7ca9b3af920b96",
    js_code: code,
    grant_type: "authorization_code"
  }
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url: "https://api.weixin.qq.com/sns/jscode2session",
      qs: opts,
      json: true
    }, (err, res, body) => {
      if (err) {
        reject(err)
      }
      resolve(body);
    })
  })
}
// 云函数入口函数
exports.main = async(event, context) => {
  // eslint 
  try {

    const { code, userinfo } = event;
    const weixinRes = await getSessionKey(code);
    const { session_key, openid } = weixinRes;

    // 存入用户信息
    const findByOpenid = await db.collection('userInfo')
      .where({
        _openid: openid
      })
      .get()
    if (!findByOpenid.data.length) {
      const insertRes = await db.collection('userInfo')
        .add({
          data: {
            _openid: openid,
						...userinfo
          }
        })
    }else{
			db.collection('userInfo')
				.where({
					_openid: openid
				})
					.get()
					.then(res => {
						db.collection('userInfo')
							.doc(res.data[0]._id)
							.update({
								data: {
									_openid: openid,
									...userinfo
								}
							})
					})
		}

    // md5 sha256 
    const skey = crypto.createHash('sha1')
      .update(session_key, 'utf8').digest('hex');
    return {
      skey
    }
  } catch (error) {
    return {
      error
    }
  }
}
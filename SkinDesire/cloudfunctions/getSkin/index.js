// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const skinInfo = db.collection('skinInfo')
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const _openid = wxContext.OPENID
	return await skinInfo.doc('5cf3205d2b545bb8334ca8ee').get()
}
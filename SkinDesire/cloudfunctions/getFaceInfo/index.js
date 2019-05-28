// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const faceInfo = db.collection('faceInfo')

// 云函数入口函数
exports.main = async (event, context) => {
	try{
		const wxContext = cloud.getWXContext()
		const openid = wxContext.OPENID

		return await faceInfo.where({
			_openid: openid
		}).get()
	}catch(err){
		return {
			err
		}
	}
}
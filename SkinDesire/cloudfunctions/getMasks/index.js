// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const masksCollection = db.collection('mask')

// 云函数入口函数
exports.main = async (event, context) => {
	try{
		console.log(event)
		const { page } = event
		console.log('page:' + page)
		return await masksCollection
			.skip(page)
			.limit(20)
			.get()
			
	}catch(err){
		return err
	}
}
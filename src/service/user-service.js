const mongoose =  require('mongoose')
const User = mongoose.model('User')

/**
 * 查找所用用户
 * @param  {[query]} user
 * @return {[type]} [description]
 */
exports.findAllUsers = async (query) => {
  var users = await User.find(query)
	return users
}

/**
 * 增加用户
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
exports.addUser = async (user) => {
  const newUser = await user.save()
  return newUser
}

/**
 * 删除用户
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.deleteUser = async ({phoneNumber}) => {
	return await User.findOneAndDelete({phoneNumber})
}

/**
 * 通过电话号码查询
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.findByPhoneNumber = async ({phoneNumber}) => {
	return await User.findOne({phoneNumber})
}

var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTORY = 10
var UserSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	password: String,//加盐后的密码，哈希后的值
	// 0: normal user
	// 1: verified user
	// 2: professinal user

	// > 10 admin
	// > 50 super admin
	role: {
		type:Number,
		default: 0
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

UserSchema.pre('save', function(next) {
	var user = this
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	bcrypt.genSalt(SALT_WORK_FACTORY,function(err, salt) {
		if (err) return next(err)

		bcrypt.hash(user.password, salt, null, function(err, hash) {//获得新哈希值
			if (err) return next(err)

			user.password = hash
			next()
		})
	})

	//next()
})
UserSchema.methods = {
	comparePassword: function(_password, cb) {
		bcrypt.compare(_password, this.password, function(err, isMatch) {
			if (err) return cb(err)

			cb(null, isMatch)
		})
	}
}
UserSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = UserSchema
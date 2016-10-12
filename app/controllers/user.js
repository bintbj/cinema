var User = require('../models/user')

//signup page
exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '注册页面',
	})
}
//signin page
exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '登录页面',
	})
}

//signin
exports.signin = function(req, res) {  
	var _user = req.body.user
	var name = _user.name
	console.log("_user:"+_user)
	console.log("name:"+name)
	var password = _user.password
	console.log("password:"+password)
	User.findOne({name: name}, function(err, user) {
		if (err) {
			console.log(err)
		}
		if (!user) {
			console.log("账户不存在")
			return res.redirect('/signup')
		}
		user.comparePassword(password, function(err, isMatch) {
			if (err) {console.log(err)}
			if (isMatch) {
				console.log("password is matched")

				req.session.user = user
				return res.redirect('/')
			}
			else {
				console.log("密码不匹配")
				return res.redirect('/signin')
			}
		})
	})
}
//logout
exports.logout = function(req, res) {
	delete req.session.user
	//delete app.locals.user
	res.redirect('/')
}
//signup
exports.signup = function(req, res) {
	var _user = req.body.user
	//	req.param('user')  param是对body，query，路由三种方法的封装
	//	如果'/user/signup/:userid'
	//	var _userid = req.params.userid  可以通过params获取userid
	//	如果'/user/signup/1111?userid=1112'
	//	req.query.userid  可以通过params获取参数userid
	//	如果表单提交post或者异步ajax是post的data里面
	//	req.body.userid  可以通过body获取userid

	//如果ajax提交一个/user/signup/1111?userid=1112，同时body里有一个{userid:1113}
	//用req.param('user')的时候，首先会去路由里拿，也就是1111；如果没有再去拿body里的userid；如果再没有就去query里拿
	User.findOne({name:_user.name}, function(err, user) {
		if (err) {
			console.log(err)
		}
		if (user) {
			//console.log("username:"+_user.name)
			//console.log("typeof user:" + typeof user)
			//console.log("user:"+user)
			console.log("账号已存在")
			return res.redirect('/signin')
		}
		else {
			var user = new User(_user)

			user.save(function(err, user) {
				if (err) {
					console.log(err)
				}

				console.log(user)
				req.session.user = user
				res.redirect('/')
			})
		}
	})
}
//userlist page
exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			conosle.log(err)
		}
		res.render('userlist', {
			title: 'imooc 用户列表页',
			users: users
		})
	})
}

// midware for user
exports.signinRequired = function(req, res, next) {
	var user = req.session.user

	if (!user) {
		return res.redirect('/signin')
	}

	next()
}
// midware for user
exports.adminRequired = function(req, res, next) {
	var user = req.session.user
	
	console.log("user.role:"+user.role)
	if (user.role <= 10) {
		return res.redirect('/signin')
	}
	next()
}
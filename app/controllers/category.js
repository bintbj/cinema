var Category = require('../models/category')

//admin page
exports.new = function(req, res) {
	res.render('category_admin', {
		title: 'imooc 后台分类录入页',
		category: {}
	})
}

//admin post category
exports.save = function(req, res) {
	var _category = req.body.category
	var category = new Category(_category)
	category.save(function(err, category) {
		if (err) {
			console.log(err)
		}

		res.redirect('/admin/category/list')
	})
}
//list page
/*exports.list = function(req, res) {

	Movie.fetch(function(err, movies) {
		if (err) {
			conosle.log(err)
		}
		res.render('list', {
			title: 'imooc 列表页',
			movies: movies
		})
	})
}*/

//category page
exports.list = function(req, res) {
	Category.fetch(function(err, categories) {
		if (err) {
			conosle.log(err)
		}
		res.render('categorylist', {
			title: 'imooc 分类列表页',
			categories: categories
		})
	})
}
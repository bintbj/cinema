var Movie = require('../models/movie')
var Category = require('../models/category')

//index page
exports.index = function(req, res) {
	Category
		.find({})
		.populate({path: 'movies', options: {limit: 5}})
		.exec(function(err, categories) {
			if (err) {
				console.log(err)
			}
			res.render('index', {
				title: 'imooc 首页',
				categories: categories
			})
		})
	
}
/*app.get('/',function(req, res) {
	console.log('user in session:')
	console.log(req.session.user)

	Movie.fetch(function(err, movies) {
		if (err) {
			conosle.log(err)
		}
		res.render('index', {
			title: 'imooc 首页',
			movies: movies
		})
	})
	
})*/
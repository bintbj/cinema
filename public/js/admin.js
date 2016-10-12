$(function() {
	$('.del').click(function(e) {
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)

		$.ajax({
			type: 'DELETE',
			url: '/admin/movie/list?id=' + id
		})
		.done(function(results) {
			if (results.success ===1) {
				if (tr.length > 0) {
					tr.remove()
				}
			}
		})
	})
	$('#douban').blur(function() {
		var douban = $(this) //拿到文本框
		var id = douban.val()

		if (id) {
			$.ajax({
				url: 'https://api.douban.com/v2/movie/subject/' + id,
				cache: true,
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true, //跨域
				jsonp: 'callback', //回传的参数名
				success: function(data) { //data就是豆瓣数据
					$('#inputTitle').val(data.title)
					$('#inputDoctor').val(data.directors[0].name)
					$('#inputCountry').val(data.countries[0])
					$('#inputPoster').val(data.images.large)
					$('#inputYear').val(data.year)
					$('#inputSummary').val(data.summary)
				}
			})
		}
	})
})
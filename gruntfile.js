module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**','models/**/*.js','schemas/**/*.js'],
				//tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['./'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					swd: __dirname
				}
			}

		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')//监听文件添加修改删除，重新执行注册好的任务
	grunt.loadNpmTasks('grunt-nodemon')//监听app入口文件，改动后自动重启app.js
	grunt.loadNpmTasks('grunt-concurrent')//针对慢任务，sass、less、coffee编译，优化构建时间，跑多个任务，比如前两个

	grunt.option('force', true)
	grunt.registerTask('default', ['concurrent'])//注册默认任务
}
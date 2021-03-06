module.exports = function (grunt) {

	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		meta: {
			banner: "/*!\n * <%= pkg.name %>\n * <%= pkg.description %>\n * @version <%= pkg.version %> - <%= grunt.template.today(\'yyyy-mm-dd\') %>\n * @author <%= pkg.author.name %> <<%= pkg.author.url %>>\n */\n"
		},
		jshint: {
			all: {
				src: ["src/*.js", "test/spec/*.js"],
				options: {
					jshintrc: ".jshintrc"
				}
			}
		},
		concat: {
			dist: {
				src: ["<banner:meta.banner>", "src/paypal-button.js"],
				dest: "dist/paypal-button.js",
				options: {
					banner: "<%= meta.banner %>"
				}
			},
			bundled: {
				src: ["<%= meta.banner %>", "lib/MiniCart/src/minicart.js", "src/paypal-button.js"],
				dest: "dist/paypal-button-minicart.js",
				options: {
					banner: "<%= meta.banner %>"
				}
			}
		},
		uglify: {
			dist: {
				src: [ "<%= meta.banner %>", "src/paypal-button.js" ],
				dest: "dist/paypal-button.min.js",
				options: {
					banner: "<%= meta.banner %>"
				}
			},
			bundled: {
				src: [ "<%= meta.banner %>", "lib/MiniCart/src/minicart.js", "src/paypal-button.js" ],
				dest: "dist/paypal-button-minicart.min.js",
				options: {
					banner: "<%= meta.banner %>"
				}
			}
		}
	});

	// Load grunt tasks from npm packages
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks('grunt-update-submodules');

	// Default task.
	grunt.registerTask("default", ["jshint", "update_submodules", "concat", "uglify"]);

};

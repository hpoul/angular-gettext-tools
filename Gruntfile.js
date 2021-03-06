module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jscs-checker');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-bump');

    grunt.initConfig({
        jshint: {
            all: ['{lib,test}/**/*.js', 'index.js', '!test/fixtures/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        jscs: {
            src: {
                options: {
                    config: '.jscs.json'
                },
                files: {
                    src: ['*.{js,json}', '{lib,test}/**/*.js', '!test/fixtures/custom_marker_name.js']
                }
            }
        },

        clean: {
            tmp: ['tmp']
        },

        watch: {
            test: {
                files: ['lib/**.js', 'test/**/*.{js,coffee}'],
                tasks: ['test']
            }
        },

        mochacli: {
            options: {
                files: 'test/*_test.coffee',
                compilers: ['coffee:coffee-script/register']
            },
            spec: {
                options: {
                    reporter: 'spec'
                }
            }
        },

        bump: {
            options: {
                files: ['package.json'],
                commitFiles: ['-a'],
                pushTo: 'origin'
            }
        }
    });

    grunt.registerTask('default', ['test']);
    grunt.registerTask('build', ['clean', 'jshint', 'jscs']);
    grunt.registerTask('test', ['build', 'mochacli']);
};

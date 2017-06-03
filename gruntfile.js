module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    mangle: true
                },

                files: {
                    'build/knn.min.js': [
                        'src/js/knn.js'
                    ]
                }
            },

            production: {
                options: {
                    sourceMap: false,
                    mangle: true,
                    compress: {
                        properties: true,
                        dead_code: true,
                        drop_debugger: true,
                        conditionals: true,
                        comparisons: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true
                    }
                },

                files: {
                    'build/knn.min.js': [
                        'src/js/knn.js'
                    ]
                }
            }
        },

        watch: {
            js: {
                files: 'src/js/**/*.js',
                tasks: ['uglify:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify:dev', 'watch']);
    grunt.registerTask('production', ['uglify:production']);
};

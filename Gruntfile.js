module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> */\n'
            },
            build: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                reporter: '',
                reporterOutput: '',
                jshintrc:true
            },
            all: ['<%= pkg.name %>.js']
        },
        jasmine: {
            src: ['<%= pkg.name %>.js'],
            options: {
                specs: 'test/js/specs/colora11ySpec.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('default', ['uglify','jasmine']);
    grunt.registerTask('travis', ['jshint','jasmine']);
};
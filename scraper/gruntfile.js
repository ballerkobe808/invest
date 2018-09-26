module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    watch: {
      node: {
        files: ['input.txt'],
        tasks: ['map']
      }
    },
    run: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        cmd: 'node',
        args: ['map.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('map', ['run']);
};

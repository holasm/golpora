module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),

        // Task settings here
      sass: {
        compile: {
          files: {
                  'app/styles/sass/main.scss' : 'app/styles/sass/style.css'
                }
        }
      },
      watch: {
        reloadWatch:{
                files:'Gruntfile.js',
                options:{
                    reload:true
                }
        }//
      }//end watch

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');



    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch','sass']);

};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dynamic_mappings: {
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'js',        // Src matches are relative to this path.
            src: ['*.js'],    // Actual pattern(s) to match.
            dest: 'min/js',   // Destination path prefix.
            ext: '.min.js',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          }
        ]
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          sourcemap: true
        }
      }
    },
    htmlmin: {
      multiple: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'html',
          src: ['*.html', '**/*.html'],
          dest: 'min/'
        }]
      }
    },
    browserSync: {
      bsFiles: {
        src : [
          'html/*.html',
          'html/**/*.html',
          'js/*.js',
          'sass/*.scss',
          'sass/**/*.scss',
          'config.rb'
        ]
      },
      options: {
          watchTask: true,
          server: './min'
      }
    },
    watch: {
      js: {
        files: ['js/*.js'],
        tasks: ['newer:uglify']
      },
      css: {
        files: ['sass/*.scss', 'sass/**/*.scss', 'config.rb'],
        tasks: ['compass']
      },
      html: {
        files: ['html/*.html', 'html/**/*.html'],
        tasks: ['newer:htmlmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['browserSync','watch']);

};

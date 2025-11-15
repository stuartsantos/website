module.exports = function(grunt) {

  // Load browser-sync
  const browserSync = require('browser-sync').create();

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dynamic_mappings: {
        // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
        // runs and build the appropriate src-dest file mappings then, so you
        // don't need to update the Gruntfile when files are added or removed.
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'js',      // Src matches are relative to this path.
            src: ['*.js'], // Actual pattern(s) to match.
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
    connect: {
      server: {
        options: {
          port: 4000,
          hostname: 'localhost',
        }
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
        tasks: []
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // BrowserSync task
  grunt.registerTask('browserSync', function() {
    const done = this.async();
    browserSync.init({
      server: './min',
      files: [
        'min/html/*.html',
        'min/html/**/*.html',
        'min/js/*.js',
        'min/css/*.css'
      ],
      watchTask: true
    });
    done();
  });

  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'watch']);

};

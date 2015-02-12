module.exports = function(grunt) {

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
          },
        ],
      },
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          sourcemap: true
        }
      }
    },
    htmlmin: {                                     // Task
      multiple: {
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },                                // Target
        files: [{                                  // Dictionary of files
          expand: true,
          cwd: 'html',                             // Project root
          src: ['*.html', '**/*.html'],                        // Source
          dest: 'min/'                            // Destination
        }]
      }
    },
    criticalcss: {
      custom: {
        options: {
          url: "http://localhost:4000",
          width: 1200,
          height: 900,
          outputfile: "min/css/critical.css",
          filename: "min/css/styles.css", // Using path.resolve( path.join( ... ) ) is a good idea here
          buffer: 800*1024
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          hostname: 'localhost'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
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
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-newer');


  // Default task(s).
  grunt.registerTask('default', ['connect','watch']);

};
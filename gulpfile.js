/**
 * Created by haner on 16/2/26.
 */


var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;


/**
 * server
 */
gulp.task('default',function() {

    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['app']
        }
    });
    gulp.watch(['./app/*']).on('change', reload);
});

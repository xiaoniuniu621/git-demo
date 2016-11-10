/**
 * Created by lxl on 2016/11/7.
 */
/*
1.less压缩，编译，合并
2.js合并，压缩，混淆
3.img复制
4.html压缩
*/
//在gulpfile中先载入gulp包
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');

//1.less压缩，编译，合并没有必要，一般预处理css都可以导包
gulp.task('style',function(){
    //这里是在执行style任务时自动执行的
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	//.pipe(cssnano())
	.pipe(gulp.dest('dist/style'))
	.pipe(browserSync.reload({
    	stream: true
	}))
});

//2.js合并，压缩，混淆
//合并
var concat=require('gulp-concat');
//压缩混淆
var uglify=require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
		stream:true
	}))
});

//3.img复制
gulp.task('img',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
		stream:true
	}))
});

//4.html压缩
var htmlmin=require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace: true,
		removeComments:true	
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
		stream:true
	}))
});
var browserSync = require('browser-sync');
gulp.task('serve', function() {
    browserSync({server: {baseDir: './dist'}}, function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
    });
    
    gulp.watch('src/images/*.*',['img'])
    gulp.watch('src/styles/*.less',['style'])
    gulp.watch('src/scripts/*.js',['script'])
    gulp.watch('src/*.html',['html'])
});



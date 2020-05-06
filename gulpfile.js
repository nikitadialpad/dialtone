//
//  ================================================================================
//  @  SETTINGS
//     Turn different build features on/off
//  ================================================================================
var settings = {
    clean: true,        // Turn on/off clean tasks
    scripts: false,     // Turn on/off script tasks
    styles: true,       // Turn on/off style tasks
    svgs: true,         // Turn on/off SVG tasks
    favicons: true,     // Turn on/off Favicons tasks
    sync: true,         // Turn on/off sync tasks
    build: true,        // Turn on/off build tasks
    watch: true         // Turn on/off watch tasks
};

//  ================================================================================
//  @  PACKAGES
//     What makes everything go
//  ================================================================================
//  @@ GENERAL
var {gulp, src, dest, watch, series, parallel} = require('gulp');
var fs = require('fs');
var del = require('del');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var browsersync = require('browser-sync').create();
// var atoms = require('gulp-atoms')(gulp,cfg);
var package = require('./package.json');

//  @@ STYLES
var postcss = settings.styles ? require('gulp-postcss') : null;
var preset = settings.styles ? require ('postcss-preset-env') : null;
var precess = settings.styles ? require('precss') : null;
var cssnano = settings.styles ? require('cssnano') : null;
var gutil = settings.styles ? require('gulp-util') : null;
var less = settings.styles ? require('gulp-less') : null;
var sorting = settings.styles ? require('postcss-sorting') : null;
var runSequence = settings.styles ? require('run-sequence') : null;

//  @@ SVGS
var path = settings.svgs ? require('path') : null;
var svgmin = settings.svgs ? require('gulp-svgmin') : null;
var replace = settings.svgs ? require('gulp-replace') : null;
var tap = settings.svgs ? require('gulp-tap') : null;

//  @@ FAVICONS
var favicon = settings.favicons ? require('gulp-favicons') : null;

//  @@ BUILD
var cp = settings.build ? require('child_process') : null;


//  ================================================================================
//  @  PATHS
//     Where everything is in this project
//  ================================================================================
var paths = {
    versionFile: './docs/_includes/version.html',
    clean: {
        libCss: './lib/dist/css/**/*',
        libSvg: './lib/dist/svg/**/*',
        libVue: './lib/dist/vue/**/*',
        libFavicons: './lib/dist/favicons/**/*',
        docs: './docs/_site/**/*',
        docsCache: './docs/.jekyll-cache/**/*',
        docsFavicons: './docs/assets/images/favicons/**/*'
    },
    scripts: {
        input: './lib/build/js/',
        output: './lib/dist/js/'
    },
    styles: {
        inputLib: './lib/build/less/dialtone.less',
        outputLib: './lib/dist/css/',
        inputDocs: './docs/assets/less/*.less',
        outputDocs: './docs/assets/css/',
    },
    svgs: {
        sysInput: './lib/build/svg/system/**/*.svg',
        sysOutputLib: './lib/dist/svg/system/',
        sysOutputDocs: './docs/_includes/icons/system/',
        brandInput: './lib/build/svg/brand/**/*.svg',
        brandOutputLib: './lib/dist/svg/brand/',
        brandOutputDocs: './docs/_includes/icons/brand/',
        outputVue: './lib/dist/vue/icons/',
    },
    favicons: {
        dpName: 'Dialpad',
        dpBgColor: '#FFFFFF',
        dpInput: './lib/build/favicons/dialpad/',
        dpOutput: './lib/dist/favicons/dialpad/',
        ucInput: './lib/build/favicons/uberconference/',
        ucOutput: './lib/dist/favicons/uberconference/',
        docsInput: './lib/build/favicons/',
        docsOutput: './docs/assets/images/favicons/',
        docsIcon: 'favicon-dialtone__512.png',
        dp: 'favicon__512.png',
        dpNotify: 'favicon-notification__512.png',
        dpBeta: 'favicon-beta__512.png',
        dpBetaNotify: 'favicon-beta-notification__512.png',
        dpCsr: 'favicon-csr__512.png',
        dpStaging: 'favicon-staging__512.png',
        dpStagingNotify: 'favicon-staging-notification__512.png',
        uc: 'favicon-uberconference__512.png',
    },
    mobile: {
        output: './lib/dist/ios/'
    },
    build: {
        input: './docs/',
        dest: './docs/_site/',
        config: './docs/_config.yml',
        baseurl: ''
    },
    watch: {
        lib: './lib/**/*',
        libExclude: '!./lib/dist/**/*',
        docs: './docs/**/*',
        docsExcludeSite: '!./docs/_site/**/*',
        docsExcludeCSS: '!./docs/assets/css/**/*',
        docsExcludeSVG: '!./docs/_includes/icons/**/*'
    }
}

//  ================================================================================
//  @  BANNER
//     This is inserted into all non-compiled files.
//  ================================================================================
var banner = {
    main:
        '//\n' +
        '// <%= package.name %>\n' +
        '// v<%= package.version %>\n' +
        '//\n' +
        '// <%= package.description %>\n' +
        '//\n' +
        '//\n' +
        '// ============================================================================\n'
};

//  ================================================================================
//  @   TASKS
//      Where everything happens
//  ================================================================================
//  @@  CLEAN UP
//  ================================================================================
//  --  Function to clean out folders / files
const cleanUp = (items) => {
    // Make sure the feature is active before running
    if(!settings.clean) return done();

    // Clean dist folders
    return Promise.all([
        del.sync(items)
    ]);
};

//  --  Clean out doc and library files
const cleanSite = () => {
    return cleanUp([
        paths.clean.libCss,
        paths.clean.libSvg,
        paths.clean.libVue,
        paths.clean.docs,
        paths.clean.docsCache
    ]);
}

//  --  Clean out Favicons
const cleanFavicons = () => {
    return cleanUp([
        paths.clean.libFavicons,
        paths.clean.docsFavicons
    ]);
}

//  ================================================================================
//  @@  COMPILE CSS
//      Lint, minify, and concatenate style files
//  ================================================================================
//  --  LIBRARY FILES
var libStyles = function(done) {
    //  Make sure this feature is activated before running
    if (!settings.styles) return done();

    //  Compile library files
    return src(paths.styles.inputLib)
        .pipe(less())
        .pipe(postcss())
        .pipe(dest(paths.styles.outputLib))
        .pipe(dest(paths.styles.outputDocs))
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.styles.outputLib))
        .pipe(dest(paths.styles.outputDocs));

    done();
};

//  --  DOCUMENTATION FILES
var docStyles = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.styles) return done();

    //  Compile documentation files
    return src(paths.styles.inputDocs)
        .pipe(less())
        .pipe(postcss())
        .pipe(dest(paths.styles.outputDocs))
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.styles.outputDocs));

    done();
};

//  ================================================================================
//  @@  COMPILE SVGS
//      Lint and optimize SVG files
//  ================================================================================
var buildSystemSVGs = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.svgs) return done();

    //  Compile system icons
    return src(paths.svgs.sysInput)
        .pipe(replace(' fill="none"', ''))
        .pipe(replace(' fill="#000"', ''))
        .pipe(replace(' fill="#141721"', ''))
        .pipe(replace('<svg width="24" height="24"', '<svg '))
        .pipe(replace('<svg', function(match) {
            var name = path.parse(this.file.path).name;
            var converted = name.toLowerCase().replace(/-(.)/g, function(match,group1) {
                return group1.toUpperCase();
            });
            var title = name.replace(/\b\S/g, t => t.toUpperCase()).replace(/[-]+/g, " ");

            return match + ' aria-hidden="true" focusable="false" aria-label="' + title + '" class="d-svg d-svg--system d-svg__' + converted + '"';
        }))
        .pipe(svgmin({
            plugins: [{
                convertPathData: {
                    transformPrecision: 4,
                }
            }, {
                cleanupNumericValues: {
                    floatPrecision: 2,
                }
            }, {
                collapseGroups: true,
            }, {
                removeTitle: true,
            }, {
                removeViewBox: false,
            }, {
                removeUselessStrokeAndFill: true,
            }, {
                removeAttrs: {
                    attrs: ['xmlns']
                }
            }]
        }))
        .pipe(dest(paths.svgs.sysOutputLib))
        .pipe(dest(paths.svgs.sysOutputDocs))
        .pipe(replace('<svg', '<template>\n  <svg'))
        .pipe(replace('</svg>', '</svg>\n</template>'))
        .pipe(rename(function(file) {
            var converted = file.basename.replace(/\b\S/g, t => t.toUpperCase()).replace(/[-]+/g, '');

            file.basename = 'Icon' + converted;
            file.extname = '.vue';
        }))
        .pipe(dest(paths.svgs.outputVue));

    done();
};

var buildBrandSVGs = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.svgs) return done();
    //  Compile brand icons
    return src(paths.svgs.brandInput)
        .pipe(replace('<svg width="24" height="24"', '<svg '))
        .pipe(replace('<svg', function(match) {
            var name = path.parse(this.file.path).name;
            var converted = name.toLowerCase().replace(/-(.)/g, function(match,group1) {
                return group1.toUpperCase();
            });
            var title = name.replace(/\b\S/g, t => t.toUpperCase()).replace(/[-]+/g, " ");

            return match + ' aria-hidden="true" focusable="false" aria-label="' + title + '" class="d-svg d-svg--native d-svg__' + converted + '"';
        }))
        .pipe(svgmin({
            plugins: [{
                convertPathData: {
                    transformPrecision: 4,
                }
            }, {
                cleanupNumericValues: {
                    floatPrecision: 2,
                }
            }, {
                collapseGroups: true,
            }, {
                removeTitle: true,
            }, {
                removeViewBox: false,
            }, {
                removeUselessStrokeAndFill: true,
            }]
        }))
        .pipe(dest(paths.svgs.brandOutputLib))
        .pipe(dest(paths.svgs.brandOutputDocs))
        .pipe(replace('<svg', '<template>\n  <svg'))
        .pipe(replace('</svg>', '</svg>\n</template>'))
        .pipe(rename(function(file) {
            var converted = file.basename.replace(/\b\S/g, t => t.toUpperCase()).replace(/[-]+/g, '');

            file.basename = 'Icon' + converted;
            file.extname = '.vue';
        }))
        .pipe(dest(paths.svgs.outputVue));

    done();
};

//  ================================================================================
//  @@  FAVICONS
//  ================================================================================
//  --  Build Favicon Task
const generateFavicons = (type, input, output) => {
    //  Make sure this feature is activated before running
    if (!settings.favicons) return done();

    if (type === 'dp') {
        var favInput = paths.favicons.dpInput + input;
        var favOutput = paths.favicons.dpOutput + output;
    }
    else if (type === 'uc') {
        var favInput = paths.favicons.ucInput + input;
        var favOutput = output;
    }
    else if (type === 'docs') {
        var favInput = paths.favicons.docsInput + input;
        var favOutput = output;
    }

    return src(favInput)
        .pipe(favicon({
            appName: 'Dialpad',
            appShortName: null,
            appDescription: null,
            developerName: 'Dialpad',
            developerURL: 'https://dialpad.com/',
            background: null,
            theme_color: "#fff",
            url: 'https://dialpad.com/',
            display: 'standalone',
            orientation: 'portrait',
            scope: '/',
            start_url: '/',
            version: null,
            logging: false,
            html: '/',
            pipeHTML: false,
            replace: true,
            pixel_art: true,
            icons: {
                appleStartup: false,
                firefox: false,
                yandex: false
            }
        }))
        .pipe(dest(favOutput));
};

//  --  ALL THE FAVICONS TO CREATE
//  --------------------------------------------------------------------------------
//      DIALPAD
//  --------------------------------------------------------------------------------
const faviconDp = () => { return generateFavicons('dp', paths.favicons.dp, 'default/'); }
const faviconDpNotify = () => { return generateFavicons('dp', paths.favicons.dpNotify, 'default-notify/'); }

//      DIALPAD BETA
//  --------------------------------------------------------------------------------
const faviconDpBeta = () => { return generateFavicons('dp', paths.favicons.dpBeta, 'beta/'); }
const faviconDpBetaNotify = () => { return generateFavicons('dp', paths.favicons.dpBetaNotify, 'beta/'); }

//      DIALPAD CSR
//  --------------------------------------------------------------------------------
const faviconDpCsr = () => { return generateFavicons('dp', paths.favicons.dpCsr, 'csr/'); }

//      DIALPAD STAGING
//  --------------------------------------------------------------------------------
const faviconDpStaging = () => { return generateFavicons('dp', paths.favicons.dpStaging, 'staging/'); }
const faviconDpStagingNotify = () => { return generateFavicons('dp', paths.favicons.dpStagingNotify, 'staging-notify/'); }

//      UBERCONFERENCE
//  --------------------------------------------------------------------------------
const faviconUberConference = () => { return generateFavicons('uc', paths.favicons.uc, paths.favicons.ucOutput); }

//      DIALTONE
//  --------------------------------------------------------------------------------
const faviconDialtone = () => { return generateFavicons('docs', paths.favicons.docsIcon, paths.favicons.docsOutput); }


//  ================================================================================
//  @@  BUILD SITE
//  ================================================================================
var buildDocs = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.build) return done();

    return cp
        .spawn(
            'jekyll',
            [
                'build',
                '--source=' + paths.build.input,
                '--destination=' + paths.build.dest,
                '--config=' + paths.build.config,
                '--baseurl=' + paths.build.baseurl
            ],
            { stdio: 'inherit' }
        );
    done();
};


//  ================================================================================
//  @@  START SERVER
//  ================================================================================
var startServer = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.watch) return done();

    //  Start the server
    browsersync.init({
        server: {
            baseDir: paths.build.dest
        },
        open: false,
        port: 4000
    });

    //  Signal completion
    done();
};


//  ================================================================================
//  @@  RELOAD THE BROWSER
//  ================================================================================
//  --  Reload the browser when files change
var reloadBrowser = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.watch) return done();

    //  Reload the browser
    browsersync.reload();
    done();
};


//  ================================================================================
//  @@  WATCH CHANGES
//  ================================================================================
var watchFiles = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.watch) return done();

    //  Watch files
    watch([
        paths.watch.lib,
        paths.watch.libExclude,
        paths.watch.docs,
        paths.watch.docsExcludeSite,
        paths.watch.docsExcludeCSS,
        paths.watch.docsExcludeSVG
    ], series(exports.default, reloadBrowser));
    done();
};

var updateVersion = function(done) {
    fs.writeFileSync(paths.versionFile, 'v' + package.version);

    done();
}

//  ================================================================================
//  @   EXPORT TASKS
//  ================================================================================
//  --  BUILD OUT THE SITE BUT DON'T START THE SERVER
exports.default = series(
    cleanSite,
    parallel(
        libStyles,
        docStyles,
        buildSystemSVGs,
        buildBrandSVGs
    ),
    buildDocs
);

exports.watch = series(
    exports.default,
    startServer,
    watchFiles
);

//  --  UPDATES DIALTONE VERSION
exports.version = series(
    updateVersion
);

//  --  GENERATES ALL DIALPAD / UC FAVICONS
exports.favicons = series(
    cleanFavicons,
    faviconDp,
    faviconDpNotify,
    faviconDpBeta,
    faviconDpBetaNotify,
    faviconDpCsr,
    faviconDpStaging,
    faviconDpStagingNotify,
    faviconDialtone,
    faviconUberConference,
);

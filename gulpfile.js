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
    patterns: true,     // Turn on/off SVG Pattern tasks
    fonts: true,        // Turn on/off webfonts
    favicons: false,    // Turn on/off Favicons tasks
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
var fs = require('fs-extra');
var del = require('del');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var cache = require('gulp-cached');
var browsersync = require('browser-sync').create();
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
// var favicon = settings.favicons ? require('gulp-favicons') : null;

//  @@ FONTS
var ttf2woff2 = settings.fonts ? require ('gulp-ttf2woff2') : null;

//  @@ BUILD
var cp = settings.build ? require('child_process') : null;
var git = settings.build ? require('gulp-git') : null;


//  ================================================================================
//  @  PATHS
//     Where everything is in this project
//  ================================================================================
var paths = {
    clean: {
        libCss: './lib/dist/css/**/*',
        libSvg: './lib/dist/svg/**/*',
        libVue: './lib/dist/vue/**/*',
        libFavicons: './lib/dist/favicons/**/*',
        libFonts: './dist/fonts/**/*',
        docs: './docs/_site/**/*',
        docsCache: './docs/.jekyll-cache/**/*',
        docsIcons: './docs/_includes/icons/**/*',
        docsFavicons: './docs/assets/images/favicons/**/*',
        docsFonts: './docs/assets/fonts/**/*'
    },
    scripts: {
        input: './lib/build/js/',
        output: './lib/dist/js/'
    },
    styles: {
        inputLib: './lib/build/less/dialtone.less',
        outputLib: './lib/dist/css/',
        inputDocs: './docs/assets/less/dialtone-docs.less',
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
    patterns: {
        input: './lib/build/svg/patterns/**/*.svg',
        outputLib: './lib/dist/svg/patterns/',
        outputDocs: './docs/_includes/patterns/',
        outputVue: './lib/dist/vue/patterns/',
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
    fonts: {
        input: './lib/build/fonts/*.woff2',
        outputLib: './lib/dist/fonts/',
        outputDocs: './docs/assets/fonts/'
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
        lib: './lib/build/less/**/*',
        docs: './docs/**/*',
        docsExcludeSite: '!./docs/_site/**/*',
        docsExcludeCSS: '!./docs/assets/css/**/*',
        docsExcludeFonts: '!./docs/assets/fonts/**/*',
        docsExcludeSVG: '!./docs/_includes/icons/**/*',
        docsExcludePatterns: '!./docs/_includes/patterns/**/*'
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
        paths.clean.docs,
        paths.clean.docsCache
    ]);
}

//  --  Clean out icon files
const cleanIcons = () => {
    return cleanUp([
        paths.clean.libSvg,
        paths.clean.libVue,
        paths.clean.docsIcons
    ]);
}

//  --  Clean out Favicons
const cleanFavicons = () => {
    return cleanUp([
        paths.clean.libFavicons,
        paths.clean.docsFavicons
    ]);
}

//  --  Clean out Fonts
const cleanFonts = () => {
    return cleanUp([
        paths.clean.libFonts,
        paths.clean.docsFonts
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
        .pipe(cache('libStyles'))
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
        .pipe(cache('docStyles'))
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
        .pipe(cache('buildSystemSVGs'))
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
        .pipe(cache('buildBrandSVGs'))
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

var buildPatternSVGs = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.patterns) return done();

    //  Compile system icons
    return src(paths.patterns.input)
        .pipe(cache('buildPatternSVGs'))
        .pipe(replace('<svg', function(match) {
            var name = path.parse(this.file.path).name;
            var converted = name.toLowerCase().replace(/-(.)/g, function(match,group1) {
                return group1.toUpperCase();
            });
            var title = name.replace(/\b\S/g, t => t.toUpperCase()).replace(/[-]+/g, " ");

            return match + ' aria-hidden="true" focusable="false" aria-label="' + title + '" class="d-svg d-svg--pattern d-svg__' + converted + '" xmlns="http://www.w3.org/2000/svg"';
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
        .pipe(dest(paths.patterns.outputLib))
        .pipe(dest(paths.patterns.outputDocs))
        .pipe(replace('<svg', '<template>\n  <svg'))
        .pipe(replace('</svg>', '</svg>\n</template>'))
        .pipe(rename(function(file) {
            var converted = file.basename.replace(/\b\S/g, t => t.toUpperCase()).replace(/[-]+/g, '');

            file.basename = 'Pattern' + converted;
            file.extname = '.vue';
        }))
        .pipe(dest(paths.patterns.outputVue));

    done();
};

//  ================================================================================
//  @@  FAVICONS
//  ================================================================================
//  --  Build Favicon Task
// const generateFavicons = (type, input, output) => {
//     //  Make sure this feature is activated before running
//     if (!settings.favicons) return done();
//
//     if (type === 'dp') {
//         var favInput = paths.favicons.dpInput + input;
//         var favOutput = paths.favicons.dpOutput + output;
//     }
//     else if (type === 'uc') {
//         var favInput = paths.favicons.ucInput + input;
//         var favOutput = output;
//     }
//     else if (type === 'docs') {
//         var favInput = paths.favicons.docsInput + input;
//         var favOutput = output;
//     }
//
//     return src(favInput)
//         .pipe(favicon({
//             appName: 'Dialpad',
//             appShortName: null,
//             appDescription: null,
//             developerName: 'Dialpad',
//             developerURL: 'https://dialpad.com/',
//             background: null,
//             theme_color: "#fff",
//             url: 'https://dialpad.com/',
//             display: 'standalone',
//             orientation: 'portrait',
//             scope: '/',
//             start_url: '/',
//             version: null,
//             logging: false,
//             html: '/',
//             pipeHTML: false,
//             replace: true,
//             pixel_art: true,
//             icons: {
//                 appleStartup: false,
//                 firefox: false,
//                 yandex: false
//             }
//         }))
//         .pipe(dest(favOutput));
// };

// //  --  ALL THE FAVICONS TO CREATE
// //  --------------------------------------------------------------------------------
// //      DIALPAD
// //  --------------------------------------------------------------------------------
// const faviconDp = () => { return generateFavicons('dp', paths.favicons.dp, 'default/'); }
// const faviconDpNotify = () => { return generateFavicons('dp', paths.favicons.dpNotify, 'default-notify/'); }
//
// //      DIALPAD BETA
// //  --------------------------------------------------------------------------------
// const faviconDpBeta = () => { return generateFavicons('dp', paths.favicons.dpBeta, 'beta/'); }
// const faviconDpBetaNotify = () => { return generateFavicons('dp', paths.favicons.dpBetaNotify, 'beta/'); }
//
// //      DIALPAD CSR
// //  --------------------------------------------------------------------------------
// const faviconDpCsr = () => { return generateFavicons('dp', paths.favicons.dpCsr, 'csr/'); }
//
// //      DIALPAD STAGING
// //  --------------------------------------------------------------------------------
// const faviconDpStaging = () => { return generateFavicons('dp', paths.favicons.dpStaging, 'staging/'); }
// const faviconDpStagingNotify = () => { return generateFavicons('dp', paths.favicons.dpStagingNotify, 'staging-notify/'); }
//
// //      UBERCONFERENCE
// //  --------------------------------------------------------------------------------
// const faviconUberConference = () => { return generateFavicons('uc', paths.favicons.uc, paths.favicons.ucOutput); }
//
// //      DIALTONE
// //  --------------------------------------------------------------------------------
// const faviconDialtone = () => { return generateFavicons('docs', paths.favicons.docsIcon, paths.favicons.docsOutput); }

//  ================================================================================
//  @@  FONTS
//  ================================================================================
var webfonts = function(done) {
    //  Make sure this feature is activated before running
    if (!settings.fonts) return done();

    return src(paths.fonts.input)
        .pipe(cache('webfonts'))
        .pipe(dest(paths.fonts.outputLib))
        .pipe(dest(paths.fonts.outputDocs));

    done();
}


//  ================================================================================
//  @@  BUILD SITE
//  ================================================================================
var buildDocs = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.build) return done();

    return cp.spawn(
        'npx', [
            '@11ty/eleventy'
        ], {
            cwd: paths.build.input,
            stdio: 'inherit'
        }
    );

    done();
};

//  ================================================================================
//  @@  WATCH SITE
//  ================================================================================
var watchDocs = function(done) {

    //  Make sure this feature is activated before running
    if (!settings.watch) return done();

    return cp.spawn(
        'npx', [
            '@11ty/eleventy',
            '--watch',
            '--incremental',
        ], {
            cwd: paths.build.input,
            stdio: 'inherit'
        }
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
        paths.watch.docs,
        paths.watch.docsExcludeSite,
        paths.watch.docsExcludeCSS,
        paths.watch.docsExcludeFonts,
        paths.watch.docsExcludeSVG,
        paths.watch.docsExcludePatterns,
    ], series(exports.buildWatch, reloadBrowser));
    done();
};

//  ================================================================================
//  @   EXPORT TASKS
//  ================================================================================
//  --  BUILD OUT THE SITE BUT DON'T START THE SERVER

exports.clean = series(
    cleanSite,
    cleanFonts,
)

exports.svg = series(
    buildSystemSVGs,
    buildBrandSVGs,
    buildPatternSVGs
);

// default build task
exports.default = series(
    exports.clean,
    webfonts,
    exports.svg,
    parallel(
        libStyles,
        docStyles,
    ),
    buildDocs
);

// tasks are similar to default build when we are watching but there are some
// differences. we don't build the docs (as they are built by the watch) and
// we don't clean.
exports.buildWatch = series(
    webfonts,
    exports.svg,
    parallel(
        libStyles,
        docStyles,
    ),
);

// build and run the gulp watch and eleventy watch in parallel.
exports.watch = series(
    exports.buildWatch,
    startServer,
    parallel(
        watchFiles,
        watchDocs,
    ),
);

//  --  CONVERT WEBFONTS
exports.fonts = series(
    webfonts
);

//  --  GENERATES ALL DIALPAD / UC FAVICONS
// exports.favicons = series(
//     cleanFavicons,
//     faviconDp,
//     faviconDpNotify,
//     faviconDpBeta,
//     faviconDpBetaNotify,
//     faviconDpCsr,
//     faviconDpStaging,
//     faviconDpStagingNotify,
//     faviconDialtone,
//     faviconUberConference,
// );

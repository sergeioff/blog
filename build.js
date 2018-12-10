const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const pagination = require('metalsmith-pagination');
const feed = require('metalsmith-feed');
const sass = require('metalsmith-sass');
const browserify = require('metalsmith-browserify');

let baseUrl = `/`;

const baseUrlOverride = process.argv[2];
if (baseUrlOverride !== undefined) {
    baseUrl = baseUrlOverride;
}

console.log(`Base URL: "${baseUrl}"`);

metalsmith(__dirname)
    .metadata({
        site: {
            title: "Sergey Pogorelov",
            description: "Sergey Pogorelov's blog",
            url: 'sergeioff.github.io/blog/',
            author: 'Sergey Pogorelov',
            baseUrl: baseUrl
        }
    })
    .clean(true)
    .source('./src')
    .destination('./dist')
    .use(collections({
        posts: {
            pattern: 'posts/**/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(pagination({
        'collections.posts': {
            perPage: 5,
            first: 'index.html',
            path: 'page/:num/index.html',
            layout: 'index.pug'
        }
    }))
    .use(markdown())
    .use(permalinks({
        relative: false,
        pattern: 'posts/:title'
    }))
    .use(layouts({
        directory: './src/layouts',
        default: 'post.pug',
        pattern: '**/*.html'
    }))
    .use(feed({
        collection: 'posts'
    }))
    .use(sass({
        outputDir: 'css/'
    }))
    .use(browserify({
        entries: ['js/main.js'],
        browserifyOptions: {
            transform: [['babelify', {presets: ['@babel/preset-env']}]]
        }
    }))
    .build((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Built successfully!');
        }
    });
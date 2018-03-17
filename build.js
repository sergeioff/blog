const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const pagination = require('metalsmith-pagination');

const baseUrl = '/dist/';

metalsmith(__dirname)
    .metadata({
        site: {
            name: 'blog',
            description: 'site description',
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
            layout: 'index.hbs'
        }
    }))
    .use(markdown())
    .use(permalinks({
        relative: false,
        pattern: 'posts/:title'
    }))
    .use(layouts({
        directory: './layouts',
        default: 'post.hbs'
    }))
    .build((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Built successfully!');
        }
    });
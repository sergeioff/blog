const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');

metalsmith(__dirname)
    .metadata({
        site: {
            name: 'blog',
            description: 'site description'
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
    .use(markdown())
    .use(permalinks({
        relative: false,
        pattern: ':title'
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
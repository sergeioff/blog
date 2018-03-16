const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');

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
    .use(markdown())
    .build((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Built successfully!');
        }
    });
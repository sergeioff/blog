const metalsmith = require('metalsmith');

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
    .build((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Built successfully!');
        }
    });
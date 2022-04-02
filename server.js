const express = require('express');
const app = express();

requireHTTPS = (req, res, next) => {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

app.use(requireHTTPS);

app.use(express.static('./dist/exagerado-on'));
app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: 'dist/exagerado-on/' });
});

app.listen(process.env.PORT || 8080);
# Knowsy Frontend

## Development

Development mode uses [React Hot Loader](http://gaearon.github.io/react-hot-loader/) for instaneous live-reloading.

To kick things off, make sure you can successfully `npm install` dependencies, then just run: `npm run start-dev`

Point your browser at `http://localhost:3000`

## Production

We use [PM2](http://pm2.keymetrics.io/) as our Node Process Manager. The main `start` script (described below)
automatically starts Node in cluster mode.

For production deployment, first, ensure that

```bash
npm run build
```

completes successfully. This will generate minified CSS and JS files.

Then to kick things off, run

```bash
npm start
```


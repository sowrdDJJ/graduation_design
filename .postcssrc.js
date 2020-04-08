// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    "postcss-px-to-viewport":{
      viewportWidth:750,
      viewportHeight:1334,
      unitPrecision:3,
      viewportUnit:'vw',
      selectorBlackList:[/(node_modles)/], // (Array) The selectors to ignore and leave as px. 
      minPixelValue:16, // (Number) Set the minimum pixel value to replace. 
      mediaQuery:false // (Boolean) Allow px to be converted in media queries. 
    },
    "cssnano":{
        preset:"advanced",
        autoprefixer:false,
        "postcss-zindex":false
    }
  },
  "postcss-pxtorem": {
    "rootValue": 16,
    "propList": ["*"]
  }
}

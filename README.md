
# create-lib

## Why this lib ?

I wanted to export a graph made with `chartjs` but the exported image had no background color, it was transparent.

I looked how to set the background color, I found this issue: https://github.com/chartjs/Chart.js/issues/2830. 
The accepted answer was a snippet to paste in the project.

I though this need was so recurrent that a dedicated plugin would be useful.

Ok so let's make a npm package for it!

## Github repo

I already have node installed, a npm account and a github account.

I create a github repo named `chartjs-plugin-background`

## Npm project

I type `yarn init` and answer the following info:

- name: chartjs-plugin-background
- version : 1.0.0
- description : Plugin for chart.js to set the background color of a chart
- entry point : index.js
- test command : empty for the moment
- git repository : should have the right value by default, type enter
- keywords: empty for the moment
- author : acailly
- license : WTFPL

(wonder what is WTFPL? see https://spdx.org/licenses/WTFPL.html)

## Project code

Here is the killing feature (in `src/chartjs-plugin-background.js`):

```javascript

INSERT CODE HERE

```

Hey but it's ES6!

## Compile ES6 in good old ES5

I've seen recently on twitter that "webpack for apps, rollup for libs" (https://twitter.com/youyuxi/status/821755461816975361).

Ok then, go for rollup! 

(Disclaimer: this lib is obviously not a good example to debate over webpack over rollup, tree shaking or chunks are not relevant for these few lines of code. I just pick one, pick yours)

I add `rollup` to the dev dependencies:

- `yarn add rollup --dev`
- `yarn add rollup-plugin-babel --dev`
- `yarn add babelrc-rollup --dev`
- `yarn add babel-plugin-external-helpers --dev`
- `yarn add babel-preset-latest --dev`

Then, I create the file `rollup.config.js` in the project root: 

```javascript
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

// rollup.config.js
export default {
  entry: 'src/chartjs-plugin-background.js',
  plugins: [
    babel(babelrc()),
  ],
  format: 'cjs',
  dest: 'index.js'
};
```

and the file `.babelrc`:

```json
{
  "presets": [
    [
      "latest",
      {
        "es2015": {
          "modules": false
        }
      }
    ]
  ],
  "plugins": [
      "external-helpers"
  ]
}
```

Finally, I add the following script in `package.json`: 

```json
"build": "rollup -c"
```

## Build and deploy

Executing `yarn build` generates `index.js`. Good.

Now it's time to publish the module on npmjs.

TODO

## Test it

### A demo

TODO

### ...and some unit tests

TODO Jest

TODO Travis


## Open to others

What if someone wants to contribute to this wonderful project ?

Here is some questions you should answer.

### How should I format my code?

TODO editorconfig

### TODO

## What else?

### Badges!

TODO Badges










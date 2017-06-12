
# create-lib

[![Build Status](https://travis-ci.org/acailly/chartjs-plugin-background.svg?branch=master)](https://travis-ci.org/acailly/chartjs-plugin-background)


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

TODO INSERT CODE

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
- `yarn add babel-preset-es2015 --dev`
- `yarn add rollup-plugin-uglify --dev`

Then, I create the file `rollup.config.js` in the project root: 

```javascript

TODO INSERT CODE

```

Some things here worth mentionning:
- I choose `umd` format instead of `cjs` because my module is a browser module
- I set `chart.js` as an external dependency
- I use two plugins: `babel` to convert from ES6 to ES5, and `uglify` to minify the final module 

Then, I create the file `.babelrc` to configure the ES6 to ES5 conversion:

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

But first let's create a user account on npm with `npm adduser`, I'll have to set:
- your username
- your password
- your email

Once done, all I have to do is `npm publish` to publish.

Let's have a look on https://www.npmjs.com/package/chartjs-plugin-background, all right!


## Test it

### A demo

Sometime when I find a module on npm, I want to try it quickly. And that's possible when there is some demo code in the module source code. Let's add that to my module!

The demo will be in `demo` folder, how clever!

It is a simple html file importing `chart.js` and my module and displaying some charts with custom background:

```html

TODO INSERT CODE HERE

```

That's it! Now I can clone the repo, run `yarn build`, open `demo/index.html` and I see if this lib is what I'm looking for. You think it's a bit too much, mee too.

### ... a JSFiddle

Demo in sources is good for testing the lib while I'm developping it. 
For potential future users, a jsfiddle (or codepen or whatever) is much simpler.

Creating a JSFiddle is much like creating an HTML demo page while:
- putting css in the `CSS` panel instead of in a `<style>` markup
- putting javascript code in the `CSS` panel instead of in a `<script>` markup
- putting javascript external scripts in the `External resources` settings instead of in a `<script>` markup

Concerning the external scripts, I want to load the script directly from my github but if I put https://github.com/acailly/chartjs-plugin-background/blob/master/index.js in the external resource link, I have an error saying that 'its MIME type ('text/html') is not executable, and strict MIME type checking is enabled'.

So I copy that URL and paste it in http://rawgit.com/ which gives me another URL that works perfectly in JSFiddle.

Now everyone can go to https://jsfiddle.net/2s83tmxL/ and play with the lib!

### ...and some unit tests

It's missing something here. Even if this lib doesn't do much, it would be nice to have some unit testing.

#### Write the test

First thing to do that: add a test runner. I choose Jest (https://facebook.github.io/jest/) but again, it's more because I'm used to it, use whatever fits your need

`yarn add jest --dev`

Next step: create a test file `chartjs-plugin-background.test.js`

```javascript

TODO INSERT CODE HERE

```

... and a mock file for the `chart.js` dependency, that I put in `__mocks__/chart.js.js`:

```javascript

TODO INSERT CODE HERE

```

Final step, edit `package.json` to make the `test` script run the `jest` command:

```json
"test": "jest --watch"
```

and run the tests with `yarn test`

#### ES6 to ES5... again?

```
SyntaxError: Unexpected token import
```

What? ES6 import are not supported? 

I configured rollup to handle ES6 but rollup is used to produce the production bundle, not to run the tests.

To add support for ES6 in Jest, I just have to install some dependencies: 
- `yarn add babel-jest --dev` 
- `yarn add regenerator-runtime --dev`

Let's retry...

`yarn test`

It works!


#### Setup continuous integration

Now I have tests, let's add some continuous integration so that I can be sure tests are always green

I don't have a Travis account so I create one on https://travis-ci.org/ with the `Sign in with Github` 

Once done, I "Flick the repository switch on" for my repository and I add the following `.travis.yml` file to git:

```yaml

TODO INSERT CODE HERE

```

The travis build starts when the file is pushed, we can see everything is green, good.

Now it's time to do a thing I've never done: add a badge

I follow instructions of https://docs.travis-ci.com/user/status-images/ and voila, my first badge!

## Open to others

What if someone wants to contribute to this wonderful project ?

Here is some questions you should answer.

### How should I format my code?

TODO editorconfig

### Contributing guidelines

TODO s'inspirer de https://github.com/chartjs/chartjs-plugin-annotation/blob/master/CONTRIBUTING.md


### TODO

## What else?

### Badges!

TODO Badges


## Pfiouu!!! Do I need to do all of that everytime!?

TODO Creer create-lib









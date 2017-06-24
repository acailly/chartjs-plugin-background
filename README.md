
# create-lib

[![Build Status](https://img.shields.io/travis/acailly/chartjs-plugin-background.svg)](https://travis-ci.org/acailly/chartjs-plugin-background)
[![File size](https://img.shields.io/github/size/acailly/chartjs-plugin-background/index.js.svg)](https://github.com/acailly/chartjs-plugin-background)
[![npm](https://img.shields.io/npm/v/chartjs-plugin-background.svg)](https://github.com/acailly/chartjs-plugin-background)
[![downloads](https://img.shields.io/npm/dm/chartjs-plugin-background.svg)](https://github.com/acailly/chartjs-plugin-background)
[![license](https://img.shields.io/npm/l/chartjs-plugin-background.svg)](https://spdx.org/licenses/WTFPL)


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

import Chart from 'chart.js'

const plugin = {
  beforeDraw: function (chartInstance) {
    const {backgroundColor} = chartInstance.chart.options

    if (backgroundColor) {
      const ctx = chartInstance.chart.ctx
      const canvas = chartInstance.chart.canvas

      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }
}

export default plugin
Chart.pluginService.register(plugin)


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

import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import uglify from 'rollup-plugin-uglify'

// rollup.config.js
export default {
  entry: 'src/chartjs-plugin-background.js',
  plugins: [
    babel(babelrc()),
    uglify()
  ],
  format: 'umd',
  moduleName: 'chartjs-plugin-background',
  dest: 'index.js',
  external: [ 'chart.js' ]
}


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

<html>
    <head>
        <title>Demo for chartjs-plugin-background</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.js"></script>
        <script src="../index.js"></script>
        <style>
            .myChartDiv {
                max-width: 600px;
                max-height: 400px;
            }
        </style>
    </head>

    <body>
        <div class="myChartDiv">
            <canvas id="myChart" width="600" height="400"></canvas>
        </div>
        <script>
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                        label: '# of letters',
                        data: [3, 4, 6, 5, 6, 6]
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    // Background option
                    backgroundColor: 'pink'
                }
            });
        </script>
    </body>
</html>

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

import plugin from './chartjs-plugin-background'

describe('Chart.js background plugin', () => {
  it('should not fill the background rect if backgroundColor option is not set', () => {
    const fillRectMock = jest.fn()
    const chartInstance = {
      chart: {
        ctx: {
          fillRect: fillRectMock
        },
        options: {
          backgroundColor: null
        }
      }
    }

    plugin.beforeDraw(chartInstance)

    expect(fillRectMock.mock.calls.length).toBe(0)
  })

  it('should fill the background rect with color set in backgroundColor option', () => {
    const fillRectMock = jest.fn()
    const chartInstance = {
      chart: {
        canvas: {
          width: 200,
          height: 200
        },
        ctx: {
          fillRect: fillRectMock
        },
        options: {
          backgroundColor: 'pink'
        }
      }
    }

    plugin.beforeDraw(chartInstance)

    expect(fillRectMock.mock.calls.length).toBe(1)
  })
})


```

... and a mock file for the `chart.js` dependency, that I put in `__mocks__/chart.js.js`:

```javascript

export default {
  pluginService: {
    register: jest.fn()
  }
}


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

language: node_js
node_js:
  - "node"

script:
  - yarn run jest


```

The travis build starts when the file is pushed, we can see everything is green, good.

Now it's time to do a thing I've never done: add a badge

I follow instructions of https://docs.travis-ci.com/user/status-images/ and voila, my first badge!

## Open to others

What if someone wants to contribute to this wonderful project ?

Here is some questions you should answer.

### How should I format my code?

There is many ways to define a formatting style for a project. 
You can use EditorConfig for a widely supported solution: http://editorconfig.org/
You can use ESLint (http://eslint.org/) with one of the many preset like the Airbnb one (https://github.com/airbnb/javascript)

I choose to use standard JS (https://standardjs.com/) which is very opinionated but simple to setup  

I install it with `yarn add standard@*`

... and I make the `test` script to execute `standard` before `jest`:

```
"test": "standard --fix src/**.js && jest --watch",
```

Here I tell `standard` auto fix issues that can be, and ignore every thing outside `src/`


### Contributing guidelines

It can happen that someone wants to fix a bug in that small lib of mine.

In that case, the usage is to read the `CONTRIBUTING.md` file to know how to contribute to a project.

```
# Contributing

We love pull requests from everyone. 

Fork, then clone the repo:

```
git clone git@github.com:your-username/chartjs-plugin-background.git
```

Install dependencies:

```
yarn
```

Make sure the tests pass:

```
yarn test
```

Make your change. Add tests for your change. Make the tests pass:

```
yarn test
```

Push to your fork and submit a pull request.

Some things that will increase the chance that your pull request is accepted:

* Write tests.
* Write a [good commit message][commit].
* Write a [good pull request][pr].

[commit]: https://chris.beams.io/posts/git-commit/
[pr]: https://github.com/blog/1943-how-to-write-the-perfect-pull-request

```

### License

I chose `WTFPL` license in the `package.json` file.

I should add a `LICENSE.md` file to explain what this license is:

```
        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
                    Version 2, December 2004 

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net> 

 Everyone is permitted to copy and distribute verbatim or modified 
 copies of this license document, and changing it is allowed as long 
 as the name is changed. 

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

  0. You just DO WHAT THE FUCK YOU WANT TO.
```

and... a badge!

```
[![License](https://upload.wikimedia.org/wikipedia/commons/0/0a/WTFPL_badge.svg)](https://spdx.org/licenses/WTFPL) 
```

### Add some badges!

The final touch, I now go to http://shields.io/ to add some badges to the readme file:

```
[![Build Status](https://img.shields.io/travis/acailly/chartjs-plugin-background.svg)](https://travis-ci.org/acailly/chartjs-plugin-background)
[![File size](https://img.shields.io/github/size/acailly/chartjs-plugin-background/index.js.svg)](https://github.com/acailly/chartjs-plugin-background)
[![npm](https://img.shields.io/npm/v/chartjs-plugin-background.svg)](https://github.com/acailly/chartjs-plugin-background)
[![downloads](https://img.shields.io/npm/dm/chartjs-plugin-background.svg)](https://github.com/acailly/chartjs-plugin-background)
[![license](https://img.shields.io/npm/l/chartjs-plugin-background.svg)](https://spdx.org/licenses/WTFPL)
```

## Pfiouu!!! Do I need to do all of that everytime!?

TODO Creer create-lib









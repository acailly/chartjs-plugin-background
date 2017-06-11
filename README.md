
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
- `yarn add babel-preset-latest --dev`

Then, I create the file `rollup.config.js` in the project root: 

```javascript

TODO INSERT CODE

```

Two things here worth mentionning:
- I choose `umd` format instead of `cjs` because my module is a browser module
- I set `chart.js` as an external dependency

Then, I create the file `.babelrc`:

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










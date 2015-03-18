# angular-ux

Angular UX is a library that helps you create live, navigable prototypes with the help of AngularJS but without having to learn how to code ;). **DESIGNERS, I'm looking at you!**

## Key features

* Helps you create **live, navigable prototypes**
* It's **intended for designers**, not coders
* **No need to code** a single line of JS.

## Installing it

You have several options:

````bash
bower install angular-ux
````

````bash
npm install angular-ux
````

````html
<script type="text/javascript" src="https://rawgit.com/mgonto/angular-ux/master/dist/angular-ux.js"></script>
````

## Configuring it

### Setting up our prototype app
The first thing we need to do is setup a new `index.html` which will be the point of entry for our app. 
Besides linking to the specific CSS and JS files we need for our prototype, we always need to reference `jQuery`, `angular.js`, `angular-animate` and `angular-ux` in that order.

> We also need some way of serving the directory where the `index.html` and the other files will reside. For that, we can use `npm` command `serve` or `python -M SimpleHTTPServer`

### Setting up the Angular application

Now, we need to setup the Angular application. This will be the only javascript we need to code to have our prototype running. The good thing is that it’s just copy and paste ;).

```html
<body ng-app=“prototype” ng-ctrl=“MainCtrl”>
</body>
```

```js
// app.js
angular.module(‘prototype’, [‘ngAnimate’, ‘ux’])
  .controller(‘MainCtrl’, function($scope) {
    $scope.data = {};
  });
```

## Usage / Features

### Navigating through different pages
The first thing all prototypes need is the ability to navigate through different pages. 
For this, we can use the `ux-page` directive.

```html
<body>
  <ux-page name=“Home” home>
    <ng-include src=“’home.html’”></ng-include>
  </ux-page>
  <ux-page name=“Details”>
    <ng-include src=“’detail.html’”></ng-include>
  </ux-page>
</body>
```
```html
<!— home.html —>
<!— … —>
<a href=“” ux-go=“Details”>Go to Details page</a>
```

In this case, we’re creating 2 different pages. The content of each of those pages are in separate files which we’re including using the `ng-include` directive. Note that we added the `home` attribute to the `ux-page` that will be the main one (displayed by default).

Then, in the `home.html`, we have a link that navigates the user to the `Details` page. For that, we’re using the `ux-go` directive with the name of the page that we want to browse to.

> **Note**: It’s important to note that you must put the `href=“”` in the link so that it’s clickable.

### Theming

When you’re prototyping you want to try different themes (colors, typographies, sizes, etc.) at the same time to see which one works better.
For that, you can use a the `ux-themeable` feature from `angular-ux`:

```html
<div class=“content” ux-themeable>
  <h1>Title</h1>
  <p>This is some text</p>
</div>
```

First you need to add the `ux-themeable` directive to the parent HTML element that you want to theme. Then, to change themes, you need to specify the theme name as a query parameter in the prototype URL. For example, if you go to `http://localhost:3000/#/?page=Details&uxTheme=option1`, the `div.content` will end up having an additional class named `option1` which means we can style it as follows:

```css
div.content.option1 h1 {
  font-size: 38px;
}

div.content.option1 p {
  color: red
}
```

Alternatively, you can set the query parameter to use for this `ux-themeable` as follows:

```html
<div class=“content” ux-themeable="contentTheme">
  <h1>Title</h1>
  <p>This is some text</p>
</div>
```

Then, the URL to add `option1` class to `div.content` would be `http://localhost:3000/#/?page=Details&ucontentTheme=option1`

## Examples

You can see a live example in [the example folder](https://github.com/mgonto/angular-ux/tree/master/example).

To start the sample, just run `serve` or `python -M SimpleHTTPServer` on **the repository root** and then go to `http://localhost:3000/example/`

## License

MIT

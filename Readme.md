Easy Inject
-----------

A very simple dependency injection library, inspired and mostly borrowed from Angular.

## Installation

```sh
npm install --save easy-inject
```

## Usage

Just like in Angular, there are two main ways to use the injection service. One is by declaring them
as arguments in your function call. Easy Inject will then parse the argument names and supply the
desired dependencies.

```js
var inject = require('easy-inject');

inject(
    function(foo, bar) {
        console.log(foo, bar); // outputs "Hello world!"
    },
    {
        foo: 'Hello ',
        bar: 'world!'
    }
);
```

Or, you may supply an explicit array of dependencies, and they'll be passed to the function in the
 same order as specified.

 ```js
inject(
    ['foo', 'bar', function(a, b) {
        console.log(a, b); // outputs "Hello world!"
    }],
    {
        foo: 'Hello ',
        bar: 'world!'
    }
);
```

## API

Easy Inject exports one simple function which takes two arguments. The first is the function descriptor,
which can be either a function, or an explicit array with values of the dependencies and the last element
as a function.

The second argument is a dictionary of injectable dependencies.

When using inject, it will annotate the function with it's required dependencies, and it will resolve them
by looking up the name in the dictionary of injectable dependencies.

If the dependency cannot be found, an error will be thrown.

## Todo

* Unit tests
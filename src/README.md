## nflow documentation

Essentially, the heart of nflow library is only 3 methods:
 - {@link flow.create|.**create**('foo')} for creating new instances
 - {@link flow.on|.**on**('something-happened', handler)} for creating listeners
 - {@link flow.emit|.**emit**('something-happened', payload)} for emitting events

## How to import
 Depending on your setup you can use:
 - `import nflow from 'nflow'` using ES6, or
 - `require 'nflow'` in NodeJS, or
 - `<script src="path-to-nflow" />` in the browser.

This will give you a global `flow` instance.
The nflow library has no constructor function, you never use the `new` keyword, to create a new instance you can use the {@link flow.create|.**create**('foo')} API on any existing flow instance.

> **Note**:
> In this documentation:
> - `nflow` refers to the name of this library, also to the global nflow instance
> - `flow` refers to any instance created using:
>   - {@link flow.create|.**create**('foo')} or
>   - {@link flow.emit|.**emit**('foo')}

## Example
```js
import nflow from 'nflow'

nflow
 .create('foo')
 .on('hello', doSomething)

nflow
 .create('bar')
 .emit('hello')
```

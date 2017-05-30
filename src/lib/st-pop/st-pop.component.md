This component adds support to Popper.JS for any component of Angular that covers

Popper.js is the library that computes and, optionally, applies the styles to the poppers.

Some of the key points are:

- Position elements keeping them in their original DOM context (doesn't mess with your DOM!);
- Allows to export the computed informations to integrate with React and other view libraries;
- Supports Shadow DOM elements;
- Completely customizable thanks to the modifiers based structure;

More info in <a href="https://github.com/FezVrasta/popper.js">Popper.js in github</a>


| Property           | Type    |  Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `hidden`           | Boolean |  Show or hide the pop content, by default is hidden                          |
| `placement`        | String  |  Determines the absolute position of pop content                             |
| `gpuAcceleration`  | Enable GPU acceleration for pop content                                     |

## How use

To use the component you must insert two html tags with the following properties:

`<div pop-button></div>` 

This content will be the reference on which pop content is placed

`<div pop-content></div>` 

The content to be placed in popper mode

## Examples

```
<st-pop hidden="false" placement="bottom">
   <div pop-button>Button</div>
   <div pop-content>Content</div>
</st-pop>
```

[![Build Status](https://travis-ci.org/longmatthewh/ColorA11y.svg?branch=master)](https://travis-ci.org/longmatthewh/ColorA11y)

colora11y
=============
colora11y is a simple JavaScript color contrast calculator created and maintained by [Matt Long](https://github.com/longmatthewh).

Usage
-------
```js
colora11y.calcContrastCompliance('#CCCCCC', '00FF00');

/*
would return the following:
{
    "aa": {
        "normal":{
            "min":"4.5:1",
            "pass":false
        },
        "large":{
            "min":"3:1",
            "pass":false
        }
    },
    "aaa":{
        "normal":{
            "min":"7:1",
            "pass":false
        },
        "large":{
            "min":"4.5:1",
            "pass":false
        }
    },
    "ratio":"1.17:1"
}
*/
````

License
-------
ColorA11y is licensed under the MIT License.
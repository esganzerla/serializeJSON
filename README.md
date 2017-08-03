# serializeJSON
Turns a json into a url string.
It is a little different from [query-string](https://github.com/sindresorhus/query-string), because this will stringify recursively also JSON objects, whereas [query-string](https://github.com/sindresorhus/query-string) will only take objects. Also will transform boolean values to 1 and 0, considering it turns true to "true" and false to "false".

## Install
```
npm install es-serialize-json
```
or
```
yarn add es-serialize-json
```

## Usage
```javascript
import serializeJSON from './serializeJSON'

const serializedJSON = serializeJSON({ itWorks: true });
//=> "itWorks=1"
```


## Example
Input
```
{
  'first level': {
    '_A': {
      'value': 'this value'
    },
    '_B': [
      'first value', 'second value', 'third value'
    ]
  }
}
```
Output
```
first%20level[_A][value]=this%20value&first%20level[_B][0]=first%20value&first%20level[_B][1]=second%20value&first%20level[_B][2]=third%20value
```


## Tests
Flow + Ava
```
npm test
```
Flow Type
```
npm run flow
```
Ava Unit Tests
```
npm run ava
```

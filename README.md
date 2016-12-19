# serializeJSON
Turns a json into a url string.


## Usage
```javascript
import serializeJSON from './serializeJSON'

const serializedJSON = serializeJSON({ ... });
```


## Example
Input
```
{
  'first level': {
    'second level json': {
      'third level': 'third level value'
    },
    'second level array': [
      'first value', 'second value', 'third value'
    ]
  }
}
```
Output
```
first%20level[second%20level%20json][third%20level]=third%20level%20value&first%20level[second%20level%20array][0]=first%20value&first%20level[second%20level%20array][1]=second%20value&first%20level[second%20level%20array][2]=third%20value
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

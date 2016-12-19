import serializeJSON from './serializeJSON.flow'
import test from 'ava';

test('should serialize string', (t) => {
  const
  input = { 'string': 'string test' },
  expected = "string=string%20test"

  t.is(serializeJSON(input), expected)
})
test('should serialize integer', (t) => {
  const
  serialized = serializeJSON({ 'integer': 55 }),
  expected = "integer=55"

  t.is(serialized, expected)
})
test('should serialize float', (t) => {
  const
  input = { 'float': 5.5 },
  expected = "float=5.5"

  t.is(serializeJSON(input), expected)
})
test('should serialize boolean as 1 and 0', (t) => {
  const
  input = {
    'booleanTrue': true,
    'booleanFalse': false,
  },
  expected = "booleanTrue=1&booleanFalse=0"

  t.is(serializeJSON(input), expected)
})
test('should serialize null and undefined as empty', (t) => {
  const
  input = {
    'null': null,
    'undefined': undefined,
  },
  expected = "null=&undefined="

  t.is(serializeJSON(input), expected)
})
// test('should serialize inner array', (t) => {
//   const
//   input = {
//     'array': [ 'first', 'second', 'third' ]
//   },
//   expected = "array[0]=first&array[1]=second&array[2]=third"
//
//   t.is(serializeJSON(input), expected)
// })
test('should serialize inner json', (t) => {
  const
  input = {
    'json': {
      'first': 'first',
      'second': 'second',
      'third': 'third'
    }
  },
  expected = "json[first]=first&json[second]=second&json[third]=third"

  t.is(serializeJSON(input), expected)
})

test('should encode value "test /ok"', (t) => {
  const
  input = {
    'value': 'test /ok'
  },
  expected = "value=test%20%2Fok"

  t.is(serializeJSON(input), expected)
})
test('should encode variable name "field name"', (t) => {
  const
  input = {
    'field name': true
  },
  expected = "field%20name=1"

  t.is(serializeJSON(input), expected)
})
test('should encode nested value "test /ok"', (t) => {
  const
  input = {
    'nest': {
        'value': 'test /ok'
      }
  },
  expected = "nest[value]=test%20%2Fok"

  t.is(serializeJSON(input), expected)
})
test('should encode nested variable name "field name"', (t) => {
  const
  input = {
    'nest': {
      'field name': 'ok'
    }
  },
  expected = "nest[field%20name]=ok"

  t.is(serializeJSON(input), expected)
})

test('third level using just json', (t) => {
  const
  input = {
    'first level': {
      'second level': {
        'third level': 'third level value'
      }
    }
  },
  expected = "first%20level[second%20level][third%20level]=third%20level%20value"

  t.is(serializeJSON(input), expected)
})
test('thrid level using just array', (t) => {
  const
  input = {
    'first level': [
       [
        'first value', 'second value', 'third value'
      ]
    ]
  },
  expected = "first%20level[0][0]=first%20value&first%20level[0][1]=second%20value&first%20level[0][2]=third%20value"

  t.is(serializeJSON(input), expected)
})
// test('thrid level using json and array', (t) => {
//   const
//   input = {
//     'first level': {
//       'second level json': {
//         'third level': 'third level value'
//       },
//       'second level array': [
//         'first value', 'second value', 'third value'
//       ]
//     }
//   },
//   expected = "first%20level[second%20level%20json][third%20level]=third%20level%20value&first%20level[second%20level%20array][0]=first%20value&first%20level[second%20level%20array][1]=second%20value&first%20level[second%20level%20array][2]=third%20value"
//
//   t.is(serializeJSON(input), expected)
// })

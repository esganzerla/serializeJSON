'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serializeJSON() {
	var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	return (0, _keys2.default)(data).reduce(function (stack, key) {
		var value = data[key],
		    values = serializeValue(key, value);

		if (values) stack.push.apply(stack, values);

		return stack;
	}, []).join('&');
}
function serializeValue(name, value) {
	name = !name.includes('[') ? encodeURIComponent(name) : name;

	if (value === null || value === undefined) {
		return serializeEmpty(name);
	}

	switch (value.constructor) {
		case String:
			return serializeString(name, value);
		case Number:
			return serializeNumber(name, value);
		case Boolean:
			return serializeBoolean(name, value);
		case Object:
			return serializeNesting(name, value);
		case Array:
			value = (0, _assign2.default)({}, value);
			return serializeNesting(name, value);
		default:
			return serializeString(name, value);
	}
}
function serializeEmpty(name) {
	return [name + '='];
}
function serializeString(name, input) {
	return [name + '=' + encodeURIComponent(input)];
}
function serializeNumber(name, input) {
	return [name + '=' + input];
}
function serializeBoolean(name, input) {
	return [name + '=' + (input ? 1 : 0)];
}
function serializeNesting(name, input) {
	var stack = [];

	(0, _keys2.default)(input).forEach(function (key) {
		var innerName = name + '[' + encodeURIComponent(key) + ']',
		    value = input[key],
		    renderedValues = serializeValue(innerName, value);

		stack.push.apply(stack, (0, _toConsumableArray3.default)(renderedValues));
	});

	return stack;
}

exports.default = serializeJSON;

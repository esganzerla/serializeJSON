// @flow

function serializeJSON(data: Object = {}): string {
	return Object
		.keys(data)
		.reduce((stack, key:string) => {
			const
			value: any = data[key],
			values = serializeValue(key, value)

			if (values) stack.push(...values)

			return stack
		}, [])
		.join('&')
}
function serializeValue(name: string, value): Array<string> {
	name = !name.includes('[') ? encodeURIComponent(name) : name

	if (value === null || value === undefined) {
		return serializeEmpty(name)
	}

	switch(value.constructor) {
		case String:
			return serializeString(name, value)
		case Number:
			return serializeNumber(name, value)
		case Boolean:
			return serializeBoolean(name, value)
		case Object:
			return serializeNesting(name, value)
		case Array:
			value = Object.assign({}, value)
			return serializeNesting(name, value)
		default:
			return serializeString(name, value)
	}
}
function serializeEmpty(name) {
	return [name + '=']
}
function serializeString(name, input: string) {
	return [name + '=' + encodeURIComponent(input)]
}
function serializeNumber(name, input: number) {
	return [name + '=' + input]
}
function serializeBoolean(name, input: boolean) {
	return [name + '=' + (input ? 1 : 0)]
}
function serializeNesting(name, input: Object){
	const stack = []

	Object.keys(input).forEach(key => {
		const
		innerName: string = name + '[' + encodeURIComponent(key) + ']',
		value: any = input[key],

		renderedValues = serializeValue(innerName, value)

		stack.push(...renderedValues)
	})

  return stack
}

export default serializeJSON

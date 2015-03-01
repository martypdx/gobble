import { resolve } from 'path';
import { Merger, Source } from '../nodes';
import config from '../config';

var sources = {};

export default getNode;

function getNode ( input, options ) {
	if ( input._gobble ) {
		return input;
	}

	if ( isArray( input ) ) {
		input = input.map( ensureNode );
		return new Merger( input, options );
	}

	if ( isString( input ) ) {
		input = resolve( config.cwd, input );
		return sources[ input ] || ( sources[ input ] = new Source( input, options ) );
	}

	throw new Error( 'could not process input. Usage:\n    node2 = gobble(node1)\n    node = gobble(\'some/dir\')\n    node = gobble([node1, node2[, nodeN]) (inputs can also be strings)\n    See ' + 'https://github.com/gobblejs/gobble/wiki'.cyan + ' for more info.' );
}

function isArray( thing ) {
	return Object.prototype.toString.call( thing ) === '[object Array]';
}

function isString ( thing ) {
	return typeof thing === 'string';
}

function ensureNode ( input ) {
	return getNode( input );
}

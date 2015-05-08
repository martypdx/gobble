import { lookup } from 'mime';
import { Promise, createReadStream } from 'sander';

export default function serveFile ( filepath, request, response ) {

	response.statusCode = 200;
	response.setHeader( 'Content-Type', lookup( filepath ) );
	createReadStream( filepath ).pipe( response );

	return Promise.resolve();
}

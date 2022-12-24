const request = require('supertest');
const server = require('../server');
const fs = require('fs')
const path = require('path')

describe('API server', () => {
	let api;
	let testNote = {
		title: 'Hi',
		note: "Hi",
	};

	beforeAll(() => {
		// start the server and store it in the api variable
		api = server.listen(5000, () =>
			console.log('Test server running on port 5000')
		);
	});

	afterAll((done) => {
			// close the server, then run done
			console.log('Gracefully stopping test server');
			api.close(done);
	});

	it('responds to get / with status 200', (done) => {
			request(api).get('/').expect(200, done);
	});

	it('responds to get /data with status 200', (done) => {
			request(api).get('/data').expect(200, done);
	});

	it('responds to get /new with status 404', (done) => {
			request(api).get('/new').expect(404, done);
	});

	// it('responds to post /new with redirection status 302', (done) => {
	// 		request(api).post('/new').send(testNote).expect(302, done)
	// });

	// it('responds to post /comment/:id with redirection status 302', (done )=>{
	// 		request(api).post('/comment/0').send({comment: "HI"}).expect(302, done)
	// })

	// it('responds to post /comment/:id with unknown id with error status 500', (done)=>{
	// 		request(api).post('/comment/20000000').send({comment: "HI"}).expect(500, done)
	// })

it('retrieves a note by id', (done) => {
		request(api)
				.get('/data/1').expect(200).expect({
					"id": 1,
					"title": "Mwezn",
					"note": "cat wiggle lol",
					"color": "cornflowerblue",
					"formColor": "blue",
					"author": "mwezn",
					"gif": "https://media2.giphy.com/media/Mr5yS9nR4kAda/giphy.gif?cid=0d81c17d03fs6jlxm5pdwsme9316ds0zdm342dkok02mdytx&rid=giphy.gif&ct=g"
				  }, done);
	});

it('responds to non existing paths with 404', (done) => {
		request(api).get('/cats/42').expect(404).expect({}, done);
});

//it('deletes notes successfully', (done) => {
	//fs.rmSync(path.resolve(__dirname, '../data/notesData.json'));
	//request(api).post('/new').send(testNote).expect();
	//request(api).post('/register').send({username: '123', password: '123'});
	//request(api).post('/delete/0').expect(302).expect({username: '123', password: '123'}, done);
//});
	it('responds to invalid method request with 404', (done) => {
			request(api).post('/').expect(404, done);
    });
 });

const server = require('../api/server.js');
const request = require('supertest');

const credentials = {
  "email": 'btest@123.com',
  "password": '123qwe'
}

describe('server', () => {
  it('works', async () => {
    const response = await request(server).get('/api')
    expect(response.status).toBe(200);
  })
})

// describe('register', () => {
//   it('returns status 201 created and a token', async () => {
//     const response =  await request(server)
//       .post('/api/auth/register')
//       .send(credentials);
//     expect(response.status).toBe(201);
//     expect('token' in response.body).toBe(true);
//   });
  // it('return a token', async () => {
  //   const response = await request(server)
  //     .post('/api/auth/register')
  //     .send(credentials);
  // });
// });

describe('login', () => {
  it('returns status 200', () => {
    return request(server)
      .post('/api/auth/login')
      .send(credentials)
      .expect(200);
  });
  it('return a token', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send(credentials);
    expect('token' in response.body).toBe(true);
  });
});

// register returns 201 and token;
// login returns 200 and token;
// logout returns message "Logged Out";

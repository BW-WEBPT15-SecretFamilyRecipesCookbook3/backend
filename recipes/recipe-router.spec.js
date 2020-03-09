const server = require('../api/server');
const request = require('supertest');
//
// let token = "";
//
// describe('/login', () => {
//   it('returns a token', async () => {
//     const response = await request(server)
//       .post('/api/auth/login')
//       .send({"email": "btest@123.com", "password": "123qwe"});
//     expect(response.status).toBe(200);
//     expect('token' in response).toBe(true);
//     token = response.token;
//   })
// })
var auth = {};
beforeAll(loginUser(auth));
function loginUser(auth) {
  return function(done) {
    request(server)
      .post("/api/auth/login")
      .send({
        email: "btest@123.com",
        password: "123qwe"
      })
      .expect(200)
      .end(onResponse);
    function onResponse(err, res) {
      auth.token = res.body.token;
      return done();
    }
  };
}

describe('/recipes', () => {
  it('returns an array of recipes on GET', async () => {
    const response = await request(server)
      .get('/api/recipes')
      .set({authorization: auth.token})
    expect(response.status).toBe(200);
  });
});

describe('/recipes/1/steps', () => {
  it('returns an array of five steps on GET', async () => {
    const response = await request(server)
      .get('/api/recipes/1/steps')
      .set({authorization: auth.token})
    expect(response.status).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveLength(5)
  });
});

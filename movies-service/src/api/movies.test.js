require("dotenv-safe").config();
const supertest = require("supertest");
const movies = require("./movies");
const server = require("../server/server");
const repository = require("../repository/repository");

var testId = null;
let app = null;

beforeAll(async() => {
    app = await server.start(movies,repository); //inicializa o servidor
    const result = await repository.getAllMovies();
    testId = `${result[0]._id}`; //é necessário formatar como string porque depois será comparado com um json
})

afterAll(async() => {
    await server.stop(); //pausa o servidor
})

test('GET/movies', async() => {
    const response = await supertest(app).get('/movies');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

test('GET/movies/:id', async() => {
    const response = await supertest(app).get('/movies/'+testId);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
    expect(response.body._id).toEqual(testId); //comparação do _id com o _id presente no json
})

test('GET/movies/premieres', async() => {
    const response = await supertest(app).get('/movies/premieres');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})
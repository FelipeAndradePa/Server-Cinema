require('dotenv-safe').config(); 
const repository = require('./repository'); 
let testId = null; 

beforeAll(async () => { 
    const movies = await repository.getAllMovies(); //recebe um array com todos os filmes
    testId = movies[0]._id;  // seleciona o _id do primeiro
}) 

test('Repository GetAllMovies', async () => { 
    const movies = await repository.getAllMovies(); 
    expect(Array.isArray(movies)).toBeTruthy(); 
    expect(movies.length).toBeGreaterThan(0);
}) 

test('Repository GetMovieById', async () => { 
    const movie = await repository.getMovieById(testId); //recebe um filme escolhido através do _id
    expect(movie).toBeTruthy(); 
    expect(movie._id).toEqual(testId); //verifica se os dois _ids são iguais
}) 

test('Repository GetMoviePremieres', async () => { 
    const movies = await repository.getMoviePremieres(); 
    expect(Array.isArray(movies)).toBeTruthy(); 
    expect(movies.length).toBeGreaterThan(0); 
}) 

test('Repository Disconnect', async () => { 
    const isDisconnected = await repository.disconnect(); 
    expect(isDisconnected).toBeTruthy();
})

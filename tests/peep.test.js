const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../server');
const Peep = require('../models/peepModel');

chai.use(chaiHttp);
const { expect } = chai;

describe('Peep tests', () => {
    beforeEach(async () => {
        await Peep.deleteMany({});
    });

    describe('POST /api/peep', () => {

        it('should successfully send a new peep', async () => {
            const testPeep = {
                description: 'test peep',
                username: 'Howard'
            };

            const res = await chai
                .request(app)
                .post('/api/peep')
                .send(testPeep);

            expect(res).to.have.status(201);
        });

        it('should not a send a peep without a username', async () => {
            const testPeep = {
                description: 'test peep',
            };

            const res = await chai
                .request(app)
                .post('/api/peep')
                .send(testPeep);

            expect(res).to.have.status(400);
        });

        it('should not a send a peep without a description', async () => {
            const testPeep = {
                username: 'testUser',
            };

            const res = await chai
                .request(app)
                .post('/api/peep')
                .send(testPeep);

            expect(res).to.have.status(400);
        });

        it('should populate a peep entry in the DB', async () => {
            const testPeep = {
                description: 'testing, mic testing',
                username: 'Testify'
            };

            const res = await chai
                .request(app)
                .post('/api/peep')
                .send(testPeep);

            const peepInDb = await Peep.findOne({ description: testPeep.description });

            expect(peepInDb).to.not.be.null;
        });

        it('should not a send a peep that is longer than 150 characters', async () => {
            const testPeep = {
                username: 'testUser',
                description: 'testPeepisfartoolongandshoudldjasjdjajsdjajdjasjdajdjasjdjajdjasjdjajdjasdjajsdjasjdjajsdjasjdjajsdjasjdjajsdjasjdjajdjajsdjajdjajdjajsdjajsdjajdjasjdjajdjajdjsajdasjdjasjddgdgdgdgdgdgdgdgdgd'
            };

            const res = await chai
                .request(app)
                .post('/api/peep')
                .send(testPeep);

            expect(res).to.have.status(400);
        });
    });

    describe('GET /api/peep', () => {
        it('should return an array of peeps', async () => {

            const testPeeps = [{ description: 'Peep 1', username: 'user1' }, { description: 'Peep 2', username: 'user2' }, { description: 'Peep 3', username: 'user3' },];
            await Peep.insertMany(testPeeps);

            const res = await chai.request(app).get('/api/peep');


            expect(res).to.have.status(200);


            expect(res.body).to.be.an('array').with.lengthOf(testPeeps.length);

            res.body.forEach((peep, index) => {
                expect(peep).to.have.property('description').equal(testPeeps[index].description);
                expect(peep).to.have.property('username').equal(testPeeps[index].username);
            });
        });

        it('should return an empty array if no peeps found', async () => {
            await Peep.deleteMany({});

            const res = await chai.request(app).get('/api/peep');

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array').that.is.empty;
        });

    });
})
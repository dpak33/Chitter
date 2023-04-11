const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../server');
const User = require('../models/userModel');

//const express = require('express')
//const User = require('../models/userModel')

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('POST /api/auth/register', () => {


        it('should successfully register a new user', async () => {
            const testUser = {
                name: 'bob',
                username: 'bob',
                email: 'bob@bob.com',
                password: 'password'
            };

            const res = await chai
                .request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'User registered successfully!');
        });

        it('should populate an entry in the DB', async () => {
            const testUser = {
                name: 'bob',
                username: 'bob',
                email: 'bob@bob.com',
                password: 'password'
            };

            const res = await chai
                .request(app)
                .post('/api/auth/register')
                .send(testUser);

            const userInDb = await User.findOne({ username: testUser.username });

            expect(userInDb).to.not.be.null;
        });

        it('should not register a user with an existing email', async () => {
            const testUser = {
                name: 'bob',
                username: 'bob',
                email: 'bob@bob.com',
                password: 'password'
            };

            await chai
                .request(app)
                .post('/api/auth/register')
                .send(testUser);

            const res = await chai
                .request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'User email already registered!');
        });

        it('should not register a user without an email', async () => {
            const testUser = {
                name: 'tim',
                username: 'tim',
                password: 'password'
            };

            const res = await chai
                .request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(res).to.have.status(400);
        });

        it('should not register a user without a password', async () => {
            const testUser = {
                name: 'Graham',
                username: 'Graham',
                email: 'Graham@Graham.com'
            };

            const res = await chai
                .request(app)
                .post('/api/auth/register')
                .send(testUser);

            expect(res).to.have.status(400);
        });



    });

    describe('POST /api/auth/login', () => {
        it('should successfully log in a user', async () => {
            const testUser = {
                name: 'bob',
                username: 'bob',
                email: 'bob@bob.com',
                password: 'password'
            };

            await chai
                .request(app)
                .post('/api/auth/register')
                .send(testUser);

            const res = await chai
                .request(app)
                .post('/api/auth/login')
                .send({
                    username: testUser.username,
                    password: testUser.password
                });

            expect(res).to.have.status(200);
        });

        it('should not log in a user who does not have an account', async () => {
            const testUser = {
                name: 'noaccount',
                username: 'noaccount',
                email: 'noaccount@noaccount.com',
                password: 'noaccount'
            };


            const res = await chai
                .request(app)
                .post('/api/auth/login')
                .send({
                    username: testUser.username,
                    password: testUser.password
                });

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', "User does not exist!");
        });


        it('should successfully produce a token on sign in', async () => {
            const testUser = {
                name: 'bob',
                username: 'bob',
                email: 'bob@bob.com',
                password: 'password'
            };

            await chai
                .request(app)
                .post('/api/auth/register')
                .send(testUser);

            const res = await chai
                .request(app)
                .post('/api/auth/login')
                .send({
                    username: testUser.username,
                    password: testUser.password
                });

            expect(res.body).to.have.property('data');
        });

        it('should not login a valid user with an invalid password', async () => {
            const testUser = {
                name: 'bob',
                username: 'bob',
                email: 'bob@bob.com',
                password: 'right'
            };

            await chai
                .request(app)
                .post('/api/auth/register')
                .send(testUser);

            const res = await chai
                .request(app)
                .post('/api/auth/login')
                .send({
                    username: testUser.username,
                    password: 'wrong'
                });

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', "Incorrect password!");
        });

    });
});

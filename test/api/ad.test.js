process.env.NODE_ENV = 'test';

const app = require('../../src/app');
const db = require('../../src/db');
const request = require('supertest')(app);
const chai = require('chai');

const testBody = {
  title: 'test',
  description: 'test',
  photos: [],
  price: 5
};

describe('Ads suite', () => {
  before(done => {
    db.connect()
      .then(() => done())
      .catch(done);
  });

  after(done => {
    db.disconnect()
      .then(() => done())
      .catch(done);
  });

  afterEach(done => {
    db.clear()
      .then(() => done())
      .catch(done);
  });

  describe('POST', () => {
    it('should create an ad succesfully', done => {
      request
        .post('/ads')
        .send(testBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          chai.expect(res.body).to.be.an('object');
          chai.expect(res.body).to.have.own.property('id');
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });  

  describe('GET', () => {
    it('should get all ads', done => {
      request
        .get('/ads')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          chai.expect(res.body).to.be.an('array');
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('should get an ad by id without additional fields', done => {
      let adId;

      request
        .post('/ads')
        .send(testBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          chai.expect(res.body).to.have.own.property('id');
          adId = res.body.id;

          request
            .get(`/ads/${res.body.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
              chai.expect(res.body).to.be.an('object');
              chai.expect(res.body.id).to.equal(adId);
              chai.expect(res.body.title).to.equal(testBody.title);
              chai.expect(res.body).to.not.have.own.property('description');
              chai.expect(res.body.photos).to.have.lengthOf.at.most(1);
              chai.expect(res.body.price).to.equal(testBody.price);
              done();
            })
            .catch(err => {
              done(err);
            });
        });
    });

    it('should get an ad by id with additional fields', done => {
      let adId;

      request
        .post('/ads')
        .send(testBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          chai.expect(res.body).to.have.own.property('id');
          adId = res.body.id;

          request
            .get(`/ads/${res.body.id}?fields`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
              chai.expect(res.body).to.be.an('object');
              chai.expect(res.body.id).to.equal(adId);
              chai.expect(res.body.title).to.equal(testBody.title);
              chai.expect(res.body.description).to.equal(testBody.description);
              chai.expect(res.body.photos).to.deep.equal(testBody.photos);
              chai.expect(res.body.price).to.equal(testBody.price);
              done();
            })
            .catch(err => {
              done(err);
            });
        });
    });
  });
});
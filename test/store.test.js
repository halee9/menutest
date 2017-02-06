let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
import Store from '../src/models/Store';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Stores', () => {
  before((done) => {
    Store.remove({}, (err) => {
      done();
    });
  });

  it('it should GET all the stores', (done) => {
    chai.request('http://localhost:4000')
      .get('/api/stores')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('it should not POST a store without name', (done) => {
    let store = new Store({email:"store@store.com"});
    chai.request('http://localhost:4000')
      .post('/api/stores')
      .send(store)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        done();
      });
  });

  let storeId;
  it('it should POST a store with name', (done) => {
    let store = new Store({name:"Store1", email:"store@store.com"});
    chai.request('http://localhost:4000')
      .post('/api/stores')
      .send(store)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('name').eql("Store1");
        res.body.should.have.property('email');
        storeId = res.body._id;
        done();
      });
  });

  it('it should GET a store by id', (done) => {
    chai.request('http://localhost:4000')
      .get('/api/stores/' + storeId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        done();
      });
  });


  it('it should GET all the stores', (done) => {
    chai.request('http://localhost:4000')
      .get('/api/stores')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
  });

  it('it should PUT a store', (done) => {
    chai.request('http://localhost:4000')
      .put('/api/stores/' + storeId)
      .send({name: "Store11"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql("Store11");
        res.body.should.have.property('email').eql("store@store.com");
        done();
      });
  });

  it('it should DELETE a store', (done) => {
    chai.request('http://localhost:4000')
      .delete('/api/stores/' + storeId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should GET all the stores', (done) => {
    chai.request('http://localhost:4000')
      .get('/api/stores')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

});

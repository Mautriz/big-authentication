import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ POST login', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'ciao',
        password: 'bruh',
      })
      .expect(201)
      .expect(res => res.body === true);
  });

  it('/ POST Login should fail with incorrect data', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 2,
        password: 555,
      })
      .expect(400);
  });

  it('/ POSTT User should create a user', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send()
      .expect(res => {
        console.log({ res });
        expect(res.status).toBeLessThan(400);
      });
  });
});

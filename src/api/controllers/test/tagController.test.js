// @flow
import request from 'supertest';
import { startServer, closeServer } from 'server/server';
import type { TagRequest } from 'flow/tag.flow';

const mockTagRequest: TagRequest = {
  time: '2019-11-23T08:00:00Z',
  deviceId: 'testDeviceId',
  tags: [
    {
      id: 'testId',
      url: 'testUrl',
      rssi: 123,
      updateAt: '2019-11-23T08:00:00Z',
      dataFormat: 123,
      name: 'testName',
      temperature: 123,
      humidity: 123,
      pressure: 123,
      accelX: 123,
      accelY: 123,
      accelZ: 123,
      voltage: 123,
      txPower: 123,
      movementCounter: 123,
      measurementSequenceNumber: 123,
    },
  ],
  eventId: 'testEventId',
};

let server;
beforeEach(async () => {
  server = await startServer();
});

afterEach(async () => {
  await closeServer(server);
});

describe('POST /api/tag', () => {
  test('should return 422 Unprocessable Entity without valid parameters', async () => {
    const response = await request(server).post('/api/tag');
    expect(response.status).toEqual(422);
  });

  test('should return 200 with valid parameters', async () => {
    const response = await request(server)
      .post('/api/tag')
      .send(mockTagRequest);
    expect(response.status).toEqual(200);
  });
});

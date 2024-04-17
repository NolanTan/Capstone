const request = require('supertest');
const app = require('../backend/index'); // Problems

describe('DELETE /deleteData/:name', () => {

  it('should delete data from MongoDB', async () => {
    // Create a script to delete
    const scriptToCreate = { name: 'ScriptToCreate', text: 'Content' };
    await request(app)
      .post('/saveData')
      .send(scriptToCreate)
      .expect(200);

    // Try to delete the created script
    const scriptNameToDelete = 'ScriptToCreate';
    const response = await request(app)
      .delete(`/deleteData/${scriptNameToDelete}`)
      .expect(200);

    expect(response.body.message).toBe('Data deleted!');
  });

  it('should return error if data does not exist', async () => {
    const scriptNameToDelete = 'non_existing_script';
    const response = await request(app)
      .delete(`/deleteData/${scriptNameToDelete}`)
      .expect(500);

    expect(response.body.message).toBe('Error deleting data');
  });
});
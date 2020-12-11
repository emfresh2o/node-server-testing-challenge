const db = require('../data/dbConfig.js');

const Simpsons = require('./simpsonsModel.js');

describe('simpsons model', () => {
  beforeEach(async () => {
    await db('simpsons').truncate();
  });
  describe('insert()', () => {
    it('should insert the provided simpsons into the db', async () => {
      await Simpsons.insert({ name: 'Maggie' });
      await Simpsons.insert({ name: 'Lisa' });

      const simpsons = await db('simpsons');

      expect(simpsons).toHaveLength(2);
    });

    it('should insert the provided simpson into the db', async () => {
      let simpson = await Simpsons.insert({ name: 'Maggie' });
      expect(simpson.name).toBe('Maggie');

      simpson = await Simpsons.insert({ name: 'Lisa' });
      expect(simpson.name).toBe('Lisa');
    });
  });
  describe('remove()', () => {
    it('should remove a character by id from db', async () => {
      await Simpsons.insert({ name: 'test1' });
      await Simpsons.insert({ name: 'test2' });
      await Simpsons.insert({ name: 'test3' });
      await Simpsons.remove(3);
      const simpsons = await db('simpsons');
      expect(simpsons).toHaveLength(2);
    });
  });
});

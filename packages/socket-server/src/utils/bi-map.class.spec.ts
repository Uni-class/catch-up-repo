import { BiMap } from './bi-map.class';

describe('BiMap', () => {
  let biMap: BiMap<string, number>;

  beforeEach(() => {
    biMap = new BiMap<string, number>();
  });

  it('should be accessible from both directions once set.', () => {
    biMap.set('user1', 1);
    expect(biMap.getByLeft('user1')).toBe(1);
    expect(biMap.getByRight(1)).toBe('user1');
  });

  it('should be maintained one-to-one matching after update.', () => {
    biMap.set('user1', 1);
    biMap.set('user1', 2);
    expect(biMap.getByLeft('user1')).toBe(2);
    expect(biMap.getByRight(2)).toBe('user1');
    expect(biMap.getByRight(1)).toBe(undefined);
  });

  it('should overwrite the existing value for a key', () => {
    biMap.set('user1', 1);
    biMap.set('user1', 2);
    expect(biMap.getValue('user1')).toBe(2);
    expect(biMap.getKey(2)).toBe('user1');
    expect(biMap.getKey(1)).toBeUndefined();
  });

  it('should overwrite the existing key for a value', () => {
    biMap.set('user1', 1);
    biMap.set('user2', 1); // Overwriting value 1
    expect(biMap.getValue('user1')).toBeUndefined();
    expect(biMap.getKey(1)).toBe('user2');
  });

  it('should delete by key', () => {
    biMap.set('user1', 1);
    biMap.deleteByKey('user1');
    expect(biMap.getValue('user1')).toBeUndefined();
    expect(biMap.getKey(1)).toBeUndefined();
  });

  it('should delete by value', () => {
    biMap.set('user1', 1);
    biMap.deleteByValue(1);
    expect(biMap.getValue('user1')).toBeUndefined();
    expect(biMap.getKey(1)).toBeUndefined();
  });
});

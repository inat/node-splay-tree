'use struct';

const assert = require('power-assert');
const splayT = require('..');

describe('splayTree', function() {
  it('should find an element.', function() {
    let tree = null;
    tree = splayT.insert(tree, 1);
    tree = splayT.insert(tree, 3);
    tree = splayT.insert(tree, 5);
    assert.equal(splayT.member(tree, 0), false);
    assert.equal(splayT.member(tree, 1), true);
    assert.equal(splayT.member(tree, 2), false);
    assert.equal(splayT.member(tree, 3), true);
  });
  it('should merge trees.', function() {
    const tree0 = splayT.insert(null, 1);
    const tree1 = splayT.insert(null, 2);
    const tree2 = splayT.merge(tree0, tree1);
    assert.equal(splayT.member(tree2, 0), false);
    assert.equal(splayT.member(tree2, 1), true);
    assert.equal(splayT.member(tree2, 2), true);
    assert.equal(splayT.member(tree2, 3), false);
  });
  it('should construct a balanced tree.', function() {
    let tree = null;
    tree = splayT.insert(tree, 1);
    tree = splayT.insert(tree, 3);
    tree = splayT.insert(tree, 5);
    tree = splayT.insert(tree, 7);
    tree = splayT.insert(tree, 4);
    const expacted = '(T (T (T E 1 E) 3 E) 4 (T (T E 5 E) 7 E))';
    assert.equal(splayT.dump(tree), expacted);
  });
});

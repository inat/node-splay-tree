'use strict';

function newTree(left, elem, right) {
  return {left: left, elem: elem, right: right};
}

function isEmpty(tree) {
  return tree === null;
}

function _partition(tree, pivot) {
  if (isEmpty(tree)) {
    return [null, null];
  }
  if (tree.elem <= pivot) {
    if (isEmpty(tree.right)) {
      return [tree, null];
    } else {
      if (tree.right.elem <= pivot) {
        const [small, big] = _partition(tree.right.right, pivot);
        return [newTree(tree.left, tree.elem, newTree(tree.right.left, tree.right.elem, small)), big];
      } else {
        const [small, big] = _partition(tree.right.left, pivot);
        return [newTree(tree.left, tree.elem, small), newTree(big, tree.right.elem, tree.right.right)];
      }
    }
  } else {
    if (isEmpty(tree.left)) {
      return [null, tree];
    } else {
      if (tree.left.elem <= pivot) {
        const [small, big] = _partition(tree.left.right, pivot);
        return [newTree(tree.left.left, tree.left.elem, small), newTree(big, tree.elem, tree.right)];
      } else {
        const [small, big] = _partition(tree.left.left, pivot);
        return [small, newTree(newTree(big, tree.left.elem, tree.left.right), tree.elem, tree.right)];
      }
    }
  }
}

function merge(tree0, tree1) {
  if (isEmpty(tree0)) {
    return tree1;
  }
  if (isEmpty(tree1)) {
    return tree0;
  }
  const [small, big] = _partition(tree1, tree0.elem);
  return newTree(merge(tree0.left, small), tree0.elem, merge(tree0.right, big));
}

function insert(tree, x) {
  const [small, big] = _partition(tree, x);
  return newTree(small, x, big);
}

// TODO: Update to `splay` implementation.
function member(tree, x) {
  if (isEmpty(tree)) {
    return false;
  }
  if (x < tree.elem) {
    return member(tree.left, x);
  } else if (x > tree.elem) {
    return member(tree.right, x);
  } else {
    return true;
  }
}

function dump(tree) {
  if (isEmpty(tree)) {
    return 'E';
  }
  return `(T ${dump(tree.left)} ${tree.elem} ${dump(tree.right)})`;
}

module.exports = {
  newTree: newTree,
  isEmpty: isEmpty,
  merge: merge,
  insert: insert,
  member: member,
  dump: dump,
};

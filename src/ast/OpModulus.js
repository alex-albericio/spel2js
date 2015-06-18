(function (exports) {
    'use strict';

    var SpelNode;
    try {
        SpelNode = require('./SpelNode').SpelNode;
    } catch (e) {
        SpelNode = exports.SpelNode;
    }

    function createNode(position, left, right) {
        var node = SpelNode.create('op-modulus', position, left, right);

        node.getValue = function (state) {
            return left.getValue(state) % right.getValue(state);
        };

        return node;
    }

    exports.OpModulus = {
        create: createNode
    };

}(window || exports));

'use strict';

(function() {
  describe('couchdb views tests', function() {
    beforeEach(clearEmitResults);
    afterEach(clearEmitResults);

    describe('\'payables\' view', function() {
      it('should emit a payable for each entry in \'freq\'', function() {
        var views = exports.getViewsForTesting();
        var emitValue;

        expect(views).toBeDefined();
        expect(views.payables).toBeDefined();
        expect(views.payables.map).toBeDefined();

        views.payables.map({
          doctype: 'lineitem', type: 'minus', name: 'test1', amount: 123, freq: {per: 'mo', on: [{D:1},{D:2}]}
        });

        expect(EMIT_RESULTS.length).toBe(2);

        /* first emitted key-value pair's value entry */
        emitValue = EMIT_RESULTS[0].value;
        expect(emitValue.name).toBe('test1');
        expect(emitValue.day).toBeDefined();
        expect(emitValue.day).toBe(1);

        emitValue = EMIT_RESULTS[1].value;
        expect(emitValue.name).toBe('test1');
        expect(emitValue.day).toBeDefined();
        expect(emitValue.day).toBe(2);
      });
    });
  });
})();

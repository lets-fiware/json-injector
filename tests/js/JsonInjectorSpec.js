/*
 * json-injector
 * https://github.com/lets-fiware/json-injector
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

/* globals MashupPlatform, MockMP, Ace, JsonInjector */

(function () {

    "use strict";


    describe("JsonInjector", function () {

        var widget;
        var editor;

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'widget',
                inputs: ['input'],
                outputs: ['output']
            });
            window.ace = new Ace();
        });

        beforeEach(function () {
            MashupPlatform.reset();
            MashupPlatform.wiring.connectInput('input');
            MashupPlatform.widget.outputs.output.connect({simulate: () => {}});
            widget = new JsonInjector();
        });

        it("click", function (done) {
            MashupPlatform.wiring.simulate('input', {"name": "abc"});
            setTimeout(() => {
                let button = document.getElementById('button');
                button.click();

                expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', { name: 'abc' });
                done();
            }, 500);
        });

        it("click", function (done) {
            MashupPlatform.wiring.simulate('input', '{}');
            setTimeout(() => {
                let button = document.getElementById('button');
                button.click();

                expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('output', {});
                done();
            }, 500);
        });

        it("click", function (done) {
            MashupPlatform.wiring.simulate('input', {func: function (){}});

            setTimeout(() => {
                expect(MashupPlatform.wiring.simulate).toThrow();
                done();
            }, 500);
        });

        it("click", function (done) {
            MashupPlatform.wiring.simulate('input', '{');
            setTimeout(() => {
                let button = document.getElementById('button');
                button.click();

                expect(MashupPlatform.wiring.pushEvent).not.toHaveBeenCalled();
                done();
            }, 500);
        });

        it("click", function (done) {
            MashupPlatform.widget.outputs.output.disconnect();
            setTimeout(() => {
                let button = document.getElementById('button');
                button.click();

                expect(MashupPlatform.wiring.pushEvent).not.toHaveBeenCalled();
                done();
            }, 500);
        });

    });

})();

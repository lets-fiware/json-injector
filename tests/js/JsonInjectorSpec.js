/*
 * json-injector
 * https://github.com/fisuda/json-injector-widget
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

/* globals $, MashupPlatform, MockMP, JsonInjector */

(function () {

    "use strict";

    describe("JsonInjector", function () {

        var widget;

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'widget'
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
            widget = new JsonInjector();
        });

        it("Dummy test", function () {
            expect(widget).not.toBe(null);
        });

    });

})();

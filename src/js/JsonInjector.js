/*
 * json-injector
 * https://github.com/fisuda/json-injector-widget
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

/* exported JsonInjector */
/* global $, ace, MashupPlatform, StyledElements */

var JsonInjector = (function () {

    'use strict';

    var layout;
    var editor;
    var typeSelector;
    var sendbtn;

    // =========================================================================
    // CLASS DEFINITION
    // =========================================================================

    var JsonInjector = function JsonInjector() {
        layout = new StyledElements.VerticalLayout();
        layout.insertInto(document.body);
        layout.north.addClassName('header');
        layout.north.appendChild(new StyledElements.Fragment('<h4 class="text-primary">Type: <span id="type-data">No data</span><div id="buttons"></div></h4>'));

        var typed = $('#type-data')[0];
        var parent = typed.parentNode;
        parent.removeChild(typed);

        var entries = [
            {label: 'JSON - (Text)', value: 'JSON - (Text)'},
            {label: 'JSON - (Object)', value: 'JSON - (Object)'},
            {label: 'Text', value: 'Text'}
        ];

        typeSelector = new StyledElements.Select();
        typeSelector.addEntries(entries);
        typeSelector.setValue('JSON - (Object)');
        typeSelector.addEventListener('change', () => {
            switch (typeSelector.getValue()) {
            case 'JSON - (Text)':
                editor.session.setMode('ace/mode/json');
                break;
            case 'JSON - (Object)':
                editor.session.setMode('ace/mode/json');
                break;
            case 'Text':
                editor.session.setMode('ace/mode/plain_text');
                break;
            }
        });
        typeSelector.insertInto(parent);

        var action_buttons = document.createElement('div');
        action_buttons.className = 'btn-group';
        document.getElementById('buttons').appendChild(action_buttons);

        sendbtn = new StyledElements.Button({'class': 'btn-info fa fa-play', 'title': 'Output data'});
        sendbtn.addEventListener('click', () => {
            if (MashupPlatform.widget.outputs.output.connected) {
                var value = editor.getValue();
                if (typeSelector.getValue() === 'JSON - (Object)') {
                    value = JSON.parse(value);
                }
                MashupPlatform.wiring.pushEvent('output', value);
            }
        });
        sendbtn.insertInto(action_buttons);

        layout.center.addClassName('acecontainer');
        editor = ace.edit(layout.center.wrapperElement);
        editor.setFontSize(14);
        editor.session.setMode('ace/mode/json');
        editor.session.setTabSize(2);
        editor.setValue('', -1);
        layout.repaint();
    };

    // =========================================================================
    // PRIVATE MEMBERS
    // =========================================================================

    return JsonInjector;

})();

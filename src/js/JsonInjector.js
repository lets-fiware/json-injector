/*
 * json-injector
 * https://github.com/lets-fiware/json-injector
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
        const title = encodeURI(MashupPlatform.widget.context.get('title'));
        const editorData = 'JsonInjector-data-' + title + MashupPlatform.widget.id;
        const editorMode = 'JsonInjector-mode-' + title + MashupPlatform.widget.id;

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

        var getEditorMode = function getEditorMode(mode) {
            switch (mode) {
            case 'JSON - (Text)':
                return 'ace/mode/json';
            case 'JSON - (Object)':
                return 'ace/mode/json';
            case 'Text':
                return 'ace/mode/plain_text';
            }
            return '';
        }

        typeSelector = new StyledElements.Select();
        typeSelector.addEntries(entries);
        typeSelector.setValue(sessionStorage.getItem(editorMode) || 'JSON - (Object)');
        typeSelector.addEventListener('change', () => {
            const mode = typeSelector.getValue();
            editor.session.setMode(getEditorMode(mode));
            sessionStorage.setItem(editorMode, mode);
        });
        typeSelector.insertInto(parent);

        var action_buttons = document.createElement('div');
        action_buttons.className = 'btn-group';
        document.getElementById('buttons').appendChild(action_buttons);

        sendbtn = new StyledElements.Button({'class': 'btn-info', 'iconClass': 'fa fa-play', 'title': 'Output data'});
        sendbtn.addEventListener('click', () => {
            if (MashupPlatform.widget.outputs.output.connected) {
                var value = editor.getValue();
                if (typeSelector.getValue() === 'JSON - (Object)') {
                    value = (value != '') ? JSON.parse(value) : null;
                }
                MashupPlatform.wiring.pushEvent('output', value);
            }
        });
        sendbtn.insertInto(action_buttons);

        layout.center.addClassName('acecontainer');
        editor = ace.edit(layout.center.wrapperElement);
        editor.setFontSize(14);
        editor.session.setMode(getEditorMode(sessionStorage.getItem(editorMode)));
        editor.session.setTabSize(2);
        editor.setValue(sessionStorage.getItem(editorData) || '');
        editor.session.on('change', (e) => {
            sessionStorage.setItem(editorData, editor.getValue());
        });
        layout.repaint();

        MashupPlatform.wiring.registerCallback("input", function (data) {
            var type = '';
            if (typeof data === "object") {
                try {
                    type = 'JSON - (Object)';
                    data = JSON.stringify(data, null , "\t");
                } catch (e) {
                    type = '';
                }
            } else if (typeof data === "string") {
                type = 'JSON - (Object)';
                try {
                    data = JSON.parse(data);
                    data = JSON.stringify(data, null , "\t");
                } catch (e) {
                    type = 'Text';
                }
            }
            if (type != '') {
                typeSelector.setValue(type);
                editor.session.setMode(getEditorMode(type));
                editor.setValue(data);
            }
        });
    };

    // =========================================================================
    // PRIVATE MEMBERS
    // =========================================================================

    return JsonInjector;

})();

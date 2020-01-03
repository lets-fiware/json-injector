/*
 * json-injector
 * https://github.com/lets-fiware/json-injector
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

/* exported JsonInjector */
/* global ace, MashupPlatform, StyledElements */

var JsonInjector = (function () {

    'use strict';

    // =========================================================================
    // CLASS DEFINITION
    // =========================================================================

    var JsonInjector = function JsonInjector() {
        const title = encodeURI(MashupPlatform.widget.context.get('title'));
        const editorData = 'JsonInjector-data-' + title + MashupPlatform.widget.id;
        const editorMode = 'JsonInjector-mode-' + title + MashupPlatform.widget.id;

        var builder = new StyledElements.GUIBuilder();

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

        var typeSelector = new StyledElements.Select();
        typeSelector.addEntries(entries);
        typeSelector.setValue(sessionStorage.getItem(editorMode) || 'JSON - (Object)');
        typeSelector.addEventListener('change', () => {
            const mode = typeSelector.getValue();
            editor.session.setMode(getEditorMode(mode));
            sessionStorage.setItem(editorMode, mode);
        });

        var buttons = document.createElement('div');
        buttons.className = "buttons";

        var action_buttons = document.createElement('div');
        action_buttons.className = 'btn-group';
        buttons.appendChild(action_buttons);

        var sendbtn = new StyledElements.Button({
            id: 'button',
            iconClass: 'fa fa-play',
            state: 'info',
            title: 'Output data'
        });
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

        var layout = new StyledElements.VerticalLayout();
        layout.insertInto(document.body);
        layout.north.addClassName('header');
        layout.north.appendChild(builder.parse(
            builder.DEFAULT_OPENING + '<h4 class="text-primary"><div class="type-selector">Type: <t:typeSelector/></div><t:buttons/></h4>' + builder.DEFAULT_CLOSING,
            {
                buttons: buttons,
                typeSelector: typeSelector
            }
        ));

        layout.center.addClassName('acecontainer');
        var editor = ace.edit(layout.center.wrapperElement);
        editor.setFontSize(14);
        editor.session.setMode(getEditorMode(sessionStorage.getItem(editorMode)) || 'ace/mode/json');
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
                    throw new MashupPlatform.wiring.EndpointTypeError();
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

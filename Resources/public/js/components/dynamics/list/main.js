/**
 * Generated by https://github.com/alexander-schranz/sulu-backend-bundle.
 */

define(['jquery'], function ($) {
    'use strict';

    var constants = {
        toolbarId: 'dynamic-toolbar',
        toolbarKey: 'dynamics',
        listId: 'dynamic-list',
        endPointUrl: '/admin/api/form/dynamics',
        fieldsAction: '/admin/api/form/dynamics/fields'
    };

    return {

        layout: function() {
            return {
                extendExisting: true,
                content: {
                    width: 'fixed',
                    leftSpace: true,
                    rightSpace: true
                }
            };
        },

        initialize: function() {
            this.render();
            this.initPreview();
        },

        /**
         * Initilize the sulu preview
         */
        initPreview: function() {
            this.sandbox.emit('sulu.preview.initialize', null, true);
        },

        /**
         * Get filter parameters for dynamics.
         */
        getUrlParameters: function() {
            return {
                'form': this.options.data()[this.options.property],
                'webspaceKey': this.options.webspace,
                'locale': this.options.language,
                'view': this.options.view,
                'uuid': this.options.id,
                'sortBy': 'created',
                'sortOrder': 'desc'
            };
        },

        /**
         * Renders the component
         */
        render: function () {
            this.sandbox.dom.html(this.$el,
                '<div id="' + constants.toolbarId + '"></div>' +
                '<div id="' + constants.listId + '"></div>'
            );

            var urlParameters = this.getUrlParameters();
            var queryString = '?' + $.param(urlParameters);

            // init list-toolbar and datagrid
            this.sandbox.sulu.initListToolbarAndList.call(
                this,
                constants.toolbarKey,
                constants.fieldsAction + queryString,
                {
                    // options for the header (list-toolbar)
                    el: this.$find('#' + constants.toolbarId),
                    template:  this.sandbox.sulu.buttons.get({
                        settings: {
                            options: {
                                id: 'settings',
                                dropdownItems: {
                                    export: {
                                        options: {
                                            title: 'public.export',
                                            icon: 'download',
                                            callback: function() {
                                                var $container = $('<div/>');
                                                $('body').append($container);

                                                var csvOptions = {
                                                    el: $container,
                                                    urlParameter: urlParameters,
                                                    url: constants.endPointUrl + '.csv'
                                                };

                                                App.start([{
                                                    name: 'csv-export@suluform',
                                                    options: csvOptions
                                                }]).fail(function() {
                                                    // Fallback to old version of csv-export
                                                    // aura_1: Error loading component: csv-export@suluform Error: Script error for: __component__$csv-export@suluform
                                                    console.warn('Ignore error! For date-range specific export at least Sulu 1.5 is needed. Automatic fallback to default export.');

                                                    App.start([{
                                                        name: 'csv-export@suluadmin',
                                                        options: csvOptions
                                                    }])
                                                });
                                            }.bind(this)
                                        }
                                    },
                                    columnOptions: {
                                        options: {
                                            type: 'columnOptions'
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    hasSearch: false,
                    instanceName: this.instanceName
                },
                {
                    // options for the content (datagrid)
                    el: this.$find('#' + constants.listId),
                    instanceName: this.instanceName,
                    url: constants.endPointUrl + queryString,
                    resultKey: 'dynamics',
                    viewOptions: {
                        table: {
                            selectItem: false,
                            fullWidth: true
                        }
                    }
                }
            );
        }
    };
});

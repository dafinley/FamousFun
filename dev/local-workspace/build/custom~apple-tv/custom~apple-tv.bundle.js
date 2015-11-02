// Copyright 2015 (c) Famous Industries, Inc.
"use strict";
FamousFramework.includes("custom:apple-tv", "HEAD", ["custom/apple-tv/galleryData.js","custom/apple-tv/apple-tv.css"], function() {
    (function(){
        'use strict';
        FamousFramework.module('famous:core:node', 'HEAD', {
            'dependencies': {},
            'famousNodeConstructorName': '',
            'extensions': [],
            'expose': {
                'type': 'ObjectExpression',
                'properties': []
            }
        }, {
            behaviors: { '$self': { '$yield': true } },
            events: {
                '$public': {
                    'add-class': function ($DOMElement, $payload) {
                        $DOMElement.addClass($payload);
                    },
                    'align': function ($famousNode, $payload) {
                        $famousNode.setAlign($payload[0], $payload[1], $payload[2]);
                    },
                    'align-x': function ($famousNode, $payload) {
                        $famousNode.setAlign($payload, null, null);
                    },
                    'align-y': function ($famousNode, $payload) {
                        $famousNode.setAlign(null, $payload, null);
                    },
                    'align-z': function ($famousNode, $payload) {
                        $famousNode.setAlign(null, null, $payload);
                    },
                    'attach': function ($payload, $famousNode) {
                        $payload($famousNode);
                    },
                    'attributes': function ($DOMElement, $payload) {
                        for (var attributeName in $payload) {
                            $DOMElement.setAttribute(attributeName, $payload[attributeName]);
                        }
                    },
                    'backface-visible': function ($state, $payload, $dispatcher) {
                        var style = $state.get('style') || {};
                        style['-webkit-backface-visibility'] = $payload ? 'visible' : 'hidden';
                        style['backface-visibility'] = $payload ? 'visible' : 'hidden';
                        $dispatcher.trigger('style', style);
                    },
                    'base-color': function ($mesh, $payload, $state) {
                        if (Object.prototype.toString.call($payload) === '[object Object]') {
                            var Material = FamousFramework.FamousEngine.webglMaterials.Material;
                            Material.registerExpression($payload.name, {
                                glsl: $payload.glsl,
                                output: $payload.output
                            });
                            $mesh.setBaseColor(new Material[$payload.name]());
                        } else {
                            $mesh.setBaseColor(new FamousFramework.FamousEngine.utilities.Color($payload));
                        }
                        if (!$state.get('hasGeometry')) {
                            $mesh.setGeometry(new FamousFramework.FamousEngine.webglGeometries.Plane());
                            $state.set('hasGeometry', true);
                        }
                    },
                    'box-shadow': function ($state, $payload, $dispatcher) {
                        var style = $state.get('style') || {};
                        style['-webkit-box-shadow'] = $payload;
                        style['-moz-box-shadow'] = $payload;
                        style['box-shadow'] = $payload;
                        $dispatcher.trigger('style', style);
                    },
                    'camera': function ($camera, $payload) {
                        $camera.set($payload[0], $payload[1]);
                    },
                    'content': function ($DOMElement, $payload) {
                        $DOMElement.setContent($payload);
                    },
                    'flat-shading': function ($mesh, $payload) {
                        $mesh.setFlatShading($payload);
                    },
                    'geometry': function ($mesh, $payload, $state) {
                        var webglGeometries = FamousFramework.FamousEngine.webglGeometries;
                        var geometry;
                        if ($payload.dynamic) {
                            var geometry = new webglGeometries.DynamicGeometry().fromGeometry(new webglGeometries[$payload.shape]($payload.options));
                        } else {
                            var geometry = new webglGeometries[$payload.shape]($payload.options);
                        }
                        $mesh.setGeometry(geometry);
                        $state.set('hasGeometry', true);
                    },
                    'glossiness': function ($mesh, $payload) {
                        $mesh.setGlossiness($payload.glossiness, $payload.strength);
                    },
                    'id': function ($DOMElement, $payload) {
                        $DOMElement.setId($payload);
                    },
                    'light': function ($famousNode, $payload) {
                        var webglRenderables = FamousFramework.FamousEngine.webglRenderables;
                        var Color = FamousFramework.FamousEngine.utilities.Color;
                        if ($payload.type === 'point') {
                            new webglRenderables.PointLight($famousNode).setColor(new Color($payload.color));
                        } else {
                            new webglRenderables.AmbientLight($famousNode).setColor(new Color($payload.color));
                        }
                    },
                    'mount-point': function ($famousNode, $payload) {
                        $famousNode.setMountPoint($payload[0], $payload[1], $payload[2]);
                    },
                    'mount-point-x': function ($famousNode, $payload) {
                        $famousNode.setMountPoint($payload, null, null);
                    },
                    'mount-point-y': function ($famousNode, $payload) {
                        $famousNode.setMountPoint(null, $payload, null);
                    },
                    'mount-point-z': function ($famousNode, $payload) {
                        $famousNode.setMountPoint(null, null, $payload);
                    },
                    'normals': function ($mesh, $payload) {
                        $mesh.setNormals($payload);
                    },
                    'offset-position': function ($famousNode, $payload) {
                        var currentPos = $famousNode.getPosition();
                        $famousNode.setPosition(currentPos[0] + $payload[0] || 0, currentPos[1] + $payload[1] || 0, currentPos[2] + $payload[2] || 0);
                    },
                    'opacity': function ($famousNode, $payload) {
                        $famousNode.setOpacity($payload);
                    },
                    'origin': function ($famousNode, $payload) {
                        $famousNode.setOrigin($payload[0], $payload[1], $payload[2]);
                    },
                    'origin-x': function ($famousNode, $payload) {
                        $famousNode.setOrigin($payload, null, null);
                    },
                    'origin-y': function ($famousNode, $payload) {
                        $famousNode.setOrigin(null, $payload, null);
                    },
                    'origin-z': function ($famousNode, $payload) {
                        $famousNode.setOrigin(null, null, $payload);
                    },
                    'position': function ($famousNode, $payload) {
                        $famousNode.setPosition($payload[0], $payload[1], $payload[2]);
                    },
                    'position-offset': function ($mesh, $payload, $state) {
                        var Material = FamousFramework.FamousEngine.webglMaterials.Material;
                        Material.registerExpression($payload.name, {
                            glsl: $payload.glsl,
                            output: $payload.output
                        });
                        var vertexShader = Material[$payload.name](null, $payload.defaults);
                        $state.set($payload.name, vertexShader);
                        $mesh.setPositionOffset(vertexShader);
                    },
                    'position-x': function ($famousNode, $payload) {
                        $famousNode.setPosition($payload, null, null);
                    },
                    'position-y': function ($famousNode, $payload) {
                        $famousNode.setPosition(null, $payload, null);
                    },
                    'position-z': function ($famousNode, $payload) {
                        $famousNode.setPosition(null, null, $payload);
                    },
                    'remove-class': function ($DOMElement, $payload) {
                        $DOMElement.removeClass($payload);
                    },
                    'rotation': function ($famousNode, $payload) {
                        $famousNode.setRotation($payload[0], $payload[1], $payload[2], $payload[3]);
                    },
                    'rotation-x': function ($famousNode, $payload) {
                        $famousNode.setRotation($payload, null, null);
                    },
                    'rotation-y': function ($famousNode, $payload) {
                        $famousNode.setRotation(null, $payload, null);
                    },
                    'rotation-z': function ($famousNode, $payload) {
                        $famousNode.setRotation(null, null, $payload);
                    },
                    'scale': function ($famousNode, $payload) {
                        $famousNode.setScale($payload[0], $payload[1], $payload[2]);
                    },
                    'scale-x': function ($famousNode, $payload) {
                        $famousNode.setScale($payload, null, null);
                    },
                    'scale-y': function ($famousNode, $payload) {
                        $famousNode.setScale(null, $payload, null);
                    },
                    'scale-z': function ($famousNode, $payload) {
                        $famousNode.setScale(null, null, $payload);
                    },
                    'size': function ($payload, $dispatcher) {
                        var xSize = $payload[0];
                        var ySize = $payload[1];
                        var zSize = $payload[2];
                        if (xSize === true)
                            $dispatcher.trigger('size-true-x');
                        else if (xSize !== undefined)
                            $dispatcher.trigger('size-absolute-x', xSize);
                        if (ySize === true)
                            $dispatcher.trigger('size-true-y');
                        else if (ySize !== undefined)
                            $dispatcher.trigger('size-absolute-y', ySize);
                        if (zSize === true)
                            $dispatcher.trigger('size-true-z');
                        else if (zSize !== undefined)
                            $dispatcher.trigger('size-absolute-z', zSize);
                    },
                    'size-mode': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload[0], $payload[1], $payload[2]);
                    },
                    'size-mode-x': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload, null, null);
                    },
                    'size-mode-y': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, $payload, null);
                    },
                    'size-mode-z': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, null, $payload);
                    },
                    'size-true': function ($famousNode) {
                        $famousNode.setSizeMode(2, 2, 2);
                    },
                    'size-true-x': function ($famousNode) {
                        $famousNode.setSizeMode(2, null, null);
                    },
                    'size-true-y': function ($famousNode) {
                        $famousNode.setSizeMode(null, 2, null);
                    },
                    'size-true-z': function ($famousNode) {
                        $famousNode.setSizeMode(null, null, 2);
                    },
                    'size-absolute': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload[0] === null ? null : 1, $payload[1] === null ? null : 1, $payload[2] === null ? null : 1);
                        $famousNode.setAbsoluteSize($payload[0], $payload[1], $payload[2]);
                    },
                    'size-absolute-x': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload === null ? null : 1, null, null);
                        $famousNode.setAbsoluteSize($payload, null, null);
                    },
                    'size-absolute-y': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, $payload === null ? null : 1, null);
                        $famousNode.setAbsoluteSize(null, $payload, null);
                    },
                    'size-absolute-z': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, null, $payload === null ? null : 1);
                        $famousNode.setAbsoluteSize(null, null, $payload);
                    },
                    'size-differential': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload[0] === null ? null : 0, $payload[1] === null ? null : 0, $payload[2] === null ? null : 0);
                        $famousNode.setDifferentialSize($payload[0], $payload[1], $payload[2]);
                    },
                    'size-differential-x': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload === null ? null : 0, null, null);
                        $famousNode.setDifferentialSize($payload, null, null);
                    },
                    'size-differential-y': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, $payload === null ? null : 0, null);
                        $famousNode.setDifferentialSize(null, $payload, null);
                    },
                    'size-differential-z': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, null, $payload === null ? null : 0);
                        $famousNode.setDifferentialSize(null, null, $payload);
                    },
                    'size-proportional': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload[0] === null ? null : 0, $payload[1] === null ? null : 0, $payload[2] === null ? null : 0);
                        $famousNode.setProportionalSize($payload[0], $payload[1], $payload[2]);
                    },
                    'size-proportional-x': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload === null ? null : 0, null, null);
                        $famousNode.setProportionalSize($payload, null, null);
                    },
                    'size-proportional-y': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, $payload === null ? null : 0, null);
                        $famousNode.setProportionalSize(null, $payload, null);
                    },
                    'size-proportional-z': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, null, $payload === null ? null : 0);
                        $famousNode.setProportionalSize(null, null, $payload);
                    },
                    'style': function ($DOMElement, $payload) {
                        for (var styleName in $payload) {
                            $DOMElement.setProperty(styleName, $payload[styleName]);
                        }
                    },
                    'uniform': function ($state, $payload) {
                        $state.get($payload.vertexName).setUniform($payload.variableName, $payload.value);
                    },
                    'unselectable': function ($state, $payload, $dispatcher) {
                        if ($payload) {
                            var style = $state.get('style') || {};
                            style['-moz-user-select'] = '-moz-none';
                            style['-khtml-user-select'] = 'none';
                            style['-webkit-user-select'] = 'none';
                            style['-o-user-select'] = 'none';
                            style['user-select'] = 'none';
                            $dispatcher.trigger('style', style);
                        }
                    }
                }
            },
            states: {
                'didTemplate': false,
                'initialContent': '',
                'hasGeometry': false
            }
        }).config({
            'extends': [],
            imports: {}
        });
    }());
    (function(){
        'use strict';
        function addGesture($famousNode, $GestureHandler, $payload, eventName) {
            new $GestureHandler($famousNode, [{
                    event: eventName,
                    callback: function (event) {
                        $payload.listener(event);
                    }
                }]);
        }
        var lastNaturalDOMEvent = {
            timeStamp: null,
            eventName: null
        };
        var naturalDOMListenersFor = {};
        var EVENTS_WHICH_REALLY_NEED_DOM_INFO = {
            'input': true,
            'change': true,
            'click': true,
            'focus': true,
            'blur': true,
            'select': true,
            'keydown': true,
            'keyup': true
        };
        FamousFramework.module('famous:events', 'HEAD', {
            'dependencies': {},
            'famousNodeConstructorName': '',
            'extensions': [],
            'expose': {
                'type': 'ObjectExpression',
                'properties': []
            }
        }, {
            events: {
                '$public': {
                    'size-change': function ($famousNode, $payload) {
                        $famousNode.addComponent({
                            onSizeChange: function (sizeX, sizeY, sizeZ) {
                                $payload.listener({
                                    eventName: 'onSizeChange',
                                    value: [
                                        sizeX,
                                        sizeY,
                                        sizeZ
                                    ]
                                });
                            }
                        });
                    },
                    'parent-size-change': function ($famousNode, $payload) {
                        var parentFamousNode = $famousNode.getParent();
                        if (parentFamousNode) {
                            parentFamousNode.addComponent({
                                onSizeChange: function (sizeX, sizeY, sizeZ) {
                                    $payload.listener({
                                        eventName: 'onParentSizeChange',
                                        value: [
                                            sizeX,
                                            sizeY,
                                            sizeZ
                                        ]
                                    });
                                }
                            });
                        }
                    },
                    'drag': function ($famousNode, $GestureHandler, $payload) {
                        addGesture($famousNode, $GestureHandler, $payload, 'drag');
                    },
                    'tap': function ($famousNode, $GestureHandler, $payload) {
                        addGesture($famousNode, $GestureHandler, $payload, 'tap');
                    },
                    'rotate': function ($famousNode, $GestureHandler, $payload) {
                        addGesture($famousNode, $GestureHandler, $payload, 'rotate');
                    },
                    'pinch': function ($famousNode, $GestureHandler, $payload) {
                        addGesture($famousNode, $GestureHandler, $payload, 'pinch');
                    },
                    '$miss': function ($DOMElement, $famousNode, $payload) {
                        var eventName = $payload.eventName;
                        var listener = $payload.listener;
                        if (eventName in EVENTS_WHICH_REALLY_NEED_DOM_INFO) {
                            if (!naturalDOMListenersFor[eventName]) {
                                naturalDOMListenersFor[eventName] = true;
                                document.addEventListener(eventName, function (event) {
                                    lastNaturalDOMEvent.timeStamp = event.timeStamp;
                                    lastNaturalDOMEvent.eventName = eventName;
                                    lastNaturalDOMEvent.eventObject = event;
                                });
                            }
                        }
                        $famousNode.addUIEvent(eventName);
                        $DOMElement.on(eventName, function (event) {
                            if (naturalDOMListenersFor[eventName]) {
                                if (lastNaturalDOMEvent.eventName === eventName && lastNaturalDOMEvent.timeStamp === event.timeStamp) {
                                    var naturalEvent = lastNaturalDOMEvent.eventObject;
                                    var target = naturalEvent.target || naturalEvent.srcElement;
                                    if (target) {
                                        var nodeLocation = $famousNode.getLocation();
                                        var currentElement = target;
                                        while (currentElement) {
                                            if (currentElement.getAttribute('data-fa-path') === nodeLocation) {
                                                event.target = naturalEvent.target;
                                                event.relatedTarget = naturalEvent.relatedTarget;
                                                break;
                                            }
                                            currentElement = currentElement.parentNode;
                                        }
                                    }
                                }
                            }
                            listener(event);
                        });
                    }
                }
            }
        }).config({
            imports: { 'famous:events': [] },
            'extends': []
        });
    }());
    (function(){
        var imageData = [
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._01_-_Autorretrato._Francisco_Goya_y_Lucientes2C_pintor_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._02_-_El_si_pronuncian_y_la_mano_alargan_al_primero_que_llega_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._03_-_Que_viene_el_Coco_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._04_-_El_de_la_rollona_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._05_-_Tal_para_qual_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._06_-_Nadie_se_conoce_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._07_-_Ni_asi_la_distingue_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._09_-_Tantalo_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._10_-_El_amor_y_la_muerte_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._11_-_Muchachos_al_avC3ADo_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._12_-_A_caza_de_dientes_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._13_-_Estan_calientes_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._14_-_Que_sacrificio21_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._15_-_Bellos_consejos_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._16_-_Dios_la_perdone_-_Y_era_su_madre_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._17_-_Bien_tirada_estC3A1_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._18_-_Y_se_le_quema_la_Casa_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._19_-_Todos_CaerC3A1n_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._20_-_Ya_van_desplumados_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._21_-_C2A1Qual_la_descaC3B1onan21_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._22_-_Pobrecitas21_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._23_-_Aquellos_polbos_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._24_-_No_hubo_remedio_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._25_-_Si_quebrC3B3_el_Cantaro_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._26_-_Ya_tienen_asiento_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._27_-_Quien_mC3A1s_rendido3F_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._28_-_Chiton_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._29_-_Esto_si_que_es_leer_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._30_-_Porque_esconderlos3F_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._31_-_Ruega_por_ella_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._32_-_Por_que_fue_sensible_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._33_-_Al_Conde_Palatino_thumb.jpg',
            'http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._34_-_Las_rinde_el_SueC3B1o_thumb.jpg'
        ];
        var contextSize = window.innerHeight;
        function randomCoordinates(imageData) {
            var result = [];
            for (var i = 0; i < imageData.length; i++)
                result.push(Math.floor(contextSize / 2 + 100 + Math.random() * contextSize * 2));
            return result;
        }
        'use strict';
        FamousFramework.component('custom:apple-tv', 'HEAD', {
            'dependencies': {
                'famous:events': 'HEAD',
                'famous:core:node': 'HEAD'
            },
            'famousNodeConstructorName': '',
            'extensions': [{
                    'name': 'famous:core:node',
                    'version': 'HEAD'
                }],
            'expose': {
                'type': 'ObjectExpression',
                'properties': []
            }
        }, {
            behaviors: {
                '#root': { 'style': { 'perspective': '1000px' } },
                '#rotator-node': {
                    'position-z': function (rootZ) {
                        return rootZ;
                    },
                    'size': function (contextSize) {
                        return [
                            contextSize,
                            contextSize
                        ];
                    },
                    'align': [
                        0.5,
                        0.5
                    ],
                    'mount-point': [
                        0.5,
                        0.5
                    ],
                    'origin': [
                        0.5,
                        0.5
                    ],
                    'style': { 'background': 'red' },
                    'rotation': function (rotationValue) {
                        return [
                            -Math.PI / 2,
                            0,
                            rotationValue
                        ];
                    }
                },
                '.gallery-item': {
                    'size': [
                        100,
                        100
                    ],
                    '$repeat': function (srcs) {
                        return srcs;
                    },
                    'position-x': function ($index, contextSize) {
                        return Math.random() * contextSize;
                    },
                    'position-y': function ($index, contextSize) {
                        return Math.random() * contextSize;
                    },
                    'position-z': function ($index, positionZ) {
                        return positionZ[$index];
                    },
                    'rotation': [
                        Math.PI / 2,
                        0,
                        0
                    ],
                    'content': function ($index, srcs) {
                        return '<img src="' + srcs[$index] + '" style="height:100px;width:100px"/>';
                    }
                }
            },
            events: {
                '$lifecycle': {
                    'post-load': function ($state, $famousNode) {
                        var id = $famousNode.addComponent({
                            onUpdate: function (time) {
                                for (var i = 0; i < $state.get('srcs').length; i++) {
                                    var currentZ = $state.get([
                                        'positionZ',
                                        i
                                    ]);
                                    if (currentZ < -$state.get('contextSize')) {
                                        currentZ = $state.get('contextSize') + 100;
                                    }
                                    $state.set([
                                        'positionZ',
                                        i
                                    ], currentZ - 1);
                                }
                                $famousNode.requestUpdateOnNextTick(id);
                            }
                        });
                        $famousNode.requestUpdateOnNextTick(id);
                    }
                },
                '.gallery-item': {
                    'famous:events:click': function ($state) {
                        $state.set('rotationValue', $state.get('rotationValue') - Math.PI / 2, {
                            duration: 1000,
                            curve: 'easeIn'
                        }).thenSet('rotationValue', $state.get('rotationValue') - Math.PI * 2, {
                            duration: 2000,
                            curve: 'easeOut'
                        });
                        $state.set('rootZ', -500, {
                            duration: 1000,
                            curve: 'easeOut'
                        }).thenSet('rootZ', 0, {
                            duration: 2000,
                            curve: 'easeInOut'
                        });
                    }
                }
            },
            states: {
                rotationValue: 0,
                srcs: imageData,
                contextSize: 500,
                positionZ: randomCoordinates(imageData),
                rootZ: 0
            },
            tree: '<famous:core:node id="root">\n    <famous:core:node id="rotator-node">\n        <famous:core:node class="gallery-item">\n        </famous:core:node>\n    </famous:core:node>\n</famous:core:node>\n'
        }).config({
            includes: [
                'galleryData.js',
                'apple-tv.css'
            ]
        });
    }());
    FamousFramework.markComponentAsReady("custom:apple-tv", "HEAD");
});
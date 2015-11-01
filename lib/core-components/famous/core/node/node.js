FamousFramework.module('famous:core:node', {
    behaviors: {
        '$self' : {
            '$yield': true
        }
    },
    events: {
        '$public': {
            'add-class': function($DOMElement, $payload) {
                $DOMElement.addClass($payload);
            },
            'align': function($famousNode, $payload) {
                $famousNode.setAlign($payload[0], $payload[1], $payload[2]);
            },
            'align-x': function($famousNode, $payload) {
                $famousNode.setAlign($payload, null, null);
            },
            'align-y': function($famousNode, $payload) {
                $famousNode.setAlign(null, $payload, null);
            },
            'align-z': function($famousNode, $payload) {
                $famousNode.setAlign(null, null, $payload);
            },
            'attach': function($payload, $famousNode) {
                $payload($famousNode);
            },
            'attributes': function($DOMElement, $payload) {
                for (var attributeName in $payload) {
                    $DOMElement.setAttribute(attributeName, $payload[attributeName]);
                }
            },
            'backface-visible': function($state, $payload, $dispatcher) {
                var style = $state.get('style') || {};
                style['-webkit-backface-visibility'] = ($payload) ? 'visible' : 'hidden';
                style['backface-visibility'] = ($payload) ? 'visible' : 'hidden';
                $dispatcher.trigger('style', style);
            },
            'base-color': function($mesh, $payload, $state) {
                if (Object.prototype.toString.call($payload) === '[object Object]') {
                    var Material = FamousFramework.FamousEngine.webglMaterials.Material;
                    Material.registerExpression($payload.name, {
                        glsl: $payload.glsl,
                        output: $payload.output
                    });
                    $mesh.setBaseColor(new Material[$payload.name]());
                }
                else {
                    $mesh.setBaseColor(new FamousFramework.FamousEngine.utilities.Color($payload));
                }

                if (!$state.get('hasGeometry')) {
                    $mesh.setGeometry(new FamousFramework.FamousEngine.webglGeometries.Plane());
                    $state.set('hasGeometry', true);
                }
            },
            'box-shadow': function($state, $payload, $dispatcher) {
                var style = $state.get('style') || {};
                style['-webkit-box-shadow'] = $payload;
                style['-moz-box-shadow'] = $payload;
                style['box-shadow'] = $payload;
                $dispatcher.trigger('style', style);
            },
            'camera': function($camera, $payload) { $camera.set($payload[0], $payload[1]); },
            'content': function($DOMElement, $payload) {
                $DOMElement.setContent($payload);
            },
            'flat-shading': function($mesh, $payload) {
                $mesh.setFlatShading($payload);
            },
            'geometry': function($mesh, $payload, $state) {
                var webglGeometries = FamousFramework.FamousEngine.webglGeometries;
                var geometry;

                if ($payload.dynamic) {
                    var geometry = new webglGeometries.DynamicGeometry()
                        .fromGeometry(new webglGeometries[$payload.shape]($payload.options));
                }
                else {
                    var geometry = new webglGeometries[$payload.shape]($payload.options);
                }

                $mesh.setGeometry(geometry);
                $state.set('hasGeometry', true);
            },
            'glossiness': function($mesh, $payload) {
                $mesh.setGlossiness($payload.glossiness, $payload.strength);
            },
            'id': function($DOMElement, $payload) {
                $DOMElement.setId($payload);
            },
            'light': function($famousNode, $payload) {
                var webglRenderables = FamousFramework.FamousEngine.webglRenderables;
                var Color = FamousFramework.FamousEngine.utilities.Color;

                if ($payload.type === 'point') {
                    new webglRenderables.PointLight($famousNode).setColor(new Color($payload.color));
                }
                else {
                    new webglRenderables.AmbientLight($famousNode).setColor(new Color($payload.color));
                }
            },
            'mount-point': function($famousNode, $payload) {
                $famousNode.setMountPoint($payload[0], $payload[1], $payload[2]);
            },
            'mount-point-x': function($famousNode, $payload) {
                $famousNode.setMountPoint($payload, null, null);
            },
            'mount-point-y': function($famousNode, $payload) {
                $famousNode.setMountPoint(null, $payload, null);
            },
            'mount-point-z': function($famousNode, $payload) {
                $famousNode.setMountPoint(null, null, $payload);
            },
            'normals': function($mesh, $payload) {
                $mesh.setNormals($payload);
            },
            'offset-position': function($famousNode, $payload) {
                var currentPos = $famousNode.getPosition();
                $famousNode.setPosition(
                    currentPos[0] + $payload[0] || 0,
                    currentPos[1] + $payload[1] || 0,
                    currentPos[2] + $payload[2] || 0
                );
            },
            'opacity': function($famousNode, $payload) {
                $famousNode.setOpacity($payload);
            },
            'origin': function($famousNode, $payload) {
                $famousNode.setOrigin($payload[0], $payload[1], $payload[2]);
            },
            'origin-x': function($famousNode, $payload) {
                $famousNode.setOrigin($payload, null, null);
            },
            'origin-y': function($famousNode, $payload) {
                $famousNode.setOrigin(null, $payload, null);
            },
            'origin-z': function($famousNode, $payload) {
                $famousNode.setOrigin(null, null, $payload);
            },
            'position': function($famousNode, $payload) {
                $famousNode.setPosition($payload[0], $payload[1], $payload[2]);
            },
            'position-offset': function($mesh, $payload, $state) {
                var Material = FamousFramework.FamousEngine.webglMaterials.Material;

                Material.registerExpression($payload.name, {
                    glsl: $payload.glsl,
                    output: $payload.output
                });

                var vertexShader = Material[$payload.name](null, $payload.defaults);
                $state.set($payload.name, vertexShader);

                $mesh.setPositionOffset(vertexShader);
            },
            'position-x': function($famousNode, $payload) {
                $famousNode.setPosition($payload, null, null);
            },
            'position-y': function($famousNode, $payload) {
                $famousNode.setPosition(null, $payload, null);
            },
            'position-z': function($famousNode, $payload) {
                $famousNode.setPosition(null, null, $payload);
            },
            'remove-class': function($DOMElement, $payload) {
                $DOMElement.removeClass($payload);
            },
            'rotation': function($famousNode, $payload) {
                $famousNode.setRotation($payload[0], $payload[1], $payload[2], $payload[3]);
            },
            'rotation-x': function($famousNode, $payload) {
                $famousNode.setRotation($payload, null, null);
            },
            'rotation-y': function($famousNode, $payload) {
                $famousNode.setRotation(null, $payload, null);
            },
            'rotation-z': function($famousNode, $payload) {
                $famousNode.setRotation(null, null, $payload);
            },
            'scale': function($famousNode, $payload) {
                $famousNode.setScale($payload[0], $payload[1], $payload[2]);
            },
            'scale-x': function($famousNode, $payload) {
                $famousNode.setScale($payload, null, null);
            },
            'scale-y': function($famousNode, $payload) {
                $famousNode.setScale(null, $payload, null);
            },
            'scale-z': function($famousNode, $payload) {
                $famousNode.setScale(null, null, $payload);
            },
            'size': function($payload, $dispatcher) {
                var xSize = $payload[0];
                var ySize = $payload[1];
                var zSize = $payload[2];

                if (xSize === true) $dispatcher.trigger('size-true-x');
                else if (xSize !== undefined) $dispatcher.trigger('size-absolute-x', xSize);

                if (ySize === true) $dispatcher.trigger('size-true-y');
                else if (ySize !== undefined) $dispatcher.trigger('size-absolute-y', ySize);

                if (zSize === true) $dispatcher.trigger('size-true-z');
                else if (zSize !== undefined) $dispatcher.trigger('size-absolute-z', zSize);
            },
            'size-mode': function($famousNode, $payload) {
                $famousNode.setSizeMode($payload[0], $payload[1], $payload[2]);
            },
            'size-mode-x': function($famousNode, $payload) {
                $famousNode.setSizeMode($payload, null, null);
            },
            'size-mode-y': function($famousNode, $payload) {
                $famousNode.setSizeMode(null, $payload, null);
            },
            'size-mode-z': function($famousNode, $payload) {
                $famousNode.setSizeMode(null, null, $payload);
            },
            'size-true': function($famousNode) {
                $famousNode.setSizeMode(2, 2, 2);
            },
            'size-true-x': function($famousNode) {
                $famousNode.setSizeMode(2, null, null);
            },
            'size-true-y': function($famousNode) {
                $famousNode.setSizeMode(null, 2, null);
            },
            'size-true-z': function($famousNode) {
                $famousNode.setSizeMode(null, null, 2);
            },
            'size-absolute': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    $payload[0] === null ? null : 1,
                    $payload[1] === null ? null : 1,
                    $payload[2] === null ? null : 1
                );
                $famousNode.setAbsoluteSize($payload[0], $payload[1], $payload[2]);
            },
            'size-absolute-x': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    $payload === null ? null : 1,
                    null,
                    null
                );
                $famousNode.setAbsoluteSize($payload, null, null);
            },
            'size-absolute-y': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    null,
                    $payload === null ? null : 1,
                    null
                );
                $famousNode.setAbsoluteSize(null, $payload, null);
            },
            'size-absolute-z': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    null,
                    null,
                    $payload === null ? null : 1
                );
                $famousNode.setAbsoluteSize(null, null, $payload);
            },
            'size-differential': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    $payload[0] === null ? null : 0,
                    $payload[1] === null ? null : 0,
                    $payload[2] === null ? null : 0
                );
                $famousNode.setDifferentialSize($payload[0], $payload[1], $payload[2]);
            },
            'size-differential-x': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    $payload === null ? null : 0,
                    null,
                    null
                );
                $famousNode.setDifferentialSize($payload, null, null);
            },
            'size-differential-y': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    null,
                    $payload === null ? null : 0,
                    null
                );
                $famousNode.setDifferentialSize(null, $payload, null);
            },
            'size-differential-z': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    null,
                    null,
                    $payload === null ? null : 0
                );
                $famousNode.setDifferentialSize(null, null, $payload);
            },
            'size-proportional': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    $payload[0] === null ? null : 0,
                    $payload[1] === null ? null : 0,
                    $payload[2] === null ? null : 0
                );
                $famousNode.setProportionalSize($payload[0], $payload[1], $payload[2]);
            },
            'size-proportional-x': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    $payload === null ? null : 0,
                    null,
                    null
                );
                $famousNode.setProportionalSize($payload, null, null);
            },
            'size-proportional-y': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    null,
                    $payload === null ? null : 0,
                    null
                );
                $famousNode.setProportionalSize(null, $payload, null);
            },
            'size-proportional-z': function($famousNode, $payload) {
                $famousNode.setSizeMode(
                    null,
                    null,
                    $payload === null ? null : 0
                );
                $famousNode.setProportionalSize(null, null, $payload);
            },
            'style': function($DOMElement, $payload) {
                for (var styleName in $payload) {
                    $DOMElement.setProperty(styleName, $payload[styleName]);
                }
            },
            'uniform': function($state, $payload) {
                $state.get($payload.vertexName).setUniform($payload.variableName, $payload.value);
            },
            'unselectable': function($state, $payload, $dispatcher) {
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
})
.config({
    extends: [],
    imports: {}
});

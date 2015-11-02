'use strict';

FamousFramework.component('custom:apple-tv', {
    behaviors: {
        '#root': {
            'style': { // remove background color! set it in the CSS instead
                'perspective': '1000px'
            }
        },
        '#rotator-node': {
            'position-z': function (rootZ) {
                return rootZ;
            },
            'size': function (contextSize) {
                //grab context size from state
                return [contextSize, contextSize];
            },
            'align': [0.5, 0.5],
            'mount-point': [0.5, 0.5],
            'origin': [0.5, 0.5], //center the origin so it rotates around its middle  
            'style': {
                'background': 'red'
            },
            'rotation': function (rotationValue) {
                // this will drive Z rotation animations
                //rotate backwards and listen for Z rotation changes
                return [-Math.PI / 2, 0, rotationValue];
            }
        },
        '.gallery-item': {
            'size': [100, 100],
            '$repeat': function (srcs) {
                return srcs; //repeat over srcs array
            },
            'position-x': function ($index, contextSize) {
                return Math.random() * contextSize;
            },
            'position-y': function ($index, contextSize) {
                return Math.random() * contextSize;
            },
            'position-z': function ($index, positionZ) {
                return positionZ[$index]; // this will drive the moving image animations
            },
            'rotation': [Math.PI / 2, 0, 0], //rotate images forward
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
                            var currentZ = $state.get(['positionZ', i]);
                            // if image is out of screen move it back to bottom
                            if (currentZ < -$state.get('contextSize')) {
                                currentZ = $state.get('contextSize') + 100;
                            }
                            $state.set(['positionZ', i], currentZ - 1);
                        }
                        $famousNode.requestUpdateOnNextTick(id);
                    }
                });
                $famousNode.requestUpdateOnNextTick(id);
            }
        },
        '.gallery-item': {
            'click': function ($state) {

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
    }, // ← all of our events go here
    states: {
        rotationValue: 0, // value to rotate all of our images 
        srcs: imageData, // this will store the images srcs
        contextSize: 500, // define the gallery's size here
        positionZ: randomCoordinates(imageData), // store our images' Z positions here
        rootZ: 0
    },
    tree: 'apple-tv.html' // ← we reference our tree here
}).config({
    includes: ['galleryData.js', 'apple-tv.css']
});
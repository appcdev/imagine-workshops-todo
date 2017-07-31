'use strict';

var UIImpactFeedbackGenerator = require('UIKit/UIImpactFeedbackGenerator');
var style = require('UIKit').UIImpactFeedbackStyleHeavy;

//var generator;


exports.initialize = function() {
	//generator = UIImpactFeedbackGenerator.alloc().initWithStyle(style);
	console.info("style="+style);
};


exports.impactFeedback = function() {
	var generator = UIImpactFeedbackGenerator.alloc().initWithStyle(style);
	console.info("haptic="+generator);
	generator.prepare();
	console.info("haptic="+generator);
    generator.impactOccurred();
    generator = null;
};

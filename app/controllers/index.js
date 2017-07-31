Alloy.Collections.tasks.fetch();

// IMPORT YOUR HYPERLOOP MODULE
var TiSpeech = require('ti.speech');


TiSpeech.initialize();

var canRecordAudio = false;
var canUseSpeechRecognition = false;
var isRunning = false;


// CHECK IF SPEECH RECOGNIZTION IS AVABILE
if (!TiSpeech.isAvailable()) {
    alert('Speech recognition is not available on this device!');
} else {
    TiSpeech.requestSpeechRecognizerAuthorization(function(e) {
        canUseSpeechRecognition = !!e.success;
        if (!e.success) {
            alert("Speech recognition was not authorized!");
        } else {
            TiSpeech.requestMicrophoneAuthorization(function(e) {
                canRecordAudio = !!e.success;
                if (!e.success) {
                    alert("Permission to record audio was not authorized!");
                }
                enableMicButton();
            });
        }
    });
}

/**
 * @function enableButtons
 * @summary Enable buttons based on permissions granted by user
 * @since 1.0.0
 */
function enableMicButton() {
    canUseSpeechRecognition && canRecordAudio && $.micButton.setVisible(true);
}


var animation = Titanium.UI.createAnimation();
animation.opacity = 0;
animation.duration = 1000;
animation.autoreverse = true;

var stopAnimation = false;


animation.addEventListener('complete',function(){
	console.info("stop="+stopAnimation);
	if(!stopAnimation)
		$.micButton.animate(animation);
});

var speechText;

function handleMicButtonTouchStart(e) {
	console.info("Mic Button Touch Start");
	stopAnimation = false;
	$.micButton.animate(animation);

	// INIT HYPERLOOP SPEECH MODULE
	TiSpeech.initialize();
	
	$.scrollView.setVisible(true);
    if (isRunning) {
        stopRecognition();
    } else {
        $.results.setText('Listening...');

        var success = TiSpeech.startRecognition({
            progress: progressCallback,
        });

        if (success) {
            isRunning = true;
        }
    }
}

function handleMicButtonTouchEnd(e) {
	console.info("Mic Button Touch End");
	stopAnimation = true;
	//$.micButton.animate();
	
	// HIDE PARSED TEXT
	$.scrollView.setVisible(false);
	
	// STOP LISTENING TO MIC
	stopRecognition();
	
    Alloy.Collections.tasks.add(Alloy.Globals.mock.createModel("task", {
            description: speechText,
            completed: false
        }));
}

function parseCommand(result) {
	if(result.value.toString().match(/Add Task/g)) {
		
	}
	
	if(result.value.toString().match(/Select Task/g)) {
		
	}
}

/**
 * @function progressCallback
 * @summary Function used to report progress of speech recognition
 * @param {object} result - Resulting progress object
 * @param {boolean} result.finished - Indicates if the speech recognition has completed
 * @param {object} result.error - If an error occurred, this parameter will contain the error information
 * @param {string} result.value - Transcript of the recognized speech
 * @since 1.0.0
 */
function progressCallback(result) {
	console.info("callback called.");
    if (result.error) {
        console.error('An error occurred with speech recognition');
        console.error(result.error);
        
        if (result.error.toString().match(/Timeout/g)) {
            alert('Time limit exceeded for speech recognition');
        } else {
            ///alert('An error occurred with speech recognition');
        }
        stopRecognition();
        return;
    } else {
    	speechText = result.value;
        $.results.setText(result.value);
    }
    if (result.finished) {
        isRunning = false;
        stopRecognition();
    }
}

/**
 * @function stopRecognition
 * @summary Stops voice recognition and resets buttons
 * @since 1.0.0
 */
function stopRecognition() {

    if (isRunning) {
        TiSpeech.stopRecognition();
    }

    isRunning = false;
}

function handleRowClick(e) {
    Alloy.Collections.tasks.at(e.index).set("completed", !Alloy.Collections.tasks.at(e.index).get("completed"));
    Alloy.Collections.tasks.at(e.index).save();
}

function handleAdd() {
    if ($.taskName.value) {
        Alloy.Collections.tasks.add(Alloy.Globals.mock.createModel("task", {
            description: $.taskName.value,
            completed: false
        }));

        $.taskName.value = "";

    } else {
        alert("Enter a description!");
    }
}

$.index.open();

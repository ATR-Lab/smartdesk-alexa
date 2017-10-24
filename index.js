/**
 *
 */
// https://github.com/alexa/skill-sample-nodejs-highlowgame/blob/master/src/index.js
// https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/src/index.js
// https://github.com/alexa/skill-sample-nodejs-fact/blob/master/src/index.js

'use strict';
const firebase        = require('firebase');
const Alexa           = require('alexa-sdk');
const config          = require('./res/config')
const languagestrings = require('./res/languagestrings')

firebase.initializeApp(config.firebase.service);
const defaultDatabase = firebase.database();

const states = {
    STARTMODE:      '_STARTMODE',
    DESKRAISEMODE:  '_DESKRAISEMODE',
    DESKCONFIGMODE: '_DESKCONFIGMODE',
    LIGHTMODE:      '_LIGHTMODE',
    CURTAINMODE:    '_CURTAINMODE',
    CALENDARMODE:   '_CALENDARMODE'
}

exports.handler = function(event, context, callback) {
    const alexa        = Alexa.handler(event, context);
    alexa.appId        = config.alexa.id;
    alexa.resources    = languagestrings;   // Add international resources
    alexa.registerHandlers(newSessionHandlers, startSessionHandlers, deskConfigHandlers);
    alexa.execute();
}

var newSessionHandlers = {
    'NewSession': function() {
        if(Object.keys(this.attributes).length === 0) {
            this.attributes['endedSessionCount'] = 0;
            this.attributes['deskHeightState'] = '';
            this.handler.state = states.STARTMODE;
            this.emit(':ask', this.t('WELCOME_MESSAGE'), 'Say that again?');
        } else {
            this.emit(':ask', this.t('What\'s up?'), 'Please say that againg?');
        }
        
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_REPROMPT'));
    },
    'SessionEndedRequest': function() {
        console.log('session ended!');
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'Unhandled': function() {
        this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_REPROMPT'));
    }
};

var startSessionHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'NewSession': function() {
        this.handler.state = '';
        this.emitWithState('NewSession');
    },
    'DeskConfigIntent': function() {
        this.handler.state = states.DESKCONFIGMODE;
        this.emit(':ask', this.t('DESK_CONFIG_PROMPT'));
    },
    'DeskRaiseIntent': function() {
        if(this.event.request.intent.slots.DescriptiveHeightSmall.value) {
            this.attributes['deskHeightState'] = 'CUSTOM';
            firebase.database().ref('desk').child('action').update({
                command:    'RAISE', 
                status:     'EXECUTE', 
                type:       'QUALITATIVE',
                value:      'SMALL'
            }).then(
                ()      => { this.emit(':ask', this.t('DESK_INCREASING_HEIGHT_SMALL_MESSAGE', this.t('REQUEST_REPROMPT'))); },
                (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
            );
            
        } else if(this.event.request.intent.slots.DescriptiveHeightLarge.value) {
            this.attributes['deskHeightState'] = 'CUSTOM';
            firebase.database().ref('desk').child('action').update({
                command:    'RAISE', 
                status:     'EXECUTE', 
                type:       'QUALITATIVE',
                value:      'LARGE'
            }).then(
                ()      => { this.emit(':ask', this.t('DESK_INCREASING_HEIGHT_MESSAGE', this.t('REQUEST_REPROMPT'))); },
                (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
            );
            
        } else if(this.event.request.intent.slots.TopHeight.value) {
            if(this.attributes['deskHeightState'] === 'TOP') {
                this.emit(':ask', this.t('DESK_ALREADY_TOP_HEIGHT_MESSAGE', this.t('REQUEST_REPROMPT')));
            } else {
                this.attributes['deskHeightState'] = 'TOP';
                firebase.database().ref('desk').child('action').update({
                    command:    'RAISE', 
                    status:     'EXECUTE', 
                    type:       'ORDINAL',
                    value:      'TOP'
                }).then(
                    ()      => { this.emit(':ask', this.t('DESK_TOP_HEIGHT_MESSAGE', this.t('REQUEST_REPROMPT'))); },
                    (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
                );
            }
        } else {
            this.attributes['deskHeightState'] = 'CUSTOM';
            firebase.database().ref('desk').child('action').update({
                command:    'RAISE', 
                status:     'EXECUTE', 
                type:       'QUALITATIVE',
                value:      'SMALL'
            }).then(
                ()      => { this.emit(':ask', this.t('DESK_INCREASING_HEIGHT_SMALL_MESSAGE', this.t('REQUEST_REPROMPT'))); },
                (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
            );
        }
    },
    'DeskLowerIntent': function() {
        if(this.event.request.intent.slots.DescriptiveHeightSmall.value) {
            this.attributes['deskHeightState'] = 'CUSTOM';
            firebase.database().ref('desk').child('action').update({
                    command:    'LOWER', 
                    status:     'EXECUTE', 
                    type:       'QUALITATIVE',
                    value:      'SMALL'
            }).then(
                    ()      => { this.emit(':ask', this.t('DESK_DECREASING_HEIGHT_SMALL_MESSAGE', this.t('REQUEST_REPROMPT'))); },
                    (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
            );
            
        } else if(this.event.request.intent.slots.DescriptiveHeightLarge.value) {
            this.attributes['deskHeightState'] = 'CUSTOM';
            firebase.database().ref('desk').child('action').update({
                    command:    'LOWER', 
                    status:     'EXECUTE', 
                    type:       'QUALITATIVE',
                    value:      'LARGE'
                }).then(
                    ()      => { this.emit(':ask', this.t('DESK_DECREASING_HEIGHT_MESSAGE', this.t('REQUEST_REPROMPT'))); },
                    (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
                );

        } else if(this.event.request.intent.slots.BottomHeight.value) {
            if(this.attributes['deskHeightState'] === 'BOTTOM') {
                this.emit(':ask', this.t('DESK_ALREADY_BOTTOM_HEIGHT_MESSAGE', this.t('REQUEST_REPROMPT')));
            } else {
                this.attributes['deskHeightState'] = 'BOTTOM';
                firebase.database().ref('desk').child('action').update({
                    command:    'LOWER', 
                    status:     'EXECUTE', 
                    type:       'ORDINAL',
                    value:      'BOTTOM'
                }).then(
                    ()      => { this.emit(':ask', this.t('DESK_BOTTOM_HEIGHT_MESSAGE', this.t('REQUEST_REPROMPT'))); },
                    (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
                );
                
            }
        } else {
            this.attributes['deskHeightState'] = 'CUSTOM';
            firebase.database().ref('desk').child('action').update({
                    command:    'LOWER', 
                    status:     'EXECUTE', 
                    type:       'QUALITATIVE',
                    value:      'SMALL'
            }).then(
                    ()      => { this.emit(':ask', this.t('DESK_DECREASING_HEIGHT_SMALL_MESSAGE', this.t('REQUEST_REPROMPT'))); },
                    (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
            );
        }
    },
    'DeskSetMidHeightIntent': function() {
        if(this.event.request.intent.slots.MidHeight.value) {
            if(this.attributes['deskHeightState'] === 'MIDDLE') {
                this.emit(':ask', this.t('DESK_ALREADY_MID_HEIGHT_MESSAGE', this.t('REQUEST_REPROMPT')));
            } else {
                this.attributes['deskHeightState'] = 'MIDDLE';
                firebase.database().ref('desk').child('action').update({
                    command:    'RAISE', 
                    status:     'EXECUTE', 
                    type:       'ORDINAL',
                    value:      'MIDDLE'
                }).then(
                    ()      => { this.emit(':ask', this.t('DESK_MID_HEIGHT_MESSAGE', this.t('REQUEST_REPROMPT'))); },
                    (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
                );
            }
        }
    },
    'DeskLampOnOffIntent': function() {
        if(this.event.request.intent.slots.DeskLampState.value) {
            var command = this.event.request.intent.slots.DeskLampState.value.toUpperCase()
            var value = (command === 'ON') ? 'HIGH': 'LOW';
            firebase.database().ref('deskLamp').child('action').update({
                command:    command, 
                status:     'EXECUTE', 
                type:       'ORDINAL',
                value:      value
            }).then(
                ()      => { this.emit(':ask', this.t('DESK_LAMP_ON_OFF', command, this.t('REQUEST_REPROMPT'))); },
                (err)   => { this.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
            );
        }
    },
    'AMAZON.NoIntent': function() {
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'SessionEndedRequest': function() {
        this.attributes['endedSessionCount'] += 1;
        // this.emit(':saveState', true);
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_REPROMPT'));
    },
    'Unhandled': function() {
        this.emit(':ask', this.t('REPEAT_MESSAGE'), this.t('HELP_REPROMPT'));
    }
});

var deskConfigHandlers = Alexa.CreateStateHandler(states.DESKCONFIGMODE, {
    'NewSession': function() {
        // this.handler.state = '';
        // this.emitWithState('NewSession');
        this.emit('NewSession');
    },
    'GetHeightIntent': function() {
        var feet = parseInt(this.event.request.intent.slots.feetHeight.value);
        var inches = (typeof this.event.request.intent.slots.inchesHeight.value === 'undefined') ? 
            0 : this.event.request.intent.slots.inchesHeight.value;

        if(inches == 0) {
            this.emit(':ask', this.t('VERIFY_HEIGHT_FEET', feet));
        } else {
            this.emit(':ask', this.t('VERIFY_HEIGHT_FEET_INCHES', feet, inches));
        }
    },
    'AMAZON.YesIntent': function() {
        // https://notsitting.com/calculator/
        this.handler.state = states.STARTMODE;
        var goalDeskHeight = 100;

        // firebase.database().ref('smartdeskState')
        //      .child('status')
        //      .set('EXECUTING')
        //      .then(
        //          ()      => { this.emit(':ask', this.t('DESK_CONFIG_COMPLETE_PROMPT', deskHeight)); },
        //          (err)   => { this.emit(':tell', this.t('SOMETHING_WENT_WRONG_MESSAGE')); }
        //      );
        const lexa = this;
        firebase.database().ref('desk').once('value').then(function(snapshot) {
            var currentDeskHeight = snapshot.val()['currentHeight'];
            var command = (currentDeskHeight <= goalDeskHeight) ? 'RAISE' : 'LOWER';
            firebase.database().ref('desk').child('action').update({
                command:    command, 
                status:     'EXECUTE', 
                type:       'QUANTITATIVE',
                value:      goalDeskHeight
            }).then(
                ()      => { lexa.emit(':ask', lexa.t('DESK_CONFIG_COMPLETE_PROMPT', goalDeskHeight)); },
                (err)   => { lexa.emit(':tell', lexa.t('SOMETHING_WENT_WRONG_MESSAGE')); }
            );          
        });
    },
    'AMAZON.NoIntent': function() {
        this.emit(':ask', this.t('DESK_CONFIG_REPROMPT'));
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'SessionEndedRequest': function() {
        this.emit(':tell', this.t('GOODBYE_MESSAGE'));
    },
    'Unhandled': function() {
        this.emit(':ask', "Help I'm unhandled in Desk Config Handlers.");
    }
});
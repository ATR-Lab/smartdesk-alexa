const languageStrings = {
    'en-US': {
        translation: {
            SKILL_NAME: 'SmartDesk',
            WELCOME_MESSAGE: 'Hi! Welcome to your Smart Office. How can I help you?',
            WELCOME_REPROMPT: 'For instructions on what to say, please say help me.',
            HELP_MESSAGE: 'You can ask me to do things like, dim the office lights, lower the height of the desk, show your calendar appointments or you can just say exit... Now, what can I help you with?',
            HELP_REPROMPT: 'You can say things like, dim the office lights, lower the height of the desk, show your calendar appointments or you can just say exit... Now, what can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
            GOODBYE_MESSAGE: 'Ok, talk to you later!',
            REPEAT_MESSAGE: 'Can you say that again?',
            REQUEST_REPROMPT: 'Is there anything else I can do?',
            EXECUTING_TASK: 'Consider it done!',
            DESK_CONFIG_PROMPT: 'Lets configure your desk. What is your height in feet and inches?',
            DESK_CONFIG_REPROMPT: 'Sorry. Can you tell me again your height in feet and inches?',
            VERIFY_HEIGHT_FEET_INCHES: 'You said %s feet and %s inches. Correct?',
            VERIFY_HEIGHT_FEET: 'You said %s feet tall. Correct?',
            DESK_CONFIG_COMPLETE_PROMPT: 'According to your height. The ideal desk height is %s inches. I will go ahead and adjust the height. Is there anything else I can do for you?',
            DESK_INCREASING_HEIGHT_MESSAGE: 'Making your desk taller. %s',
            DESK_INCREASING_HEIGHT_SMALL_MESSAGE: 'Increasing the height just a bit. %s',
            DESK_TOP_HEIGHT_MESSAGE: 'Raising your desk to the top height. %s',
            DESK_ALREADY_TOP_HEIGHT_MESSAGE: 'Your desk is already at its highest. %s',
            DESK_MID_HEIGHT_MESSAGE: 'Setting your desk to mid height. %s',
            DESK_ALREADY_MID_HEIGHT_MESSAGE: 'Your desk is already at mid height. $s',
            DESK_DECREASING_HEIGHT_MESSAGE: 'Making your desk shorter. %s',
            DESK_DECREASING_HEIGHT_SMALL_MESSAGE: 'Lowering your desk just a bit. %s',
            DESK_BOTTOM_HEIGHT_MESSAGE: 'Lowering your desk to its lowest height. %s',
            DESK_ALREADY_BOTTOM_HEIGHT_MESSAGE: 'Your desk is already at bottom height %s',
            SOMETHING_WENT_WRONG_MESSAGE: 'Oops. Something went wrong. Lets try that again.'
        }
    }
};

module.exports = languageStrings;
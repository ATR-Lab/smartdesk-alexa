# SmartDesk Alexa Skill
> SmartDesk - A smarter more intuitive desk

This repository holds the Alexa skill used to communicate with the user and relay commands to office appliances such as a smart desk.

## Table of Contents
- [Dependencies](#dependencies)
- [Installation](#installation)
- [How to use](#how-to-use)
- [Development](#development)
- [References](#references)

## Dependencies

### NodeJS
There is a hard-dependency on NodeJS

### NPM Packages

You can see find the full list of NPM packages in the package.json file.

- [alexa-sdk](https://www.npmjs.com/package/alexa-sdk)
- [firebase](https://www.npmjs.com/package/firebase)

## Installation

```
# In the projec's director, type the following command:
$ npm install
```

## Deployment

```
STEP 1: Create an Amazon Developer account
https://developer.amazon.com/

STEP 2: Head over to the Alexa Skills Kit landing page and 'Start a Skill'
https://developer.amazon.com/alexa-skills-kit/

STEP 3: Start creating the skill... add a name etc.

STEP 4: 
Copy and paste the Intent Schema, found in intentSchema.json
Copy and paste the utterances, found in utterances.txt
Copy and paste the custome slot values, found in slotValues.txt


STEP 5: Create a lambda function where the JS code will be executed
https://console.aws.amazon.com/lambda

STEP 6: Zip the following files
- node_modules folder
- index.js
- config.js
- smartdesk-service.json

STEP 7: Upload the zipped file into Lambda
```

## Development

### Overview

> We say that every appliance within a smart environment has a state, and can execute actions which in turn change the environment.
> For example, smart-office lights can be in a state of ```ON``` or ```OFF```. 
> And a user can request the lights to be dimmed to a brightness of 50% - hence the lights are executing a quantitative action, which changes the environment by making it darker/less bright. 

> The time it takes for the appliance to process such actions depends on the state of the appliance or it's functional requirements. For example, the user might request that the lights be dimmed slowly. Hence, the execution of the action, on it's own, can vary. Each appliance can therefore provide the system (or us) with a status of the requested action. An appliance can start to  ```EXECUTE``` an action, be ```EXECUTING``` an action, or have ```COMPLETED``` an action.

> Together, these appliances encompass a smart environment, in this case a smart office. As an entity, the smart office can orchestrate various actions requested by the user. For example, the user can request for the office to be turned ```ON``` - signifying that all the appliances should be turned on or atleast returned to a known or pre-configured state. The latter could mean, opening window curtains, turning on the AC to 70 degrees Fahrenheit, and perhaps readjusting the desk to a height suitable enough to sit and have breakfast on.

> With the latter comments in mind, the smart environment can be thought of as a distributed entity that communicates through a messaging service. Like in most distributed systems or [peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer) applications, we implement what is known as a [heartbeat](https://en.wikipedia.org/wiki/Heartbeat_(computing)). The use of a heartbeat allows us to check wether an appliance is still functioning as expected (that it's heart still beating and is not dead).

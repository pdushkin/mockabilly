# Mockabilly

Mockabilly is a template-driven mock data generator.

It was built to be used with complete mock libraries that expect developers to define or extend models for generating mock data.

## Installation

* From npm:
``` bash
npm install --save-dev mockabilly
```

## How does it work?

Mockabilly uses a keyword library that generates mock data in the JSON object you are expecting. For example, assuming you have a Student model in your project and you want to mock it out, you might have the following in your mocks folder: 

**student.json**
``` json
{
    "id": "NumbersOne",
    "name": "WordsTwo",
    "email": "Email",
    "bio": "SentencesFive",
    "City": "WordsTwo",
    "State": "WordsOne",
    "Birthday": "Date"
}
```

Mockabilly will recognize the values you are using and generate the mock data for you. Below are the current options: 

| Value        | Output         |
| ------------- |:-------------:|
| Words[One, Two... Five]      | creates up to five words |
| Sentences[One, Two... Five]  | creates up to five sentences
| Numbers[One, Two... Nine]      | creates up to nine digit numbers      |
| Guid      | creates a random guid      |
| Email      | creates a random email      |
| TimestampUtc      | creates a UTC timestamp      |
| Date      | creates a date      |
| Boolean      | returns true or false      |
| options: (e.g. "cat\|\|dog\|\|mouse")      | returns one of the options (e.g. "cat")      |

## Tell mockabilly about your template

You have defined your student.json template, but how will mockabilly know where it is? Inside of your configuration file, export a mockTemplates object. Let's add student:

**config.js** 
```javascript
const teacher = require('./tests/mocks/teacher.json');
const student = require('./tests/mocks/student.json');

module.exports = {
    mockTemplates: {
        teacher,
        student,
    },
};
```

Great. We now have a model producing mock data and a way of locating it, how do we use it? In the below example, we are using the power of mockabilly to define our mock data in the powerful MirageJS mocking framework.


```javascript

import { Server, Model, Factory, Response } from 'miragejs';
import { buildMock } from 'mockabilly';
import config from '../config';

export function makeServer({ environment = 'development' } = {}) {
    let server = new Server({
        environment,
        models: {
            teacher: Model,
            student: Model
        },
        routes() { ... },
        factories: {
            student: Factory.extend(
                buildMock(config.mockTemplates['student'])),
            teacher: Factory.extend(
                buildMock(config.mockTemplates['teacher'])
            ),
        },
        seeds(server) {
            server.createList('student', 10);
            server.createList('teacher', 10);
        }
    });
});
```

Please feel free to reach out and let me know what you think.
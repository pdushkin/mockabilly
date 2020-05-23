import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});

function generateByType(key, type) {
    if (type === 'WordsOne') {
        return function() {
            return lorem.generateWords(1);
        };
    } else if (type === 'WordsTwo') {
        return function() {
            return lorem.generateWords(2);
        };
    } else if (type === 'WordsThree') {
        return function() {
            return lorem.generateWords(3);
        };
    } else if (type === 'WordsFour') {
        return function() {
            return lorem.generateWords(4);
        };
    } else if (type === 'WordsFive') {
        return function() {
            return lorem.generateWords(5);
        };
    } else if (type === 'SentencesOne') {
        return function() {
            return lorem.generateSentences(1);
        };
    } else if (type === 'SentencesTwo') {
        return function() {
            return lorem.generateSentences(1);
        };
    } else if (type === 'SentencesThree') {
        return function() {
            return lorem.generateSentences(1);
        };
    } else if (type === 'SentencesFour') {
        return function() {
            return lorem.generateSentences(1);
        };
    } else if (type === 'SentencesFive') {
        return function() {
            return lorem.generateSentences(1);
        };
    } else if (type === 'NumbersOne') {
        return function() {
            return getRandomInt(1);
        };
    } else if (type === 'NumbersTwo') {
        return function() {
            return getRandomInt(2);
        };
    } else if (type === 'NumbersThree') {
        return function() {
            return getRandomInt(3);
        };
    } else if (type === 'NumbersFour') {
        return function() {
            return getRandomInt(4);
        };
    } else if (type === 'NumbersFive') {
        return function() {
            return getRandomInt(5);
        };
    } else if (type === 'NumbersSix') {
        return function() {
            return getRandomInt(6);
        };
    } else if (type === 'NumbersSeven') {
        return function() {
            return getRandomInt(7);
        };
    } else if (type === 'NumbersEight') {
        return function() {
            return getRandomInt(8);
        };
    } else if (type === 'NumbersNine') {
        return function() {
            return getRandomInt(9);
        };
    } else if (type === 'Guid') {
        return function() {
            return guid();
        };
    } else if (type === 'Email') {
        return function() {
            return makeEmail();
        };
    } else if (type === 'TimestampUtc') {
        return function() {
            return timeInMillis();
        };
    } else if (type === 'RandomDate') {
        return function() {
            return randomDate(new Date(2012, 0, 1), new Date());
        };
    } else if (type === 'Boolean') {
        return function() {
            return randomOptionFromList('true||false');
        };
    } else {
        return function() {
            return randomOptionFromList(type);
        };
    }
}

function makeEmail() {
    var strValues = 'abcdefg12345';
    var strEmail = '';
    var strTmp;
    for (var i = 0; i < 10; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = '';
    strEmail = strEmail + '@';
    for (var j = 0; j < 8; j++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + '.com';
    return strEmail;
}

function randomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

function randomOptionFromList(conditions) {
    const textArray = conditions.split('||');
    var randomNumber = Math.floor(Math.random() * textArray.length);
    return textArray[randomNumber];
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function timeInMillis() {
    var d = new Date();
    return d.getMilliseconds();
}

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

function isArray(value) {
    return value && typeof value === 'object' && value.constructor === Array;
}

function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

function getRandomInt(n) {
    var add = 1,
        max = 12 - add;
    if (n > max) {
        return getRandomInt(max) + getRandomInt(n - max);
    }
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return ('' + number).substring(add);
}

function generateItem(key, itemTemplate) {
    if (isString(itemTemplate)) {
        return generateByType(key, itemTemplate);
    } else if (isObject(itemTemplate)) {
        let value = {};
        for (let key in itemTemplate) {
            value[key] = generateItem(key, itemTemplate[key]);
        }
        return value;
    } else if (isArray(itemTemplate)) {
        let value = [];
        for (let i = 0; i < getRandomInt(50); i++) {
            value.push(generateItem(key, itemTemplate[0]));
        }
        return value;
    }
}

function generateFromTemplate(template) {
    let value = {};
    for (let key in template) {
        value[key] = generateItem(key, template[key]);
    }
    return value;
}

export const buildMock = template => {
    return generateFromTemplate(template);
};
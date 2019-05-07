const path = require('path');
const fs = require('fs');

// languageModel intents
const directoryPath = path.join(__dirname, '..');
console.log(directoryPath)
fs.readdir(directoryPath+'/languageModelIntents', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    languageModelIntents = files.map(e => {
      return require(`${directoryPath}/languageModelIntents/${e}`)
    })
    fs.writeFileSync('languageModelIntents.json', JSON.stringify(languageModelIntents));
});

// languageModel types
fs.readdir(directoryPath+'/languageModelTypes', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    languageModelTypes = files.map(e => {
      return require(`${directoryPath}/languageModelTypes/${e}`)
    })
    fs.writeFileSync('languageModelTypes.json', JSON.stringify(languageModelTypes));
});

// dialog intents
fs.readdir(directoryPath+'/dialogIntents', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    dialogIntents = files.map(e => {
      return require(`${directoryPath}/dialogIntents/${e}`)
    })
    fs.writeFileSync('dialogIntents.json', JSON.stringify(dialogIntents));
});

// prompts
fs.readdir(directoryPath+'/prompts', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    prompts = files.filter(e => {
        return e !== '.DS_Store'
    }).map(e => {
      return require(`${directoryPath}/prompts/${e}`)
    })
    fs.writeFileSync('prompts.json', JSON.stringify(prompts));
});
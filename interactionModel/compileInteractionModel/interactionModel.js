const fs = require('fs')

// Make interaction interactionModel
const invocationName = 'pet match';
const languageModelIntents = require('./languageModelIntents.json')
const languageModelTypes = require('./languageModelTypes.json')
const dialogIntents = require('./dialogIntents.json')
const prompts = require('./prompts.json')
let intModel = {
  interactionModel: {
      languageModel: {
          invocationName: invocationName,
          intents: languageModelIntents,
          types: languageModelTypes
      },
      dialog: {
          intents: dialogIntents
      },
      prompts: prompts
  }
}

fs.writeFileSync('interactionModel.json', JSON.stringify(intModel));
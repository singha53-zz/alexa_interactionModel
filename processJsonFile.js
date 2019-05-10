const fs = require('fs');
const enUS = require('./interactionModel/compileInteractionModel/interactionModel.json')


// Innvocation name
const invocationName = enUS.interactionModel.languageModel.invocationName

// Intents
const languageModelIntents = enUS.interactionModel.languageModel.intents.map(function(i, ind){
  return {"name": ind,
  "children": Object.keys(i).map(function(j){
    let children = j === "slots" ? i[j].map(function(k, ind){
      return {"name": ind,
      "children": [{"name": `name: ${k.name}`}, {"name": `type: ${k.type}`}]}
    }) : [{"name": i[j]}]
    return {"name": j, "children": children}
  })
  }
})

// Types
const languageModelTypes = enUS.interactionModel.languageModel.types.map(function(i, ind){
  return {"name": ind,
  "children": [{"name": "name", "children": [{"name": i.name}]}, 
  {"name": "values", "children": i.values.map(function(j){
    console.log(j.name.value)
      return {"name": j.name.value}
    })},
    {"name": "synonyms", "children": !isEmpty(i.values.synonyms) ? [] : i.values.map(function(j){
      return {"name": JSON.stringify(j.name.synonyms) }
    })}
    ]}
})
console.log(languageModelTypes)

// Dialog
const dialogSlots = enUS.interactionModel.dialog.intents[0].slots.map(function(i, ind) {
  let elicitIntent = !isEmpty(i.prompts) ?
  [{"name": "elicitation", "children": [{"name": i.prompts.elicitation}]}] :
  [{}]
  return {"name": ind,
  "children": [{"name": "name", "children": [{"name": i.name}]}, 
  {"name": "type", "children": [{"name": i.type}]},
  {"name": "confirmationRequired", "children": [{"name": i.confirmationRequired}]},
  {"name": "elicitationRequired", "children": [{"name": i.elicitationRequired}]},
  {"name": "prompts", "children": elicitIntent }]}
})

// prompts
const prompts = enUS.interactionModel.prompts.map(function(i, ind){
  return {"name": ind,
  "children": [{"name": "id", "children": [{"name": i.id}]}, {"name": "variations", "children": i.variations.map(function(j, ind2){
    console.log(j)
    return {"name": ind2,
      "children": [{"name": `type: ${j.type}`}, {"name": `value: ${j.value}`}]}
  })}]}
})

const treeData =
  {
    "name": 'interactionModel',
    "children": [
      { 
        "name": 'languageModel',
        "children": [
          { "name": 'invocationName',
          "children": [
            {"name": invocationName}] },
          { "name": 'intents',
          "children": languageModelIntents },
          { "name": 'types',
          "children": languageModelTypes }
        ]
      },
      { "name": 'dialog',
      "children": [
        {"name": "intents",
        "children": [
          {"name": "name",
          "children": [{"name": enUS.interactionModel.dialog.intents[0].name }]},
          {"name": "confirmationRequired",
          "children": [{"name": enUS.interactionModel.dialog.intents[0].confirmationRequired }]},
          {"name": "prompts",
          "children": [{"name": JSON.stringify(enUS.interactionModel.dialog.intents[0].prompts)}]},
          {"name": "slots",
          "children": dialogSlots }
        ]}
      ]},
      { "name": 'prompts', "children": prompts}
    ]
  };

fs.writeFileSync('data.json', JSON.stringify(treeData));

// helper functions
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
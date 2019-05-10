const fs = require('fs')
const _ = require('underscore')
const enUS = require('./interactionModel.json')
const nlp = require('compromise')

// sentences
const sentences = enUS.interactionModel.languageModel.intents[3].samples.map(function(i){
  console.log(i)
  return i.replace(/{/g,'').replace(/}/g,'').replace(/_/g,'').split(' ')
})

// map variables (slots) to values
let types = enUS.interactionModel.languageModel.types
let typesValues = enUS.interactionModel.languageModel.types[5].values.map(function(i){
  return i.name.value
})
let terms = {}
for(i=0; i<types.length; i++){
  terms[types[i].name.replace('Type', '')] = types[i].values.map(function(i){
  return i.name.value
})
}

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

let first = cartesian(terms.IWant, terms.article, ['dog']).map(function(i){
  return i.join(' ')
})
console.log(first)
console.log(first.map(i => {
  return nlp(i).terms().data().map(e => {
    return e.bestTag
  })
}))
console.log(nlp('i saw three ships go sailing by on christmas eve').nouns().out('array'))


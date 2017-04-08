import Ember from 'ember';
import computedFilter from "ember-computed-filter/computed-filter";

export default Ember.Controller.extend({
  name: "Karan",
  count: 0,
  lastUpdated: Ember.computed('name', function(){
    return new Date();
  }),
  nameChange: Ember.observer('name', function(){
    this.incrementProperty('count');
  }),
  trimmedName: computedFilter("name", function(value){
    return value.trim();
  }),
  trimmedCount: 0,
  lastTrimmedUpdated: Ember.computed('trimmedName', function(){
    return new Date();
  }),
  trimmedNameChange: Ember.observer('trimmedName', function(){
    this.incrementProperty('trimmedCount');
  })
});

import { test, module } from 'ember-qunit';
import Ember from 'ember';
import computedFilter from "ember-computed-filter/computed-filter";

module('computedFilter');

var Hippo = Ember.Object.extend({
  name: "Karan",
  trimmedName: computedFilter("name", function(value){
    return value.trim();
  })
});

test("it applies a filter", function(assert){
  var hippo = Hippo.create({name: "Foo"});
  assert.equal(hippo.get('trimmedName'), "Foo");

  hippo.set("name", "Bar");
  assert.equal(hippo.get("trimmedName"), "Bar");

  hippo.set("name", "  Baz  ");
  assert.equal(hippo.get("trimmedName"), "Baz");

});

test("observers are fired on significant change", function(assert){
  var hippo = Hippo.create({name: "Lorem"});
  assert.equal(hippo.get('trimmedName'), "Lorem");

  var observedCount = 0;
  hippo.addObserver("trimmedName", function(){
    observedCount++;
  });

  hippo.set("name", "Lorem");
  assert.equal(observedCount, 0, "the observer does not fire when value does not change");

  hippo.set("name", " Lorem ");
  assert.equal(observedCount, 0, "the observer does not fire when value does not change significantly");

  hippo.set("name", "Ipsum");
  assert.equal(observedCount, 1, "the observer does not fire when value changes significantly");
});

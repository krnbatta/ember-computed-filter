import Ember from 'ember';

export default function(dependentKey, filter){
  return Ember.computed(function(key){
    var observerKey = key + "_hasObserver";
    var lastValueKey = key + "_lastValue";

    var firstRun = !this[observerKey];
    if(firstRun){
      var value = filter(Ember.get(this, dependentKey));

      this[observerKey] = true;
      this[lastValueKey] = value;

      this.addObserver(dependentKey, function(){
        var newValue = filter(Ember.get(this, dependentKey));
        var oldValue = this[lastValueKey];

        if(newValue !== oldValue){
          this[lastValueKey] = newValue;
          this.notifyPropertyChange(key);
        }
      });
      return value;
    }
    else{
      return this[lastValueKey];
    }
  });
}

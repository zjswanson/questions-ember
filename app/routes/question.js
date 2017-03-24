import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash ({
      question: this.store.findRecord('question', params.question_id, {include: 'answers'})
    });
  },
  actions: {
    addAnswer(params) {
      var newAnswer = this.store.createRecord('answer', params);
      var question = params.question;
      question.get('answers').addObject(newAnswer);
      newAnswer.save().then(function(){
        return question.save();
      });
      this.transitionToRoute('question', question);
    }
  }

});

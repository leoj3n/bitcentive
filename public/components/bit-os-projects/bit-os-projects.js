import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './bit-os-projects.less';
import template from './bit-os-projects.stache';
import OSProjectModel from '../../models/os-project';
import ContributionMonthModel from '../../models/contribution-month';

export const ViewModel = DefineMap.extend({
    contributionMonth: {
        Value: ContributionMonthModel
    },
    contributionMonthPromise: {},
    logIt: function(it) {
        console.log('logging');
        console.log(it);
    },
    toggle: function(monthlyOSProject) {
        console.log("toggle");
        monthlyOSProject.commissioned = !monthlyOSProject.commissioned;

        this.contributionMonth.save().then(function() {
            console.log(monthlyOSProject.commissioned);
        }, function(err) {
            console.log('err', err);
        });
    },
    total: function(monthlyOSProject) {
        return 0;
    },
    adding: {
      type: 'boolean',
      value: false
    },
    newOSProjectName: '',
    toggleAddNewProject: function() {
      this.adding = !this.adding;
    },
    addNewProject: function() {
      console.log("Creating a new OS Project " + this.newOSProjectName);
      let newOSProject = new OSProjectModel({
        name: this.newOSProjectName
      });

      this.contributionMonth.monthlyOSProjects.push(newOSProject);

      this.contributionMonth.save().then(function(){
        console.log("saved");
      });

    }
});


export default Component.extend({
  tag: 'bit-os-projects',
  ViewModel: ViewModel,
  template: template
});

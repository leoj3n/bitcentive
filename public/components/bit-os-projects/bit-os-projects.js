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
    allOSProjects: {
      get: function() {
        return OSProjectModel.getList();
      }
    },
    logIt: function() {
        console.log('logging', arguments);
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
        this.newOSProjectName = '';
        this.adding = !this.adding;
    },
    addNewProject: function(ev) {
        console.log("Creating a new OS Project " + this.newOSProjectName);
        ev.preventDefault();
        let newOSProject = new OSProjectModel({
            name: this.newOSProjectName
        });
        newOSProject.save().then(function(OSProject) {
            this.toggleAddNewProject();
            this.contributionMonth.addNewMonthlyOSProject(OSProject);
        }.bind(this), function() {
            console.error("failed", arguments);
        });
    },
    existingOSProject: 'string',
    addingNewOSProject: {
      type: "boolean",
      value: true
    },
    toggleInput: function() {
      if(this.existingOSProject === "__new__") {
        this.addingNewOSProject = true;
      }
      else {
        this.addingNewOSProject = false;
      }
      console.log("existingOSProject", this.existingOSProject);
    }
});

export default Component.extend({
    tag: 'bit-os-projects',
    ViewModel: ViewModel,
    template: template
});
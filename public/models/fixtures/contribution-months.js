import fixture from 'can-fixture';
import json from './contribution-months.json';
// Can't import algebra from the model since it will initiate connection.
//import { algebra } from '../contribution-month';
import { contributionMonthAlgebra as algebra } from '../algebras';

export var store = fixture.store(json, algebra);

export default function(mockServer){
  mockServer.onFeathersService("api/contribution_months", store, {id: "_id"});
}

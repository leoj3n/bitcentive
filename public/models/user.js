import QueryLogic from 'can-query-logic';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import feathersClient from './feathers-client';
import superModel from '../lib/super-model';
import feathersQuery from './feathers-query';

var User = DefineMap.extend("User", {
	_id: {type: "string", identity: true},
	email: "string",
	password: "string",
	/**
	 * @property {Boolean} isAdmin
	 *
	 * Whether the user has admin rights.
	 */
	isAdmin: {
		type: "boolean",
		default: false
	},
	/**
	 * @property {Any} github
	 *
	 * When a user authenticates against github, we store some public
	 * data that's passed back.
	 */
	github: 'any',
	/**
	 * @property {String} authProvider
	 *
	 * Which service did the user authenticate against.
	 */
	get authProvider() {
		return this.github && 'github';
	},
	/**
	 * @Property {Map} profile
	 *
	 * User profile info provided by the auth provider.
	 */
	get profile() {
		return this.authProvider && this.get(this.authProvider).profile;
	},
	/**
	 * @property {String} profileUrl
	 *
	 * The user's profile page back at the auth provider.
	 */
	get profileUrl() {
		return this.profile && this.profile.profileUrl;
	},
	/**
	 * @property {String} photoUrl
	 *
	 * A URL to a user avatar.
	 */
	get photoUrl() {
		return this.profile && this.profile.photos && this.profile.photos[0] && this.profile.photos[0].value;
	},
	/**
	 * @property {String} email
	 *
	 * An email address for the user.
	 */
	get email() {
		return this.profile && this.profile.emails && this.profile.emails[0] && this.profile.emails[0].value;
	},
	/**
	 * @property {String} name
	 *
	 * The user's name -- appropriate for display.
	 */
	get name() {
		return this.profile && this.profile.displayName;
	}
});

User.List = DefineList.extend("UserList", {
	"#": User
});

User.connection = superModel({
	Map: User,
	List: User.List,
	feathersService: feathersClient.service("/api/users"),
	name: "users",
    queryLogic: new QueryLogic(User, feathersQuery)
});


export default User;

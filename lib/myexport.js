/*!
 * some pomelo function promisefy. 
 */

/**
 * Module dependencies.
 */
var Promise = require('promise');
var sessionService = require('./common/service/sessionService.js');
var backendSessionService = require('./common/service/backendSessionService.js');
var ChannelRemote = require('./common/remote/frontend/channelRemote.js');

var MyExport = module.exports = {};

MyExport.init = function(app){
	this.app = app;
	var self = this;
	/**
	* sessionService
	*/
	self.sessionService = {};
	self.sessionService.bind = Promise.denodeify(sessionService.prototype.bind);
	self.sessionService.unbind = Promise.denodeify(sessionService.prototype.unbind);
	self.sessionService.import = Promise.denodeify(sessionService.prototype.import);
	self.sessionService.importAll = Promise.denodeify(sessionService.prototype.importAll);
	self.sessionService.kick = Promise.denodeify(sessionService.prototype.kick);
	self.sessionService.kickBySessionId = Promise.denodeify(sessionService.prototype.kickBySessionId);
	
	
	/**
	* frontendSession
	*/
	self.frontendSession = {};
	self.frontendSession.push = Promise.denodeify(sessionService._export_frontend_session_.prototype.push);
	self.frontendSession.pushAll = Promise.denodeify(sessionService._export_frontend_session_.prototype.pushAll);
	self.frontendSession.bind = Promise.denodeify(sessionService._export_frontend_session_.prototype.bind);
	self.frontendSession.unbind = Promise.denodeify(sessionService._export_frontend_session_.prototype.unbind);
	
	
	/**
	* backendSession
	*/
    self.backendSession = {};
    self.backendSession.push = Promise.denodeify(backendSessionService._export_backend_session_.prototype.push);
	self.backendSession.pushAll = Promise.denodeify(backendSessionService._export_backend_session_.prototype.pushAll);
	
	/**
	* export
	*/
	self.utils = require('./util/utils.js');
	self.countDownLatch = require('./util/countDownLatch.js');
	self.channelRemote = new ChannelRemote(self.app);
}
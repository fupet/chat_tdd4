/**
 * @module views/Chat
 */

var Backbone = require('backbone'),

	/**
	 * @class
	 * @extends external:Backbone.Marionette.View
	 */
	Chat = Backbone.Marionette.View.extend(
		/** @lends module:views/Chat~Chat.prototype */
		{
			ui : {
				sendBtn    : '#chat-send',
				chatInput  : '#chat-input',
				chatThread : '#chat-thread'
			},

			events : {
				'click @ui.sendBtn' : 'onSendBtnClick'
			},

			/**
			 * Resets the elements in the scope.
			 */
			initialize : function() {
				Backbone.Marionette.View.prototype.initialize.apply(this, arguments);
				this.$(this.ui.chatInput).val('');
				this.$(this.ui.chatThread).empty();
			},

			/**
			 * Checks the given value to be string and the length is between 1 and 40 characters.
			 * @param {string} value   The string to be validated by the method.
			 * @returns {boolean}
			 */
			validateValue  : function(value) {
				return (typeof value === 'string' && value.length > 0 && value.length < 41);
			},

			/**
			 * Triggered on send button click. Validates the input message,
			 * then passes through to be appended to the tread.
			 * After it empties the input.
			 * @returns void;
			 */
			onSendBtnClick : function() {
				var $input = this.$(this.ui.chatInput);
				if (this.validateValue($input.val())) {
					this._appendMessageToThread($input.val());
					$input.val('');
				}
			},

			/**
			 * It appends the given string to the thread.
			 * @param {string} message   The string to be inserted to the tread.
			 * @private
			 */
			_appendMessageToThread : function(message) {
				this.$(this.ui.chatThread).append('<li>' + message + '</li>');
			}
		}
	);
/**
 * exports Chat
 */
module.exports = Chat;

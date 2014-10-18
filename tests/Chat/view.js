var assert = require('chai').assert,
	sinon = require('sinon'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	testContent = require('./content/testcontent.html'),

	Chat = require('../../libs/Chat/view');

suite('testing chat view', function() {
	var dataProvider = [
		'0',
		'abc',
		'123',
		'hellohellohe llohellohe llohellohellohel'
	];

	setup(function() {
		Backbone.$('#sandbox').html(testContent);
		Chat.prototype.onSendBtnClick = sinon.spy(Chat.prototype, 'onSendBtnClick');

		this.chat = new Chat({el : '#custom-chat'});
	});

	teardown(function() {
		Chat.prototype.onSendBtnClick.restore();
	});

	_.each(dataProvider, function(item) {
		test('test validate value "' + item + '"', function() {
			assert.isTrue(this.chat.validateValue(item), 'input value should be between 1 and 40 characters');
		});
	});

	test('test if on submit click triggers the send method', function() {
		this.chat.$(this.chat.ui.sendBtn).click();
		assert.isTrue(this.chat.onSendBtnClick.calledOnce, 'the button is not yet clicked');
	});

	test('test if the message sent and input emptied successfully', function() {
		var input = this.chat.$(this.chat.ui.chatInput).get(0);
		input.value = dataProvider[2];
		this.chat.$(this.chat.ui.sendBtn).click();
		assert.lengthOf(input.value, 0, 'the input not empty');
		assert.lengthOf(this.chat.$(this.chat.ui.chatThread + ' > li'), 1, 'the new thread line not inserted');
	});
});

(this['webpackJsonptrack-mail-2019-user'] =
	this['webpackJsonptrack-mail-2019-user'] || []).push([
	[0],
	[
		,
		,
		,
		,
		,
		,
		,
		,
		,
		function(e, a, t) {
			e.exports = t(22);
		},
		,
		,
		,
		,
		function(e, a, t) {},
		function(e, a, t) {},
		function(e, a, t) {},
		function(e, a, t) {},
		function(e, a, t) {},
		function(e, a, t) {},
		function(e, a, t) {},
		function(e, a, t) {},
		function(e, a, t) {
			'use strict';
			t.r(a);
			var n = t(0),
				s = t.n(n),
				r = t(8);
			t(14),
				t(15),
				t(16),
				t(17),
				t(18),
				t(19),
				t(20),
				t(21),
				Boolean(
					'localhost' === window.location.hostname ||
						'[::1]' === window.location.hostname ||
						window.location.hostname.match(
							/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
						),
				);
			var l = {
					appName: 'messanger',
					firstChatName: 'localhost',
					authorName: 'localhost',
					messageInputText:
						'\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435',
					sendMessageText: 'Send message',
					chatName:
						'\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435',
				},
				c = t(2),
				i = t(3),
				m = t(5),
				u = t(4),
				h = t(1),
				o = t(6);
			var d = function(e) {
				var a = e.chatArray;
				return s.a.createElement(
					'div',
					{ className: 'chats-area' },
					a.map(function(e, a) {
						return s.a.createElement('li', { key: e.props.index }, e.render());
					}),
				);
			};
			var v = function(e) {
				var a = e.onChange,
					t = e.onKeyPress,
					n = e.onSubmit,
					r = e.value;
				return s.a.createElement('input', {
					className: 'chat-name-input',
					type: 'text',
					value: r,
					onChange: a,
					placeholder: l.chatName,
					onSubmit: n,
					onKeyPress: t,
				});
			};
			var p = function(e) {
				var a = e.name;
				return s.a.createElement(
					'div',
					{ className: 'chat-top-area' },
					s.a.createElement(
						'button',
						{
							className: 'chat-bars-button',
							type: 'button',
							onClick: null,
							label: 'bars',
						},
						s.a.createElement('i', { className: 'fa fa-bars' }),
					),
					s.a.createElement('p', { className: 'chat-top-name' }, a),
				);
			};
			var b = function(e) {
				var a = e.name,
					t = e.handleReturn;
				return s.a.createElement(
					'div',
					{ className: 'message-top-area' },
					s.a.createElement(
						'button',
						{ className: 'chat-deactivation', type: 'button', onClick: t },
						s.a.createElement('i', { className: 'fa fa-chevron-left' }),
					),
					s.a.createElement('p', { className: 'message-top-name' }, a),
				);
			};
			function f(e) {
				var a = e.number,
					t = e.date,
					n = e.author,
					r = e.text;
				return s.a.createElement(
					'div',
					{ className: 'message-item-div', index: a },
					s.a.createElement('p', { className: 'message-item-text' }, r),
					s.a.createElement('p', { className: 'message-item-author' }, n),
					s.a.createElement(
						'p',
						{ className: 'message-item-date' },
						new Date(t).toLocaleString(),
					),
				);
			}
			f.defaultProps = { author: l.authorName };
			var y = f;
			var g = function(e) {
				var a = e.messageArray;
				return s.a.createElement(
					'div',
					{ className: 'message-history-list' },
					a.map(function(e, a) {
						return s.a.createElement(
							'li',
							{ key: e.number },
							s.a.createElement(y, {
								author: e.author,
								date: e.date,
								number: e.number,
								text: e.text,
							}),
						);
					}),
				);
			};
			var E = function(e) {
					var a = e.onChange,
						t = e.onKeyPress,
						n = e.onSubmit,
						r = e.value;
					return s.a.createElement('input', {
						type: 'text',
						className: 'message-form-input',
						placeholder: l.messageInputText,
						onChange: a,
						value: r,
						onSubmit: n,
						onKeyPress: t,
					});
				},
				C = (function(e) {
					function a(e) {
						var t;
						return (
							Object(c.a)(this, a),
							((t = Object(m.a)(this, Object(u.a)(a).call(this, e))).state = {
								input: '',
							}),
							(t.handleButtonClick = t.handleButtonClick.bind(Object(h.a)(t))),
							(t.handleChange = t.handleChange.bind(Object(h.a)(t))),
							(t.handleKeyPress = t.handleKeyPress.bind(Object(h.a)(t))),
							(t.handleSubmit = t.handleSubmit.bind(Object(h.a)(t))),
							t
						);
					}
					return (
						Object(o.a)(a, e),
						Object(i.a)(a, [
							{
								key: 'handleChange',
								value: function(e) {
									this.setState({ input: e.target.value });
								},
							},
							{
								key: 'handleSubmit',
								value: function(e) {
									e.preventDefault();
									var a = this.state.input,
										t = this.props,
										n = t.save,
										s = t.appendMessage;
									'' !== a &&
										(s(a, l.authorName, new Date().valueOf()),
										this.setState({ input: '' }),
										n());
								},
							},
							{
								key: 'handleKeyPress',
								value: function(e) {
									'Enter' === e.key &&
										(e.preventDefault(),
										this.handleSubmit(new Event('submit', { cancelable: !0 })));
								},
							},
							{
								key: 'handleButtonClick',
								value: function() {
									this.handleSubmit(new Event('submit', { cancelable: !0 }));
								},
							},
							{
								key: 'render',
								value: function() {
									var e = this.props,
										a = e.name,
										t = e.handleReturn,
										n = e.messageArray,
										r = this.state.input;
									return s.a.createElement(
										'div',
										{ className: 'message-form-wrap' },
										s.a.createElement(
											'div',
											{ className: 'message-form-head' },
											s.a.createElement(b, { name: a, handleReturn: t }),
										),
										s.a.createElement(
											'div',
											{ className: 'wrap-history' },
											s.a.createElement(g, {
												className: 'message-history',
												chatName: a,
												messageArray: n,
											}),
										),
										s.a.createElement(
											'div',
											{ className: 'message-sending-form' },
											s.a.createElement(
												'form',
												{ className: 'message-form' },
												s.a.createElement(E, {
													name: 'message-text',
													value: r,
													onChange: this.handleChange,
													onSubmit: this.handleSubmit,
													onKeyPress: this.handleKeyPress,
												}),
											),
											s.a.createElement(
												'button',
												{
													className: 'message-button',
													type: 'submit',
													onClick: this.handleButtonClick,
												},
												l.sendMessageText,
											),
										),
									);
								},
							},
						]),
						a
					);
				})(s.a.Component),
				k = (function(e) {
					function a(e) {
						var t;
						Object(c.a)(this, a),
							(t = Object(m.a)(this, Object(u.a)(a).call(this, e)));
						var n = e.name,
							r = e.save,
							l = e.messageArray,
							i = e.handleReturn;
						return (
							(t.appendMessage = t.appendMessage.bind(Object(h.a)(t))),
							(t.messageForm = s.a.createElement(C, {
								name: n,
								messageArray: l,
								handleReturn: i,
								save: r,
								appendMessage: t.appendMessage,
							})),
							t
						);
					}
					return (
						Object(o.a)(a, e),
						Object(i.a)(a, [
							{
								key: 'appendMessage',
								value: function(e, a, t) {
									var n = this.props.messageArray;
									n.push({
										number: n.length,
										text: e,
										author: a,
										date: t || new Date().valueOf(),
									});
								},
							},
							{
								key: 'render',
								value: function() {
									var e = this.props,
										a = e.index,
										t = e.name,
										n = e.handleChatClick;
									return s.a.createElement(
										'div',
										{ className: 'chat-list-item', index: a },
										s.a.createElement(
											'div',
											{ className: 'chat-item-text' },
											s.a.createElement(
												'p',
												{ className: 'chat-item-name' },
												t,
											),
										),
										s.a.createElement(
											'button',
											{
												className: 'chat-messages-button',
												type: 'button',
												index: a,
												onClick: n,
											},
											s.a.createElement('i', {
												className: 'fa fa-chevron-right',
												index: a,
											}),
										),
									);
								},
							},
						]),
						a
					);
				})(s.a.Component),
				N = (function(e) {
					function a(e) {
						var t;
						Object(c.a)(this, a),
							(t = Object(m.a)(this, Object(u.a)(a).call(this, e)));
						var n = e.startState,
							s = JSON.parse(n);
						if (
							((t.handleReturn = t.handleReturn.bind(Object(h.a)(t))),
							(t.save = t.save.bind(Object(h.a)(t))),
							(t.handleButtonClick = t.handleButtonClick.bind(Object(h.a)(t))),
							(t.handleChatClick = t.handleChatClick.bind(Object(h.a)(t))),
							(t.handleInputChange = t.handleInputChange.bind(Object(h.a)(t))),
							(t.handleKeyPress = t.handleKeyPress.bind(Object(h.a)(t))),
							(t.handleSubmit = t.handleSubmit.bind(Object(h.a)(t))),
							(t.state = { chatArray: [], input: '', screen: 'main' }),
							null != s)
						) {
							var r = t.state.chatArray,
								l = !0,
								i = !1,
								o = void 0;
							try {
								for (
									var d, v = s.chatArray[Symbol.iterator]();
									!(l = (d = v.next()).done);
									l = !0
								) {
									var p = d.value;
									(p.props.handleReturn = t.handleReturn),
										(p.props.save = t.save),
										(p.props.handleChatClick = t.handleChatClick),
										r.push(new k(p.props));
								}
							} catch (b) {
								(i = !0), (o = b);
							} finally {
								try {
									l || null == v.return || v.return();
								} finally {
									if (i) throw o;
								}
							}
						}
						return t;
					}
					return (
						Object(o.a)(a, e),
						Object(i.a)(a, [
							{
								key: 'save',
								value: function() {
									var e = JSON.stringify(this.state);
									localStorage.setItem(l.appName, e);
								},
							},
							{
								key: 'handleReturn',
								value: function() {
									this.setState({ screen: 'main' });
								},
							},
							{
								key: 'handleInputChange',
								value: function(e) {
									this.setState({ input: e.target.value });
								},
							},
							{
								key: 'handleSubmit',
								value: function(e) {
									e.preventDefault();
									var a = this.state,
										t = a.input,
										n = a.chatArray;
									if ('' !== t) {
										var s = !0,
											r = !1,
											l = void 0;
										try {
											for (
												var c, i = n[Symbol.iterator]();
												!(s = (c = i.next()).done);
												s = !0
											) {
												if (c.value.name === t) return;
											}
										} catch (m) {
											(r = !0), (l = m);
										} finally {
											try {
												s || null == i.return || i.return();
											} finally {
												if (r) throw l;
											}
										}
										this.createChat(t),
											this.setState({ input: '' }),
											this.save();
									}
								},
							},
							{
								key: 'handleKeyPress',
								value: function(e) {
									'Enter' === e.key &&
										(e.preventDefault(),
										this.handleSubmit(new Event('submit', { cancelable: !0 })));
								},
							},
							{
								key: 'handleButtonClick',
								value: function() {
									this.handleSubmit(new Event('submit', { cancelable: !0 }));
								},
							},
							{
								key: 'handleChatClick',
								value: function(e) {
									var a = e.target.getAttribute('index');
									this.setState({ screen: a });
								},
							},
							{
								key: 'createChat',
								value: function(e) {
									var a = this.state.chatArray;
									a.push(
										new k({
											name: e,
											index: a.length,
											handleReturn: this.handleReturn,
											save: this.save,
											handleChatClick: this.handleChatClick,
											messageArray: [],
										}),
									);
								},
							},
							{
								key: 'render',
								value: function() {
									var e = this.state,
										a = e.screen,
										t = e.chatArray,
										n = e.input,
										r = this.props.name;
									return 'main' === a
										? s.a.createElement(
												'div',
												{ className: 'chat-list-area' },
												s.a.createElement(
													'div',
													{ className: 'chat-list-head' },
													s.a.createElement(p, { name: r }),
												),
												s.a.createElement(
													'div',
													{ className: 'wrap-chat-list' },
													s.a.createElement(d, { chatArray: t }),
													s.a.createElement(
														'div',
														{ className: 'chat-creation' },
														s.a.createElement(
															'form',
															{ className: 'chat-creation-form' },
															s.a.createElement(v, {
																value: n,
																onChange: this.handleInputChange,
																onSubmit: this.handleSubmit,
																onKeyPress: this.handleKeyPress,
															}),
														),
														s.a.createElement(
															'button',
															{
																className: 'chat-create',
																type: 'submit',
																onClick: this.handleButtonClick,
															},
															'+',
														),
													),
												),
										  )
										: t[a].messageForm;
								},
							},
						]),
						a
					);
				})(s.a.Component);
			N.defaultProps = { startState: null };
			var S = N;
			Object(r.render)(
				s.a.createElement(
					'div',
					{ className: 'app-container' },
					s.a.createElement('link', {
						rel: 'stylesheet',
						href:
							'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
					}),
					s.a.createElement(S, {
						name: 'localhost',
						startState: localStorage.getItem(l.appName),
					}),
				),
				document.getElementById('root'),
			),
				'serviceWorker' in navigator &&
					navigator.serviceWorker.ready.then(function(e) {
						e.unregister();
					});
		},
	],
	[[9, 1, 2]],
]);
//# sourceMappingURL=main.40d2021b.chunk.js.map

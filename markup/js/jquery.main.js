jQuery(function () {
	initMyTabs();
	initFormStaller();
});

function initMyTabs() {
	jQuery('.tabs-wrap').myTabs({
		onInit: function (self) {
			if (($(self.btn)[0].tagName === "SELECT")) {
				self.btn.on('change', function () {
					self.thisBtn = $(this);
					self.openTab();
				});
			}
		}
	});
};

function initFormStaller() {
	jQuery('select').styler();
};

//initOpenPanel
;(function ($) {
	function MyTabs(options) {
		this.options = $.extend({
			holder: '.tabs-wrap',
			btnWrap: '.btn-wrap',
			tabWrap: '.tab-wrap',
			btn: '.tab-btn',
			activeClass: 'active',
			allTabs: '.tab',
			selectTab: '',
			btnEvent: 'click.btn'
		}, options);
		this.init();
	};

	MyTabs.prototype = {
		init: function () {

			if (this.options.holder) {
				this.findElements();
				this.attachEvents();
			}
			this.options.onInit(this);
		},
		findElements: function () {
			this.holder = $(this.options.holder);
			this.btn = this.holder.find(this.options.btn);
			this.tabWrap = this.holder.find(this.options.tabWrap);
			this.allTabs = this.tabWrap.find(this.options.allTabs);
		},
		attachEvents: function () {
			var self = this;
			this.btn.on(this.options.btnEvent, function () {
				self.thisBtn = $(this);
				self.clickAction();
			});
		},
		openTab: function () {
			this.allTabs.removeClass(this.options.activeClass);
			this.tabWrap.find(this.thisBtn.attr('href') || this.thisBtn.val()).addClass(this.options.activeClass);
		},
		closeTab: function () {
			this.thisBtn.removeClass(this.options.activeClass);
			this.allTabs.removeClass(this.options.activeClass);
		},
		clickAction: function () {
			event.preventDefault();
			var self = this;
			var check = 'checked';
			var thisBtn = this.thisBtn;

			if (thisBtn.hasClass(self.options.activeClass)) {
				setTimeout(function () {
					thisBtn.prop(check, false);
				});
				thisBtn.removeClass(self.options.activeClass);
				self.closeTab();
			} else {
				self.btn.prop(check, false);
				setTimeout(function () {
					thisBtn.prop(check, true);
				});
				self.btn.removeClass(self.options.activeClass);
				thisBtn.addClass(self.options.activeClass);
				self.openTab();
			}
		},
		destroy: function () {
			this.btn.off(this.options.selectEvent + ',' + self.options.btnEvent);
		}
	};

	// jquery plugin
	$.fn.myTabs = function (opt) {
		return this.each(function () {
			$(this).data('MyTabs', new MyTabs($.extend({
				holder: this
			}, opt)));
		});
	};
}(jQuery));


/* jQuery Form Styler v2.0.1 | (c) Dimox | https://github.com/Dimox/jQueryFormStyler */
!function (e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e($ || require("jquery")) : e(jQuery)
}(function (e) {
	"use strict";

	function t(t, s) {
		this.element = t, this.options = e.extend({}, l, s);
		var i = this.options.locale;
		void 0 !== this.options.locales[i] && e.extend(this.options, this.options.locales[i]), this.init()
	}

	function s(t) {
		if (!e(t.target).parents().hasClass("jq-selectbox") && "OPTION" != t.target.nodeName && e("div.jq-selectbox.opened").length) {
			var s = e("div.jq-selectbox.opened"), l = e("div.jq-selectbox__search input", s),
				o = e("div.jq-selectbox__dropdown", s);
			s.find("select").data("_" + i).options.onSelectClosed.call(s), l.length && l.val("").keyup(), o.hide().find("li.sel").addClass("selected"), s.removeClass("focused opened dropup dropdown")
		}
	}

	var i = "styler", l = {
		idSuffix: "-styler",
		filePlaceholder: "Файл не выбран",
		fileBrowse: "Обзор...",
		fileNumber: "Выбрано файлов: %s",
		selectPlaceholder: "Выберите...",
		selectSearch: !1,
		selectSearchLimit: 10,
		selectSearchNotFound: "Совпадений не найдено",
		selectSearchPlaceholder: "Поиск...",
		selectVisibleOptions: 0,
		selectSmartPositioning: !0,
		locale: "ru",
		locales: {
			en: {
				filePlaceholder: "No file selected",
				fileBrowse: "Browse...",
				fileNumber: "Selected files: %s",
				selectPlaceholder: "Select...",
				selectSearchNotFound: "No matches found",
				selectSearchPlaceholder: "Search..."
			}
		},
		onSelectOpened: function () {
		},
		onSelectClosed: function () {
		},
		onFormStyled: function () {
		}
	};
	t.prototype = {
		init: function () {
			function t() {
				void 0 !== i.attr("id") && "" !== i.attr("id") && (this.id = i.attr("id") + l.idSuffix), this.title = i.attr("title"), this.classes = i.attr("class"), this.data = i.data()
			}

			var i = e(this.element), l = this.options,
				o = !(!navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || navigator.userAgent.match(/(Windows\sPhone)/i)),
				a = !(!navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/(Windows\sPhone)/i));
			if (i.is(":checkbox")) {
				var d = function () {
					var s = new t, l = e('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>').attr({
						id: s.id,
						title: s.title
					}).addClass(s.classes).data(s.data);
					i.after(l).prependTo(l), i.is(":checked") && l.addClass("checked"), i.is(":disabled") && l.addClass("disabled"), l.click(function (e) {
						e.preventDefault(), i.triggerHandler("click"), l.is(".disabled") || (i.is(":checked") ? (i.prop("checked", !1), l.removeClass("checked")) : (i.prop("checked", !0), l.addClass("checked")), i.focus().change())
					}), i.closest("label").add('label[for="' + i.attr("id") + '"]').on("click.styler", function (t) {
						e(t.target).is("a") || e(t.target).closest(l).length || (l.triggerHandler("click"), t.preventDefault())
					}), i.on("change.styler", function () {
						i.is(":checked") ? l.addClass("checked") : l.removeClass("checked")
					}).on("keydown.styler", function (e) {
						32 == e.which && l.click()
					}).on("focus.styler", function () {
						l.is(".disabled") || l.addClass("focused")
					}).on("blur.styler", function () {
						l.removeClass("focused")
					})
				};
				d(), i.on("refresh", function () {
					i.closest("label").add('label[for="' + i.attr("id") + '"]').off(".styler"), i.off(".styler").parent().before(i).remove(), d()
				})
			} else if (i.is(":radio")) {
				var r = function () {
					var s = new t, l = e('<div class="jq-radio"><div class="jq-radio__div"></div></div>').attr({
						id: s.id,
						title: s.title
					}).addClass(s.classes).data(s.data);
					i.after(l).prependTo(l), i.is(":checked") && l.addClass("checked"), i.is(":disabled") && l.addClass("disabled"), e.fn.commonParents = function () {
						var t = this;
						return t.first().parents().filter(function () {
							return e(this).find(t).length === t.length
						})
					}, e.fn.commonParent = function () {
						return e(this).commonParents().first()
					}, l.click(function (t) {
						if (t.preventDefault(), i.triggerHandler("click"), !l.is(".disabled")) {
							var s = e('input[name="' + i.attr("name") + '"]');
							s.commonParent().find(s).prop("checked", !1).parent().removeClass("checked"), i.prop("checked", !0).parent().addClass("checked"), i.focus().change()
						}
					}), i.closest("label").add('label[for="' + i.attr("id") + '"]').on("click.styler", function (t) {
						e(t.target).is("a") || e(t.target).closest(l).length || (l.triggerHandler("click"), t.preventDefault())
					}), i.on("change.styler", function () {
						i.parent().addClass("checked")
					}).on("focus.styler", function () {
						l.is(".disabled") || l.addClass("focused")
					}).on("blur.styler", function () {
						l.removeClass("focused")
					})
				};
				r(), i.on("refresh", function () {
					i.closest("label").add('label[for="' + i.attr("id") + '"]').off(".styler"), i.off(".styler").parent().before(i).remove(), r()
				})
			} else if (i.is(":file")) {
				var c = function () {
					var s = new t, o = i.data("placeholder");
					void 0 === o && (o = l.filePlaceholder);
					var a = i.data("browse");
					void 0 !== a && "" !== a || (a = l.fileBrowse);
					var d = e('<div class="jq-file"><div class="jq-file__name">' + o + '</div><div class="jq-file__browse">' + a + "</div></div>").attr({
						id: s.id,
						title: s.title
					}).addClass(s.classes).data(s.data);
					i.after(d).appendTo(d), i.is(":disabled") && d.addClass("disabled");
					var r = i.val(), c = e("div.jq-file__name", d);
					r && c.text(r.replace(/.+[\\\/]/, "")), i.on("change.styler", function () {
						var e = i.val();
						if (i.is("[multiple]")) {
							e = "";
							var t = i[0].files.length;
							if (t > 0) {
								var s = i.data("number");
								void 0 === s && (s = l.fileNumber), s = s.replace("%s", t), e = s
							}
						}
						c.text(e.replace(/.+[\\\/]/, "")), "" === e ? (c.text(o), d.removeClass("changed")) : d.addClass("changed")
					}).on("focus.styler", function () {
						d.addClass("focused")
					}).on("blur.styler", function () {
						d.removeClass("focused")
					}).on("click.styler", function () {
						d.removeClass("focused")
					})
				};
				c(), i.on("refresh", function () {
					i.off(".styler").parent().before(i).remove(), c()
				})
			} else if (i.is('input[type="number"]')) {
				var n = function () {
					var s = new t,
						l = e('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>').attr({
							id: s.id,
							title: s.title
						}).addClass(s.classes).data(s.data);
					i.after(l).prependTo(l).wrap('<div class="jq-number__field"></div>'), i.is(":disabled") && l.addClass("disabled");
					var o, a, d, r = null, c = null;
					void 0 !== i.attr("min") && (o = i.attr("min")), void 0 !== i.attr("max") && (a = i.attr("max")), d = void 0 !== i.attr("step") && e.isNumeric(i.attr("step")) ? Number(i.attr("step")) : Number(1);
					var n = function (t) {
						var s, l = i.val();
						e.isNumeric(l) || (l = 0, i.val("0")), t.is(".minus") ? s = Number(l) - d : t.is(".plus") && (s = Number(l) + d);
						var r = (d.toString().split(".")[1] || []).length;
						if (r > 0) {
							for (var c = "1"; c.length <= r;) c += "0";
							s = Math.round(s * c) / c
						}
						e.isNumeric(o) && e.isNumeric(a) ? s >= o && s <= a && i.val(s) : e.isNumeric(o) && !e.isNumeric(a) ? s >= o && i.val(s) : !e.isNumeric(o) && e.isNumeric(a) ? s <= a && i.val(s) : i.val(s)
					};
					l.is(".disabled") || (l.on("mousedown", "div.jq-number__spin", function () {
						var t = e(this);
						n(t), r = setTimeout(function () {
							c = setInterval(function () {
								n(t)
							}, 40)
						}, 350)
					}).on("mouseup mouseout", "div.jq-number__spin", function () {
						clearTimeout(r), clearInterval(c)
					}).on("mouseup", "div.jq-number__spin", function () {
						i.change().trigger("input")
					}), i.on("focus.styler", function () {
						l.addClass("focused")
					}).on("blur.styler", function () {
						l.removeClass("focused")
					}))
				};
				n(), i.on("refresh", function () {
					i.off(".styler").closest(".jq-number").before(i).remove(), n()
				})
			} else if (i.is("select")) {
				var f = function () {
					function d(e) {
						var t = e.prop("scrollHeight") - e.outerHeight(), s = null, i = null;
						e.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function (l) {
							s = l.originalEvent.detail < 0 || l.originalEvent.wheelDelta > 0 ? 1 : -1, ((i = e.scrollTop()) >= t && s < 0 || i <= 0 && s > 0) && (l.stopPropagation(), l.preventDefault())
						})
					}

					function r() {
						for (var e = 0; e < c.length; e++) {
							var t = c.eq(e), s = "", i = "", o = "", a = "", d = "", r = "", f = "", h = "", u = "";
							t.prop("selected") && (i = "selected sel"), t.is(":disabled") && (i = "disabled"), t.is(":selected:disabled") && (i = "selected sel disabled"), void 0 !== t.attr("id") && "" !== t.attr("id") && (a = ' id="' + t.attr("id") + l.idSuffix + '"'), void 0 !== t.attr("title") && "" !== c.attr("title") && (d = ' title="' + t.attr("title") + '"'), void 0 !== t.attr("class") && (f = " " + t.attr("class"), u = ' data-jqfs-class="' + t.attr("class") + '"');
							var p = t.data();
							for (var v in p) "" !== p[v] && (r += " data-" + v + '="' + p[v] + '"');
							i + f !== "" && (o = ' class="' + i + f + '"'), s = "<li" + u + r + o + d + a + ">" + t.html() + "</li>", t.parent().is("optgroup") && (void 0 !== t.parent().attr("class") && (h = " " + t.parent().attr("class")), s = "<li" + u + r + ' class="' + i + f + " option" + h + '"' + d + a + ">" + t.html() + "</li>", t.is(":first-child") && (s = '<li class="optgroup' + h + '">' + t.parent().attr("label") + "</li>" + s)), n += s
						}
					}

					var c = e("option", i), n = "";
					if (i.is("[multiple]")) {
						if (a || o) return;
						!function () {
							var s = new t, l = e('<div class="jq-select-multiple jqselect"></div>').attr({
								id: s.id,
								title: s.title
							}).addClass(s.classes).data(s.data);
							i.after(l), r(), l.append("<ul>" + n + "</ul>");
							var o = e("ul", l), a = e("li", l), f = i.attr("size"), h = o.outerHeight(),
								u = a.outerHeight();
							void 0 !== f && f > 0 ? o.css({height: u * f}) : o.css({height: 4 * u}), h > l.height() && (o.css("overflowY", "scroll"), d(o), a.filter(".selected").length && o.scrollTop(o.scrollTop() + a.filter(".selected").position().top)), i.prependTo(l), i.is(":disabled") ? (l.addClass("disabled"), c.each(function () {
								e(this).is(":selected") && a.eq(e(this).index()).addClass("selected")
							})) : (a.filter(":not(.disabled):not(.optgroup)").click(function (t) {
								i.focus();
								var s = e(this);
								if (t.ctrlKey || t.metaKey || s.addClass("selected"), t.shiftKey || s.addClass("first"), t.ctrlKey || t.metaKey || t.shiftKey || s.siblings().removeClass("selected first"), (t.ctrlKey || t.metaKey) && (s.is(".selected") ? s.removeClass("selected first") : s.addClass("selected first"), s.siblings().removeClass("first")), t.shiftKey) {
									var l = !1, o = !1;
									s.siblings().removeClass("selected").siblings(".first").addClass("selected"), s.prevAll().each(function () {
										e(this).is(".first") && (l = !0)
									}), s.nextAll().each(function () {
										e(this).is(".first") && (o = !0)
									}), l && s.prevAll().each(function () {
										if (e(this).is(".selected")) return !1;
										e(this).not(".disabled, .optgroup").addClass("selected")
									}), o && s.nextAll().each(function () {
										if (e(this).is(".selected")) return !1;
										e(this).not(".disabled, .optgroup").addClass("selected")
									}), 1 == a.filter(".selected").length && s.addClass("first")
								}
								c.prop("selected", !1), a.filter(".selected").each(function () {
									var t = e(this), s = t.index();
									t.is(".option") && (s -= t.prevAll(".optgroup").length), c.eq(s).prop("selected", !0)
								}), i.change()
							}), c.each(function (t) {
								e(this).data("optionIndex", t)
							}), i.on("change.styler", function () {
								a.removeClass("selected");
								var t = [];
								c.filter(":selected").each(function () {
									t.push(e(this).data("optionIndex"))
								}), a.not(".optgroup").filter(function (s) {
									return e.inArray(s, t) > -1
								}).addClass("selected")
							}).on("focus.styler", function () {
								l.addClass("focused")
							}).on("blur.styler", function () {
								l.removeClass("focused")
							}), h > l.height() && i.on("keydown.styler", function (e) {
								38 != e.which && 37 != e.which && 33 != e.which || o.scrollTop(o.scrollTop() + a.filter(".selected").position().top - u), 40 != e.which && 39 != e.which && 34 != e.which || o.scrollTop(o.scrollTop() + a.filter(".selected:last").position().top - o.innerHeight() + 2 * u)
							}))
						}()
					} else !function () {
						var a = new t, f = "", h = i.data("placeholder"), u = i.data("search"),
							p = i.data("search-limit"), v = i.data("search-not-found"),
							m = i.data("search-placeholder"), g = i.data("smart-positioning");
						void 0 === h && (h = l.selectPlaceholder), void 0 !== u && "" !== u || (u = l.selectSearch), void 0 !== p && "" !== p || (p = l.selectSearchLimit), void 0 !== v && "" !== v || (v = l.selectSearchNotFound), void 0 === m && (m = l.selectSearchPlaceholder), void 0 !== g && "" !== g || (g = l.selectSmartPositioning);
						var b = e('<div class="jq-selectbox jqselect"><div class="jq-selectbox__select"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>').attr({
							id: a.id,
							title: a.title
						}).addClass(a.classes).data(a.data);
						i.after(b).prependTo(b);
						var C = b.css("z-index");
						C = C > 0 ? C : 1;
						var x = e("div.jq-selectbox__select", b), y = e("div.jq-selectbox__select-text", b),
							w = c.filter(":selected");
						r(), u && (f = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + m + '"></div><div class="jq-selectbox__not-found">' + v + "</div>");
						var q = e('<div class="jq-selectbox__dropdown">' + f + "<ul>" + n + "</ul></div>");
						b.append(q);
						var _ = e("ul", q), j = e("li", q), k = e("input", q),
							S = e("div.jq-selectbox__not-found", q).hide();
						j.length < p && k.parent().hide(), "" === c.first().text() && c.first().is(":selected") && !1 !== h ? y.text(h).addClass("placeholder") : y.text(w.text());
						var T = 0, N = 0;
						if (j.css({display: "inline-block"}), j.each(function () {
								var t = e(this);
								t.innerWidth() > T && (T = t.innerWidth(), N = t.width())
							}), j.css({display: ""}), y.is(".placeholder") && y.width() > T) y.width(y.width()); else {
							var P = b.clone().appendTo("body").width("auto"), H = P.outerWidth();
							P.remove(), H == b.outerWidth() && y.width(N)
						}
						T > b.width() && q.width(T), "" === c.first().text() && "" !== i.data("placeholder") && j.first().hide();
						var A = b.outerHeight(!0), D = k.parent().outerHeight(!0) || 0, I = _.css("max-height"),
							K = j.filter(".selected");
						if (K.length < 1 && j.first().addClass("selected sel"), void 0 === j.data("li-height")) {
							var O = j.outerHeight();
							!1 !== h && (O = j.eq(1).outerHeight()), j.data("li-height", O)
						}
						var M = q.css("top");
						if ("auto" == q.css("left") && q.css({left: 0}), "auto" == q.css("top") && (q.css({top: A}), M = A), q.hide(), K.length && (c.first().text() != w.text() && b.addClass("changed"), b.data("jqfs-class", K.data("jqfs-class")), b.addClass(K.data("jqfs-class"))), i.is(":disabled")) return b.addClass("disabled"), !1;
						x.click(function () {
							if (e("div.jq-selectbox").filter(".opened").length && l.onSelectClosed.call(e("div.jq-selectbox").filter(".opened")), i.focus(), !o) {
								var t = e(window), s = j.data("li-height"), a = b.offset().top,
									r = t.height() - A - (a - t.scrollTop()), n = i.data("visible-options");
								void 0 !== n && "" !== n || (n = l.selectVisibleOptions);
								var f = 5 * s, h = s * n;
								n > 0 && n < 6 && (f = h), 0 === n && (h = "auto");
								var u = function () {
									q.height("auto").css({bottom: "auto", top: M});
									var e = function () {
										_.css("max-height", Math.floor((r - 20 - D) / s) * s)
									};
									e(), _.css("max-height", h), "none" != I && _.css("max-height", I), r < q.outerHeight() + 20 && e()
								};
								!0 === g || 1 === g ? r > f + D + 20 ? (u(), b.removeClass("dropup").addClass("dropdown")) : (function () {
									q.height("auto").css({top: "auto", bottom: M});
									var e = function () {
										_.css("max-height", Math.floor((a - t.scrollTop() - 20 - D) / s) * s)
									};
									e(), _.css("max-height", h), "none" != I && _.css("max-height", I), a - t.scrollTop() - 20 < q.outerHeight() + 20 && e()
								}(), b.removeClass("dropdown").addClass("dropup")) : !1 === g || 0 === g ? r > f + D + 20 && (u(), b.removeClass("dropup").addClass("dropdown")) : (q.height("auto").css({
									bottom: "auto",
									top: M
								}), _.css("max-height", h), "none" != I && _.css("max-height", I)), b.offset().left + q.outerWidth() > t.width() && q.css({
									left: "auto",
									right: 0
								}), e("div.jqselect").css({zIndex: C - 1}).removeClass("opened"), b.css({zIndex: C}), q.is(":hidden") ? (e("div.jq-selectbox__dropdown:visible").hide(), q.show(), b.addClass("opened focused"), l.onSelectOpened.call(b)) : (q.hide(), b.removeClass("opened dropup dropdown"), e("div.jq-selectbox").filter(".opened").length && l.onSelectClosed.call(b)), k.length && (k.val("").keyup(), S.hide(), k.keyup(function () {
									var t = e(this).val();
									j.each(function () {
										e(this).html().match(new RegExp(".*?" + t + ".*?", "i")) ? e(this).show() : e(this).hide()
									}), "" === c.first().text() && "" !== i.data("placeholder") && j.first().hide(), j.filter(":visible").length < 1 ? S.show() : S.hide()
								})), j.filter(".selected").length && ("" === i.val() ? _.scrollTop(0) : (_.innerHeight() / s % 2 != 0 && (s /= 2), _.scrollTop(_.scrollTop() + j.filter(".selected").position().top - _.innerHeight() / 2 + s))), d(_)
							}
						}), j.hover(function () {
							e(this).siblings().removeClass("selected")
						});
						var W = j.filter(".selected").text();
						j.filter(":not(.disabled):not(.optgroup)").click(function () {
							i.focus();
							var t = e(this), s = t.text();
							if (!t.is(".selected")) {
								var o = t.index();
								o -= t.prevAll(".optgroup").length, t.addClass("selected sel").siblings().removeClass("selected sel"), c.prop("selected", !1).eq(o).prop("selected", !0), W = s, y.text(s), b.data("jqfs-class") && b.removeClass(b.data("jqfs-class")), b.data("jqfs-class", t.data("jqfs-class")), b.addClass(t.data("jqfs-class")), i.change()
							}
							q.hide(), b.removeClass("opened dropup dropdown"), l.onSelectClosed.call(b)
						}), q.mouseout(function () {
							e("li.sel", q).addClass("selected")
						}), i.on("change.styler", function () {
							y.text(c.filter(":selected").text()).removeClass("placeholder"), j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"), c.first().text() != j.filter(".selected").text() ? b.addClass("changed") : b.removeClass("changed")
						}).on("focus.styler", function () {
							b.addClass("focused"), e("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide()
						}).on("blur.styler", function () {
							b.removeClass("focused")
						}).on("keydown.styler keyup.styler", function (e) {
							var t = j.data("li-height");
							"" === i.val() ? y.text(h).addClass("placeholder") : y.text(c.filter(":selected").text()), j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"), 38 != e.which && 37 != e.which && 33 != e.which && 36 != e.which || ("" === i.val() ? _.scrollTop(0) : _.scrollTop(_.scrollTop() + j.filter(".selected").position().top)), 40 != e.which && 39 != e.which && 34 != e.which && 35 != e.which || _.scrollTop(_.scrollTop() + j.filter(".selected").position().top - _.innerHeight() + t), 13 == e.which && (e.preventDefault(), q.hide(), b.removeClass("opened dropup dropdown"), l.onSelectClosed.call(b))
						}).on("keydown.styler", function (e) {
							32 == e.which && (e.preventDefault(), x.click())
						}), s.registered || (e(document).on("click", s), s.registered = !0)
					}()
				};
				f(), i.on("refresh", function () {
					i.off(".styler").parent().before(i).remove(), f()
				})
			} else i.is(":reset") && i.on("click", function () {
				setTimeout(function () {
					i.closest("form").find("input, select").trigger("refresh")
				}, 1)
			})
		}, destroy: function () {
			var t = e(this.element);
			t.is(":checkbox") || t.is(":radio") ? (t.removeData("_" + i).off(".styler refresh").removeAttr("style").parent().before(t).remove(), t.closest("label").add('label[for="' + t.attr("id") + '"]').off(".styler")) : t.is('input[type="number"]') ? t.removeData("_" + i).off(".styler refresh").closest(".jq-number").before(t).remove() : (t.is(":file") || t.is("select")) && t.removeData("_" + i).off(".styler refresh").removeAttr("style").parent().before(t).remove()
		}
	}, e.fn[i] = function (s) {
		var l = arguments;
		if (void 0 === s || "object" == typeof s) return this.each(function () {
			e.data(this, "_" + i) || e.data(this, "_" + i, new t(this, s))
		}).promise().done(function () {
			var t = e(this[0]).data("_" + i);
			t && t.options.onFormStyled.call()
		}), this;
		if ("string" == typeof s && "_" !== s[0] && "init" !== s) {
			var o;
			return this.each(function () {
				var a = e.data(this, "_" + i);
				a instanceof t && "function" == typeof a[s] && (o = a[s].apply(a, Array.prototype.slice.call(l, 1)))
			}), void 0 !== o ? o : this
		}
	}, s.registered = !1
});
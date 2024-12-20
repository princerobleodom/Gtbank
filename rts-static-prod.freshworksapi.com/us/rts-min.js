window.RTS = function() {
    function t(t) {
        t = t || {}, this.clientVersion = 19, this.connectionId = "", this.connection_startTime, this.socket_connection_time, this.timeoutPeriod = 3e4, this.pingTimerInterval = 15e3, this.tokenExpiryBufferPeriod = 36e5, this.tokenFetchTimeout = 2e4, this.channels = {}, this.timeouts = {}, this.callbacks = {}, this.timerID = 0, this.attempts = 0, this.clientClose, this.traceIdIncreamenter = 0, this.reconnectionFlag = !1, this.fallbackWsFailureFlag = !1, this.fallbackWsNullFlag = !1, this.firstConnectionSuccess = !1, this.stableConnectionTimer, this.stableConnectionTimeout = 2e4, this.resubscriptionTimeout = 3e3, this.resubscriptionMaxAttempts = 3, this.webhookSendCustomDataLimit = 200, this.ping_worker, this.workerURL, this.selfAckOpt = 2, this.reconnectionAttempts = t.reconnectionAttempts || 3, this.sioReconnectionAttempts = t.sioReconnectionAttempts || 1 / 0, this.reconnectionDelay = this._isNumberAndGreaterThanZero(t.reconnectionDelay) ? t.reconnectionDelay : 1e3, this.reconnectionDelayMax = t.reconnectionDelayMax || 6e4, this.debug = t.debug || !1, this.logger = t.logger || window.console, this.origin = t.origin, this.onConnect = t.onConnect || function() {}, this.onConnectError = t.onConnectError || function() {}, this.onReconnect = t.onReconnect || function() {}, this.onReconnecting = t.onReconnecting || function() {}, this.onDisconnect = t.onDisconnect || function() {}, this.onFallback = t.onFallback || function() {}, this.onMessage = t.onMessage || function() {}, this.onAppMessage = t.onAppMessage, this.isHealthCheckEnabled = t.isHealthCheckEnabled || !1, this.disconnectCount = 0, this.connected = !1, this.serviceId = t.serviceId || "rts", this.traceId = t.ti || this._generateUid(), t.accId ? this.accId = t.accId : this._throw("accId not provided"), t.userId ? this.userId = t.userId : this._throw("userId not provided"), t.token ? this.token = encodeURIComponent(t.token) : this.token = "", t.webURL && (this.webURL = t.webURL), t.leaveOnUnload && this.leaveOnUnload(), t.hookId ? this.hookId = t.hookId : this.hookId = "", "function" == typeof t.fetchToken && (this.fetchToken = t.fetchToken), this.socket = null, this.nocookie = null, this.sioUpgradationAllowedServices = [], this.sioUpgradeConnectionId = "", this.sioUpgradeServiceId = "serviceIdSioUpgradation", this.sioUpgradeAccId = "ACCIDSOCIO", this.sioUpgradeUserId = "userIdSioUpgradation", this.sioUpgradeTraceId = this._generateUid(), this.isSioUpgradeClose = null, this.upgradedWebsocket = null, this.sioIntervalId, this.initializeSocket(), this.initializeTokenRefresh()
    }
    return t.prototype = {
        constructor: t,
        generateWsUrl: function(t, e) {
            var n = "wss";
            return 0 == t.indexOf("http://localhost") && (n = "ws"), t.replace(/[^:]*/, n) + "/ws?" + e
        },
        generateSioUrl: function() {
            return this.origin + "?" + this._getQueryParams()
        },
        errorHandler: function(t) {
            var e = this;
            if (e.log("attempts: ", e.attempts), e.websocket.readyState < 2) try {
                e.websocket.close()
            } catch (t) {
                e.log(t)
            }
            e.attempts >= e.reconnectionAttempts - 1 ? (e.log("failed to connect via websocket, falling back to sio"), e.timerID && (window.clearTimeout(e.timerID), e.timerID = 0, e.attempts = 0), delete e.websocket, this.fallbackWsFailureFlag = !0, e.initializeSocketIO(), null != window.WebSocket && e.sioUpgradationAllowedServices.includes(e.serviceId) && window.Worker && e.socketioUpgradationWithWorker()) : (this.firstConnectionSuccess && (this.reconnectionFlag = !0), e.timerID || (e.log("setting timerID"), e.timerID = setTimeout(function() {
                clearTimeout(e.timerID), e.timerID = 0, e.connected || e.errorHandler()
            }, e.reconnectionDelay * (e._isNumberAndGreaterThanZero(e.attempts) ? e.attempts : 1) * 10), e._onReconnecting(), null != navigator && 0 == navigator.onLine || (e.log("incrementing retry attempts"), e.attempts++), e.initializeSocket()))
        },
        initializeSocket: function() {
            var n, o = this;
            this.checkCookieSupport(function(t) {
                var e;
                o.nocookie = t, 1 != o.clientClose && (n = o._getQueryParams(t), t = o.generateWsUrl(o.origin, n), null != window.WebSocket ? (o.log("creating new socket,", new Date), e = new WebSocket(t), o.websocket = e, o.websocket.onopen = function() {
                    o.websocket == e && (o.stableConnectionTimer = setTimeout(function() {
                        o.attempts = 0
                    }, o.stableConnectionTimeout), o.reconnectionFlag && o._onReconnect(), o.initializeWebSocket(e))
                }, o.websocket.onerror = function(t) {
                    o.clientClose || o.websocket == e && (window.clearTimeout(o.stableConnectionTimer), o.connected = !1, o.errorHandler(t))
                }) : (o.reconnectionFlag && (o.fallbackWsNullFlag = !0), o.initializeSocketIO()))
            })
        },
        initializeWebSocket: function(e) {
            this.log("Initializing websocket connnection..."), this.connection_startTime = (new Date).getTime();
            const n = this;
            var t, o = null;
            this.websocket.onmessage = function(t) {
                n.websocket == e && ("PONG" != (t = n._safelyParseJSON(t.data)).event && n.log("Received Data.", t), n._onEvent(t))
            }, this.websocket.onclose = function(t) {
                n.websocket == e && (window.clearTimeout(n.stableConnectionTimer), n.clientClose ? (n.log("websocket closed"), n.websocket.close()) : (n.connected && n._onDisconnect("ping timeout", n), n.log("attempting to reconnect"), n.errorHandler(t)), window.Worker && n.ping_worker ? (n.ping_worker.postMessage({
                    type: "stop_interval",
                    intervalReference: null
                }), URL.revokeObjectURL(n.workerURL)) : clearInterval(o))
            }, this.reconnectionFlag || (this._onConnect(), this.reconnectionFlag = !0), window.Worker ? (t = (t = function() {
                this.onmessage = function(t) {
                    if (t.data.type != this.undefined) switch (t.data.type) {
                        case "start_interval":
                            const e = this.setInterval(function() {
                                this.postMessage({
                                    type: "trigger_callback",
                                    intervalReference: e
                                })
                            }, t.data.Interval);
                            this.postMessage({
                                type: "initiated",
                                intervalReference: e
                            });
                            break;
                        case "stop_interval":
                            clearInterval(t.data.intervalReference), close()
                    }
                }
            }.toString()).substring(t.indexOf("{") + 1, t.lastIndexOf("}")), t = new Blob([t], {
                type: "application/javascript"
            }), this.workerURL = URL.createObjectURL(t), this.ping_worker = new Worker(this.workerURL), this.ping_worker.onmessage = function(t) {
                "trigger_callback" == t.data.type ? n.websocket == e ? 1 == e.readyState && e.send("9") : (n.ping_worker.postMessage({
                    type: "stop_interval",
                    intervalReference: o
                }), URL.revokeObjectURL(n.workerURL)) : "initiated" == t.data.type && (o = t.data.intervalReference)
            }, this.ping_worker.postMessage({
                type: "start_interval",
                Interval: n.pingTimerInterval
            })) : o = setInterval(function() {
                n.websocket == e ? 1 == e.readyState && e.send("9") : clearInterval(o)
            }, n.pingTimerInterval)
        },
        initializeSocketIO: function() {
            1 != this.clientClose && (this.log("Initializing socket connection..."), this.connection_startTime = (new Date).getTime(), this.checkCookieSupport(function(t) {
                this.nocookie = t;
                t = this.io.Manager(this.generateSioUrl(), {
                    forceBase64: !0,
                    reconnectionAttempts: this.sioReconnectionAttempts,
                    reconnectionDelay: this.reconnectionDelay,
                    reconnectionDelayMax: this.reconnectionDelayMax
                });
                this.socket = t.socket("/"), this.initializeSocketListeners()
            }.bind(this)))
        },
        socketioUpgradationWithWorker: function() {
            var c = this,
                t = (t = function() {
                    this.onmessage = function(t) {
                        var {
                            command: e,
                            retries: n,
                            maxRetries: o,
                            baseDelay: i,
                            maxDelay: r,
                            delay: t
                        } = t.data;
                        "start" === e ? this.postMessage({
                            command: "initiated",
                            retries: n,
                            maxRetries: o,
                            baseDelay: i,
                            maxDelay: r
                        }) : "retry" === e ? this.postMessage({
                            command: "retry",
                            retries: n,
                            maxRetries: o,
                            baseDelay: i,
                            maxDelay: r,
                            delay: t
                        }) : "complete" === e && this.postMessage({
                            command: "completed"
                        })
                    }
                }.toString()).substring(t.indexOf("{") + 1, t.lastIndexOf("}")),
                t = new Blob([t], {
                    type: "application/javascript"
                });
            this.workerURL = URL.createObjectURL(t);
            const a = new Worker(this.workerURL);
            a.onmessage = function(t) {
                let {
                    command: e,
                    retries: n,
                    maxRetries: o,
                    baseDelay: i,
                    maxDelay: r,
                    delay: s
                } = t.data;
                "initiated" === e ? async function(t, e, n, o) {
                    if (t <= e) {
                        var i = Math.min(n * 2 ** t, o);
                        if (!1 !== await c.socketioUpgradation(t, e)) return console.error("Socket.io upgradation failed"), void a.postMessage({
                            command: "retry",
                            retries: t,
                            maxRetries: e,
                            baseDelay: n,
                            maxDelay: o,
                            delay: i
                        });
                        console.log("Socket.io upgradation completed successfully")
                    } else console.log("Max retries reached. Socket.io upgradation failed.");
                    a.postMessage({
                        command: "complete"
                    })
                }(n, o, i, r).then() : "retry" === e ? (n++, n > o ? a.postMessage({
                    command: "start",
                    retries: n,
                    maxRetries: o,
                    baseDelay: i,
                    maxDelay: r
                }) : (console.log(`Retry ${n}. Waiting for ${s}ms...`), setTimeout(() => {
                    a.postMessage({
                        command: "start",
                        retries: n,
                        maxRetries: o,
                        baseDelay: i,
                        maxDelay: r
                    })
                }, s))) : "completed" === e && a.terminate()
            }, a.postMessage({
                command: "start",
                retries: 0,
                maxRetries: 5,
                baseDelay: 1e3,
                maxDelay: 2e4
            })
        },
        socketioUpgradation: function(n, o) {
            var i = this,
                r = null,
                s = i._getQueryParamsForSioUpgrade(i.nocookie),
                c = i.generateWsUrl(i.origin, s);
            const a = JSON.stringify({
                event: "ping",
                serviceId: i.sioUpgradeServiceId,
                userId: i.sioUpgradeUserId,
                accId: i.sioUpgradeAccId
            });
            return new Promise(e => {
                function t(t) {
                    for (var e = new Date; new Date - e < t;);
                }
                null == i.upgradedWebsocket ? (i.log("creating new socket,", Date()), i.upgradedWebsocket = new WebSocket(c), i.upgradedWebsocket.onopen = function() {
                    s.includes(i.sioUpgradeAccId) && (i.upgradedWebsocket.send(a), i.sioIntervalId = setInterval(() => {
                        i.upgradedWebsocket.send("9")
                    }, 1e4), t(1e3))
                }, i.upgradedWebsocket.onerror = function() {
                    r = !0, i.upgradedWebsocket = null, e(r)
                }) : i.upgradedWebsocket.readyState === WebSocket.OPEN ? s.includes(i.sioUpgradeAccId) && (i.upgradedWebsocket.send(a), t(1e3)) : (r = !0, i.upgradedWebsocket = null, e(r)), i.upgradedWebsocket.onmessage = function(t) {
                    i.logger.log(t.data);
                    t = JSON.parse(t.data);
                    "PONG" === t.event && t.userId === i.sioUpgradeUserId && t.accId === i.sioUpgradeAccId && t.serviceId === i.sioUpgradeServiceId && (t.isSioUpgradeClose ? (clearInterval(i.sioIntervalId), i.upgradedWebsocket.close(), i.logger.log("Test websocket closed"), i.upgradedWebsocket = null, e(r = !1)) : (r = !0, n === o && clearInterval(i.sioIntervalId), e(r)))
                }
            })
        },
        initializeSocketListeners: function() {
            this.log("Binding the socket listeners..."), this.socket.on("connect", this._onConnect.bind(this)), this.socket.on("connect_error", this._onConnectError.bind(this)), this.socket.on("reconnecting", this._onReconnecting.bind(this)), this.socket.on("reconnect", this._onReconnect.bind(this)), this.socket.on("disconnect", this._onDisconnect.bind(this)), this.socket.on("message", this._onMessage.bind(this))
        },
        initializeTokenRefresh: function() {
            var e, t;
            null == this.token || "" == this.token || "function" != typeof this.fetchToken || (t = this.getTokenExpiry(decodeURIComponent(this.token))) != 1 / 0 && (e = this, (t = t - (new Date).getTime() - this.tokenExpiryBufferPeriod) <= 0 && (t += this.tokenExpiryBufferPeriod), setTimeout(function() {
                1 != e.clientClose && e.fetchToken(function(t) {
                    null != t && "" != t && (e.token = encodeURIComponent(t), e.socket && e.socket.io && e.socket.io.uri && (e.socket.io.uri = e.generateSioUrl()), e.connected && e.grant(t)), setTimeout(function() {
                        e.initializeTokenRefresh()
                    }, e.tokenFetchTimeout)
                })
            }, t))
        },
        getTokenExpiry: function(t) {
            var t = JSON.parse(atob(t.split(".")[1])),
                e = 1 / 0;
            isNaN(t.exp) || (e = Math.min(e, 1e3 * parseInt(t.exp)));
            for (var n = t.credentials, o = 0; o < n.length; o++) {
                var i = n[o];
                isNaN(i.expire) || (e = Math.min(e, parseInt(i.expire)))
            }
            return e
        },
        refreshToken: function() {
            var e;
            "function" == typeof this.fetchToken && (e = this).fetchToken(function(t) {
                null != t && "" != t && (e.token = encodeURIComponent(t), e.connected && e.grant(t))
            })
        },
        removeSocketListeners: function(t) {
            this.socket && this.socket.off(t)
        },
        checkCookieSupport: function(e) {
            null === this.nocookie ? !0 !== (/constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || void 0 !== window.safari && window.safari.pushNotification).toString()) ? this.sendCookieRequest("get", function(t) {
                t ? this.sendCookieRequest("check", function(t) {
                    t ? (this.log("Browser supports cookie from a different domain"), e(!1)) : (this.log("Browser does not support cookie from a different domain"), e(!0))
                }.bind(this)) : (this.log("Browser does not support cookie from a different domain"), e(!0))
            }.bind(this)) : e(!0) : e(this.nocookie)
        },
        sendCookieRequest: function(e, n) {
            var t = new XMLHttpRequest;
            const o = this;
            var i = this.origin;
            this.origin && "/" !== this.origin[this.origin.length - 1] && (i = this.origin + "/v2/cookie/"), t.open("GET", i + e), t.onreadystatechange = function() {
                if (this.readyState) {
                    if (4 === this.readyState)
                        if (o.log("Cookie request :: " + e + " response", this.responseText), 200 <= this.status && this.status < 300 || 304 === this.status) {
                            var t = !0;
                            if ("check" == e) {
                                t = !1;
                                try {
                                    t = JSON.parse(this.responseText).exist
                                } catch (t) {}
                            }
                            n(t)
                        } else n(!1)
                } else n(!1)
            }, t.onerror = function() {
                o.log(t.statusText)
            }, t.withCredentials = !0, t.send()
        },
        subscribe: function(n, o, i) {
            void 0 === (i = i || {}).resubscriptionAttempts && (i.resubscriptionAttempts = 0), "function" != typeof o && (o = null);
            const r = this;
            var t = "Already subscribed to channel: ";
            if (this.log("Trying to subscribe to channel: ", n), this._connectionCheck(o)) {
                if (!i.forceResubscribe && this._isChannelSubscribed(n)) return this.log(t + n), i && (r.channels[n].options = i), i.messageHandler && (r.channels[n].onMessage = i.messageHandler), void(o && o(null, t));
                delete i.forceResubscribe;
                var s = !1,
                    c = setTimeout(function() {
                        if (!s) {
                            if (s = !0, i.resubscriptionAttempts++, i.resubscriptionAttempts == r.resubscriptionMaxAttempts) return i.resubscriptionAttempts = 0, window.clearTimeout(c), r.log("resubscription timed out, could not subscribe to channel", n), o && o("subscription failed", "tried subscribing" + r.resubscriptionMaxAttempts + " times: resubscription failed"), void(o = null);
                            r.subscribe(n, o, i)
                        }
                    }, r.resubscriptionTimeout);
                this._sendMessage({
                    event: "subscribe",
                    channel: n,
                    serviceId: this.serviceId,
                    token: i.token,
                    ti: i.traceId,
                    hookId: i.hookId,
                    opt: i.opt || 0
                }, function(t, e) {
                    if (null == t) {
                        if (i.resubscriptionAttempts = 0, s) return;
                        s = !0, window.clearTimeout(c), r.channels[n] = {
                            connected: !0,
                            options: i,
                            onMessage: i.messageHandler
                        }, r._fireCallback(o, t, e)
                    }
                    t && r.log("Could not subscribe to channel: ", t, n)
                })
            }
        },
        __getSocketOpt: function(t) {
            return t = t || 0, t |= 64
        },
        subscribeSocket: function(t, e, n) {
            n.opt = this.__getSocketOpt(n.opt), this.subscribe(t, e, n)
        },
        unsubscribe: function(n, o, t) {
            t = t || {}, "function" != typeof o && (o = null);
            const i = this;
            this._connectionCheck(o) && this._isChannelSubscribed(n, o) && this._sendMessage({
                event: "unsubscribe",
                channel: n,
                serviceId: this.serviceId,
                ti: t.traceId,
                hookId: t.hookId,
                opt: t.opt || 0
            }, function(t, e) {
                t ? i.log("Could not unsubscribe from channel: ", t, n) : delete i.channels[n], o && o(t, e)
            })
        },
        unsubscribeSocket: function(t, e, n) {
            (n = n || {}).opt = this.__getSocketOpt(n.opt), this.unsubscribe(t, e, n)
        },
        unsubscribeAll: function(t, e) {
            e = e || {}, "function" != typeof t && (t = null), this._connectionCheck && (this._sendMessage({
                event: "unsubscribeall",
                serviceId: this.serviceId,
                ti: e.traceId
            }), this.channels = {}, t && t(null, this.channels))
        },
        ping: function(t) {
            t = t || {}, this.isHealthCheckEnabled && this._connectionCheck && this._sendMessage({
                event: "ping",
                userId: this.userId,
                serviceId: this.serviceId,
                ti: t.traceId
            })
        },
        channelWho: function(n, o, t) {
            t = t || {}, "function" != typeof o && (o = null);
            const i = this;
            this._connectionCheck(o) && this._sendMessage({
                event: "channel_who",
                channel: n,
                serviceId: this.serviceId,
                ti: t.traceId,
                msg: JSON.stringify(t)
            }, function(t, e) {
                t && i.log("Could not fetch channel_who: ", t, n), o && o(t, e)
            })
        },
        userWhere: function(n, t) {
            t = t || {}, "function" != typeof n && (n = null);
            const o = this;
            this._connectionCheck(n) && this._sendMessage({
                event: "user_where",
                serviceId: this.serviceId,
                ti: t.traceId
            }, function(t, e) {
                t && o.log("Could not fetch user_where: ", t), n && n(t, e)
            })
        },
        userThere: function(n, t) {
            t = t || {}, "function" != typeof n && (n = null);
            const o = this;
            this._connectionCheck(n) && this._sendMessage({
                accId: this.accId,
                event: "user_there",
                userid: this.userId,
                serviceId: this.serviceId,
                ti: t.traceId
            }, function(t, e) {
                t && o.log("Could not fetch user_there: ", t), n && n(t, e)
            })
        },
        grant: function(t, n, e) {
            e = e || {}, "function" != typeof n && (n = null);
            const o = this;
            this._connectionCheck(n) && this._sendMessage({
                event: "grant",
                msg: t,
                serviceId: this.serviceId,
                ti: e.traceId
            }, function(t, e) {
                t && o.log("Could not grant access: ", t), n && n(t, e)
            })
        },
        revoke: function(t, n, e) {
            e = e || {}, "function" != typeof n && (n = null);
            const o = this;
            this._connectionCheck(n) && this._sendMessage({
                event: "revoke",
                msg: t,
                serviceId: this.serviceId,
                ti: e.traceId
            }, function(t, e) {
                t && o.log("Could not revoke access: ", t), n && n(t, e)
            })
        },
        save: function(t, n, o, e) {
            e = e || {}, "function" != typeof o && (o = null);
            const i = this;
            this._connectionCheck() && this._isChannelSubscribed(t) && this._sendMessage({
                event: "save",
                channel: t,
                serviceId: this.serviceId,
                ti: e.traceId,
                msg: JSON.stringify(n)
            }, function(t, e) {
                t ? i.log("Could not fetch user_where: ", t) : i.log("Saved data.", n), o && o(t, e)
            })
        },
        fetch: function(t, n, e) {
            e = e || {}, "function" != typeof n && (n = null);
            const o = this;
            this._connectionCheck(n) && this._isChannelSubscribed(t, n) && this._sendMessage({
                event: "fetch",
                channel: t,
                userId: this.userId,
                serviceId: this.serviceId,
                ti: e.traceId
            }, function(t, e) {
                t && o.log("Could not fetch user data: ", t), n && n(t, e)
            })
        },
        publish: function(t, e, n, o) {
            o = o || {}, "function" != typeof n && (n = null), this._connectionCheck && this._isChannelSubscribed(t, n) && (t = {
                event: "send",
                channel: t,
                msg: JSON.stringify(e),
                userid: o.userId,
                opt: o.opt || (o.persist ? 1 : 0),
                serviceId: this.serviceId,
                ti: o.traceId
            }, o.msgType && (t.msgType = o.msgType), this._sendMessage(t, n), this.log("Message sent", e))
        },
        persist: function(t, e, n, o) {
            var i = this;
            "function" != typeof n && (n = null);

            function r(t, e) {
                i.log("rest message send callback", "Error: ", t, " | Message: ", e), null != n && (n(t, e), n = null)
            }
            var t = this.origin + "/v1/message/send/" + this.accId + "/" + t + "?token=" + this.token,
                o = (o = o || {}).persist ? 1 : 0,
                o = '{"msg":' + JSON.stringify(e) + ',"opt":"' + o + '","senderId":"' + this.userId + '"}',
                s = new XMLHttpRequest;
            s.onreadystatechange = function() {
                this.readyState == this.DONE && (200 <= this.status && this.status < 300 ? (i.log("message sent", e), r(null, s.responseText)) : r("Server error, code: " + this.status, s.responseText))
            }, s.ontimeout = function() {
                r("Timeout", null)
            }, s.onerror = function() {
                r("Something went wrong", null)
            }, s.timeout = 2e4, s.open("POST", t, !0), s.setRequestHeader("Content-Type", "application/json"), s.send(o)
        },
        sendAck: function(t, e, n, o, i) {
            i = i || {}, this._connectionCheck(o = "function" != typeof o ? null : o) && this._isChannelSubscribed(t, o) && (this._sendMessage({
                accId: this.accId,
                event: "client_ack",
                channel: t,
                msg: e,
                userId: n,
                serviceId: this.serviceId,
                ti: i.traceId,
                msgPayload: JSON.stringify(i.message)
            }), o && o(null, "Sent ack message"))
        },
        sendSelfAck: function(t, e, n, o, i) {
            i = i || {}, this._connectionCheck(o = "function" != typeof o ? null : o) && this._isChannelSubscribed(t, o) && (this._sendMessage({
                accId: this.accId,
                event: "self_ack",
                channel: t,
                msg: e,
                connectionId: n,
                serviceId: this.serviceId,
                ti: i.traceId,
                msgPayload: JSON.stringify(i.message)
            }), o && o(null, "Sent self_ack message"))
        },
        log: function() {
            var t, e;
            !0 === this.debug && this.logger && (t = Array.prototype.slice.call(arguments), e = "", t.unshift("RTS:"), t.unshift((new Date).toLocaleTimeString()), t.forEach(function(t) {
                t instanceof Error ? e += t.toString() + " " : e += "object" == typeof t ? JSON.stringify(t) + " " : t + " "
            }), this.logger.log(e))
        },
        close: function(t, e) {
            if (this.clientClose = !0, e = e || {}, this._connectionCheck(t) && this._sendMessage({
                    event: "close",
                    serviceId: this.serviceId,
                    hookId: e.hookId,
                    ti: e.traceId
                }), "function" != typeof t && (t = null), this.websocket) {
                try {
                    this.websocket.close()
                } catch (t) {
                    this.log(t)
                }
                var n = this;
                setTimeout(function() {
                    n._onDisconnect("forced close")
                }, 0)
            } else this.disconnect();
            window.Worker && this.ping_worker && this.ping_worker.postMessage({
                type: "stop_interval",
                intervalReference: null
            }), t && t(null, "Connection Closed")
        },
        webhookSend: function(t, e, n, o, i) {
            let r = null;
            return i = i || {}, "function" != typeof o && (o = null), e.length > this.webhookSendCustomDataLimit ? (r = "Data limit exceeded. Failed to send webhook", null != o ? o(r, null) : r) : n && 0 !== n.length ? void this._sendMessage({
                data: e,
                hookId: n,
                event: "webhooksend",
                channel: t,
                token: i.token,
                traceId: i.traceId,
                serviceId: this.serviceId,
                opt: i.opt || 0
            }, function(t, e) {
                return t && this.log("Could not send webhook: ", t), null != o ? o(t, e) : t
            }) : (r = "Hook id missing in webhook send", null != o ? o(r, null) : r)
        },
        disconnect: function() {
            this.socket && this.socket.io.disconnect()
        },
        reconnect: function(t) {
            this.socket.io.connect()
        },
        _fireCallback: function(t) {
            var e;
            "function" == typeof t && (e = Array.prototype.slice.call(arguments, 1, arguments.length), setTimeout(function() {
                t.apply(null, e)
            }, 0))
        },
        _connectionCheck: function(t) {
            var e = "Not performing action as client is not connected.";
            return this.websocket ? 1 == this.websocket.readyState || (this.log(e), t && t(e), !1) : (!1 === this.connected && (this.log(e), t && t(e)), this.connected)
        },
        _sendMessage: function(t, e) {
            const n = t;
            e && (t = this._generateUid(), this.callbacks[t] = e, n.clientId = t, this._startTimeoutErrorTimer(t)), n.accId = this.accId, this.websocket ? (9 != n && this.log("Sending data", n), this.websocket.send(JSON.stringify(n))) : this.socket.emit("message", JSON.stringify(n))
        },
        _startTimeoutErrorTimer: function(t) {
            const e = this;
            e.timeouts[t] = setTimeout(function() {
                e.callbacks[t] && e.callbacks[t]("Timeout Error"), delete e.timeouts[t]
            }, this.timeoutPeriod)
        },
        _generateUid: function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                var e = 16 * Math.random() | 0;
                return ("x" == t ? e : 3 & e | 8).toString(16)
            })
        },
        _isNumberAndGreaterThanZero: function(t) {
            return "number" == typeof t && 0 < t
        },
        _safelyParseJSON: function(e) {
            var t;
            try {
                t = JSON.parse(e)
            } catch (t) {
                return void this.log("MessageParseError", e)
            }
            return t
        },
        _isChannelSubscribed: function(t, e) {
            var n = "Channel " + t + " is not subscribed yet.";
            return this.channels[t] || (this.log(n), e && e(n)), !!this.channels[t]
        },
        _onConnect: function() {
            if (this.reconnectionFlag) {
                const n = this;
                return this.connected = !0, n.channels && 0 < Object.keys(n.channels).length && Object.keys(n.channels).forEach(function(t) {
                    var e = n.channels[t].options || {};
                    e.forceResubscribe = !0, n.subscribe(t, null, e)
                }), void(this.fallbackWsFailureFlag && (this.onFallback(), this._fireCallback(this.onReconnect), this.fallbackWsFailureFlag = !1))
            }
            var t = (new Date).getTime() - this.connection_startTime;
            this.log("Socket Connected"), this.websocket ? (this.log("Time Taken by Websocket:- ", t), this.websocket.id = this._generateUid()) : this.log("Time Taken by Socket.IO:- ", t), this.connected = !0, this.firstConnectionSuccess = !0, this._fireCallback(this.onConnect, this.reconnectionFlag), this.reconnectionFlag = !0
        },
        _onConnectError: function(t) {
            this.log("Socket Connect Error"), this._fireCallback(this.onConnectError, t)
        },
        _onReconnecting: function() {
            this.websocket ? this.log("Websocket reconnecting") : this.log("Socket reconnecting"), this._fireCallback(this.onReconnecting)
        },
        _onReconnect: function() {
            const n = this;
            this.log("Socket reconnected"), window.clearTimeout(this.disconnect_timer), this.connected = !0, Object.keys(n.channels).forEach(function(t) {
                var e = n.channels[t].options || {};
                e.forceResubscribe = !0, n.subscribe(t, null, e)
            }), this.fallbackWsNullFlag && (this.onFallback(), this.fallbackWsNullFlag = !1), this._fireCallback(n.onReconnect)
        },
        _onDisconnect: function(t, e) {
            this.log("Disconnected"), this.connected = !1, this.clientClose && (this.channels = {}), this.disconnectCount += 1, this._fireCallback(this.onDisconnect, t, e)
        },
        _onEvent: function(t) {
            if ("CONNECT" == t.event && (this.connectionId = t.connId), t.clientId && (this.timeouts[t.clientId] && (clearTimeout(this.timeouts[t.clientId]), delete this.timeouts[t.clientId]), this.callbacks[t.clientId])) {
                if ("" !== t.err && t.err) {
                    this.log("Error: ", t);
                    try {
                        this.callbacks[t.clientId](t.err)
                    } catch (t) {
                        this.log(t)
                    }
                } else try {
                    this.callbacks[t.clientId](null, t)
                } catch (t) {
                    this.log(t)
                }
                delete this.callbacks[t.clientId]
            }
            var n;
            "APP_PUBLISH" != t.event || "function" != typeof this.onAppMessage ? ("send" == t.event && this.channels[t.channel] && null != typeof this.channels[t.channel].options && this.channels[t.channel].options.opt & this.selfAckOpt && (n = this).sendSelfAck(t.channel, t.id, this.connectionId, function(t, e) {
                n.log("Error: " + t + ",", "Response: " + e)
            }, {
                traceId: t.ti
            }), ("send" == t.event || "CHANNEL_JOIN" == t.event || "LEFT_CHANNEL" === t.event) && t.channel && this.channels[t.channel] && "function" == typeof this.channels[t.channel].onMessage ? this._fireCallback(this.channels[t.channel].onMessage, t) : this._fireCallback(this.onMessage, t)) : this._fireCallback(this.onAppMessage, t)
        },
        _onMessage: function(t) {
            t = this._safelyParseJSON(t);
            this._onEvent(t)
        },
        _getQueryParams: function() {
            this.traceIdIncreamenter++;
            var t = ["rcid=", this.connectionId, "&accId=", this.accId, "&serviceId=", this.serviceId, "&userId=", this.userId, "&ti=", this.traceId + - +this.traceIdIncreamenter, "&token=", this.token, "&cv=", this.clientVersion].join("");
            return !0 === this.nocookie && (t += "&nocookie=true"), t
        },
        _getQueryParamsForSioUpgrade: function() {
            this.traceIdIncreamenter++;
            var t = ["rcid=", this.sioUpgradeConnectionId, "&accId=", this.sioUpgradeAccId, "&serviceId=", this.sioUpgradeServiceId, "&userId=", this.sioUpgradeUserId, "&ti=", this.sioUpgradeTraceId + - +this.traceIdIncreamenter, "&cv=", this.clientVersion].join("");
            return !0 === this.nocookie && (t += "&nocookie=true"), t
        },
        _throw: function(t) {
            throw new Error(t)
        },
        io: function o(i, r, s) {
            function c(n, t) {
                if (!r[n]) {
                    if (!i[n]) {
                        var e = "function" == typeof require && require;
                        if (!t && e) return e(n, !0);
                        if (a) return a(n, !0);
                        throw new Error("Cannot find module '" + n + "'")
                    }
                    e = r[n] = {
                        exports: {}
                    };
                    i[n][0].call(e.exports, function(t) {
                        var e = i[n][1][t];
                        return c(e || t)
                    }, e, e.exports, o, i, r, s)
                }
                return r[n].exports
            }
            for (var a = "function" == typeof require && require, t = 0; t < s.length; t++) c(s[t]);
            return c
        }({
            1: [function(t, e, n) {
                e.exports = t("./lib/")
            }, {
                "./lib/": 2
            }],
            2: [function(t, e, n) {
                var r = t("./url"),
                    o = t("socket.io-parser"),
                    s = t("./manager"),
                    c = t("debug")("socket.io-client");
                e.exports = n = i;
                var a = n.managers = {};

                function i(t, e) {
                    "object" == typeof t && (e = t, t = void 0), e = e || {};
                    var n = r(t),
                        o = n.source,
                        i = n.id,
                        t = n.path,
                        t = a[i] && a[i].nsps[t] && t == a[i].nsps[t].nsp,
                        i = e.forceNew || e["force new connection"] || !1 === e.multiplex || t ? (c("ignoring socket cache for %s", o), s(o, e)) : (a[i] || (c("new io instance for %s", o), a[i] = s(o, e)), a[i]);
                    return i.socket(n.path)
                }
                n.protocol = o.protocol, n.connect = i, n.Manager = t("./manager"), n.Socket = t("./socket")
            }, {
                "./manager": 3,
                "./socket": 5,
                "./url": 6,
                debug: 10,
                "socket.io-parser": 44
            }],
            3: [function(t, e, n) {
                t("./url");
                var c = t("engine.io-client"),
                    o = t("./socket"),
                    i = t("component-emitter"),
                    r = t("socket.io-parser"),
                    a = t("./on"),
                    s = t("component-bind"),
                    h = (t("object-component"), t("debug")("socket.io-client:manager")),
                    u = t("indexof"),
                    l = t("backo2");

                function p(t, e) {
                    if (!(this instanceof p)) return new p(t, e);
                    t && "object" == typeof t && (e = t, t = void 0), (e = e || {}).path = e.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(!1 !== e.reconnection), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new l({
                        min: this.reconnectionDelay(),
                        max: this.reconnectionDelayMax(),
                        jitter: this.randomizationFactor()
                    }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", this.uri = t, this.connected = [], this.encoding = !1, this.packetBuffer = [], this.encoder = new r.Encoder, this.decoder = new r.Decoder, this.autoConnect = !1 !== e.autoConnect, this.autoConnect && this.open()
                }(e.exports = p).prototype.emitAll = function() {
                    for (var t in this.emit.apply(this, arguments), this.nsps) this.nsps[t].emit.apply(this.nsps[t], arguments)
                }, p.prototype.updateSocketIds = function() {
                    for (var t in this.nsps) this.nsps[t].id = this.engine.id
                }, i(p.prototype), p.prototype.reconnection = function(t) {
                    return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
                }, p.prototype.reconnectionAttempts = function(t) {
                    return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts
                }, p.prototype.reconnectionDelay = function(t) {
                    return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay
                }, p.prototype.randomizationFactor = function(t) {
                    return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor
                }, p.prototype.reconnectionDelayMax = function(t) {
                    return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax
                }, p.prototype.timeout = function(t) {
                    return arguments.length ? (this._timeout = t, this) : this._timeout
                }, p.prototype.maybeReconnectOnOpen = function() {
                    !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
                }, p.prototype.open = p.prototype.connect = function(n) {
                    if (h("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                    h("opening %s", this.uri), this.engine = c(this.uri, this.opts);
                    var t = this.engine,
                        o = this;
                    this.readyState = "opening", this.skipReconnect = !1;
                    var e, i, r = a(t, "open", function() {
                            o.onopen(), n && n()
                        }),
                        s = a(t, "error", function(t) {
                            var e;
                            h("connect_error"), o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", t), n ? ((e = new Error("Connection error")).data = t, n(e)) : o.maybeReconnectOnOpen()
                        });
                    return !1 !== this._timeout && (e = this._timeout, h("connect attempt will timeout after %d", e), i = setTimeout(function() {
                        h("connect attempt timed out after %d", e), r.destroy(), t.close(), t.emit("error", "timeout"), o.emitAll("connect_timeout", e)
                    }, e), this.subs.push({
                        destroy: function() {
                            clearTimeout(i)
                        }
                    })), this.subs.push(r), this.subs.push(s), this
                }, p.prototype.onopen = function() {
                    h("open"), this.cleanup(), this.readyState = "open", this.emit("open");
                    var t = this.engine;
                    this.subs.push(a(t, "data", s(this, "ondata"))), this.subs.push(a(this.decoder, "decoded", s(this, "ondecoded"))), this.subs.push(a(t, "error", s(this, "onerror"))), this.subs.push(a(t, "close", s(this, "onclose")))
                }, p.prototype.ondata = function(t) {
                    this.decoder.add(t)
                }, p.prototype.ondecoded = function(t) {
                    this.emit("packet", t)
                }, p.prototype.onerror = function(t) {
                    h("error", t), this.emitAll("error", t)
                }, p.prototype.socket = function(t) {
                    var e, n = this.nsps[t];
                    return n || (n = new o(this, t), this.nsps[t] = n, e = this, n.on("connect", function() {
                        n.id = e.engine.id, ~u(e.connected, n) || e.connected.push(n)
                    })), n
                }, p.prototype.destroy = function(t) {
                    t = u(this.connected, t);
                    ~t && this.connected.splice(t, 1), this.connected.length || this.close()
                }, p.prototype.packet = function(t) {
                    h("writing packet %j", t);
                    var n = this;
                    n.encoding ? n.packetBuffer.push(t) : (n.encoding = !0, this.encoder.encode(t, function(t) {
                        for (var e = 0; e < t.length; e++) n.engine.write(t[e]);
                        n.encoding = !1, n.processPacketQueue()
                    }))
                }, p.prototype.processPacketQueue = function() {
                    var t;
                    0 < this.packetBuffer.length && !this.encoding && (t = this.packetBuffer.shift(), this.packet(t))
                }, p.prototype.cleanup = function() {
                    for (var t; t = this.subs.shift();) t.destroy();
                    this.packetBuffer = [], this.encoding = !1, this.decoder.destroy()
                }, p.prototype.close = p.prototype.disconnect = function() {
                    this.skipReconnect = !0, this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
                }, p.prototype.onclose = function(t) {
                    h("close"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect()
                }, p.prototype.reconnect = function() {
                    if (this.reconnecting || this.skipReconnect) return this;
                    var t, e, n = this;
                    this.backoff.attempts >= this._reconnectionAttempts ? (h("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1) : (t = this.backoff.duration(), h("will wait %dms before reconnect attempt", t), this.reconnecting = !0, e = setTimeout(function() {
                        n.skipReconnect || (h("attempting reconnect"), n.emitAll("reconnect_attempt", n.backoff.attempts), n.emitAll("reconnecting", n.backoff.attempts), n.skipReconnect || n.open(function(t) {
                            t ? (h("reconnect attempt error"), n.reconnecting = !1, n.reconnect(), n.emitAll("reconnect_error", t.data)) : (h("reconnect success"), n.onreconnect())
                        }))
                    }, t), this.subs.push({
                        destroy: function() {
                            clearTimeout(e)
                        }
                    }))
                }, p.prototype.onreconnect = function() {
                    var t = this.backoff.attempts;
                    this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t)
                }
            }, {
                "./on": 4,
                "./socket": 5,
                "./url": 6,
                backo2: 7,
                "component-bind": 8,
                "component-emitter": 9,
                debug: 10,
                "engine.io-client": 11,
                indexof: 40,
                "object-component": 41,
                "socket.io-parser": 44
            }],
            4: [function(t, e, n) {
                e.exports = function(t, e, n) {
                    return t.on(e, n), {
                        destroy: function() {
                            t.removeListener(e, n)
                        }
                    }
                }
            }, {}],
            5: [function(t, e, n) {
                var r = t("socket.io-parser"),
                    o = t("component-emitter"),
                    s = t("to-array"),
                    i = t("./on"),
                    c = t("component-bind"),
                    a = t("debug")("socket.io-client:socket"),
                    h = t("has-binary");
                e.exports = p;
                var u = {
                        connect: 1,
                        connect_error: 1,
                        connect_timeout: 1,
                        disconnect: 1,
                        error: 1,
                        reconnect: 1,
                        reconnect_attempt: 1,
                        reconnect_failed: 1,
                        reconnect_error: 1,
                        reconnecting: 1
                    },
                    l = o.prototype.emit;

                function p(t, e) {
                    this.io = t, this.nsp = e, (this.json = this).ids = 0, this.acks = {}, this.io.autoConnect && this.open(), this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0
                }
                o(p.prototype), p.prototype.subEvents = function() {
                    var t;
                    this.subs || (t = this.io, this.subs = [i(t, "open", c(this, "onopen")), i(t, "packet", c(this, "onpacket")), i(t, "close", c(this, "onclose"))])
                }, p.prototype.open = p.prototype.connect = function() {
                    return this.connected || (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen()), this
                }, p.prototype.send = function() {
                    var t = s(arguments);
                    return t.unshift("message"), this.emit.apply(this, t), this
                }, p.prototype.emit = function(t) {
                    if (u.hasOwnProperty(t)) return l.apply(this, arguments), this;
                    var e = s(arguments),
                        n = r.EVENT,
                        n = {
                            type: n = h(e) ? r.BINARY_EVENT : n,
                            data: e
                        };
                    return "function" == typeof e[e.length - 1] && (a("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), n.id = this.ids++), this.connected ? this.packet(n) : this.sendBuffer.push(n), this
                }, p.prototype.packet = function(t) {
                    t.nsp = this.nsp, this.io.packet(t)
                }, p.prototype.onopen = function() {
                    a("transport is open - connecting"), "/" != this.nsp && this.packet({
                        type: r.CONNECT
                    })
                }, p.prototype.onclose = function(t) {
                    a("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t)
                }, p.prototype.onpacket = function(t) {
                    if (t.nsp == this.nsp) switch (t.type) {
                        case r.CONNECT:
                            this.onconnect();
                            break;
                        case r.EVENT:
                        case r.BINARY_EVENT:
                            this.onevent(t);
                            break;
                        case r.ACK:
                        case r.BINARY_ACK:
                            this.onack(t);
                            break;
                        case r.DISCONNECT:
                            this.ondisconnect();
                            break;
                        case r.ERROR:
                            this.emit("error", t.data)
                    }
                }, p.prototype.onevent = function(t) {
                    var e = t.data || [];
                    a("emitting event %j", e), null != t.id && (a("attaching ack callback to event"), e.push(this.ack(t.id))), this.connected ? l.apply(this, e) : this.receiveBuffer.push(e)
                }, p.prototype.ack = function(n) {
                    var o = this,
                        i = !1;
                    return function() {
                        var t, e;
                        i || (i = !0, t = s(arguments), a("sending ack %j", t), e = h(t) ? r.BINARY_ACK : r.ACK, o.packet({
                            type: e,
                            id: n,
                            data: t
                        }))
                    }
                }, p.prototype.onack = function(t) {
                    a("calling ack %s with %j", t.id, t.data), this.acks[t.id].apply(this, t.data), delete this.acks[t.id]
                }, p.prototype.onconnect = function() {
                    this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
                }, p.prototype.emitBuffered = function() {
                    for (var t = 0; t < this.receiveBuffer.length; t++) l.apply(this, this.receiveBuffer[t]);
                    for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
                    this.sendBuffer = []
                }, p.prototype.ondisconnect = function() {
                    a("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
                }, p.prototype.destroy = function() {
                    if (this.subs) {
                        for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                        this.subs = null
                    }
                    this.io.destroy(this)
                }, p.prototype.close = p.prototype.disconnect = function() {
                    return this.connected && (a("performing disconnect (%s)", this.nsp), this.packet({
                        type: r.DISCONNECT
                    })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
                }
            }, {
                "./on": 4,
                "component-bind": 8,
                "component-emitter": 9,
                debug: 10,
                "has-binary": 36,
                "socket.io-parser": 44,
                "to-array": 48
            }],
            6: [function(t, e, n) {
                ! function(o) {
                    var i = t("parseuri"),
                        r = t("debug")("socket.io-client:url");
                    e.exports = function(t, e) {
                        var n = t,
                            e = e || o.location;
                        null == t && (t = e.protocol + "//" + e.host);
                        "string" == typeof t && ("/" == t.charAt(0) && (t = "/" == t.charAt(1) ? e.protocol + t : e.hostname + t), /^(https?|wss?):\/\//.test(t) || (r("protocol-less url %s", t), t = void 0 !== e ? e.protocol + "//" + t : "https://" + t), r("parse %s", t), n = i(t));
                        n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443"));
                        return n.path = n.path || "/", n.id = n.protocol + "://" + n.host + ":" + n.port, n.href = n.protocol + "://" + n.host + (e && e.port == n.port ? "" : ":" + n.port), n
                    }
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                debug: 10,
                parseuri: 42
            }],
            7: [function(t, e, n) {
                function o(t) {
                    this.ms = (t = t || {}).min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = 0 < t.jitter && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
                }(e.exports = o).prototype.duration = function() {
                    var t, e, n = this.ms * Math.pow(this.factor, this.attempts++);
                    return this.jitter && (t = Math.random(), e = Math.floor(t * this.jitter * n), n = 0 == (1 & Math.floor(10 * t)) ? n - e : n + e), 0 | Math.min(n, this.max)
                }, o.prototype.reset = function() {
                    this.attempts = 0
                }, o.prototype.setMin = function(t) {
                    this.ms = t
                }, o.prototype.setMax = function(t) {
                    this.max = t
                }, o.prototype.setJitter = function(t) {
                    this.jitter = t
                }
            }, {}],
            8: [function(t, e, n) {
                var o = [].slice;
                e.exports = function(t, e) {
                    if ("function" != typeof(e = "string" == typeof e ? t[e] : e)) throw new Error("bind() requires a function");
                    var n = o.call(arguments, 2);
                    return function() {
                        return e.apply(t, n.concat(o.call(arguments)))
                    }
                }
            }, {}],
            9: [function(t, e, n) {
                function o(t) {
                    if (t) return function(t) {
                        for (var e in o.prototype) t[e] = o.prototype[e];
                        return t
                    }(t)
                }(e.exports = o).prototype.on = o.prototype.addEventListener = function(t, e) {
                    return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
                }, o.prototype.once = function(t, e) {
                    var n = this;

                    function o() {
                        n.off(t, o), e.apply(this, arguments)
                    }
                    return this._callbacks = this._callbacks || {}, o.fn = e, this.on(t, o), this
                }, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function(t, e) {
                    if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                    var n, o = this._callbacks[t];
                    if (!o) return this;
                    if (1 == arguments.length) return delete this._callbacks[t], this;
                    for (var i = 0; i < o.length; i++)
                        if ((n = o[i]) === e || n.fn === e) {
                            o.splice(i, 1);
                            break
                        }
                    return this
                }, o.prototype.emit = function(t) {
                    this._callbacks = this._callbacks || {};
                    var e = [].slice.call(arguments, 1),
                        n = this._callbacks[t];
                    if (n)
                        for (var o = 0, i = (n = n.slice(0)).length; o < i; ++o) n[o].apply(this, e);
                    return this
                }, o.prototype.listeners = function(t) {
                    return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
                }, o.prototype.hasListeners = function(t) {
                    return !!this.listeners(t).length
                }
            }, {}],
            10: [function(t, e, n) {
                function i(o) {
                    return i.enabled(o) ? function(t) {
                        t = (n = t) instanceof Error ? n.stack || n.message : n;
                        var e = new Date,
                            n = e - (i[o] || e);
                        i[o] = e, t = o + " " + t + " +" + i.humanize(n), window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                    } : function() {}
                }(e.exports = i).names = [], i.skips = [], i.enable = function(t) {
                    try {
                        localStorage.debug = t
                    } catch (t) {}
                    for (var e = (t || "").split(/[\s,]+/), n = e.length, o = 0; o < n; o++) "-" === (t = e[o].replace("*", ".*?"))[0] ? i.skips.push(new RegExp("^" + t.substr(1) + "$")) : i.names.push(new RegExp("^" + t + "$"))
                }, i.disable = function() {
                    i.enable("")
                }, i.humanize = function(t) {
                    return 36e5 <= t ? (t / 36e5).toFixed(1) + "h" : 6e4 <= t ? (t / 6e4).toFixed(1) + "m" : 1e3 <= t ? (t / 1e3 | 0) + "s" : t + "ms"
                }, i.enabled = function(t) {
                    for (var e = 0, n = i.skips.length; e < n; e++)
                        if (i.skips[e].test(t)) return !1;
                    for (e = 0, n = i.names.length; e < n; e++)
                        if (i.names[e].test(t)) return !0;
                    return !1
                };
                try {
                    window.localStorage && i.enable(localStorage.debug)
                } catch (t) {}
            }, {}],
            11: [function(t, e, n) {
                e.exports = t("./lib/")
            }, {
                "./lib/": 12
            }],
            12: [function(t, e, n) {
                e.exports = t("./socket"), e.exports.parser = t("engine.io-parser")
            }, {
                "./socket": 13,
                "engine.io-parser": 25
            }],
            13: [function(e, h, t) {
                ! function(n) {
                    var o = e("./transports"),
                        t = e("component-emitter"),
                        l = e("debug")("engine.io-client:socket"),
                        i = e("indexof"),
                        r = e("engine.io-parser"),
                        s = e("parseuri"),
                        c = e("parsejson"),
                        a = e("parseqs");

                    function p(t, e) {
                        if (!(this instanceof p)) return new p(t, e);
                        e = e || {}, t && "object" == typeof t && (e = t, t = null), t && (t = s(t), e.host = t.host, e.secure = "https" == t.protocol || "wss" == t.protocol, e.port = t.port, t.query && (e.query = t.query)), this.secure = null != e.secure ? e.secure : n.location && "https:" == location.protocol, e.host && (t = e.host.split(":"), e.hostname = t.shift(), t.length ? e.port = t.pop() : e.port || (e.port = this.secure ? "443" : "80")), this.agent = e.agent || !1, this.hostname = e.hostname || (n.location ? location.hostname : "localhost"), this.port = e.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), this.query = e.query || {}, "string" == typeof this.query && (this.query = a.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["polling"], this.readyState = "", this.writeBuffer = [], this.callbackBuffer = [], this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = e.rejectUnauthorized || null, this.open()
                    }(h.exports = p).priorWebsocketSuccess = !1, t(p.prototype), p.protocol = r.protocol, (p.Socket = p).Transport = e("./transport"), p.transports = e("./transports"), p.parser = e("engine.io-parser"), p.prototype.createTransport = function(t) {
                        l('creating transport "%s"', t);
                        var e = function(t) {
                            var e, n = {};
                            for (e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
                            return n
                        }(this.query);
                        return e.EIO = r.protocol, e.transport = t, this.id && (e.sid = this.id), new o[t]({
                            agent: this.agent,
                            hostname: this.hostname,
                            port: this.port,
                            secure: this.secure,
                            path: this.path,
                            query: e,
                            forceJSONP: this.forceJSONP,
                            jsonp: this.jsonp,
                            forceBase64: this.forceBase64,
                            enablesXDR: this.enablesXDR,
                            timestampRequests: this.timestampRequests,
                            timestampParam: this.timestampParam,
                            policyPort: this.policyPort,
                            socket: this,
                            pfx: this.pfx,
                            key: this.key,
                            passphrase: this.passphrase,
                            cert: this.cert,
                            ca: this.ca,
                            ciphers: this.ciphers,
                            rejectUnauthorized: this.rejectUnauthorized
                        })
                    }, p.prototype.open = function() {
                        var t;
                        if (this.rememberUpgrade && p.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) t = "websocket";
                        else {
                            if (0 == this.transports.length) {
                                var e = this;
                                return void setTimeout(function() {
                                    e.emit("error", "No transports available")
                                }, 0)
                            }
                            t = this.transports[0]
                        }
                        this.readyState = "opening";
                        try {
                            t = this.createTransport(t)
                        } catch (t) {
                            return this.transports.shift(), void this.open()
                        }
                        t.open(), this.setTransport(t)
                    }, p.prototype.setTransport = function(t) {
                        l("setting transport %s", t.name);
                        var e = this;
                        this.transport && (l("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), (this.transport = t).on("drain", function() {
                            e.onDrain()
                        }).on("packet", function(t) {
                            e.onPacket(t)
                        }).on("error", function(t) {
                            e.onError(t)
                        }).on("close", function() {
                            e.onClose("transport close")
                        })
                    }, p.prototype.probe = function(n) {
                        l('probing transport "%s"', n);
                        var o = this.createTransport(n, {
                                probe: 1
                            }),
                            e = !1,
                            i = this;

                        function t() {
                            var t;
                            i.onlyBinaryUpgrades && (t = !this.supportsBinary && i.transport.supportsBinary, e = e || t), e || (l('probe transport "%s" opened', n), o.send([{
                                type: "ping",
                                data: "probe"
                            }]), o.once("packet", function(t) {
                                e || ("pong" == t.type && "probe" == t.data ? (l('probe transport "%s" pong', n), i.upgrading = !0, i.emit("upgrading", o), o && (p.priorWebsocketSuccess = "websocket" == o.name, l('pausing current transport "%s"', i.transport.name), i.transport.pause(function() {
                                    e || "closed" != i.readyState && (l("changing transport and sending upgrade packet"), u(), i.setTransport(o), o.send([{
                                        type: "upgrade"
                                    }]), i.emit("upgrade", o), o = null, i.upgrading = !1, i.flush())
                                }))) : (l('probe transport "%s" failed', n), (t = new Error("probe error")).transport = o.name, i.emit("upgradeError", t)))
                            }))
                        }

                        function r() {
                            e || (e = !0, u(), o.close(), o = null)
                        }

                        function s(t) {
                            var e = new Error("probe error: " + t);
                            e.transport = o.name, r(), l('probe transport "%s" failed because of error: %s', n, t), i.emit("upgradeError", e)
                        }

                        function c() {
                            s("transport closed")
                        }

                        function a() {
                            s("socket closed")
                        }

                        function h(t) {
                            o && t.name != o.name && (l('"%s" works - aborting "%s"', t.name, o.name), r())
                        }

                        function u() {
                            o.removeListener("open", t), o.removeListener("error", s), o.removeListener("close", c), i.removeListener("close", a), i.removeListener("upgrading", h)
                        }
                        p.priorWebsocketSuccess = !1, o.once("open", t), o.once("error", s), o.once("close", c), this.once("close", a), this.once("upgrading", h), o.open()
                    }, p.prototype.onOpen = function() {
                        if (l("socket open"), this.readyState = "open", p.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                            l("starting upgrade probes");
                            for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
                        }
                    }, p.prototype.onPacket = function(t) {
                        if ("opening" == this.readyState || "open" == this.readyState) switch (l('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
                            case "open":
                                this.onHandshake(c(t.data));
                                break;
                            case "pong":
                                this.setPing();
                                break;
                            case "error":
                                var e = new Error("server error");
                                e.code = t.data, this.emit("error", e);
                                break;
                            case "message":
                                this.emit("data", t.data), this.emit("message", t.data)
                        } else l('packet received with socket readyState "%s"', this.readyState)
                    }, p.prototype.onHandshake = function(t) {
                        this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                    }, p.prototype.onHeartbeat = function(t) {
                        clearTimeout(this.pingTimeoutTimer);
                        var e = this;
                        e.pingTimeoutTimer = setTimeout(function() {
                            "closed" != e.readyState && e.onClose("ping timeout")
                        }, t || e.pingInterval + e.pingTimeout)
                    }, p.prototype.setPing = function() {
                        var t = this;
                        clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
                            l("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
                        }, t.pingInterval)
                    }, p.prototype.ping = function() {
                        this.sendPacket("ping")
                    }, p.prototype.onDrain = function() {
                        for (var t = 0; t < this.prevBufferLen; t++) this.callbackBuffer[t] && this.callbackBuffer[t]();
                        this.writeBuffer.splice(0, this.prevBufferLen), this.callbackBuffer.splice(0, this.prevBufferLen), (this.prevBufferLen = 0) == this.writeBuffer.length ? this.emit("drain") : this.flush()
                    }, p.prototype.flush = function() {
                        "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (l("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                    }, p.prototype.write = p.prototype.send = function(t, e) {
                        return this.sendPacket("message", t, e), this
                    }, p.prototype.sendPacket = function(t, e, n) {
                        "closing" != this.readyState && "closed" != this.readyState && (this.emit("packetCreate", e = {
                            type: t,
                            data: e
                        }), this.writeBuffer.push(e), this.callbackBuffer.push(n), this.flush())
                    }, p.prototype.close = function() {
                        function t() {
                            o.onClose("forced close"), l("socket closing - telling transport to close"), o.transport.close()
                        }

                        function e() {
                            o.removeListener("upgrade", e), o.removeListener("upgradeError", e), t()
                        }

                        function n() {
                            o.once("upgrade", e), o.once("upgradeError", e)
                        }
                        var o;
                        return "opening" != this.readyState && "open" != this.readyState || (this.readyState = "closing", (o = this).writeBuffer.length ? this.once("drain", function() {
                            (this.upgrading ? n : t)()
                        }) : (this.upgrading ? n : t)()), this
                    }, p.prototype.onError = function(t) {
                        l("socket error %j", t), p.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
                    }, p.prototype.onClose = function(t, e) {
                        var n;
                        "opening" != this.readyState && "open" != this.readyState && "closing" != this.readyState || (l('socket close with reason: "%s"', t), n = this, clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), setTimeout(function() {
                            n.writeBuffer = [], n.callbackBuffer = [], n.prevBufferLen = 0
                        }, 0), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e))
                    }, p.prototype.filterUpgrades = function(t) {
                        for (var e = [], n = 0, o = t.length; n < o; n++) ~i(this.transports, t[n]) && e.push(t[n]);
                        return e
                    }
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "./transport": 14,
                "./transports": 15,
                "component-emitter": 9,
                debug: 22,
                "engine.io-parser": 25,
                indexof: 40,
                parsejson: 32,
                parseqs: 33,
                parseuri: 34
            }],
            14: [function(t, e, n) {
                var o = t("engine.io-parser");

                function i(t) {
                    this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized
                }
                t("component-emitter")((e.exports = i).prototype), i.timestamps = 0, i.prototype.onError = function(t, e) {
                    t = new Error(t);
                    return t.type = "TransportError", t.description = e, this.emit("error", t), this
                }, i.prototype.open = function() {
                    return "closed" != this.readyState && "" != this.readyState || (this.readyState = "opening", this.doOpen()), this
                }, i.prototype.close = function() {
                    return "opening" != this.readyState && "open" != this.readyState || (this.doClose(), this.onClose()), this
                }, i.prototype.send = function(t) {
                    if ("open" != this.readyState) throw new Error("Transport not open");
                    this.write(t)
                }, i.prototype.onOpen = function() {
                    this.readyState = "open", this.writable = !0, this.emit("open")
                }, i.prototype.onData = function(t) {
                    t = o.decodePacket(t, this.socket.binaryType);
                    this.onPacket(t)
                }, i.prototype.onPacket = function(t) {
                    this.emit("packet", t)
                }, i.prototype.onClose = function() {
                    this.readyState = "closed", this.emit("close")
                }
            }, {
                "component-emitter": 9,
                "engine.io-parser": 25
            }],
            15: [function(e, t, n) {
                ! function(s) {
                    var c = e("xmlhttprequest"),
                        a = e("./polling-xhr"),
                        h = e("./polling-jsonp"),
                        t = e("./websocket");
                    n.polling = function(t) {
                        var e = !1,
                            n = !1,
                            o = !1 !== t.jsonp; {
                            var i, r;
                            s.location && (i = "https:" == location.protocol, r = (r = location.port) || (i ? 443 : 80), e = t.hostname != location.hostname || r != t.port, n = t.secure != i)
                        } {
                            if (t.xdomain = e, t.xscheme = n, "open" in new c(t) && !t.forceJSONP) return new a(t);
                            if (!o) throw new Error("JSONP disabled");
                            return new h(t)
                        }
                    }, n.websocket = t
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "./polling-jsonp": 16,
                "./polling-xhr": 17,
                "./websocket": 19,
                xmlhttprequest: 20
            }],
            16: [function(s, c, t) {
                ! function(n) {
                    var o = s("./polling"),
                        t = s("component-inherit");
                    c.exports = e;
                    var i, h = /\n/g,
                        u = /\\n/g;

                    function r() {}

                    function e(t) {
                        o.call(this, t), this.query = this.query || {}, i || (n.___eio || (n.___eio = []), i = n.___eio), this.index = i.length;
                        var e = this;
                        i.push(function(t) {
                            e.onData(t)
                        }), this.query.j = this.index, n.document && n.addEventListener && n.addEventListener("beforeunload", function() {
                            e.script && (e.script.onerror = r)
                        }, !1)
                    }
                    t(e, o), e.prototype.supportsBinary = !1, e.prototype.doClose = function() {
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), o.prototype.doClose.call(this)
                    }, e.prototype.doPoll = function() {
                        var e = this,
                            t = document.createElement("script");
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function(t) {
                            e.onError("jsonp poll error", t)
                        };
                        var n = document.getElementsByTagName("script")[0];
                        n.parentNode.insertBefore(t, n), this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                            var t = document.createElement("iframe");
                            document.body.appendChild(t), document.body.removeChild(t)
                        }, 100)
                    }, e.prototype.doWrite = function(t, e) {
                        var n, o, i, r, s = this;

                        function c() {
                            a(), e()
                        }

                        function a() {
                            if (s.iframe) try {
                                s.form.removeChild(s.iframe)
                            } catch (t) {
                                s.onError("jsonp polling iframe removal error", t)
                            }
                            try {
                                var t = '<iframe src="javascript:0" name="' + s.iframeId + '">';
                                r = document.createElement(t)
                            } catch (t) {
                                (r = document.createElement("iframe")).name = s.iframeId, r.src = "javascript:0"
                            }
                            r.id = s.iframeId, s.form.appendChild(r), s.iframe = r
                        }
                        this.form || (n = document.createElement("form"), o = document.createElement("textarea"), i = this.iframeId = "eio_iframe_" + this.index, n.className = "socketio", n.style.position = "absolute", n.style.top = "-1000px", n.style.left = "-1000px", n.target = i, n.method = "POST", n.setAttribute("accept-charset", "utf-8"), o.name = "d", n.appendChild(o), document.body.appendChild(n), this.form = n, this.area = o), this.form.action = this.uri(), a(), t = t.replace(u, "\\\n"), this.area.value = t.replace(h, "\\n");
                        try {
                            this.form.submit()
                        } catch (t) {}
                        this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                            "complete" == s.iframe.readyState && c()
                        } : this.iframe.onload = c
                    }
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "./polling": 18,
                "component-inherit": 21
            }],
            17: [function(u, l, t) {
                ! function(o) {
                    var i = u("xmlhttprequest"),
                        r = u("./polling"),
                        t = u("component-emitter"),
                        e = u("component-inherit"),
                        s = u("debug")("engine.io-client:polling-xhr");

                    function n() {}

                    function c(t) {
                        var e, n;
                        r.call(this, t), o.location && (e = "https:" == location.protocol, n = (n = location.port) || (e ? 443 : 80), this.xd = t.hostname != o.location.hostname || n != t.port, this.xs = t.secure != e)
                    }

                    function a(t) {
                        this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async, this.data = null != t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary = t.supportsBinary, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.create()
                    }

                    function h() {
                        for (var t in a.requests) a.requests.hasOwnProperty(t) && a.requests[t].abort()
                    }
                    l.exports = c, l.exports.Request = a, e(c, r), c.prototype.supportsBinary = !0, c.prototype.request = function(t) {
                        return (t = t || {}).uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary = this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, new a(t)
                    }, c.prototype.doWrite = function(t, e) {
                        var t = this.request({
                                method: "POST",
                                data: t,
                                isBinary: "string" != typeof t && void 0 !== t
                            }),
                            n = this;
                        t.on("success", e), t.on("error", function(t) {
                            n.onError("xhr post error", t)
                        }), this.sendXhr = t
                    }, c.prototype.doPoll = function() {
                        s("xhr poll");
                        var t = this.request(),
                            e = this;
                        t.on("data", function(t) {
                            e.onData(t)
                        }), t.on("error", function(t) {
                            e.onError("xhr poll error", t)
                        }), this.pollXhr = t
                    }, t(a.prototype), a.prototype.create = function() {
                        var t = {
                            agent: this.agent,
                            xdomain: this.xd,
                            xscheme: this.xs,
                            enablesXDR: this.enablesXDR
                        };
                        t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
                        var e = this.xhr = new i(t),
                            n = this;
                        try {
                            if (s("xhr open %s: %s", this.method, this.uri), e.open(this.method, this.uri, this.async), this.supportsBinary && (e.responseType = "arraybuffer"), "POST" == this.method) try {
                                this.isBinary ? e.setRequestHeader("Content-type", "application/octet-stream") : e.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                            } catch (t) {}
                            "withCredentials" in e && (e.withCredentials = !0), this.hasXDR() ? (e.onload = function() {
                                n.onLoad()
                            }, e.onerror = function() {
                                n.onError(e.responseText)
                            }) : e.onreadystatechange = function() {
                                4 == e.readyState && (200 == e.status || 1223 == e.status ? n.onLoad() : setTimeout(function() {
                                    n.onError(e.status)
                                }, 0))
                            }, s("xhr data %s", this.data), e.send(this.data)
                        } catch (t) {
                            return void setTimeout(function() {
                                n.onError(t)
                            }, 0)
                        }
                        o.document && (this.index = a.requestsCount++, a.requests[this.index] = this)
                    }, a.prototype.onSuccess = function() {
                        this.emit("success"), this.cleanup()
                    }, a.prototype.onData = function(t) {
                        this.emit("data", t), this.onSuccess()
                    }, a.prototype.onError = function(t) {
                        this.emit("error", t), this.cleanup(!0)
                    }, a.prototype.cleanup = function(t) {
                        if (void 0 !== this.xhr && null !== this.xhr) {
                            if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = n : this.xhr.onreadystatechange = n, t) try {
                                this.xhr.abort()
                            } catch (t) {}
                            o.document && delete a.requests[this.index], this.xhr = null
                        }
                    }, a.prototype.onLoad = function() {
                        var t, e;
                        try {
                            try {
                                e = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                            } catch (t) {}
                            t = "application/octet-stream" === e ? this.xhr.response : this.supportsBinary ? "ok" : this.xhr.responseText
                        } catch (t) {
                            this.onError(t)
                        }
                        null != t && this.onData(t)
                    }, a.prototype.hasXDR = function() {
                        return void 0 !== o.XDomainRequest && !this.xs && this.enablesXDR
                    }, a.prototype.abort = function() {
                        this.cleanup()
                    }, o.document && (a.requestsCount = 0, a.requests = {}, o.attachEvent ? o.attachEvent("onunload", h) : o.addEventListener && o.addEventListener("beforeunload", h, !1))
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "./polling": 18,
                "component-emitter": 9,
                "component-inherit": 21,
                debug: 22,
                xmlhttprequest: 20
            }],
            18: [function(t, e, n) {
                var o = t("../transport"),
                    i = t("parseqs"),
                    r = t("engine.io-parser"),
                    s = t("component-inherit"),
                    c = t("debug")("engine.io-client:polling");
                e.exports = h;
                var a = null != new(t("xmlhttprequest"))({
                    xdomain: !1
                }).responseType;

                function h(t) {
                    var e = t && t.forceBase64;
                    a && !e || (this.supportsBinary = !1), o.call(this, t)
                }
                s(h, o), h.prototype.name = "polling", h.prototype.doOpen = function() {
                    this.poll()
                }, h.prototype.pause = function(t) {
                    var e, n = this;

                    function o() {
                        c("paused"), n.readyState = "paused", t()
                    }
                    this.readyState = "pausing", this.polling || !this.writable ? (e = 0, this.polling && (c("we are currently polling - waiting to pause"), e++, this.once("pollComplete", function() {
                        c("pre-pause polling complete"), --e || o()
                    })), this.writable || (c("we are currently writing - waiting to pause"), e++, this.once("drain", function() {
                        c("pre-pause writing complete"), --e || o()
                    }))) : o()
                }, h.prototype.poll = function() {
                    c("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
                }, h.prototype.onData = function(t) {
                    var o = this;
                    c("polling got data %s", t);
                    r.decodePayload(t, this.socket.binaryType, function(t, e, n) {
                        if ("opening" == o.readyState && o.onOpen(), "close" == t.type) return o.onClose(), !1;
                        o.onPacket(t)
                    }), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState))
                }, h.prototype.doClose = function() {
                    var t = this;

                    function e() {
                        c("writing close packet"), t.write([{
                            type: "close"
                        }])
                    }
                    "open" == this.readyState ? (c("transport open - closing"), e()) : (c("transport not open - deferring close"), this.once("open", e))
                }, h.prototype.write = function(t) {
                    this.writable = !1;

                    function e() {
                        n.writable = !0, n.emit("drain")
                    }
                    var n = this;
                    r.encodePayload(t, this.supportsBinary, function(t) {
                        n.doWrite(t, e)
                    })
                }, h.prototype.uri = function() {
                    var t = this.query || {},
                        e = this.secure ? "https" : "http",
                        n = "";
                    return !1 !== this.timestampRequests && (t[this.timestampParam] = +new Date + "-" + o.timestamps++), this.supportsBinary || t.sid || (t.b64 = 1), t = i.encode(t), this.port && ("https" == e && 443 != this.port || "http" == e && 80 != this.port) && (n = ":" + this.port), t.length && (t = "?" + t), e + "://" + this.hostname + n + this.path + t
                }
            }, {
                "../transport": 14,
                "component-inherit": 21,
                debug: 22,
                "engine.io-parser": 25,
                parseqs: 33,
                xmlhttprequest: 20
            }],
            19: [function(t, e, n) {
                var o = t("../transport"),
                    i = t("engine.io-parser"),
                    r = t("parseqs"),
                    s = t("component-inherit"),
                    c = t("debug")("engine.io-client:websocket"),
                    a = t("ws");

                function h(t) {
                    t && t.forceBase64 && (this.supportsBinary = !1), o.call(this, t)
                }
                s(e.exports = h, o), h.prototype.name = "websocket", h.prototype.supportsBinary = !0, h.prototype.doOpen = function() {
                    var t, e;
                    this.check() && (t = this.uri(), (e = {
                        agent: this.agent
                    }).pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, this.ws = new a(t, void 0, e), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.binaryType = "arraybuffer", this.addEventListeners())
                }, h.prototype.addEventListeners = function() {
                    var e = this;
                    this.ws.onopen = function() {
                        e.onOpen()
                    }, this.ws.onclose = function() {
                        e.onClose()
                    }, this.ws.onmessage = function(t) {
                        e.onData(t.data)
                    }, this.ws.onerror = function(t) {
                        e.onError("websocket error", t)
                    }
                }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (h.prototype.onData = function(t) {
                    var e = this;
                    setTimeout(function() {
                        o.prototype.onData.call(e, t)
                    }, 0)
                }), h.prototype.write = function(t) {
                    var e = this;
                    this.writable = !1;
                    for (var n = 0, o = t.length; n < o; n++) i.encodePacket(t[n], this.supportsBinary, function(t) {
                        try {
                            e.ws.send(t)
                        } catch (t) {
                            c("websocket closed before onclose event")
                        }
                    });
                    setTimeout(function() {
                        e.writable = !0, e.emit("drain")
                    }, 0)
                }, h.prototype.onClose = function() {
                    o.prototype.onClose.call(this)
                }, h.prototype.doClose = function() {
                    void 0 !== this.ws && this.ws.close()
                }, h.prototype.uri = function() {
                    var t = this.query || {},
                        e = this.secure ? "wss" : "ws",
                        n = "";
                    return this.port && ("wss" == e && 443 != this.port || "ws" == e && 80 != this.port) && (n = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = +new Date), this.supportsBinary || (t.b64 = 1), (t = r.encode(t)).length && (t = "?" + t), e + "://" + this.hostname + n + this.path + t
                }, h.prototype.check = function() {
                    return !(!a || "__initialize" in a && this.name === h.prototype.name)
                }
            }, {
                "../transport": 14,
                "component-inherit": 21,
                debug: 22,
                "engine.io-parser": 25,
                parseqs: 33,
                ws: 35
            }],
            20: [function(t, e, n) {
                var o = t("has-cors");
                e.exports = function(t) {
                    var e = t.xdomain,
                        n = t.xscheme,
                        t = t.enablesXDR;
                    try {
                        if ("undefined" != typeof XMLHttpRequest && (!e || o)) return new XMLHttpRequest
                    } catch (t) {}
                    try {
                        if ("undefined" != typeof XDomainRequest && !n && t) return new XDomainRequest
                    } catch (t) {}
                    if (!e) try {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (t) {}
                }
            }, {
                "has-cors": 38
            }],
            21: [function(t, e, n) {
                e.exports = function(t, e) {
                    function n() {}
                    n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
                }
            }, {}],
            22: [function(t, e, i) {
                function n() {
                    var t;
                    try {
                        t = localStorage.debug
                    } catch (t) {}
                    return t
                }(i = e.exports = t("./debug")).log = function() {
                    return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
                }, i.formatArgs = function() {
                    var t = arguments,
                        e = this.useColors;
                    if (t[0] = (e ? "%c" : "") + this.namespace + (e ? " %c" : " ") + t[0] + (e ? "%c " : " ") + "+" + i.humanize(this.diff), !e) return t;
                    e = "color: " + this.color;
                    t = [t[0], e, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
                    var n = 0,
                        o = 0;
                    return t[0].replace(/%[a-z%]/g, function(t) {
                        "%%" !== t && (n++, "%c" === t && (o = n))
                    }), t.splice(o, 0, e), t
                }, i.save = function(t) {
                    try {
                        null == t ? localStorage.removeItem("debug") : localStorage.debug = t
                    } catch (t) {}
                }, i.load = n, i.useColors = function() {
                    return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10)
                }, i.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], i.formatters.j = function(t) {
                    return JSON.stringify(t)
                }, i.enable(n())
            }, {
                "./debug": 23
            }],
            23: [function(t, e, s) {
                (s = e.exports = function(t) {
                    function e() {}

                    function n() {
                        var o = n,
                            t = +new Date,
                            e = t - (c || t);
                        o.diff = e, o.prev = c, o.curr = t, c = t, null == o.useColors && (o.useColors = s.useColors()), null == o.color && o.useColors && (o.color = s.colors[a++ % s.colors.length]);
                        var i = Array.prototype.slice.call(arguments);
                        i[0] = s.coerce(i[0]), "string" != typeof i[0] && (i = ["%o"].concat(i));
                        var r = 0;
                        i[0] = i[0].replace(/%([a-z%])/g, function(t, e) {
                            if ("%%" === t) return t;
                            r++;
                            var n = s.formatters[e];
                            return "function" == typeof n && (e = i[r], t = n.call(o, e), i.splice(r, 1), r--), t
                        }), "function" == typeof s.formatArgs && (i = s.formatArgs.apply(o, i)), (n.log || s.log || console.log.bind(console)).apply(o, i)
                    }
                    e.enabled = !1, n.enabled = !0;
                    var o = s.enabled(t) ? n : e;
                    return o.namespace = t, o
                }).coerce = function(t) {
                    return t instanceof Error ? t.stack || t.message : t
                }, s.disable = function() {
                    s.enable("")
                }, s.enable = function(t) {
                    s.save(t);
                    for (var e = (t || "").split(/[\s,]+/), n = e.length, o = 0; o < n; o++) e[o] && ("-" === (t = e[o].replace(/\*/g, ".*?"))[0] ? s.skips.push(new RegExp("^" + t.substr(1) + "$")) : s.names.push(new RegExp("^" + t + "$")))
                }, s.enabled = function(t) {
                    var e, n;
                    for (e = 0, n = s.skips.length; e < n; e++)
                        if (s.skips[e].test(t)) return !1;
                    for (e = 0, n = s.names.length; e < n; e++)
                        if (s.names[e].test(t)) return !0;
                    return !1
                }, s.humanize = t("ms"), s.names = [], s.skips = [], s.formatters = {};
                var c, a = 0
            }, {
                ms: 24
            }],
            24: [function(t, e, n) {
                var o = 36e5,
                    i = 864e5;

                function r(t, e, n) {
                    if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s"
                }
                e.exports = function(t, e) {
                    return e = e || {}, "string" == typeof t ? function(t) {
                        t = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(t);
                        if (t) {
                            var e = parseFloat(t[1]);
                            switch ((t[2] || "ms").toLowerCase()) {
                                case "years":
                                case "year":
                                case "y":
                                    return 315576e5 * e;
                                case "days":
                                case "day":
                                case "d":
                                    return e * i;
                                case "hours":
                                case "hour":
                                case "h":
                                    return e * o;
                                case "minutes":
                                case "minute":
                                case "m":
                                    return 6e4 * e;
                                case "seconds":
                                case "second":
                                case "s":
                                    return 1e3 * e;
                                case "ms":
                                    return e
                            }
                        }
                    }(t) : e.long ? r(e = t, i, "day") || r(e, o, "hour") || r(e, 6e4, "minute") || r(e, 1e3, "second") || e + " ms" : i <= (t = t) ? Math.round(t / i) + "d" : o <= t ? Math.round(t / o) + "h" : 6e4 <= t ? Math.round(t / 6e4) + "m" : 1e3 <= t ? Math.round(t / 1e3) + "s" : t + "ms"
                }
            }, {}],
            25: [function(g, t, y) {
                ! function(h) {
                    var t = g("./keys"),
                        e = g("has-binary"),
                        f = g("arraybuffer.slice"),
                        o = g("base64-arraybuffer"),
                        s = g("after"),
                        r = g("utf8"),
                        n = navigator.userAgent.match(/Android/i),
                        i = /PhantomJS/i.test(navigator.userAgent),
                        c = n || i;
                    y.protocol = 3;
                    var a = y.packets = {
                            open: 0,
                            close: 1,
                            ping: 2,
                            pong: 3,
                            message: 4,
                            upgrade: 5,
                            noop: 6
                        },
                        u = t(a),
                        d = {
                            type: "error",
                            data: "parser error"
                        },
                        l = g("blob");

                    function p(t, e, n) {
                        for (var i = new Array(t.length), o = s(t.length, n), r = 0; r < t.length; r++) ! function(n, t, o) {
                            e(t, function(t, e) {
                                i[n] = e, o(t, i)
                            })
                        }(r, t[r], o)
                    }
                    y.encodePacket = function(t, e, n, o) {
                        "function" == typeof e && (o = e, e = !1), "function" == typeof n && (o = n, n = null);
                        var i = void 0 === t.data ? void 0 : t.data.buffer || t.data;
                        if (h.ArrayBuffer && i instanceof ArrayBuffer) return function(t, e, n) {
                            if (!e) return y.encodeBase64Packet(t, n);
                            var e = t.data,
                                o = new Uint8Array(e),
                                i = new Uint8Array(1 + e.byteLength);
                            i[0] = a[t.type];
                            for (var r = 0; r < o.length; r++) i[r + 1] = o[r];
                            return n(i.buffer)
                        }(t, e, o);
                        if (l && i instanceof h.Blob) return function(t, e, n) {
                            if (!e) return y.encodeBase64Packet(t, n);
                            if (c) return function(t, e, n) {
                                if (!e) return y.encodeBase64Packet(t, n);
                                var o = new FileReader;
                                return o.onload = function() {
                                    t.data = o.result, y.encodePacket(t, e, !0, n)
                                }, o.readAsArrayBuffer(t.data)
                            }(t, e, n);
                            e = new Uint8Array(1);
                            e[0] = a[t.type];
                            t = new l([e.buffer, t.data]);
                            return n(t)
                        }(t, e, o);
                        if (i && i.base64) return function(t, e) {
                            t = "b" + y.packets[t.type] + t.data.data;
                            return e(t)
                        }(t, o);
                        i = a[t.type];
                        return void 0 !== t.data && (i += n ? r.encode(String(t.data)) : String(t.data)), o("" + i)
                    }, y.encodeBase64Packet = function(e, n) {
                        var o, i = "b" + y.packets[e.type];
                        if (l && e.data instanceof l) {
                            var r = new FileReader;
                            return r.onload = function() {
                                var t = r.result.split(",")[1];
                                n(i + t)
                            }, r.readAsDataURL(e.data)
                        }
                        try {
                            o = String.fromCharCode.apply(null, new Uint8Array(e.data))
                        } catch (t) {
                            for (var s = new Uint8Array(e.data), c = new Array(s.length), a = 0; a < s.length; a++) c[a] = s[a];
                            o = String.fromCharCode.apply(null, c)
                        }
                        return i += h.btoa(o), n(i)
                    }, y.decodePacket = function(t, e, n) {
                        if ("string" == typeof t || void 0 === t) {
                            if ("b" == t.charAt(0)) return y.decodeBase64Packet(t.substr(1), e);
                            if (n) try {
                                t = r.decode(t)
                            } catch (t) {
                                return d
                            }
                            var o = t.charAt(0);
                            return Number(o) == o && u[o] ? 1 < t.length ? {
                                type: u[o],
                                data: t.substring(1)
                            } : {
                                type: u[o]
                            } : d
                        }
                        o = new Uint8Array(t)[0], t = f(t, 1);
                        return l && "blob" === e && (t = new l([t])), {
                            type: u[o],
                            data: t
                        }
                    }, y.decodeBase64Packet = function(t, e) {
                        var n = u[t.charAt(0)];
                        if (!h.ArrayBuffer) return {
                            type: n,
                            data: {
                                base64: !0,
                                data: t.substr(1)
                            }
                        };
                        t = o.decode(t.substr(1));
                        return {
                            type: n,
                            data: t = "blob" === e && l ? new l([t]) : t
                        }
                    }, y.encodePayload = function(t, n, o) {
                        "function" == typeof n && (o = n, n = null);
                        var i = e(t);
                        return n && i ? l && !c ? y.encodePayloadAsBlob(t, o) : y.encodePayloadAsArrayBuffer(t, o) : t.length ? void p(t, function(t, e) {
                            y.encodePacket(t, !!i && n, !0, function(t) {
                                e(null, t.length + ":" + t)
                            })
                        }, function(t, e) {
                            return o(e.join(""))
                        }) : o("0:")
                    }, y.decodePayload = function(t, e, n) {
                        if ("string" != typeof t) return y.decodePayloadAsBinary(t, e, n);
                        if ("function" == typeof e && (n = e, e = null), "" == t) return n(d, 0, 1);
                        for (var o, i = "", r = 0, s = t.length; r < s; r++) {
                            var c = t.charAt(r);
                            if (":" != c) i += c;
                            else {
                                if ("" == i || i != (o = Number(i))) return n(d, 0, 1);
                                if (i != (c = t.substr(r + 1, o)).length) return n(d, 0, 1);
                                if (c.length) {
                                    if (c = y.decodePacket(c, e, !0), d.type == c.type && d.data == c.data) return n(d, 0, 1);
                                    if (!1 === n(c, r + o, s)) return
                                }
                                r += o, i = ""
                            }
                        }
                        return "" != i ? n(d, 0, 1) : void 0
                    }, y.encodePayloadAsArrayBuffer = function(t, o) {
                        if (!t.length) return o(new ArrayBuffer(0));
                        p(t, function(t, e) {
                            y.encodePacket(t, !0, !0, function(t) {
                                return e(null, t)
                            })
                        }, function(t, e) {
                            var n = e.reduce(function(t, e) {
                                    e = "string" == typeof e ? e.length : e.byteLength;
                                    return t + e.toString().length + e + 2
                                }, 0),
                                s = new Uint8Array(n),
                                c = 0;
                            return e.forEach(function(t) {
                                var e = "string" == typeof t,
                                    n = t;
                                if (e) {
                                    for (var o = new Uint8Array(t.length), i = 0; i < t.length; i++) o[i] = t.charCodeAt(i);
                                    n = o.buffer
                                }
                                s[c++] = e ? 0 : 1;
                                for (var r = n.byteLength.toString(), i = 0; i < r.length; i++) s[c++] = parseInt(r[i]);
                                s[c++] = 255;
                                for (o = new Uint8Array(n), i = 0; i < o.length; i++) s[c++] = o[i]
                            }), o(s.buffer)
                        })
                    }, y.encodePayloadAsBlob = function(t, n) {
                        p(t, function(t, s) {
                            y.encodePacket(t, !0, !0, function(t) {
                                var e = new Uint8Array(1);
                                if (e[0] = 1, "string" == typeof t) {
                                    for (var n = new Uint8Array(t.length), o = 0; o < t.length; o++) n[o] = t.charCodeAt(o);
                                    t = n.buffer, e[0] = 0
                                }
                                for (var i = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString(), r = new Uint8Array(i.length + 1), o = 0; o < i.length; o++) r[o] = parseInt(i[o]);
                                r[i.length] = 255, l && (e = new l([e.buffer, r.buffer, t]), s(null, e))
                            })
                        }, function(t, e) {
                            return n(new l(e))
                        })
                    }, y.decodePayloadAsBinary = function(t, n, o) {
                        "function" == typeof n && (o = n, n = null);
                        for (var e = t, i = [], r = !1; 0 < e.byteLength;) {
                            for (var s = new Uint8Array(e), c = 0 === s[0], a = "", h = 1; 255 != s[h]; h++) {
                                if (310 < a.length) {
                                    r = !0;
                                    break
                                }
                                a += s[h]
                            }
                            if (r) return o(d, 0, 1);
                            var e = f(e, 2 + a.length),
                                a = parseInt(a),
                                u = f(e, 0, a);
                            if (c) try {
                                u = String.fromCharCode.apply(null, new Uint8Array(u))
                            } catch (t) {
                                for (var l = new Uint8Array(u), u = "", h = 0; h < l.length; h++) u += String.fromCharCode(l[h])
                            }
                            i.push(u), e = f(e, a)
                        }
                        var p = i.length;
                        i.forEach(function(t, e) {
                            o(y.decodePacket(t, n, !0), e, p)
                        })
                    }
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "./keys": 26,
                after: 27,
                "arraybuffer.slice": 28,
                "base64-arraybuffer": 29,
                blob: 30,
                "has-binary": 36,
                utf8: 31
            }],
            26: [function(t, e, n) {
                e.exports = Object.keys || function(t) {
                    var e, n = [],
                        o = Object.prototype.hasOwnProperty;
                    for (e in t) o.call(t, e) && n.push(e);
                    return n
                }
            }, {}],
            27: [function(t, e, n) {
                function s() {}
                e.exports = function(t, n, o) {
                    var i = !1;
                    return o = o || s, 0 === (r.count = t) ? n() : r;

                    function r(t, e) {
                        if (r.count <= 0) throw new Error("after called too many times");
                        --r.count, t ? (i = !0, n(t), n = o) : 0 !== r.count || i || n(null, e)
                    }
                }
            }, {}],
            28: [function(t, e, n) {
                e.exports = function(t, e, n) {
                    var o = t.byteLength;
                    if (e = e || 0, n = n || o, t.slice) return t.slice(e, n);
                    if (e < 0 && (e += o), n < 0 && (n += o), o < n && (n = o), o <= e || n <= e || 0 === o) return new ArrayBuffer(0);
                    for (var i = new Uint8Array(t), r = new Uint8Array(n - e), s = e, c = 0; s < n; s++, c++) r[c] = i[s];
                    return r.buffer
                }
            }, {}],
            29: [function(t, e, n) {
                ! function(u) {
                    "use strict";
                    n.encode = function(t) {
                        for (var e = new Uint8Array(t), n = e.length, o = "", i = 0; i < n; i += 3) o += u[e[i] >> 2], o += u[(3 & e[i]) << 4 | e[i + 1] >> 4], o += u[(15 & e[i + 1]) << 2 | e[i + 2] >> 6], o += u[63 & e[i + 2]];
                        return n % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : n % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="), o
                    }, n.decode = function(t) {
                        var e, n, o, i, r = .75 * t.length,
                            s = t.length,
                            c = 0;
                        "=" === t[t.length - 1] && (r--, "=" === t[t.length - 2] && r--);
                        for (var r = new ArrayBuffer(r), a = new Uint8Array(r), h = 0; h < s; h += 4) e = u.indexOf(t[h]), n = u.indexOf(t[h + 1]), o = u.indexOf(t[h + 2]), i = u.indexOf(t[h + 3]), a[c++] = e << 2 | n >> 4, a[c++] = (15 & n) << 4 | o >> 2, a[c++] = (3 & o) << 6 | 63 & i;
                        return r
                    }
                }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
            }, {}],
            30: [function(t, a, e) {
                ! function(t) {
                    var i = t.BlobBuilder || t.WebKitBlobBuilder || t.MSBlobBuilder || t.MozBlobBuilder,
                        e = function() {
                            try {
                                return 2 === new Blob(["hi"]).size
                            } catch (t) {
                                return !1
                            }
                        }(),
                        n = e && function() {
                            try {
                                return 2 === new Blob([new Uint8Array([1, 2])]).size
                            } catch (t) {
                                return !1
                            }
                        }(),
                        o = i && i.prototype.append && i.prototype.getBlob;

                    function r(t) {
                        for (var e = 0; e < t.length; e++) {
                            var n, o, i = t[e];
                            i.buffer instanceof ArrayBuffer && (n = i.buffer, i.byteLength !== n.byteLength && ((o = new Uint8Array(i.byteLength)).set(new Uint8Array(n, i.byteOffset, i.byteLength)), n = o.buffer), t[e] = n)
                        }
                    }

                    function s(t, e) {
                        e = e || {};
                        var n = new i;
                        r(t);
                        for (var o = 0; o < t.length; o++) n.append(t[o]);
                        return e.type ? n.getBlob(e.type) : n.getBlob()
                    }

                    function c(t, e) {
                        return r(t), new Blob(t, e || {})
                    }
                    a.exports = e ? n ? t.Blob : c : o ? s : void 0
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            31: [function(t, y, m) {
                ! function(g) {
                    ! function(t) {
                        var e = "object" == typeof m && m,
                            n = "object" == typeof y && y && y.exports == e && y,
                            o = "object" == typeof g && g;
                        o.global !== o && o.window !== o || (t = o);
                        var i, r, s, c = String.fromCharCode;

                        function a(t) {
                            for (var e, n, o = [], i = 0, r = t.length; i < r;) 55296 <= (e = t.charCodeAt(i++)) && e <= 56319 && i < r ? 56320 == (64512 & (n = t.charCodeAt(i++))) ? o.push(((1023 & e) << 10) + (1023 & n) + 65536) : (o.push(e), i--) : o.push(e);
                            return o
                        }

                        function h(t) {
                            if (55296 <= t && t <= 57343) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value")
                        }

                        function u(t, e) {
                            return c(t >> e & 63 | 128)
                        }

                        function l() {
                            if (r <= s) throw Error("Invalid byte index");
                            var t = 255 & i[s];
                            if (s++, 128 == (192 & t)) return 63 & t;
                            throw Error("Invalid continuation byte")
                        }
                        var p = {
                            version: "2.0.0",
                            encode: function(t) {
                                for (var e = a(t), n = e.length, o = -1, i = ""; ++o < n;) i += function(t) {
                                    if (0 == (4294967168 & t)) return c(t);
                                    var e = "";
                                    return 0 == (4294965248 & t) ? e = c(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (h(t), e = c(t >> 12 & 15 | 224), e += u(t, 6)) : 0 == (4292870144 & t) && (e = c(t >> 18 & 7 | 240), e += u(t, 12), e += u(t, 6)), e += c(63 & t | 128)
                                }(e[o]);
                                return i
                            },
                            decode: function(t) {
                                i = a(t), r = i.length, s = 0;
                                for (var e, n = []; !1 !== (e = function() {
                                        var t, e;
                                        if (r < s) throw Error("Invalid byte index");
                                        if (s == r) return !1;
                                        if (t = 255 & i[s], s++, 0 == (128 & t)) return t;
                                        if (192 == (224 & t)) {
                                            if (128 <= (e = (31 & t) << 6 | l())) return e;
                                            throw Error("Invalid continuation byte")
                                        }
                                        if (224 == (240 & t)) {
                                            if (2048 <= (e = (15 & t) << 12 | l() << 6 | l())) return h(e), e;
                                            throw Error("Invalid continuation byte")
                                        }
                                        if (240 == (248 & t) && 65536 <= (e = (15 & t) << 18 | l() << 12 | l() << 6 | l()) && e <= 1114111) return e;
                                        throw Error("Invalid UTF-8 detected")
                                    }());) n.push(e);
                                return function(t) {
                                    for (var e, n = t.length, o = -1, i = ""; ++o < n;) 65535 < (e = t[o]) && (i += c((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), i += c(e);
                                    return i
                                }(n)
                            }
                        };
                        if (0, e && !e.nodeType)
                            if (n) n.exports = p;
                            else {
                                var f, d = {}.hasOwnProperty;
                                for (f in p) d.call(p, f) && (e[f] = p[f])
                            }
                        else t.utf8 = p
                    }(this)
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            32: [function(t, a, e) {
                ! function(e) {
                    var n = /^[\],:{}\s]*$/,
                        o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                        i = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        r = /(?:^|:|,)(?:\s*\[)+/g,
                        s = /^\s+/,
                        c = /\s+$/;
                    a.exports = function(t) {
                        return "string" == typeof t && t ? (t = t.replace(s, "").replace(c, ""), e.JSON && JSON.parse ? JSON.parse(t) : n.test(t.replace(o, "@").replace(i, "]").replace(r, "")) ? new Function("return " + t)() : void 0) : null
                    }
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            33: [function(t, e, n) {
                n.encode = function(t) {
                    var e, n = "";
                    for (e in t) t.hasOwnProperty(e) && (n.length && (n += "&"), n += encodeURIComponent(e) + "=" + encodeURIComponent(t[e]));
                    return n
                }, n.decode = function(t) {
                    for (var e = {}, n = t.split("&"), o = 0, i = n.length; o < i; o++) {
                        var r = n[o].split("=");
                        e[decodeURIComponent(r[0])] = decodeURIComponent(r[1])
                    }
                    return e
                }
            }, {}],
            34: [function(t, e, n) {
                var c = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    a = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                e.exports = function(t) {
                    var e = t,
                        n = t.indexOf("["),
                        o = t.indexOf("]"); - 1 != n && -1 != o && (t = t.substring(0, n) + t.substring(n, o).replace(/:/g, ";") + t.substring(o, t.length));
                    for (var i = c.exec(t || ""), r = {}, s = 14; s--;) r[a[s]] = i[s] || "";
                    return -1 != n && -1 != o && (r.source = e, r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":"), r.authority = r.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), r.ipv6uri = !0), r
                }
            }, {}],
            35: [function(t, e, n) {
                var o = function() {
                        return this
                    }(),
                    i = o.WebSocket || o.MozWebSocket;

                function r(t, e, n) {
                    t = e ? new i(t, e) : new i(t);
                    return t
                }
                e.exports = i ? r : null, i && (r.prototype = i.prototype)
            }, {}],
            36: [function(t, e, n) {
                ! function(i) {
                    var r = t("isarray");
                    e.exports = function(t) {
                        return function t(e) {
                            if (!e) return !1;
                            if (i.Buffer && i.Buffer.isBuffer(e) || i.ArrayBuffer && e instanceof ArrayBuffer || i.Blob && e instanceof Blob || i.File && e instanceof File) return !0;
                            if (r(e)) {
                                for (var n = 0; n < e.length; n++)
                                    if (t(e[n])) return !0
                            } else if (e && "object" == typeof e)
                                for (var o in e = e.toJSON ? e.toJSON() : e)
                                    if (Object.prototype.hasOwnProperty.call(e, o) && t(e[o])) return !0;
                            return !1
                        }(t)
                    }
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                isarray: 37
            }],
            37: [function(t, e, n) {
                e.exports = Array.isArray || function(t) {
                    return "[object Array]" == Object.prototype.toString.call(t)
                }
            }, {}],
            38: [function(t, e, n) {
                t = t("global");
                try {
                    e.exports = "XMLHttpRequest" in t && "withCredentials" in new t.XMLHttpRequest
                } catch (t) {
                    e.exports = !1
                }
            }, {
                global: 39
            }],
            39: [function(t, e, n) {
                e.exports = function() {
                    return this
                }()
            }, {}],
            40: [function(t, e, n) {
                var o = [].indexOf;
                e.exports = function(t, e) {
                    if (o) return t.indexOf(e);
                    for (var n = 0; n < t.length; ++n)
                        if (t[n] === e) return n;
                    return -1
                }
            }, {}],
            41: [function(t, e, n) {
                var o = Object.prototype.hasOwnProperty;
                n.keys = Object.keys || function(t) {
                    var e, n = [];
                    for (e in t) o.call(t, e) && n.push(e);
                    return n
                }, n.values = function(t) {
                    var e, n = [];
                    for (e in t) o.call(t, e) && n.push(t[e]);
                    return n
                }, n.merge = function(t, e) {
                    for (var n in e) o.call(e, n) && (t[n] = e[n]);
                    return t
                }, n.length = function(t) {
                    return n.keys(t).length
                }, n.isEmpty = function(t) {
                    return 0 == n.length(t)
                }
            }, {}],
            42: [function(t, e, n) {
                var i = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                e.exports = function(t) {
                    for (var e = i.exec(t || ""), n = {}, o = 14; o--;) n[r[o]] = e[o] || "";
                    return n
                }
            }, {}],
            43: [function(t, e, n) {
                ! function(u) {
                    var l = t("isarray"),
                        p = t("./is-buffer");
                    n.deconstructPacket = function(t) {
                        var s = [],
                            e = t.data;
                        return t.data = function t(e) {
                            if (!e) return e;
                            if (p(e)) {
                                var n = {
                                    _placeholder: !0,
                                    num: s.length
                                };
                                return s.push(e), n
                            }
                            if (l(e)) {
                                for (var o = new Array(e.length), i = 0; i < e.length; i++) o[i] = t(e[i]);
                                return o
                            }
                            if ("object" != typeof e || e instanceof Date) return e;
                            var r, o = {};
                            for (r in e) o[r] = t(e[r]);
                            return o
                        }(e), t.attachments = s.length, {
                            packet: t,
                            buffers: s
                        }
                    }, n.reconstructPacket = function(t, i) {
                        return t.data = function t(e) {
                            if (e && e._placeholder) return i[e.num];
                            if (l(e)) {
                                for (var n = 0; n < e.length; n++) e[n] = t(e[n]);
                                return e
                            }
                            if (e && "object" == typeof e) {
                                for (var o in e) e[o] = t(e[o]);
                                return e
                            }
                            return e
                        }(t.data), t.attachments = void 0, t
                    }, n.removeBlobs = function(t, c) {
                        var a = 0,
                            h = t;
                        ! function t(e, n, o) {
                            if (!e) return e;
                            if (u.Blob && e instanceof Blob || u.File && e instanceof File) {
                                a++;
                                var i = new FileReader;
                                i.onload = function() {
                                    o ? o[n] = this.result : h = this.result, --a || c(h)
                                }, i.readAsArrayBuffer(e)
                            } else if (l(e))
                                for (var r = 0; r < e.length; r++) t(e[r], r, e);
                            else if (e && "object" == typeof e && !p(e))
                                for (var s in e) t(e[s], s, e)
                        }(h), a || c(h)
                    }
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "./is-buffer": 45,
                isarray: 46
            }],
            44: [function(t, e, s) {
                var c = t("debug")("socket.io-parser"),
                    a = t("json3"),
                    n = (t("isarray"), t("component-emitter")),
                    o = t("./binary"),
                    i = t("./is-buffer");

                function r() {}

                function h(t) {
                    var e = "",
                        n = !1;
                    return e += t.type, s.BINARY_EVENT != t.type && s.BINARY_ACK != t.type || (e += t.attachments, e += "-"), t.nsp && "/" != t.nsp && (n = !0, e += t.nsp), null != t.id && (n && (e += ",", n = !1), e += t.id), null != t.data && (n && (e += ","), e += a.stringify(t.data)), c("encoded %j as %s", t, e), e
                }

                function u() {
                    this.reconstructor = null
                }

                function l(t) {
                    this.reconPack = t, this.buffers = []
                }

                function p() {
                    return {
                        type: s.ERROR,
                        data: "parser error"
                    }
                }
                s.protocol = 4, s.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"], s.CONNECT = 0, s.DISCONNECT = 1, s.EVENT = 2, s.ACK = 3, s.ERROR = 4, s.BINARY_EVENT = 5, s.BINARY_ACK = 6, s.Encoder = r, s.Decoder = u, r.prototype.encode = function(t, e) {
                    var n;
                    c("encoding packet %j", t), s.BINARY_EVENT == t.type || s.BINARY_ACK == t.type ? (n = e, o.removeBlobs(t, function(t) {
                        var e = o.deconstructPacket(t),
                            t = h(e.packet);
                        (e = e.buffers).unshift(t), n(e)
                    })) : e([h(t)])
                }, n(u.prototype), u.prototype.add = function(t) {
                    var e;
                    if ("string" == typeof t) e = function(t) {
                        var e = {},
                            n = 0;
                        if (e.type = Number(t.charAt(0)), null == s.types[e.type]) return p();
                        if (s.BINARY_EVENT == e.type || s.BINARY_ACK == e.type) {
                            for (var o = "";
                                "-" != t.charAt(++n) && (o += t.charAt(n), n != t.length););
                            if (o != Number(o) || "-" != t.charAt(n)) throw new Error("Illegal attachments");
                            e.attachments = Number(o)
                        }
                        if ("/" == t.charAt(n + 1))
                            for (e.nsp = ""; ++n;) {
                                if ("," == (r = t.charAt(n))) break;
                                if (e.nsp += r, n == t.length) break
                            } else e.nsp = "/";
                        var i = t.charAt(n + 1);
                        if ("" !== i && Number(i) == i) {
                            for (e.id = ""; ++n;) {
                                var r;
                                if (null == (r = t.charAt(n)) || Number(r) != r) {
                                    --n;
                                    break
                                }
                                if (e.id += t.charAt(n), n == t.length) break
                            }
                            e.id = Number(e.id)
                        }
                        if (t.charAt(++n)) try {
                            e.data = a.parse(t.substr(n))
                        } catch (t) {
                            return p()
                        }
                        return c("decoded %s as %j", t, e), e
                    }(t), s.BINARY_EVENT == e.type || s.BINARY_ACK == e.type ? (this.reconstructor = new l(e), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", e)) : this.emit("decoded", e);
                    else {
                        if (!i(t) && !t.base64) throw new Error("Unknown type: " + t);
                        if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                        (e = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, this.emit("decoded", e))
                    }
                }, u.prototype.destroy = function() {
                    this.reconstructor && this.reconstructor.finishedReconstruction()
                }, l.prototype.takeBinaryData = function(t) {
                    if (this.buffers.push(t), this.buffers.length != this.reconPack.attachments) return null;
                    t = o.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), t
                }, l.prototype.finishedReconstruction = function() {
                    this.reconPack = null, this.buffers = []
                }
            }, {
                "./binary": 43,
                "./is-buffer": 45,
                "component-emitter": 9,
                debug: 10,
                isarray: 46,
                json3: 47
            }],
            45: [function(t, n, e) {
                ! function(e) {
                    n.exports = function(t) {
                        return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer
                    }
                }.call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            46: [function(t, e, n) {
                e.exports = t(37)
            }, {}],
            47: [function(t, e, O) {
                ! function(t) {
                    var w, I, x = {}.toString,
                        e = "object" == typeof JSON && JSON,
                        c = "object" == typeof O && O && !O.nodeType && O;
                    c && e ? (c.stringify = e.stringify, c.parse = e.parse) : c = t.JSON = e || {};
                    var u, C, _, S, a, A, n, T, l, h, o, R, p, B, E, f, d, g, y, m, i, r, s, b, U, k = new Date(-0xc782b5b800cec);
                    try {
                        k = -109252 == k.getUTCFullYear() && 0 === k.getUTCMonth() && 1 === k.getUTCDate() && 10 == k.getUTCHours() && 37 == k.getUTCMinutes() && 6 == k.getUTCSeconds() && 708 == k.getUTCMilliseconds()
                    } catch (t) {}

                    function v(t) {
                        if (v[t] !== I) return v[t];
                        var e;
                        if ("bug-string-char-index" == t) e = "a" != "a" [0];
                        else if ("json" == t) e = v("json-stringify") && v("json-parse");
                        else {
                            var n = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                            if ("json-stringify" == t) {
                                var o = c.stringify,
                                    i = "function" == typeof o && k;
                                if (i) {
                                    (r = function() {
                                        return 1
                                    }).toJSON = r;
                                    try {
                                        i = "0" === o(0) && "0" === o(new Number) && '""' == o(new String) && o(x) === I && o(I) === I && o() === I && "1" === o(r) && "[1]" == o([r]) && "[null]" == o([I]) && "null" == o(null) && "[null,null,null]" == o([I, x, null]) && o({
                                            a: [r, !0, !1, null, "\0\b\n\f\r\t"]
                                        }) == n && "1" === o(null, r) && "[\n 1,\n 2\n]" == o([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == o(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == o(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == o(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == o(new Date(-1))
                                    } catch (t) {
                                        i = !1
                                    }
                                }
                                e = i
                            }
                            if ("json-parse" == t) {
                                i = c.parse;
                                if ("function" == typeof i) try {
                                    if (0 === i("0") && !i(!1)) {
                                        var r, s = 5 == (r = i(n)).a.length && 1 === r.a[0];
                                        if (s) {
                                            try {
                                                s = !i('"\t"')
                                            } catch (t) {}
                                            if (s) try {
                                                s = 1 !== i("01")
                                            } catch (t) {}
                                            if (s) try {
                                                s = 1 !== i("1.")
                                            } catch (t) {}
                                        }
                                    }
                                } catch (t) {
                                    s = !1
                                }
                                e = s
                            }
                        }
                        return v[t] = !!e
                    }
                    v("json") || (u = "[object Function]", C = "[object Number]", _ = "[object String]", S = "[object Array]", a = v("bug-string-char-index"), k || (A = Math.floor, n = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], T = function(t, e) {
                        return n[e] + 365 * (t - 1970) + A((t - 1969 + (e = +(1 < e))) / 4) - A((t - 1901 + e) / 100) + A((t - 1601 + e) / 400)
                    }), (w = {}.hasOwnProperty) || (w = function(t) {
                        var n, e = {
                            __proto__: null
                        };
                        return e.__proto__ = {
                            toString: 1
                        }, w = e.toString != x ? function(t) {
                            var e = this.__proto__,
                                t = t in (this.__proto__ = null, this);
                            return this.__proto__ = e, t
                        } : (n = e.constructor, function(t) {
                            var e = (this.constructor || n).prototype;
                            return t in this && !(t in e && this[t] === e[t])
                        }), e = null, w.call(this, t)
                    }), l = {
                        boolean: 1,
                        number: 1,
                        string: 1,
                        undefined: 1
                    }, U = function(t, e) {
                        var n, h, o, i = 0;
                        for (o in (n = function() {
                                this.valueOf = 0
                            }).prototype.valueOf = 0, h = new n) w.call(h, o) && i++;
                        return h = null, (U = i ? 2 == i ? function(t, e) {
                            var n, o = {},
                                i = x.call(t) == u;
                            for (n in t) i && "prototype" == n || w.call(o, n) || !(o[n] = 1) || !w.call(t, n) || e(n)
                        } : function(t, e) {
                            var n, o, i = x.call(t) == u;
                            for (n in t) i && "prototype" == n || !w.call(t, n) || (o = "constructor" === n) || e(n);
                            (o || w.call(t, n = "constructor")) && e(n)
                        } : (h = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], function(t, e) {
                            var n, o, i, r, s, c = x.call(t) == u,
                                a = c || "function" == typeof t.constructor || ("object" == (s = typeof(i = t)[r = "hasOwnProperty"]) ? !i[r] : l[s]) ? w : t.hasOwnProperty;
                            for (n in t) c && "prototype" == n || !a.call(t, n) || e(n);
                            for (o = h.length; n = h[--o]; a.call(t, n) && e(n));
                        }))(t, e)
                    }, v("json-stringify") || (h = {
                        92: "\\\\",
                        34: '\\"',
                        8: "\\b",
                        12: "\\f",
                        10: "\\n",
                        13: "\\r",
                        9: "\\t"
                    }, o = "000000", R = function(t, e) {
                        return (o + (e || 0)).slice(-t)
                    }, p = "\\u00", B = function(t) {
                        var e, n = '"',
                            o = 0,
                            i = t.length,
                            r = 10 < i && a;
                        for (r && (e = t.split("")); o < i; o++) {
                            var s = t.charCodeAt(o);
                            switch (s) {
                                case 8:
                                case 9:
                                case 10:
                                case 12:
                                case 13:
                                case 34:
                                case 92:
                                    n += h[s];
                                    break;
                                default:
                                    if (s < 32) {
                                        n += p + R(2, s.toString(16));
                                        break
                                    }
                                    n += r ? e[o] : a ? t.charAt(o) : t[o]
                            }
                        }
                        return n + '"'
                    }, E = function(t, e, n, o, i, r, s) {
                        var c, a, h, u, l, p, f, d, g, y, m, b, k, v;
                        try {
                            c = e[t]
                        } catch (t) {}
                        if ("object" == typeof c && c)
                            if ("[object Date]" != (a = x.call(c)) || w.call(c, "toJSON")) "function" == typeof c.toJSON && (a != C && a != _ && a != S || w.call(c, "toJSON")) && (c = c.toJSON(t));
                            else if (-1 / 0 < c && c < 1 / 0) {
                            if (T) {
                                for (l = A(c / 864e5), h = A(l / 365.2425) + 1970 - 1; T(h + 1, 0) <= l; h++);
                                for (u = A((l - T(h, 0)) / 30.42); T(h, u + 1) <= l; u++);
                                l = 1 + l - T(h, u), p = A((g = (c % 864e5 + 864e5) % 864e5) / 36e5) % 24, f = A(g / 6e4) % 60, d = A(g / 1e3) % 60, g = g % 1e3
                            } else h = c.getUTCFullYear(), u = c.getUTCMonth(), l = c.getUTCDate(), p = c.getUTCHours(), f = c.getUTCMinutes(), d = c.getUTCSeconds(), g = c.getUTCMilliseconds();
                            c = (h <= 0 || 1e4 <= h ? (h < 0 ? "-" : "+") + R(6, h < 0 ? -h : h) : R(4, h)) + "-" + R(2, u + 1) + "-" + R(2, l) + "T" + R(2, p) + ":" + R(2, f) + ":" + R(2, d) + "." + R(3, g) + "Z"
                        } else c = null;
                        if (null === (c = n ? n.call(e, t, c) : c)) return "null";
                        if ("[object Boolean]" == (a = x.call(c))) return "" + c;
                        if (a == C) return -1 / 0 < c && c < 1 / 0 ? "" + c : "null";
                        if (a == _) return B("" + c);
                        if ("object" == typeof c) {
                            for (k = s.length; k--;)
                                if (s[k] === c) throw TypeError();
                            if (s.push(c), y = [], t = r, r += i, a == S) {
                                for (b = 0, k = c.length; b < k; b++) m = E(b, c, n, o, i, r, s), y.push(m === I ? "null" : m);
                                v = y.length ? i ? "[\n" + r + y.join(",\n" + r) + "\n" + t + "]" : "[" + y.join(",") + "]" : "[]"
                            } else U(o || c, function(t) {
                                var e = E(t, c, n, o, i, r, s);
                                e !== I && y.push(B(t) + ":" + (i ? " " : "") + e)
                            }), v = y.length ? i ? "{\n" + r + y.join(",\n" + r) + "\n" + t + "}" : "{" + y.join(",") + "}" : "{}";
                            return s.pop(), v
                        }
                    }, c.stringify = function(t, e, n) {
                        var o, i, r;
                        if ("function" == typeof e || "object" == typeof e && e)
                            if ((r = x.call(e)) == u) i = e;
                            else if (r == S)
                            for (var s, c = {}, a = 0, h = e.length; a < h; s = e[a++], (r = x.call(s)) != _ && r != C || (c[s] = 1));
                        if (n)
                            if ((r = x.call(n)) == C) {
                                if (0 < (n -= n % 1))
                                    for (o = "", 10 < n && (n = 10); o.length < n; o += " ");
                            } else r == _ && (o = n.length <= 10 ? n : n.slice(0, 10));
                        return E("", ((s = {})[""] = t, s), i, c, o, "", [])
                    }), v("json-parse") || (f = String.fromCharCode, d = {
                        92: "\\",
                        34: '"',
                        47: "/",
                        98: "\b",
                        116: "\t",
                        110: "\n",
                        102: "\f",
                        114: "\r"
                    }, m = function() {
                        throw g = y = null, SyntaxError()
                    }, i = function() {
                        for (var t, e, n, o, i, r = y, s = r.length; g < s;) switch (i = r.charCodeAt(g)) {
                            case 9:
                            case 10:
                            case 13:
                            case 32:
                                g++;
                                break;
                            case 123:
                            case 125:
                            case 91:
                            case 93:
                            case 58:
                            case 44:
                                return t = a ? r.charAt(g) : r[g], g++, t;
                            case 34:
                                for (t = "@", g++; g < s;)
                                    if ((i = r.charCodeAt(g)) < 32) m();
                                    else if (92 == i) switch (i = r.charCodeAt(++g)) {
                                    case 92:
                                    case 34:
                                    case 47:
                                    case 98:
                                    case 116:
                                    case 110:
                                    case 102:
                                    case 114:
                                        t += d[i], g++;
                                        break;
                                    case 117:
                                        for (e = ++g, n = g + 4; g < n; g++) 48 <= (i = r.charCodeAt(g)) && i <= 57 || 97 <= i && i <= 102 || 65 <= i && i <= 70 || m();
                                        t += f("0x" + r.slice(e, g));
                                        break;
                                    default:
                                        m()
                                } else {
                                    if (34 == i) break;
                                    for (i = r.charCodeAt(g), e = g; 32 <= i && 92 != i && 34 != i;) i = r.charCodeAt(++g);
                                    t += r.slice(e, g)
                                }
                                if (34 == r.charCodeAt(g)) return g++, t;
                                m();
                            default:
                                if (e = g, 45 == i && (o = !0, i = r.charCodeAt(++g)), 48 <= i && i <= 57) {
                                    for (48 == i && (48 <= (i = r.charCodeAt(g + 1)) && i <= 57) && m(), o = !1; g < s && (48 <= (i = r.charCodeAt(g)) && i <= 57); g++);
                                    if (46 == r.charCodeAt(g)) {
                                        for (n = ++g; n < s && (48 <= (i = r.charCodeAt(n)) && i <= 57); n++);
                                        n == g && m(), g = n
                                    }
                                    if (101 == (i = r.charCodeAt(g)) || 69 == i) {
                                        for (43 != (i = r.charCodeAt(++g)) && 45 != i || g++, n = g; n < s && (48 <= (i = r.charCodeAt(n)) && i <= 57); n++);
                                        n == g && m(), g = n
                                    }
                                    return +r.slice(e, g)
                                }
                                if (o && m(), "true" == r.slice(g, g + 4)) return g += 4, !0;
                                if ("false" == r.slice(g, g + 5)) return g += 5, !1;
                                if ("null" == r.slice(g, g + 4)) return g += 4, null;
                                m()
                        }
                        return "$"
                    }, r = function(t) {
                        var e, n;
                        if ("$" == t && m(), "string" == typeof t) {
                            if ("@" == (a ? t.charAt(0) : t[0])) return t.slice(1);
                            if ("[" == t) {
                                for (e = [];
                                    "]" != (t = i()); n = n || !0) !n || "," == t && "]" != (t = i()) || m(), "," == t && m(), e.push(r(t));
                                return e
                            }
                            if ("{" == t) {
                                for (e = {};
                                    "}" != (t = i()); n = n || !0) !n || "," == t && "}" != (t = i()) || m(), "," != t && "string" == typeof t && "@" == (a ? t.charAt(0) : t[0]) && ":" == i() || m(), e[t.slice(1)] = r(i());
                                return e
                            }
                            m()
                        }
                        return t
                    }, s = function(t, e, n) {
                        n = b(t, e, n);
                        n === I ? delete t[e] : t[e] = n
                    }, b = function(t, e, n) {
                        var o, i = t[e];
                        if ("object" == typeof i && i)
                            if (x.call(i) == S)
                                for (o = i.length; o--;) s(i, o, n);
                            else U(i, function(t) {
                                s(i, t, n)
                            });
                        return n.call(t, e, i)
                    }, c.parse = function(t, e) {
                        var n;
                        return g = 0, y = "" + t, n = r(i()), "$" != i() && m(), g = y = null, e && x.call(e) == u ? b(((t = {})[""] = n, t), "", e) : n
                    }))
                }(this)
            }, {}],
            48: [function(t, e, n) {
                e.exports = function(t, e) {
                    for (var n = [], o = (e = e || 0) || 0; o < t.length; o++) n[o - e] = t[o];
                    return n
                }
            }, {}]
        }, {}, [1])(1)
    }, t
}();
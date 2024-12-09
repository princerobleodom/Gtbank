(function en() {
    function bb() {
        bb = Object.assign || function(u) {
            for (var t, z = 1, R = arguments.length; z < R; z++) {
                t = arguments[z];
                for (var ka in t) Object.prototype.hasOwnProperty.call(t, ka) && (u[ka] = t[ka])
            }
            return u
        };
        return bb.apply(this, arguments)
    }

    function kb(u, t) {
        return Ua(u) && "href" === t ? 1 : rb(u) && "value" === t ? 32 : Oa.Sd.some(function(z) {
            return z.test(t)
        }) ? 16 : Xa(u) && "value" === t ? 2 === eb(u) ? 16 : 1 : 1
    }

    function eb(u) {
        if (Pa(u) || Pa(u.parentNode)) return 1;
        Tb.has(u) && tc.set(u, tc.get(u) | 8);
        zb.has(u) && tc.set(u, tc.get(u) | 2);
        Va.has(u) &&
            (Oa.qb ? pc.set(u, pc.get(u) | 1) : pc.set(u, pc.get(u) | 4));
        Za(u) && u.hasAttribute("data-dtrum-mask") && (Sa(u) ? pc.set(u, pc.get(u) | 4) : tc.set(u, tc.get(u) | 10));
        if (tc.has(u)) return tc.get(u);
        if (pc.has(u)) return pc.get(u);
        var t = u,
            z = !1;
        t.nodeType === Node.TEXT_NODE && (t = t.parentNode, z = !0);
        var R = Sa(t);
        var ka = z;
        void 0 === ka && (ka = !1);
        ka = !R || ka || "OPTION" === t.nodeName ? (R ? pc : tc).get(ka ? t : t.parentNode) : void 0;
        var La = void 0;
        R && cb(Oa.ub, t) && (La |= 4);
        !R && cb(Oa.sb, t) && (La |= 2);
        !R && cb(Oa.yb, t) && (La |= 8);
        if (La || R) a: if (R = void 0 === R ?
                !1 : R, z = void 0 === z ? !1 : z, !R && La) ka = La;
            else {
                if (R) {
                    La = La && !(La & 1) || Oa.qb ? (!La || La & 1) && Oa.qb || La && !(La & 1) && !Oa.qb ? t.parentNode && Sa(t.parentNode) ? ka && !(ka & 1) : !0 : !1 : ka && !(ka & 1);
                    if (z && La) {
                        ka = ka ? ka : 2;
                        break a
                    }
                    if (La) {
                        ka = cb(va, t) || t instanceof HTMLFormElement && "text" === t.type ? 4 : 8;
                        break a
                    }
                }
                ka = 1
            }
        else ka = ka ? ka : 1;
        Sa(u) ? pc.set(u, pc.get(u) | ka) : tc.set(u, tc.get(u) | ka);
        return ka
    }

    function cb(u, t) {
        for (var z = 0; z < u.length; z++)
            if (L.matchesSelector(t, u[z])) return !0;
        return !1
    }

    function Ta(u, t) {
        u.forEach(function(z) {
            [].slice.call(document.querySelectorAll(z)).forEach(function(R) {
                t.has(R) ||
                    t.set(R, z)
            })
        })
    }

    function Sa(u) {
        return Xa(u) ? !1 : -1 !== Z.indexOf(u.nodeName)
    }

    function Xa(u) {
        return u && "INPUT" === u.nodeName ? (u = u.getAttribute("type")) ? -1 !== ja.indexOf(u.toLowerCase()) : !1 : !1
    }

    function Ua(u) {
        return Za(u) && "link" === u.nodeName.toLowerCase()
    }

    function Pa(u) {
        return Za(u) && "style" === u.nodeName.toLowerCase()
    }

    function Za(u) {
        return u && u.nodeType && 1 === u.nodeType
    }

    function rb(u) {
        return u && "INPUT" === u.nodeName && "password" === u.type.toLowerCase()
    }

    function qa(u, t, z, R) {
        if (t && "object" === typeof t || "function" ===
            typeof t)
            for (var ka = Fa(t), La = 0, ob = ka.length, ib; La < ob; La++) ib = ka[La], Ja.call(u, ib) || ib === z || Ba(u, ib, {
                get: function(Ab) {
                    return t[Ab]
                }.bind(null, ib),
                enumerable: !(R = ya(t, ib)) || R.enumerable
            });
        return u
    }

    function ta(u, t, z, R) {
        function ka(La) {
            return La instanceof z ? La : new z(function(ob) {
                ob(La)
            })
        }
        return new(z || (z = D))(function(La, ob) {
            function ib(Zb) {
                try {
                    Bb(R.next(Zb))
                } catch (lc) {
                    ob(lc)
                }
            }

            function Ab(Zb) {
                try {
                    Bb(R["throw"](Zb))
                } catch (lc) {
                    ob(lc)
                }
            }

            function Bb(Zb) {
                Zb.done ? La(Zb.value) : ka(Zb.value).then(ib, Ab)
            }
            Bb((R =
                R.apply(u, t || [])).next())
        })
    }

    function Ha(u, t) {
        function z(Bb) {
            return function(Zb) {
                return R([Bb, Zb])
            }
        }

        function R(Bb) {
            if (La) throw new TypeError("Generator is already executing.");
            for (; Ab && (Ab = 0, Bb[0] && (ka = 0)), ka;) try {
                if (La = 1, ob && (ib = Bb[0] & 2 ? ob["return"] : Bb[0] ? ob["throw"] || ((ib = ob["return"]) && ib.call(ob), 0) : ob.next) && !(ib = ib.call(ob, Bb[1])).done) return ib;
                if (ob = 0, ib) Bb = [Bb[0] & 2, ib.value];
                switch (Bb[0]) {
                    case 0:
                    case 1:
                        ib = Bb;
                        break;
                    case 4:
                        return ka.label++, {
                            value: Bb[1],
                            done: !1
                        };
                    case 5:
                        ka.label++;
                        ob = Bb[1];
                        Bb = [0];
                        continue;
                    case 7:
                        Bb = ka.ia.pop();
                        ka.H.pop();
                        continue;
                    default:
                        if (!(ib = ka.H, ib = 0 < ib.length && ib[ib.length - 1]) && (6 === Bb[0] || 2 === Bb[0])) {
                            ka = 0;
                            continue
                        }
                        if (3 === Bb[0] && (!ib || Bb[1] > ib[0] && Bb[1] < ib[3])) ka.label = Bb[1];
                        else if (6 === Bb[0] && ka.label < ib[1]) ka.label = ib[1], ib = Bb;
                        else if (ib && ka.label < ib[2]) ka.label = ib[2], ka.ia.push(Bb);
                        else {
                            ib[2] && ka.ia.pop();
                            ka.H.pop();
                            continue
                        }
                }
                Bb = t.call(u, ka)
            } catch (Zb) {
                Bb = [6, Zb], ob = 0
            } finally {
                La = ib = 0
            }
            if (Bb[0] & 5) throw Bb[1];
            return {
                value: Bb[0] ? Bb[1] : void 0,
                done: !0
            }
        }
        var ka = {
                label: 0,
                B: function() {
                    if (ib[0] & 1) throw ib[1];
                    return ib[1]
                },
                H: [],
                ia: []
            },
            La, ob, ib, Ab;
        return Ab = {
            next: z(0),
            "throw": z(1),
            "return": z(2)
        }, "function" === typeof Symbol && (Ab[Symbol.iterator] = function() {
            return this
        }), Ab
    }

    function Da(u, t, z) {
        if (z || 2 === arguments.length)
            for (var R = 0, ka = t.length, La; R < ka; R++) !La && R in t || (La || (La = Array.prototype.slice.call(t, 0, R)), La[R] = t[R]);
        return u.concat(La || Array.prototype.slice.call(t))
    }

    function Ea(u) {
        id && (Sd.Hd(self, id), id = null);
        return new D(function(t) {
            id = Sd.Gd(self, function(z, R, ka) {
                "pair" ===
                z.I && "pair-id" === z.query && (u.send(new Id({
                    I: "pair",
                    query: "pair-ack",
                    result: z.result
                })), ka(), t())
            });
            u.send(new Id({
                I: "pair",
                query: "pair-req"
            }))
        })
    }

    function U(u) {
        return new D(function(t) {
            u.Jb(function(z) {
                "handshake" === z.I && ["connect-ack", "connect-pair"].includes(z.query) && t({
                    Wg: "connect-pair" === z.query
                })
            })
        })
    }

    function S(u) {
        return new D(function(t, z) {
            setTimeout(z, u)
        })
    }

    function sa(u) {
        return ta(this, void 0, void 0, function() {
            var t, z, R;
            return Ha(this, function(ka) {
                switch (ka.label) {
                    case 0:
                        t = new Id({
                            I: "handshake",
                            query: "connect-req"
                        }), z = new Sd, Sd.hc(u, t, {
                            transfer: [z.fh]
                        }), ka.label = 1;
                    case 1:
                        return ka.H.push([1, 5, , 6]), [4, D.race([U(z), S(1E3)])];
                    case 2:
                        return (R = ka.B()) && R.Wg ? [4, D.race([Ea(z), S(1E3)])] : [3, 4];
                    case 3:
                        ka.B(), ka.label = 4;
                    case 4:
                        return [3, 6];
                    case 5:
                        throw ka.B(), z.port.close(), Error("timeout");
                    case 6:
                        return [2, z]
                }
            })
        })
    }

    function ma(u, t) {
        void 0 === t && (t = 15);
        return ta(this, void 0, void 0, function() {
            var z;
            return Ha(this, function(R) {
                switch (R.label) {
                    case 0:
                        z = 0, R.label = 1;
                    case 1:
                        if (!(z < t)) return [3, 6];
                        R.label = 2;
                    case 2:
                        return R.H.push([2,
                            4, , 5
                        ]), [4, sa(u)];
                    case 3:
                        return [2, R.B()];
                    case 4:
                        return R.B(), z++, [3, 5];
                    case 5:
                        return [3, 1];
                    case 6:
                        throw Error("connect handshake failed");
                }
            })
        })
    }

    function ea(u) {
        for (var t = [], z = 1; z < arguments.length; z++) t[z - 1] = arguments[z];
        try {
            JSON.stringify(t)
        } catch (R) {}
    }

    function Ga(u, t, z) {
        return ta(this, void 0, void 0, function() {
            var R, ka, La, ob, ib, Ab, Bb;
            return Ha(this, function(Zb) {
                switch (Zb.label) {
                    case 0:
                        if ("undefined" === typeof z.result) return [3, 1];
                        R = (Cd.get(z.id) || {}).resolve;
                        Cd.delete(z.id);
                        if (!R) return ea("Resolver not found for message",
                            z), [2];
                        R(z.result);
                        return [3, 5];
                    case 1:
                        if (!Wc.has(z.I)) return [3, 4];
                        ka = Wc.get(z.I);
                        if (!ka) return [3, 3];
                        La = ae.includes(ka);
                        return [4, ka.apply(t, Da([u], z.query, !0))];
                    case 2:
                        ob = Zb.B(), ib = La ? ob : [ob, []], Ab = ib[0], Bb = ib[1], z.sh(Ab), t.send(z, Bb), Zb.label = 3;
                    case 3:
                        return [3, 5];
                    case 4:
                        ea("Invalid Protocol Message", z), Zb.label = 5;
                    case 5:
                        return [2]
                }
            })
        })
    }

    function Na() {
        Pc = new WeakMap;
        Cd = new Map;
        Wc = new Map
    }

    function pa() {
        Pc && Cd && Wc || Na()
    }

    function oa(u) {
        void 0 === u && (u = !1);
        return ta(this, void 0, void 0, function() {
            var t, z,
                R, ka, La;
            return Ha(this, function(ob) {
                switch (ob.label) {
                    case 0:
                        Na();
                        if (!la() && !u) return [3, 5];
                        t = self;
                        ob.label = 1;
                    case 1:
                        return ob.H.push([1, 3, , 4]), [4, ma(t)];
                    case 2:
                        return z = ob.B(), Pc.set(t, z), z.Jb(function(ib) {
                            Ga(t, z, ib)
                        }), [3, 4];
                    case 3:
                        return R = ob.B(), [2, {
                            Df: !1,
                            Cf: "".concat(R)
                        }];
                    case 4:
                        return [3, 9];
                    case 5:
                        if (self.parent === self) return [3, 9];
                        ka = self.parent;
                        ob.label = 6;
                    case 6:
                        return ob.H.push([6, 8, , 9]), [4, ma(ka, 2)];
                    case 7:
                        return La = ob.B(), Pc.set(ka, La), La.Jb(function(ib) {
                            Ga(ka, La, ib)
                        }), [3, 9];
                    case 8:
                        return ob.B(), [3, 9];
                    case 9:
                        return [2, {
                            Df: !0,
                            Cf: ""
                        }]
                }
            })
        })
    }

    function Q(u, t, z) {
        z = (void 0 === z ? {} : z).transfer;
        z = void 0 === z ? !1 : z;
        pa();
        Wc.set(u, t);
        z && ae.push(t)
    }

    function ba(u, t, z) {
        var R = new Id({
            I: t,
            query: z
        });
        return new D(function(ka, La) {
            Cd.set(R.id, {
                resolve: ka,
                reject: La
            });
            u.send(R)
        })
    }

    function E(u) {
        for (var t = [], z = 1; z < arguments.length; z++) t[z - 1] = arguments[z];
        pa();
        z = Pc.get(self);
        return z ? ba(z, u, t) : (ea("sendQueryToMainThread - Channel not found for query", u, t), D.resolve())
    }

    function P(u) {
        for (var t = [], z = 1; z < arguments.length; z++) t[z -
            1] = arguments[z];
        pa();
        z = Pc.get(self.parent);
        return z ? ba(z, u, t) : (ea("sendQueryToParent - Channel not found for query", u, t), D.resolve())
    }

    function aa() {
        var u = Qa.dT_,
            t = u && u.iIO;
        u = new MessageChannel;
        var z = u.port1,
            R = u.port2,
            ka = new ArrayBuffer(1);
        return new D(function(La) {
            z.onmessage = function(ob) {
                ob = ob.data;
                La(t ? t(ob, 26) : ob instanceof ArrayBuffer);
                z.close()
            };
            R.postMessage(ka, [ka])
        })
    }

    function la() {
        return "undefined" !== typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
    }

    function ha() {
        var u, t = Qa.dT_;
        return u = {
            version: "10303241106123517"
        }, u.ac = t.bcv("ac"), u.app = t.scv("app"), u.postfix = t.scv("postfix"), u
    }

    function W(u, t, z) {
        void 0 === z && (z = 1);
        return ta(this, void 0, void 0, function() {
            var R;
            return Ha(this, function(ka) {
                switch (ka.label) {
                    case 0:
                        return ka.H.push([0, 2, , 3]), [4, D.race([u(), new D(function(La, ob) {
                            setTimeout(ob, t)
                        })])];
                    case 1:
                        return [2, ka.B()];
                    case 2:
                        R = ka.B();
                        if (0 < z) return [2, W(u, t, z - 1)];
                        throw R;
                    case 3:
                        return [2]
                }
            })
        })
    }

    function wa() {
        return ta(this, void 0, void 0, function() {
            var u, t, z, R, ka;
            return Ha(this,
                function(La) {
                    switch (La.label) {
                        case 0:
                            u = Qa.dT_;
                            if (!u || la() || Qa.parent === Qa || (z = (t = u.tdto()) && u !== t)) return [2];
                            La.label = 1;
                        case 1:
                            return La.H.push([1, 3, , 4]), R = ha(), ka = function() {
                                return P("detectSubframe", R)
                            }, [4, W(ka, 1E3)];
                        case 2:
                            return La.B(), [2];
                        case 3:
                            return La.B(), [3, 4];
                        case 4:
                            return [2]
                    }
                })
        })
    }

    function Ra(u) {
        return Rc.get(u)
    }

    function gb() {
        Rc.clear();
        od = [];
        ie.clear()
    }

    function pb(u) {
        return !!u && od.some(function(t) {
            return t.id === "".concat(u, ".1")
        })
    }

    function Vb() {
        var u = [];
        ie.forEach(function(t) {
            u.push(t)
        });
        return u
    }

    function na(u, t) {
        return u.find(t, void 0, !0).values.filter(function(z) {
            return z
        }).map(Ra).filter(function(z) {
            return void 0 !== z
        })
    }

    function Db(u, t, z) {
        if (u.Ed() < t.from) return null;
        u = u.find(t, z);
        return 0 === u.values.length ? null : u
    }

    function zc(u, t, z) {
        if (u.Rd < t.from) return null;
        var R = [];
        u.attributes.forEach(function(ka) {
            if (!(ka.jb < t.from)) {
                var La = Db(ka.values, t, z);
                La && R.push({
                    name: ka.name,
                    entries: La
                })
            }
        });
        return 0 === R.length ? null : R
    }

    function Ec(u, t) {
        u.values.clear(t);
        u.uc.clear(t);
        u.Xb.clear(t);
        u.Hf.clear(t);
        u.me.clear(t);
        u.attributes.forEach(function(z) {
            z.values.clear(t)
        })
    }

    function hb() {
        return Math.round(jd + Dd.now())
    }

    function Qb(u) {
        var t, z;
        E("perfstart", (t = {}, t.i = "compress", t.t = hb(), t.m = "start", t));
        var R = new Nd.mi(u);
        t = new Uint8Array(R.uj());
        R = R.Gi(t);
        E("perfend", (z = {}, z.i = "compress", z.t = hb(), z.m = "end", z.d = [
            ["in", u.byteLength],
            ["out", R]
        ], z.a = !0, z));
        return t.buffer.slice(0, R)
    }

    function qc(u, t) {
        u = Qb(t);
        return new Uint8Array(u)
    }

    function Hb(u) {
        var t = u + "";
        Ed.forEach(function(z) {
            t = t.replace(z[0], "\x00" + z[1])
        });
        return t
    }

    function vc(u, t) {
        var z, R;
        void 0 === t && (t = Sc);
        E("perfstart", (z = {}, z.i = "serialize", z.t = hb(), z.m = "start", z));
        ud = ud || new Uint8Array((new TextEncoder).encode("\u0001"));
        var ka = {
                entries: [],
                size: 0
            },
            La = [ka];
        u.forEach(function(ib) {
            var Ab = {
                ba: "",
                gb: ""
            };
            Ab.ba += ib.id + "\u0002";
            Ab.ba = ib.name ? Ab.ba + (Hb(ib.name) + "\u0002") : Ab.ba + "\u0002";
            ib.type && "html" !== ib.type && (Ab.ba += Hb(ib.type));
            ib.values && ec(ib.values, "\u0005", Ab);
            ib.attributes && cc(ib.attributes, Ab);
            ib.uc && ec(ib.uc, "\u0011", Ab);
            ib.Xb && ec(ib.Xb, "\u0012",
                Ab);
            ib = Uint8Array;
            Ab = "".concat(Ab.ba).concat("\u0001").concat(Ab.gb.slice(0, -1));
            Ab = (new TextEncoder).encode(Ab);
            ib = new ib(Ab);
            Ab = ib.byteLength + ud.byteLength;
            0 < ka.size && ka.size + Ab > t && (ka = {
                entries: [],
                size: 0
            }, La.push(ka));
            ka.entries.push(ib);
            ka.size += Ab
        });
        var ob = 0;
        z = La.map(function(ib) {
            var Ab = new Uint8Array(ib.size - ud.byteLength),
                Bb = 0;
            ib.entries.forEach(function(Zb) {
                Ab.set(Zb, Bb);
                Bb += Zb.byteLength;
                Bb !== Ab.byteLength && (Ab.set(ud, Bb), Bb += ud.byteLength)
            });
            ob += Ab.byteLength;
            return Ab
        });
        E("perfend", (R = {},
            R.i = "serialize", R.t = hb(), R.m = "end", R.d = [
                ["nodes", u.length],
                ["out", ob]
            ], R.a = !0, R));
        return z
    }

    function ec(u, t, z) {
        z.ba += t;
        u.Jd.forEach(function(R, ka) {
            var La = u.values[ka];
            z.gb += R;
            "string" === typeof La ? "" !== La ? z.ba += Hb(La) : z.ba += "\u0003" : null === La || "undefined" === typeof La ? z.ba += "\u0014" : (z.ba += "\u0004", z.gb += "\u0002" + La);
            ka !== u.Jd.length - 1 && (z.ba += "\u0002");
            z.gb += "\u0002"
        })
    }

    function cc(u, t) {
        t.ba += "\u0006";
        u.forEach(function(z, R) {
            t.ba += Hb(z.name) + "\u0002";
            z.entries.Jd.forEach(function(ka, La) {
                t.gb += ka;
                ka =
                    z.entries.values[La];
                "string" === typeof ka ? "" !== ka ? t.ba += Hb(ka) : t.ba += "\u0003" : null === ka || "undefined" === typeof ka ? t.ba += "\u0014" : (t.ba += "\u0004", t.gb += "\u0002" + ka);
                La !== z.entries.Jd.length - 1 && (t.ba += "\u0002");
                t.gb += "\u0002"
            });
            R !== u.length - 1 && (t.ba += "\u0006")
        })
    }

    function Pb(u, t, z) {
        for (var R = []; u.length;) u.splice(0, u.length).forEach(function(ka) {
            Lb(ka, R, t, function(La) {
                var ob = t(La.me);
                z(La) && u.unshift.apply(u, ob)
            })
        })
    }

    function Lb(u, t, z, R) {
        u = [
            [u]
        ];
        for (var ka = new Set; u.length;) {
            var La = u.pop();
            if (La) {
                var ob =
                    La.shift();
                if (void 0 === ob || ob.id && t.includes(ob.id)) La.length && u.push(La);
                else {
                    var ib = ka.has(ob) ? [] : z(ob.Xb);
                    ib.length ? (ka.add(ob), La.push(ob), u.push(La), u.push(ib)) : (ka.delete(ob), ob.id && t.push(ob.id), La.length && u.push(La), R(ob))
                }
            }
        }
    }

    function Ob(u) {
        if (!(u.Zi() < wc.from)) {
            var t = u.Bf >= wc.from,
                z = Db(u.values, wc, Sc),
                R = zc(u, wc, Sc),
                ka = Db(u.uc, wc, Sc),
                La = Db(u.Xb, wc, Sc);
            if (t || z || R || ka || La) kd.push({
                id: u.id,
                type: t ? u.type : "html",
                name: t ? u.name : void 0,
                values: z,
                attributes: R,
                uc: ka,
                Xb: La
            }), u.zj()
        }
    }

    function dc(u) {
        if (u.jb <
            wc.from) return !1;
        Ob(u);
        if ("iframe" === u.name) return !1;
        Ec(u, wc.Kb);
        return !0
    }

    function Fb(u, t) {
        u = Ra("1");
        if (!u || u.Af < .9 * Sc && t - Jd < 1E3 * n) return [null, []];
        Jd = t;
        var z = [];
        od.forEach(function(R) {
            var ka, La;
            kd = [];
            var ob = (R.Ff || 0) + 1;
            wc = {
                from: ob,
                Kb: Math.max(t, ob)
            };
            E("perfstart", (ka = {}, ka.i = "collect", ka.t = hb(), ka.m = "start", ka));
            Pb([R], function(ib) {
                return na(ib, wc)
            }, dc);
            E("perfend", (La = {}, La.i = "collect", La.t = hb(), La.m = "end", La.d = [
                ["nodes", kd.length]
            ], La.a = !0, La));
            R.Ff = Math.min(R.jb, t - 1);
            Vb().forEach(function(ib) {
                ib.Bf <
                    wc.from || ib.Bf > t || (ib.Ff || 0) >= ib.jb || (Ob(ib), ib.Ff = Math.min(ib.jb, t - 1))
            });
            fa(z, {
                Ab: kd,
                from: wc.from,
                Kb: wc.Kb
            })
        });
        return Ca(z)
    }

    function G() {
        return ta(this, void 0, void 0, function() {
            return Ha(this, function(u) {
                switch (u.label) {
                    case 0:
                        return Jd = 0, Q("collectorConfig", function(t, z) {
                            Sc = z.maxSignalLength;
                            n = z.transmissionDelay;
                            v = z.isEdgeOrIe;
                            return z
                        }), [4, aa()];
                    case 1:
                        return y = u.B(), Q("collect", Fb, {
                            transfer: !0
                        }), [2]
                }
            })
        })
    }

    function fa(u, t) {
        if (t.Ab.length) {
            var z = u.find(function(R) {
                return R.from === t.from
            });
            z ? (z.Kb =
                Math.max(z.Kb, t.Kb), z.Ab = z.Ab.concat(t.Ab)) : u.push(t)
        }
    }

    function Ca(u) {
        for (var t = [], z = [], R = 0; R < u.length; R++) {
            var ka = u[R],
                La = ka.from,
                ob = ka.Kb,
                ib = 0;
            for (ka = vc(ka.Ab); ib < ka.length; ib++) {
                var Ab = Qb(ka[ib]);
                y && t.push(Ab);
                z.push({
                    data: y ? Ab : Array.prototype.slice.call(new Uint8Array(Ab)),
                    from: La,
                    to: ob
                })
            }
        }
        return 0 === z.length ? [null, []] : [z, t]
    }

    function da(u, t) {
        void 0 === t && (t = "*");
        return null !== u && "" !== u ? u.replace(/[^- :\u2013\/\u2014._;,()=!?|<>+%\u20ac$\u00a2\u00a5\u00a3\u20bd\u5143\u20a8\u20bf'"@&\u3002\u3001\]\[\n\r\\]/g,
            t) : u
    }

    function yb(u) {
        try {
            if ("" === u) throw Error("Rule is an empty string");
            L.matchesSelector(document.documentElement, u);
            return !0
        } catch (t) {
            return console.warn("Masking selector evaluation error: " + t.name, t), !1
        }
    }

    function tb(u) {
        u.ub = u.ub.filter(function(t) {
            return yb(t)
        });
        u.sb = u.sb.filter(function(t) {
            return yb(t)
        });
        u.yb = u.yb.filter(function(t) {
            return yb(t)
        });
        return u
    }

    function Ya(u) {
        var t = {
            qb: !0,
            ub: [],
            sb: [],
            yb: [],
            Sd: [],
            version: "1"
        };
        if ("undefined" === typeof u || "" === u) return t;
        var z = decodeURIComponent(u).split(",");
        u = z[0];
        var R = z[1],
            ka = z[2],
            La = z[3];
        z = z[4];
        "1" === u && (t.version = u);
        if ("1" === R || "0" === R) t.qb = "1" === R;
        "" !== ka && "undefined" !== typeof ka && (t.ub = decodeURIComponent(ka).split(";"));
        "" !== La && "undefined" !== typeof La && (t.sb = decodeURIComponent(La).split(";").map(function(ob) {
            ob = ob.split("&");
            var ib = ob[0];
            "undefined" !== typeof ob[1] && t.yb.push(ib);
            return ib
        }));
        if ("" !== z && "undefined" !== typeof z) try {
            t.Sd = decodeURIComponent(z).split(";").map(function(ob) {
                if ("" === ob) throw Error("RegExp rule is an empty string");
                return new RegExp(ob)
            })
        } catch (ob) {
            console.warn("Masking attribute rule error: " +
                ob.name, ob)
        }
        return tb(t)
    }

    function w(u) {
        void 0 === u && (u = []);
        var t = [];
        u.forEach(function(z) {
            var R = z.split("/");
            z = R[1];
            R = Number(R[0]);
            try {
                if (0 === R) {
                    var ka = z.length - 1,
                        La = z;
                    z[ka] === Ie.Ld && (La = z.substr(0, ka));
                    L.matchesSelector(document.documentElement, La)
                } else 1 === R && new RegExp(z);
                t.push(Bg.create(R, z))
            } catch (ob) {}
        });
        return t
    }

    function B(u, t) {
        u && (t.prototype.toJSON = u)
    }

    function K(u) {
        var t = new Map,
            z = Date.prototype.toJSON;
        [Number, Boolean, String, Array, Object].forEach(function(R) {
            t.set(R, R.prototype.toJSON);
            delete R.prototype.toJSON
        });
        Date.prototype.toJSON = jf;
        try {
            return JSON.stringify(u)
        } finally {
            t.forEach(B), Date.prototype.toJSON = z
        }
    }

    function H(u, t) {
        if ((u = Ra(u.J)) && u.id) {
            var z = Ra(u.getParent()),
                R = Ra(u.Oh()),
                ka = Ra(u.Qh());
            ka && R ? (ka.ic(R.id, t), R.jc(ka.id, t)) : ka ? ka.ic(null, t) : (R && R.jc(null, t), z && z.Nh() === u.id && z.rh(R ? R.id : null, t));
            u.Jf(null, t);
            u.ic(null, t);
            u.jc(null, t)
        }
    }

    function V(u) {
        var t = [];
        u = Ra(u);
        if (!u) return [];
        Pb([u], function(z) {
            return (z = Ra(z.Qb())) ? [z] : []
        }, function(z) {
            z.id && t.push(z.id);
            return !0
        });
        return t
    }

    function I(u, t, z) {
        u.forEach(function(R) {
            (R =
                Ra(R)) && Pb([R], function(ka) {
                if (ka = ka.Qb())
                    if (ka = Ra(ka)) return [ka];
                return []
            }, function(ka) {
                ka && ka.id && t.delete(ka.id);
                return !0
            })
        });
        t.forEach(function(R) {
            if (R = Ra(R)) R.Jf(null, z), R.ic(null, z), R.jc(null, z)
        })
    }

    function Ma() {
        var u = [];
        Rc.forEach(function(t, z) {
            u.push(z)
        });
        return u
    }

    function ia(u) {
        u = Ra(u);
        if (!u) return !1;
        if ("css.create" === u.name || "style" === u.name) return !0;
        if ("#text" !== u.name) return !1;
        u = Ra(u.getParent());
        return !u || "style" !== u.name && "css.create" !== u.name ? !1 : !0
    }

    function Ia(u) {
        if (1 > u.size) return !1;
        u = u.set[0];
        var t = u.J;
        return u.type === se.Of && void 0 !== t && "1" === t.split(".").pop()
    }

    function Aa(u) {
        return (u = u.set[0].J) && -1 !== u.indexOf(".") ? u.slice(0, u.lastIndexOf(".")) : ""
    }

    function vb(u, t, z) {
        Ma().forEach(function(R) {
            "string" === typeof R && (R.includes("m") || t.includes(R) || (!u && !R.includes(".") || R.startsWith(u + ".") && R.lastIndexOf(".") === u.length) && !ia(R) && H(new se(se.Hh, {
                J: R
            }), z))
        })
    }

    function ub(u, t) {
        var z = tf.decode(t);
        if (z && z.size) {
            var R = [],
                ka = new Set,
                La = [],
                ob = Ia(z);
            z.forEach(function(ib) {
                var Ab = ib.type,
                    Bb = ib.J;
                hd[Ab] ? (void 0 !== Bb && (z.Vd && ob && La.push(Bb), Ab !== se.Of || ka.has(Bb) || (R.push(Bb), V(Bb).forEach(function(Zb) {
                    ka.add(Zb)
                }))), hd[Ab](ib, z.time)) : ea("Invalid Mutation List operation: " + Ab, {
                    Ab: t
                })
            });
            z.Vd ? ob && vb(Aa(z), La, z.time) : I(R, ka, z.time)
        } else ea("Invalid Mutation List query", {
            Ab: t
        })
    }

    function mb(u, t, z, R, ka) {
        for (var La, ob, ib, Ab, Bb, Zb, lc, Lc, Oc, sc, Vc; 64 <= ka;) {
            La = t[0];
            ob = t[1];
            ib = t[2];
            Ab = t[3];
            Bb = t[4];
            Zb = t[5];
            lc = t[6];
            Lc = t[7];
            for (sc = 0; 16 > sc; sc++) Vc = R + 4 * sc, u[sc] = (z[Vc] & 255) << 24 | (z[Vc + 1] & 255) << 16 | (z[Vc +
                2] & 255) << 8 | z[Vc + 3] & 255;
            for (sc = 16; 64 > sc; sc++) Oc = u[sc - 2], Vc = (Oc >>> 17 | Oc << 15) ^ (Oc >>> 19 | Oc << 13) ^ Oc >>> 10, Oc = u[sc - 15], Oc = (Oc >>> 7 | Oc << 25) ^ (Oc >>> 18 | Oc << 14) ^ Oc >>> 3, u[sc] = (Vc + u[sc - 7] | 0) + (Oc + u[sc - 16] | 0);
            for (sc = 0; 64 > sc; sc++) Vc = (((Bb >>> 6 | Bb << 26) ^ (Bb >>> 11 | Bb << 21) ^ (Bb >>> 25 | Bb << 7)) + (Bb & Zb ^ ~Bb & lc) | 0) + (Lc + (ad[sc] + u[sc] | 0) | 0) | 0, Oc = ((La >>> 2 | La << 30) ^ (La >>> 13 | La << 19) ^ (La >>> 22 | La << 10)) + (La & ob ^ La & ib ^ ob & ib) | 0, Lc = lc, lc = Zb, Zb = Bb, Bb = Ab + Vc | 0, Ab = ib, ib = ob, ob = La, La = Vc + Oc | 0;
            t[0] += La;
            t[1] += ob;
            t[2] += ib;
            t[3] += Ab;
            t[4] += Bb;
            t[5] += Zb;
            t[6] +=
                lc;
            t[7] += Lc;
            R += 64;
            ka -= 64
        }
        return R
    }

    function xb(u, t) {
        try {
            return (new ag).update(t).digest()
        } catch (z) {
            return null
        }
    }

    function Mb(u) {
        return new D(function(t) {
            setTimeout(t, u)
        })
    }

    function sb() {
        return ta(this, void 0, void 0, function() {
            return Ha(this, function(u) {
                switch (u.label) {
                    case 0:
                        return Q("compress", qc), Q("mutations", ub), Q("reset", gb), Q("SHA-256", xb), [4, G()];
                    case 1:
                        return u.B(), [2]
                }
            })
        })
    }

    function Rb() {
        return ta(this, void 0, void 0, function() {
            return Ha(this, function(u) {
                switch (u.label) {
                    case 0:
                        return self.postMessage("loaded",
                            void 0), [4, Mb(0)];
                    case 1:
                        return u.B(), [4, oa()];
                    case 2:
                        return u.B(), [4, wa()];
                    case 3:
                        return u.B(), [4, sb()];
                    case 4:
                        return u.B(), [2]
                }
            })
        })
    }

    function mc() {
        Sd.Gd(self, function(u, t, z) {
            return ta(this, void 0, void 0, function() {
                var R;
                return Ha(this, function(ka) {
                    switch (ka.label) {
                        case 0:
                            if ("worker" !== u.I) return [2];
                            R = u.query;
                            switch (R) {
                                case "source-req":
                                    return [3, 1];
                                case "initialize":
                                    return [3, 2];
                                case "initialized":
                                    return [3, 5]
                            }
                            return [3, 6];
                        case 1:
                            return Sd.hc(self, new Id({
                                I: "worker",
                                query: "source",
                                result: "(".concat("undefined" !==
                                    typeof en && en.toString(), ")();")
                            }), {
                                origin: location.href
                            }), [3, 6];
                        case 2:
                            return [4, oa(!0)];
                        case 3:
                            return ka.B(), [4, sb()];
                        case 4:
                            ka.B(), E("workerLoaded"), ka.label = 5;
                        case 5:
                            z(), ka.label = 6;
                        case 6:
                            return [2]
                    }
                })
            })
        })
    }

    function Hc() {}

    function fe(u, t) {
        return function() {
            u.apply(t, arguments)
        }
    }

    function Fc(u) {
        if (!(this instanceof Fc)) throw new TypeError("Promises must be constructed via new");
        if ("function" !== typeof u) throw new TypeError("not a function");
        this.oa = 0;
        this.sc = !1;
        this.sa = void 0;
        this.Ia = [];
        M(u, this)
    }

    function Jc(u,
        t) {
        for (; 3 === u.oa;) u = u.sa;
        0 === u.oa ? u.Ia.push(t) : (u.sc = !0, Fc.Hb(function() {
            var z = 1 === u.oa ? t.Re : t.Se;
            if (null === z)(1 === u.oa ? Ic : yd)(t.promise, u.sa);
            else {
                try {
                    var R = z(u.sa)
                } catch (ka) {
                    yd(t.promise, ka);
                    return
                }
                Ic(t.promise, R)
            }
        }))
    }

    function Ic(u, t) {
        try {
            if (t === u) throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" === typeof t || "function" === typeof t)) {
                var z = t.then;
                if (t instanceof Fc) {
                    u.oa = 3;
                    u.sa = t;
                    ge(u);
                    return
                }
                if ("function" === typeof z) {
                    M(fe(z, t), u);
                    return
                }
            }
            u.oa = 1;
            u.sa = t;
            ge(u)
        } catch (R) {
            yd(u,
                R)
        }
    }

    function yd(u, t) {
        u.oa = 2;
        u.sa = t;
        ge(u)
    }

    function ge(u) {
        2 === u.oa && 0 === u.Ia.length && Fc.Hb(function() {
            u.sc || Fc.wc(u.sa)
        });
        for (var t = 0, z = u.Ia.length; t < z; t++) Jc(u, u.Ia[t]);
        u.Ia = null
    }

    function sd(u, t, z) {
        this.Re = "function" === typeof u ? u : null;
        this.Se = "function" === typeof t ? t : null;
        this.promise = z
    }

    function M(u, t) {
        var z = !1;
        try {
            u(function(R) {
                z || (z = !0, Ic(t, R))
            }, function(R) {
                z || (z = !0, yd(t, R))
            })
        } catch (R) {
            z || (z = !0, yd(t, R))
        }
    }
    var D = self.Promise,
        ua = Object.create,
        Ba = Object.defineProperty,
        ya = Object.getOwnPropertyDescriptor,
        Fa = Object.getOwnPropertyNames,
        xa = Object.getPrototypeOf,
        Ja = Object.prototype.hasOwnProperty,
        lb = function(u, t) {
            return function() {
                return t || (0, u[Fa(u)[0]])((t = {
                    exports: {}
                }).exports, t), t.exports
            }
        }({
            "../../node_modules/.pnpm/snappyjs@0.7.0/node_modules/snappyjs/snappy_compressor.js": function(u) {
                function t(Ab, Bb) {
                    return 506832829 * Ab >>> Bb
                }

                function z(Ab, Bb) {
                    return Ab[Bb] + (Ab[Bb + 1] << 8) + (Ab[Bb + 2] << 16) + (Ab[Bb + 3] << 24)
                }

                function R(Ab, Bb, Zb) {
                    return Ab[Bb] === Ab[Zb] && Ab[Bb + 1] === Ab[Zb + 1] && Ab[Bb + 2] === Ab[Zb + 2] && Ab[Bb +
                        3] === Ab[Zb + 3]
                }

                function ka(Ab, Bb, Zb, lc, Lc) {
                    60 >= Zb ? (lc[Lc] = Zb - 1 << 2, Lc += 1) : 256 > Zb ? (lc[Lc] = 240, lc[Lc + 1] = Zb - 1, Lc += 2) : (lc[Lc] = 244, lc[Lc + 1] = Zb - 1 & 255, lc[Lc + 2] = Zb - 1 >>> 8, Lc += 3);
                    var Oc = Lc,
                        sc;
                    for (sc = 0; sc < Zb; sc++) lc[Oc + sc] = Ab[Bb + sc];
                    return Lc + Zb
                }

                function La(Ab, Bb, Zb, lc) {
                    if (12 > lc && 2048 > Zb) return Ab[Bb] = 1 + (lc - 4 << 2) + (Zb >>> 8 << 5), Ab[Bb + 1] = Zb & 255, Bb + 2;
                    Ab[Bb] = 2 + (lc - 1 << 2);
                    Ab[Bb + 1] = Zb & 255;
                    Ab[Bb + 2] = Zb >>> 8;
                    return Bb + 3
                }

                function ob(Ab) {
                    this.Ih = Ab
                }
                var ib = Array(15);
                ob.prototype.uj = function() {
                    var Ab = this.Ih.length;
                    return 32 +
                        Ab + Math.floor(Ab / 6)
                };
                ob.prototype.Gi = function(Ab) {
                    var Bb = this.Ih,
                        Zb = Bb.length,
                        lc = 0,
                        Lc;
                    var Oc = Zb;
                    var sc = 0;
                    do Ab[sc] = Oc & 127, Oc >>>= 7, 0 < Oc && (Ab[sc] += 128), sc += 1; while (0 < Oc);
                    for (Lc = sc; lc < Zb;) {
                        Oc = Math.min(Zb - lc, 65536);
                        var Vc = void 0;
                        var $f, qd;
                        sc = Bb;
                        var Bc = lc;
                        var $d = Oc;
                        for (var Hd = Ab, rd = Lc, gd = 1; 1 << gd <= $d && 14 >= gd;) gd += 1;
                        --gd;
                        Lc = 32 - gd;
                        "undefined" === typeof ib[gd] && (ib[gd] = new Uint16Array(1 << gd));
                        gd = ib[gd];
                        for (qd = 0; qd < gd.length; qd++) gd[qd] = 0;
                        qd = Bc + $d;
                        var ze = Bc;
                        var dd = Bc;
                        var Ke = !0;
                        if (15 <= $d)
                            for ($d = qd - 15, Bc += 1, $f =
                                t(z(sc, Bc), Lc); Ke;) {
                                var Zc = 32;
                                var hc = Bc;
                                do {
                                    Bc = hc;
                                    var Ee = $f;
                                    hc = Zc >>> 5;
                                    Zc += 1;
                                    hc = Bc + hc;
                                    if (Bc > $d) {
                                        Ke = !1;
                                        break
                                    }
                                    $f = t(z(sc, hc), Lc);
                                    Vc = ze + gd[Ee];
                                    gd[Ee] = Bc - ze
                                } while (!R(sc, Bc, Vc));
                                if (!Ke) break;
                                rd = ka(sc, dd, Bc - dd, Hd, rd);
                                do {
                                    Zc = Bc;
                                    for (dd = 4; Bc + dd < qd && sc[Bc + dd] === sc[Vc + dd];) dd += 1;
                                    Bc += dd;
                                    Ee = Zc - Vc;
                                    for (Zc = Hd; 68 <= dd;) rd = La(Zc, rd, Ee, 64), dd -= 64;
                                    64 < dd && (rd = La(Zc, rd, Ee, 60), dd -= 60);
                                    rd = La(Zc, rd, Ee, dd);
                                    dd = Bc;
                                    if (Bc >= $d) {
                                        Ke = !1;
                                        break
                                    }
                                    Vc = t(z(sc, Bc - 1), Lc);
                                    gd[Vc] = Bc - 1 - ze;
                                    Zc = t(z(sc, Bc), Lc);
                                    Vc = ze + gd[Zc];
                                    gd[Zc] = Bc - ze
                                } while (R(sc, Bc,
                                        Vc));
                                if (!Ke) break;
                                Bc += 1;
                                $f = t(z(sc, Bc), Lc)
                            }
                        dd < qd && (rd = ka(sc, dd, qd - dd, Hd, rd));
                        Lc = rd;
                        lc += Oc
                    }
                    return Lc
                };
                u.mi = ob
            }
        }),
        Qa = "undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof window ? window : void 0,
        jb;
    (function(u) {
        u.ADD_NODE = "addNode";
        u.REMOVE_NODE = "removeNode";
        u.UPDATE_ATTRIBUTE = "updateAttribute";
        u.UPDATE_NODE = "updateNode";
        u.UPDATE_NODE_VALUE = "updateNodeValue"
    })(jb || (jb = {}));
    var ic;
    (function(u) {
        u.EVENTS = "srTe";
        u.MUTATIONS = "srBm";
        u.RESOURCES = "srRs"
    })(ic || (ic = {}));
    var Kb;
    (Kb || (Kb = {})).SR_IMAGE_NATURAL_DIMENSIONS =
        "data-dt-natural-dimensions";
    var Jb;
    (function(u) {
        u.CSS_STYLESHEET = "css-stylesheet";
        u.MATHML = "http://www.w3.org/1998/Math/MathML";
        u.METADATA = "dynatrace-metadata";
        u.SVG = "http://www.w3.org/2000/svg"
    })(Jb || (Jb = {}));
    var kc;
    (function(u) {
        u.IMPORT = "rc.import";
        u.LINK = "rc.link"
    })(kc || (kc = {}));
    var Mc;
    (function(u) {
        u.OPEN = "sdw.o";
        u.SLOT = "sdw.s"
    })(Mc || (Mc = {}));
    var td;
    (td || (td = {})).DOCTYPE = "doc.doctype";
    var Ad;
    (Ad || (Ad = {})).IFRAME = "tf.iframe";
    var Bd;
    (Bd || (Bd = {})).CREATE = "css.create";
    var nd;
    (nd || (nd = {})).FAILURE =
        "rl.fail";
    var Id = function() {
            function u(t) {
                var z = t.id;
                z = void 0 === z ? void 0 : z;
                var R = t.I,
                    ka = t.query;
                t = t.result;
                z ? this.id = z : (u.we++, this.id = u.we);
                this.I = R;
                this.query = ka;
                this.result = void 0 === t ? void 0 : t
            }
            u.decode = function(t) {
                try {
                    if ("DT UI Worker Bridge" === t.type) {
                        var z = t.payload;
                        return new u({
                            id: z.id,
                            I: z.handler,
                            query: z.query,
                            result: z.result
                        })
                    }
                } catch (R) {}
            };
            u.prototype.sh = function(t) {
                "undefined" === typeof t ? this.result = null : this.result = t
            };
            u.prototype.Ha = function() {
                return {
                    type: "DT UI Worker Bridge",
                    payload: {
                        id: this.id,
                        handler: this.I,
                        query: this.query,
                        result: this.result
                    }
                }
            };
            u.we = 0;
            return u
        }(),
        Sd = function() {
            function u(t) {
                t ? this.port = t : (t = new MessageChannel, this.port = t.port1, this.fh = t.port2)
            }
            u.be = function() {
                u.cc || (u.cc = new Map)
            };
            u.Gd = function(t, z) {
                u.be();
                var R = u.cc.get(t);
                if (R) R.push(z);
                else {
                    var ka = [z];
                    u.cc.set(t, ka);
                    t.addEventListener("message", function(La) {
                        var ob = Id.decode(La.data);
                        ob && ka.slice(0).forEach(function(ib) {
                            ib(ob, La, function() {
                                u.Hd(t, ib)
                            })
                        })
                    })
                }
                return z
            };
            u.Hd = function(t, z) {
                u.be();
                t = u.cc.get(t) || [];
                t.splice(t.indexOf(z),
                    1)
            };
            u.hc = function(t, z, R) {
                var ka = void 0 === R ? {} : R;
                R = ka.origin;
                R = void 0 === R ? "*" : R;
                ka = ka.transfer;
                ka = void 0 === ka ? [] : ka;
                z = z.Ha();
                la() || -1 < Object.prototype.toString.call(t).indexOf("Worker") ? t.postMessage(z, ka) : t.postMessage(z, R, ka)
            };
            u.prototype.Jb = function(t) {
                this.port.onmessage = function(z) {
                    (z = Id.decode(z.data)) && t(z)
                }
            };
            u.prototype.send = function(t, z) {
                void 0 === z && (z = []);
                this.port.postMessage(t.Ha(), z)
            };
            return u
        }(),
        id, Pc, Cd, Wc, ae = [],
        Rc = new Map,
        ie = new Map,
        od = [],
        Dd = self.performance || Date,
        jd = Date.now() - Dd.now(),
        Nd = function(u, t, z) {
            return z = null != u ? ua(xa(u)) : {}, qa(!t && u && u.ak ? z : Ba(z, "default", {
                value: u,
                enumerable: !0
            }), u)
        }(lb(), 1),
        Ed = [
            [/\u0000/g, "\x00"],
            [/\u0001/g, "\u0001"],
            [/\u0002/g, "\u0002"],
            [/\u0003/g, "\u0003"],
            [/\u0014/g, "\u0014"],
            [/\u0004/g, "\u0004"],
            [/\u0005/g, "\u0005"],
            [/\u0006/g, "\u0006"],
            [/\u0011/g, "\u0011"],
            [/\u0012/g, "\u0012"]
        ],
        ud, wc, Jd = 0,
        kd, Sc, n, v = !1,
        y, J = function() {
            function u() {
                this.ob = [];
                this.values = []
            }
            u.prototype.add = function(t, z) {
                var R = this.ob[this.ob.length - 1];
                if (R > z) return !1;
                R === z && (this.ob.pop(),
                    this.values.pop());
                if (this.Qb() === t) return !1;
                this.ob.push(z);
                this.values.push(t);
                return !0
            };
            u.prototype.Ed = function() {
                return this.ob.length ? this.ob[this.ob.length - 1] : 0
            };
            u.prototype.Qb = function() {
                return this.values.length ? this.values[this.values.length - 1] : null
            };
            u.prototype.clear = function(t) {
                var z = -1;
                this.ob.forEach(function(R, ka) {
                    R < t && (z = ka)
                });
                0 < z && (this.values = this.values.slice(z), this.ob = this.ob.slice(z))
            };
            u.prototype.find = function(t, z, R) {
                void 0 === z && (z = 0);
                void 0 === R && (R = !1);
                var ka = t.from,
                    La = t.Kb,
                    ob = {
                        Jd: [],
                        values: []
                    },
                    ib = -1,
                    Ab = this.zi();
                this.ob.forEach(function(Bb, Zb) {
                    var lc = Ab({
                        time: Bb,
                        index: Zb,
                        vj: z,
                        from: ka,
                        Kb: La
                    });
                    lc && (ob.Jd.push(lc.time), ob.values.push(lc.value));
                    R && Bb < ka && (ib = Zb)
                }); - 1 !== ib && (ob.Jd.unshift(this.ob[ib] - ka), ob.values.unshift(this.values[ib]));
                return ob
            };
            u.prototype.zi = function() {
                var t = this;
                return function(z) {
                    return u.ii(t, z)
                }.bind(this)
            };
            u.ni = function(t, z) {
                return 0 !== z && "string" === typeof t && t.length > z
            };
            u.ki = function(t) {
                return t.from <= t.time && t.time < t.Kb
            };
            u.ii = function(t, z) {
                t =
                    t.values[z.index];
                return u.ki(z) && !u.ni(t, z.vj) ? {
                    time: z.time - z.from,
                    value: t
                } : null
            };
            return u
        }(),
        L = {
            matchesSelector: function(u, t) {
                return Za(u) ? (u.matches || u.matchesSelector || u.mozMatchesSelector || u.msMatchesSelector || u.oMatchesSelector || u.webkitMatchesSelector).call(u, t) : !1
            }
        },
        Z = ["DATALIST", "INPUT", "TEXTAREA", "SELECT", "OPTION"],
        ja = ["submit", "button", "reset"],
        va = "textarea input[type=text] input:not([type]) input[type=password] input[type=hidden] input[type=checkbox] input[type=radio] input[type=date] input[type=month] input[type=week] input[type=datetime-local] input[type=time] input[type=number] input[type=range] input[type=file] input[type=email] input[type=url] input[type=tel] input[type=search] select option".split(" "),
        Oa, Va, zb, Tb, tc, pc, Xc = function() {
            function u(t, z) {
                this.Oe = t;
                this.ae = z
            }
            u.prototype.dd = function(t) {
                var z = this;
                return this.ae.some(function(R) {
                    return z.Oe.matchesSelector(t, R.ya())
                })
            };
            u.prototype.wd = function(t) {
                var z = this;
                return this.ae.some(function(R) {
                    return z.Oe.matchesSelector(t, R.ya()) && R.wd()
                })
            };
            return u
        }(),
        vd = function() {
            function u(t) {
                this.eg = t
            }
            u.prototype.dd = function(t) {
                return this.eg.some(function(z) {
                    return z.ya().test(t)
                })
            };
            return u
        }(),
        je = function() {
            function u(t, z, R, ka) {
                void 0 === ka && (ka = new WeakMap);
                this.$d = t;
                this.dg = z;
                this.za = R;
                this.Yb = ka
            }
            u.prototype.Xa = function(t) {
                if (Pa(t) || Pa(t.parentNode)) return 1;
                var z = this.za ? 1 : 2,
                    R = Za(t) && t.hasAttribute("data-dtrum-mask"),
                    ka = this.$d.dd(t);
                R ? z = 10 : ka && (z = this.za ? this.vg(t) : 1);
                var La = this.Yb.get(t.parentNode),
                    ob = R;
                La && (R = this.yg(La, z, R || ka), z = R.Tg, ob = ob || R.od);
                this.oh(t, z, ob);
                return z
            };
            u.prototype.Cd = function(t, z) {
                var R = this.za ? 1 : 16;
                return -1 !== ["value", "placeholder", "label"].indexOf(z) ? this.wg(t, z) : this.Og(z) || !this.Ng(z) ? 1 : this.dg.dd(z) ? this.za ? 16 : 1 : (t = this.Yb.get(t)) ?
                    (R = this.za ? t.Cc : t.zc, 2 === (R & 2) ? 16 : R) : R
            };
            u.prototype.yg = function(t, z, R) {
                var ka = !1;
                t.od ? (z = 10, ka = !0) : (t = this.za ? t.Cc : t.zc, R || (z = t), this.za && (z |= t));
                return {
                    Tg: z,
                    od: ka
                }
            };
            u.prototype.oh = function(t, z, R) {
                R = {
                    od: R
                };
                var ka = this.Yb.get(t);
                this.za ? R.Cc = (ka && ka.Cc) | z : R.zc = (ka && ka.zc) | z;
                ka && (R = bb(bb({}, ka), R));
                this.Yb.set(t, R)
            };
            u.prototype.vg = function(t) {
                var z = 2;
                this.$d.wd(t) && (z |= 8);
                return z
            };
            u.prototype.Ng = function(t) {
                return /^data(-.*)?$/.test(t)
            };
            u.prototype.Og = function(t) {
                return /^data-dt-(.+)$/.test(t)
            };
            u.prototype.wg =
                function(t, z) {
                    return rb(t) && "value" === z ? 32 : 2 === (this.Xa(t) & 2) ? 16 : 1
                };
            return u
        }(),
        Xd = function() {
            function u(t) {
                this.value = t
            }
            u.Mg = function(t) {
                return t instanceof u
            };
            u.prototype.ya = function() {
                return this.value
            };
            return u
        }(),
        Ie = function() {
            function u(t) {
                this.Je = !1;
                t = t.split(u.Ld);
                var z = t[1];
                this.value = t[0];
                this.Je = "" === z
            }
            u.Pg = function(t) {
                return t instanceof u
            };
            u.prototype.ya = function() {
                return this.value
            };
            u.prototype.wd = function() {
                return this.Je
            };
            u.Ld = "&";
            return u
        }(),
        Je = function() {
            function u(t) {
                this.Zg = t
            }
            u.create = function(t) {
                return new u(t)
            };
            u.prototype.ya = function() {
                return this.Zg
            };
            return u
        }(),
        Wa = function() {
            function u(t) {
                this.ah = t
            }
            u.create = function(t) {
                return new u(t)
            };
            u.prototype.ya = function() {
                return this.ah
            };
            return u
        }(),
        fg = function() {
            function u(t, z, R) {
                void 0 === t && Wa.create(2);
                void 0 === z && (z = Je.create(0));
                void 0 === R && (R = []);
                this.Yg = z;
                this.rules = R
            }
            u.prototype.Cg = function() {
                return this.rules.filter(Ie.Pg)
            };
            u.prototype.zg = function() {
                return this.rules.filter(Xd.Mg)
            };
            u.prototype.addRule = function(t) {
                this.rules.push(t)
            };
            u.prototype.za = function() {
                return 0 === this.Yg.ya()
            };
            return u
        }(),
        Bg = function() {
            function u() {}
            u.create = function(t, z) {
                if (!u.validate(z)) throw Error("Invalid masking rule value: " + z + "!");
                switch (t) {
                    case 0:
                        return new Ie(z);
                    case 1:
                        return new Xd(new RegExp(z));
                    default:
                        throw Error("Invalid masking rule type: " + t + "!");
                }
            };
            u.validate = function(t) {
                return t && "" !== t.trim()
            };
            return u
        }();
    (function() {
        function u(t) {
            var z = this;
            this.ad = [];
            this.Sg = new WeakMap;
            Array.isArray(t) ? t.forEach(function(R) {
                z.ze(R)
            }) : this.ze(t)
        }
        u.prototype.ze =
            function(t) {
                var z;
                t = t.split(",");
                2 === Number(t[0]) ? z = {
                    bd: t.slice(0, 4).join(",")
                } : z = {
                    Ug: t.slice(0, 5).join(","),
                    bd: t.slice(5, 9).join(",")
                };
                if (z.bd) {
                    t = z.bd.split(",").map(decodeURIComponent);
                    var R = t[2];
                    z = t[3];
                    t = Wa.create(Number(t[1]));
                    R = Je.create(Number(R));
                    z = w(z ? z.split(";") : []);
                    z = new fg(t, R, z)
                } else z = Ya(z.Ug);
                z instanceof fg ? (t = new Xc(L, z.Cg()), R = new vd(z.zg()), z = new je(t, R, z.za(), this.Sg), this.ad.push(z)) : (z = this.cd = z, Va = new WeakMap, zb = new WeakMap, Tb = new WeakMap, tc = new WeakMap, pc = new WeakMap, Oa = z,
                    Ta(Oa.ub, Va), Ta(Oa.sb, zb), Ta(Oa.yb, Tb))
            };
        u.prototype.Xa = function(t) {
            if (this.cd) return eb(t);
            for (var z, R = 0, ka = this.ad; R < ka.length; R++) {
                var La = ka[R].Xa(t);
                1 !== La && (z |= La)
            }
            return z || 1
        };
        u.prototype.Cd = function(t, z) {
            if (this.cd) return kb(t, z);
            for (var R, ka = 0, La = this.ad; ka < La.length; ka++) {
                var ob = La[ka].Cd(t, z);
                1 !== ob && (R |= ob)
            }
            return R || 1
        };
        return u
    })();
    var hf = function() {
            function u(t, z) {
                this.name = t.attributeName || "";
                this.values = new J;
                this.ka = t.ka;
                this.jb = z;
                this.Xh = t.J;
                this.hf(t.Sa, z)
            }
            u.prototype.ya = function() {
                return this.values.Qb()
            };
            u.prototype.hf = function(t, z) {
                var R = Ra(this.Xh);
                R && "a" === R.name && "href" === this.name && (t = "");
                "string" === typeof t && (t = this.tj(t));
                this.ya() !== t && this.values.add(t, z) && (this.jb = Math.max(z, this.jb), R && (R.pb(t), R.pb(z)))
            };
            u.prototype.tj = function(t) {
                var z, R = Ra(this.Xh),
                    ka = "value" === this.name && "input" === (null === R || void 0 === R ? void 0 : R.name) && "number" === (null === (z = null === R || void 0 === R ? void 0 : R.getAttribute("type")) || void 0 === z ? void 0 : z.ya()) ? "0" : "*";
                this.ka && this.ka & 32 ? t = t ? t.replace(/./g, "*") : "" : this.ka && this.ka &
                    16 && (t = da(t, ka));
                z = R && R.ka && R.ka & 2;
                if (z = (R && R.ka && R.ka & 4 || z) && R) z = this.name, z = !!R.name && ["input", "textarea"].includes(R.name.toLowerCase()) && "value" === z;
                z && (t = da(t, ka));
                return t
            };
            return u
        }(),
        jf = Date.prototype.toJSON,
        se = function() {
            function u(t, z) {
                if (!t || !z) throw ea("Invalid parameters for mutation construction", {
                    type: t,
                    Yh: z
                }), Error("Invalid parameters");
                this.type = t;
                this.J = z.J;
                this.nodeName = z.nodeName;
                this.namespaceURI = z.namespaceURI;
                this.nodeValue = z.nodeValue;
                this.attributeName = z.attributeName;
                this.Sa =
                    z.Sa;
                this.ja = z.ja;
                this.ma = z.ma;
                this.pa = z.pa;
                this.ka = z.ka
            }
            u.decode = function(t) {
                try {
                    var z = JSON.parse(t);
                    return new u(z.type, {
                        J: z.nodeId,
                        nodeName: z.nodeName,
                        namespaceURI: z.namespaceURI,
                        nodeValue: z.nodeValue,
                        attributeName: z.attributeName,
                        Sa: z.attributeValue,
                        ja: z.parentId,
                        ma: z.previousId,
                        pa: z.nextId,
                        ka: z.masking
                    })
                } catch (R) {
                    return null
                }
            };
            u.prototype.Ha = function() {
                return K({
                    type: this.type,
                    nodeId: this.J,
                    nodeName: this.nodeName,
                    namespaceURI: this.namespaceURI,
                    nodeValue: this.nodeValue,
                    attributeName: this.attributeName,
                    attributeValue: this.Sa,
                    parentId: this.ja,
                    previousId: this.ma,
                    nextId: this.pa,
                    masking: this.ka
                })
            };
            u.prototype.Lf = function() {};
            u.Hh = "removeNode";
            u.Of = "updateNode";
            return u
        }(),
        vf = /(,?(\b|\s|\.|#)ng):((?!(a(ctive|ny(-link)*)|checked|d(efault|i(r\(.*\)|sabled))|e(mpty|nabled)|f(irst(-(child|of-type))*|ullscreen|ocus)|hover|in(determinate|valid|-range)|la(ng\(.*\)|(st-(child|of-type)))|l(eft|ink)|n(ot\(.*\)|th-((last-)*(child|of-type)\(.*\)))|o(nly-(child|of-type)|ptional|ut-of-range)|r(e(ad-(only|write)|quired)|ight|oot)|scope|target|v(alid|isited)))[^,\[\]]*\s*.*(,|{).*)/,
        Xe = function() {
            function u(t, z) {
                this.id = t.J;
                this.name = t.nodeName;
                this.Bf = z;
                if (this.id && "1" === this.id.split(".").pop() || "css.create" === this.name) this.Ff = z - 1, od.includes(this) || od.push(this);
                this.attributes = new Map;
                this.values = new J;
                this.uc = new J;
                this.Xb = new J;
                this.Hf = new J;
                this.me = new J;
                this.jb = this.Bf;
                this.Rd = 0;
                this.ka = t.ka;
                this.id && this.name && (this.Af = this.id.toString().length + 1 + this.name.toString().length + 1);
                switch (t.namespaceURI) {
                    case "http://www.w3.org/2000/svg":
                        this.type = "svg";
                        break;
                    case "http://www.w3.org/1998/Math/MathML":
                        this.type =
                            "mathml";
                        break;
                    case "dynatrace-metadata":
                        this.type = "dtmeta";
                        break;
                    case "css-stylesheet":
                        this.type = "cssstylesheet";
                        break;
                    default:
                        this.type = "html"
                }
                this.Jf(t.ja, z);
                this.jc(t.ma, z);
                this.ic(t.pa, z);
                "string" === typeof t.nodeValue && this.hf(t.nodeValue, z);
                this.id && t.ja && this.Oc(this.getParent()) && !t.ma && this.Oc(this.getParent()).rh(this.id, z);
                "html" !== this.type && this.pb(this.type)
            }
            u.prototype.Oc = function(t) {
                return Ra(t)
            };
            u.prototype.Uf = function(t) {
                if (!this.attributes.has(t.name)) {
                    var z = this.ka && this.ka & 2;
                    if (z = this.ka && this.ka & 4 || z) {
                        z = t.name;
                        var R, ka = this.name || "";
                        "selected" === z && "option" === ka.toLowerCase() ? z = !0 : "checked" === z && "input" === ka.toLowerCase() ? (z = null === (R = this.getAttribute("type")) || void 0 === R ? void 0 : R.ya(), z = !!z && ["radio", "checkbox"].includes(z + "")) : z = !1
                    }
                    if (z) {
                        t = t.jb;
                        var La;
                        t = new hf(new se("updateAttribute", {
                            attributeName: "disabled",
                            Sa: "",
                            ka: 1,
                            J: this.id
                        }), t);
                        "input" === (null === (La = this.name) || void 0 === La ? void 0 : La.toLowerCase()) ? this.Uf(t): (La = this.Oc(this.getParent()), R = (null === La || void 0 ===
                            La ? void 0 : La.name) || "", La && "optgroup" === R.toLowerCase() && (La = La.Oc(La.getParent()), R = (null === La || void 0 === La ? void 0 : La.name) || ""), La && "select" === R.toLowerCase() && La.Uf(t))
                    } else this.attributes.set(t.name, t), this.Jh(t), this.pb(t.name)
                }
            };
            u.prototype.getAttribute = function(t) {
                return this.attributes.get(t)
            };
            u.prototype.yd = function(t) {
                void 0 !== t && (this.jb = Math.max(t, this.jb), (t = this.Oc(this.getParent())) && t.yd(this.jb))
            };
            u.prototype.Jh = function(t) {
                this.Rd = Math.max(this.Rd, t.jb);
                this.yd(this.Rd)
            };
            u.prototype.ya =
                function() {
                    return this.values.Qb()
                };
            u.prototype.hf = function(t, z) {
                this.ka && this.ka & 2 && (t = da(t));
                if ("#text" === this.name && v) {
                    var R = this.Oc(this.getParent());
                    if (R && "style" === R.name && (!t || t.includes("ng:")))
                        for (; vf.test(t);) t = t.replace(vf, "$1\\:$3")
                }
                this.ya() !== t && this.values.add(t, z) && (this.yd(z), this.pb(t), this.pb(z))
            };
            u.prototype.getParent = function() {
                return this.uc.Qb()
            };
            u.prototype.Jf = function(t, z) {
                this.getParent() !== t && this.uc.add(t, z) && (this.yd(z), this.pb(t), this.pb(z))
            };
            u.prototype.Qh = function() {
                return this.Hf.Qb()
            };
            u.prototype.jc = function(t, z) {
                this.Qh() !== t && this.Hf.add(t, z) && (this.yd(z), this.pb(t), this.pb(z))
            };
            u.prototype.Oh = function() {
                return this.Xb.Qb()
            };
            u.prototype.ic = function(t, z) {
                this.Oh() !== t && this.Xb.add(t, z) && this.yd(z)
            };
            u.prototype.Nh = function() {
                return this.me.Qb()
            };
            u.prototype.rh = function(t, z) {
                this.Nh() !== t && this.me.add(t, z) && this.yd(z)
            };
            u.prototype.zj = function() {
                this.Af = 0
            };
            u.prototype.pb = function(t) {
                t = "string" === typeof t ? t : "number" === typeof t ? t.toString() : null === t ? "null" : "";
                this.Af += t.length + 1;
                var z =
                    this.Oc(this.getParent());
                z && z.pb(t)
            };
            u.prototype.Zi = function() {
                return Math.max(this.Rd, this.values.Ed(), this.uc.Ed(), this.me.Ed(), this.Xb.Ed(), this.Hf.Ed())
            };
            return u
        }(),
        tf = function() {
            function u(t, z) {
                void 0 === z && (z = !1);
                this.time = t;
                this.Vd = z;
                this.set = [];
                this.size = this.set.length
            }
            u.decode = function(t) {
                try {
                    var z = JSON.parse(t);
                    if (z && "Mutation List" === z.type) {
                        var R = z.payload,
                            ka = new u(R.time, R.checkIROnSnapshotFlag);
                        t = 0;
                        for (var La = R.entries; t < La.length; t++) {
                            var ob = se.decode(La[t]);
                            ob && ka.add(ob)
                        }
                        return ka
                    }
                } catch (ib) {}
            };
            u.og = function(t, z) {
                var R;
                void 0 === R && (R = !1);
                var ka = new u(z, R);
                t.forEach(function(La) {
                    ka.add(La)
                });
                return ka
            };
            u.prototype.add = function(t) {
                t instanceof se && (this.set.push(t), this.size = this.set.length)
            };
            u.prototype.Kh = function(t) {
                this.set = this.set.filter(function(z) {
                    return z instanceof se && !t(z)
                });
                this.size = this.set.length
            };
            u.prototype.forEach = function(t) {
                this.set.forEach(function(z) {
                    return z instanceof se && t(z)
                })
            };
            u.prototype.Ha = function() {
                return K({
                    type: "Mutation List",
                    payload: {
                        checkIROnSnapshotFlag: this.Vd,
                        time: this.time,
                        entries: this.set.map(function(t) {
                            return t.Ha()
                        })
                    }
                })
            };
            return u
        }(),
        Uc, hd = (Uc = {}, Uc.addNode = function(u, t) {
            var z = new Xe(u, t);
            Rc.set(u.J, z);
            if ("dynatrace-metadata" !== u.namespaceURI || void 0 !== u.ja && !pb(u.ja)) {
                z = Ra(u.ma);
                var R = Ra(u.pa);
                z && z.ic(u.J, t);
                R && R.jc(u.J, t)
            } else ie.set(z.id, z)
        }, Uc.updateNode = function(u, t) {
            var z = Ra(u.J),
                R = Ra(u.ja),
                ka = Ra(u.pa),
                La = Ra(u.ma);
            z && z.id && (R && z.Jf(R.id, t), La ? (La.ic(z.id, t), z.jc(u.ma, t)) : R && R.rh(z.id, t), ka && (ka.jc(z.id, t), z.ic(u.pa, t)), z.ic(u.pa, t), z.jc(u.ma,
                t))
        }, Uc.removeNode = H, Uc.updateNodeValue = function(u, t) {
            var z = Ra(u.J);
            z && u.nodeValue && z.hf(u.nodeValue, t)
        }, Uc.updateAttribute = function(u, t) {
            var z = Ra(u.J);
            if (void 0 !== z && u.attributeName) {
                var R = z.getAttribute(u.attributeName);
                "undefined" === typeof R ? (R = new hf(u, t), z.Uf(R)) : (R.hf(u.Sa, t), z.Jh(R))
            }
        }, Uc),
        ad = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
            4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298
        ]),
        ag = function() {
            function u() {
                this.Mi = 32;
                this.blockSize = 64;
                this.state = new Int32Array(8);
                this.Ch = new Int32Array(64);
                this.buffer = new Uint8Array(128);
                this.zf = this.tc = 0;
                this.finished = !1;
                this.reset()
            }
            u.prototype.reset = function() {
                this.state[0] = 1779033703;
                this.state[1] = 3144134277;
                this.state[2] = 1013904242;
                this.state[3] = 2773480762;
                this.state[4] = 1359893119;
                this.state[5] = 2600822924;
                this.state[6] = 528734635;
                this.state[7] = 1541459225;
                this.zf = this.tc = 0;
                this.finished = !1;
                return this
            };
            u.prototype.update = function(t, z) {
                void 0 ===
                    z && (z = t.length);
                if (this.finished) throw Error("SHA256: can't update because hash was finished.");
                var R = 0;
                this.zf += z;
                if (0 < this.tc) {
                    for (; 64 > this.tc && 0 < z;) this.buffer[this.tc++] = t[R++], z--;
                    64 === this.tc && (mb(this.Ch, this.state, this.buffer, 0, 64), this.tc = 0)
                }
                64 <= z && (R = mb(this.Ch, this.state, t, R, z), z %= 64);
                for (; 0 < z;) this.buffer[this.tc++] = t[R++], z--;
                return this
            };
            u.prototype.finish = function(t) {
                if (!this.finished) {
                    var z = this.zf,
                        R = this.tc,
                        ka = z / 536870912 | 0,
                        La = z << 3;
                    z = 56 > z % 64 ? 64 : 128;
                    this.buffer[R] = 128;
                    for (R += 1; R < z -
                        8; R++) this.buffer[R] = 0;
                    this.buffer[z - 8] = ka >>> 24 & 255;
                    this.buffer[z - 7] = ka >>> 16 & 255;
                    this.buffer[z - 6] = ka >>> 8 & 255;
                    this.buffer[z - 5] = ka >>> 0 & 255;
                    this.buffer[z - 4] = La >>> 24 & 255;
                    this.buffer[z - 3] = La >>> 16 & 255;
                    this.buffer[z - 2] = La >>> 8 & 255;
                    this.buffer[z - 1] = La >>> 0 & 255;
                    mb(this.Ch, this.state, this.buffer, 0, z);
                    this.finished = !0
                }
                for (R = 0; 8 > R; R++) t[4 * R] = this.state[R] >>> 24 & 255, t[4 * R + 1] = this.state[R] >>> 16 & 255, t[4 * R + 2] = this.state[R] >>> 8 & 255, t[4 * R + 3] = this.state[R] >>> 0 & 255;
                return this
            };
            u.prototype.digest = function() {
                var t = new Uint8Array(this.Mi);
                this.finish(t);
                return t
            };
            return u
        }(),
        Jh = setTimeout;
    Fc.prototype["catch"] = function(u) {
        return this.then(null, u)
    };
    Fc.prototype.then = function(u, t) {
        var z = new this.constructor(Hc);
        Jc(this, new sd(u, t, z));
        return z
    };
    Fc.prototype["finally"] = function(u) {
        var t = this.constructor;
        return this.then(function(z) {
            return t.resolve(u()).then(function() {
                return z
            })
        }, function(z) {
            return t.resolve(u()).then(function() {
                return t.reject(z)
            })
        })
    };
    Fc.all = function(u) {
        return new Fc(function(t, z) {
            function R(ib, Ab) {
                try {
                    if (Ab && ("object" ===
                            typeof Ab || "function" === typeof Ab)) {
                        var Bb = Ab.then;
                        if ("function" === typeof Bb) {
                            Bb.call(Ab, function(Zb) {
                                R(ib, Zb)
                            }, z);
                            return
                        }
                    }
                    ka[ib] = Ab;
                    0 === --La && t(ka)
                } catch (Zb) {
                    z(Zb)
                }
            }
            if (!u || "undefined" === typeof u.length) return z(new TypeError("Promise.all accepts an array"));
            var ka = Array.prototype.slice.call(u);
            if (0 === ka.length) return t([]);
            for (var La = ka.length, ob = 0; ob < ka.length; ob++) R(ob, ka[ob])
        })
    };
    Fc.allSettled = function(u) {
        return new this(function(t, z) {
            function R(ob, ib) {
                if (ib && ("object" === typeof ib || "function" ===
                        typeof ib)) {
                    var Ab = ib.then;
                    if ("function" === typeof Ab) {
                        Ab.call(ib, function(Bb) {
                            R(ob, Bb)
                        }, function(Bb) {
                            ka[ob] = {
                                status: "rejected",
                                reason: Bb
                            };
                            0 === --La && t(ka)
                        });
                        return
                    }
                }
                ka[ob] = {
                    status: "fulfilled",
                    value: ib
                };
                0 === --La && t(ka)
            }
            if (!u || "undefined" === typeof u.length) return z(new TypeError(typeof u + " " + u + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var ka = Array.prototype.slice.call(u);
            if (0 === ka.length) return t([]);
            var La = ka.length;
            for (z = 0; z < ka.length; z++) R(z, ka[z])
        })
    };
    Fc.resolve = function(u) {
        return u &&
            "object" === typeof u && u.constructor === Fc ? u : new Fc(function(t) {
                t(u)
            })
    };
    Fc.reject = function(u) {
        return new Fc(function(t, z) {
            z(u)
        })
    };
    Fc.race = function(u) {
        return new Fc(function(t, z) {
            if (!u || "undefined" === typeof u.length) return z(new TypeError("Promise.race accepts an array"));
            for (var R = 0, ka = u.length; R < ka; R++) Fc.resolve(u[R]).then(t, z)
        })
    };
    Fc.Hb = "function" === typeof setImmediate && function(u) {
        setImmediate(u)
    } || function(u) {
        Jh(u, 0)
    };
    Fc.wc = function(u) {
        "undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:",
            u)
    };
    (function() {
        function u() {}
        u.Cj = function() {
            var t;
            void 0 === t && (t = Fc);
            D || (D = t)
        };
        return u
    })().Cj();
    (function() {
        return ta(this, void 0, void 0, function() {
            return Ha(this, function(u) {
                switch (u.label) {
                    case 0:
                        return la() ? [4, Rb()] : [3, 2];
                    case 1:
                        return u.B(), [3, 3];
                    case 2:
                        mc(), u.label = 3;
                    case 3:
                        return [2]
                }
            })
        })
    })()
})();
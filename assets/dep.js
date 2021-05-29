function FewModal(o, e) {
    var n, i = this,
        s = (o = $(o), !1),
        t = {};
    e = e || {}, t.wrapperTime = e.wrapperTime || 300, t.bodyIn = e.bodyIn || 300, t.bodyOut = e.bodyOut || 300, t.disableHash = e.disableHash, this._showWrapper = function(e) {
            if (s) return e();
            o.css({
                display: "flex"
            }).hide().fadeIn(t.wrapperTime, function() {
                s = !0, e && e()
            })
        }, this._hideWrapper = function(e) {
            s || e && e(), o.fadeOut(t.wrapperTime, function() {
                s = !1, e && e()
            })
        }, this._showBody = function(e, s) {
            n != e ? n ? i._hideBody(function() {
                i._showBody(e, s)
            }) : o.children(e).css({
                display: "flex"
            }).hide().fadeIn(t.bodyIn, function() {
                n = e, s && s()
            }) : s && s()
        }, this._hideBody = function(e) {
            o.children(n).fadeOut(t.bodyOut, function() {
                n = null, e && e()
            })
        }, this.showBySelector = function(o, e) {
            $(o).length > 0 && this._showWrapper(function() {
                i._showBody(o, e)
            })
        }, this.close = function(o) {
            n && this._hideBody(function() {
                i._hideWrapper(o)
            })
        }, this.getActive = function() {
            return n
        },
        function() {
            if (!t.disableHash) {
                var e = window.location.hash;
                e.length > 1 && i.showBySelector(e)
            }
            o.on("click", function(o) {
                var e = $(o.target);
                if (e.hasClass("modalochka__close") || e.hasClass("modalochka") || e.hasClass("modalochka__body")) return i.close();
                e.closest(".modalochka__close").length > 0 && i.close()
            }), $(document).on("keypress", function(o) {
                27 == o.keyCode && i.close()
            }), t.disableHash || $(window).on("hashchange", function() {
                var o = window.location.hash;
                o !== n && o.length > 1 && i.showBySelector(o)
            })
        }()
}

function WheelGame(t, e) {
    var i = this,
        s = {
            level: 1,
            spins: 3,
            angle: 0,
            achievements: [],
            isActive: !1
        },
        a = $(t),
        n = {
            availableSpins: a.find(".chetchek__value"),
            achievements: a.find(".maladca"),
            achievementsAll: $(".maladca_hidden"),
            spinner: a.find(".koleso__spinner")
        };
    this.startLevel = function(t) {
        if (s.isActive) return !1;
        var e, a;
        s.isActive = !0, s.spins > 0 ? s.spins-- : s.spins = 0, i.updateSpins();
        var n = function() {
            i.addAchievement(t), setTimeout(function() {
                i.showPopup(t, function() {
                    s.level++, s.isActive = !1, i.save()
                })
            }, 500)
        };
        switch (t) {
            case 1:
                e = i.countAngle(2, 4.9), a = i.countDuration(2, 4.9), i.spin(e, a, function() {
                    i.removeAchievement(0), n()
                });
                break;
            case 2:
                e = i.countAngle(3, 6.2), a = i.countDuration(3, 6.2), i.spin(e, a, n);
                break;
             case 3:
                e = i.countAngle(3, 6.2), a = i.countDuration(3, 6.2), i.spin(e, a, n);
                break;
            default:
                s.isActive = !1, i.showPopup(2), console.log(t)
        }
    }, this.spin = function(t, e, i) {
        n.spinner.rotate({
            duration: e,
            animateTo: t,
            callback: i
        })
    }, this.countAngle = function(t, e) {
        return s.angle = s.angle + 45 * (8 * t + e), s.angle
    }, this.countDuration = function(t, e) {
        return 250 * (8 * t + e)
    }, this.showPopup = function(t, i) {
        var s = "#level-" + t;
        e.showBySelector(s, i)
    }, this.addAchievement = function(t) {
        var e = n.achievementsAll.children().eq(t).clone();
        n.achievements.append(e), e.addClass("maladca__item_animated")
    }, this.removeAchievement = function(t) {
        n.achievements.children().eq(t).remove()
    }, this.updateSpins = function() {
        n.availableSpins.html(s.spins)
    }, this.save = function() {
        var t = JSON.stringify(s);
        try {
            window.localStorage.setItem("wheelRaGameStateSS", t)
        } catch (t) {
            console.log(t)
        }
    }, this.reset = function() {
        window.localStorage.removeItem("wheelRaGameStateSS")
    }, this.init = function() {
        var t = JSON.parse(window.localStorage.getItem("wheelRaGameStateSS"));
        t ? (s = t, i.spin(s.angle, 0), i.updateSpins(), 2 == s.level ? i.addAchievement(1) : (i.addAchievement(1), i.addAchievement(2), i.showPopup(2))) : (this.spin(i.countAngle(0, -1), 0), setTimeout(function() {
            i.addAchievement(0)
        }, 300)), $(".spuner").on("click", function() {
            $(".koleso__button-holder").removeClass("koleso__button-holder_blinking"), e.getActive() ? e.close(function() {
                i.startLevel(s.level)
            }) : i.startLevel(s.level)
        }), a.find(".koleso").addClass("koleso_animated")
    }
}! function($) {
    for (var supportedCSS, supportedCSSOrigin, styles = document.getElementsByTagName("head")[0].style, toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" "), a = 0, O; a < toCheck.length; a++) void 0 !== styles[toCheck[a]] && (supportedCSS = toCheck[a]);
    supportedCSS && (supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/, "TransformOrigin"), "T" == supportedCSSOrigin[0] && (supportedCSSOrigin[0] = "t")), eval('IE = "v"=="\v"'), jQuery.fn.extend({
        rotate: function(t) {
            if (0 !== this.length && void 0 !== t) {
                "number" == typeof t && (t = {
                    angle: t
                });
                for (var e = [], i = 0, s = this.length; i < s; i++) {
                    var a = this.get(i);
                    if (a.Wilq32 && a.Wilq32.PhotoEffect) a.Wilq32.PhotoEffect._handleRotation(t);
                    else {
                        var n = $.extend(!0, {}, t),
                            h = new Wilq32.PhotoEffect(a, n)._rootObj;
                        e.push($(h))
                    }
                }
                return e
            }
        },
        getRotateAngle: function() {
            for (var t = [], e = 0, i = this.length; e < i; e++) {
                var s = this.get(e);
                s.Wilq32 && s.Wilq32.PhotoEffect && (t[e] = s.Wilq32.PhotoEffect._angle)
            }
            return t
        },
        stopRotate: function() {
            for (var t = 0, e = this.length; t < e; t++) {
                var i = this.get(t);
                i.Wilq32 && i.Wilq32.PhotoEffect && clearTimeout(i.Wilq32.PhotoEffect._timer)
            }
        }
    }), Wilq32 = window.Wilq32 || {}, Wilq32.PhotoEffect = supportedCSS ? function(t, e) {
        t.Wilq32 = {
            PhotoEffect: this
        }, this._img = this._rootObj = this._eventObj = t, this._handleRotation(e)
    } : function(t, e) {
        if (this._img = t, this._onLoadDelegate = [e], this._rootObj = document.createElement("span"), this._rootObj.style.display = "inline-block", this._rootObj.Wilq32 = {
                PhotoEffect: this
            }, t.parentNode.insertBefore(this._rootObj, t), t.complete) this._Loader();
        else {
            var i = this;
            jQuery(this._img).bind("load", function() {
                i._Loader()
            })
        }
    }, Wilq32.PhotoEffect.prototype = {
        _setupParameters: function(t) {
            this._parameters = this._parameters || {}, "number" != typeof this._angle && (this._angle = 0), "number" == typeof t.angle && (this._angle = t.angle), this._parameters.animateTo = "number" == typeof t.animateTo ? t.animateTo : this._angle, this._parameters.step = t.step || this._parameters.step || null, this._parameters.easing = t.easing || this._parameters.easing || this._defaultEasing, this._parameters.duration = "duration" in t ? t.duration : t.duration || this._parameters.duration || 1e3, this._parameters.callback = t.callback || this._parameters.callback || this._emptyFunction, this._parameters.center = t.center || this._parameters.center || ["50%", "50%"], "string" == typeof this._parameters.center[0] ? this._rotationCenterX = parseInt(this._parameters.center[0], 10) / 100 * this._imgWidth * this._aspectW : this._rotationCenterX = this._parameters.center[0], "string" == typeof this._parameters.center[1] ? this._rotationCenterY = parseInt(this._parameters.center[1], 10) / 100 * this._imgHeight * this._aspectH : this._rotationCenterY = this._parameters.center[1], t.bind && t.bind != this._parameters.bind && this._BindEvents(t.bind)
        },
        _emptyFunction: function() {},
        _defaultEasing: function(t, e, i, s, a) {
            return -s * ((e = e / a - 1) * e * e * e - 1) + i
        },
        _handleRotation: function(t, e) {
            supportedCSS || this._img.complete || e ? (this._setupParameters(t), this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()) : this._onLoadDelegate.push(t)
        },
        _BindEvents: function(t) {
            if (t && this._eventObj) {
                if (this._parameters.bind) {
                    var e = this._parameters.bind;
                    for (var i in e) e.hasOwnProperty(i) && jQuery(this._eventObj).unbind(i, e[i])
                }
                for (var i in this._parameters.bind = t, t) t.hasOwnProperty(i) && jQuery(this._eventObj).bind(i, t[i])
            }
        },
        _Loader: IE ? function() {
            var t, e = this._img.width,
                i = this._img.height;
            for (this._imgWidth = e, this._imgHeight = i, this._img.parentNode.removeChild(this._img), this._vimage = this.createVMLNode("image"), this._vimage.src = this._img.src, this._vimage.style.height = i + "px", this._vimage.style.width = e + "px", this._vimage.style.position = "absolute", this._vimage.style.top = "0px", this._vimage.style.left = "0px", this._aspectW = this._aspectH = 1, this._container = this.createVMLNode("group"), this._container.style.width = e, this._container.style.height = i, this._container.style.position = "absolute", this._container.style.top = "0px", this._container.style.left = "0px", this._container.setAttribute("coordsize", e - 1 + "," + (i - 1)), this._container.appendChild(this._vimage), this._rootObj.appendChild(this._container), this._rootObj.style.position = "relative", this._rootObj.style.width = e + "px", this._rootObj.style.height = i + "px", this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._eventObj = this._rootObj; t = this._onLoadDelegate.shift();) this._handleRotation(t, !0)
        } : function() {
            this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._imgWidth = this._img.naturalWidth, this._imgHeight = this._img.naturalHeight;
            var t, e = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);
            for (this._width = 3 * e, this._height = 3 * e, this._aspectW = this._img.offsetWidth / this._img.naturalWidth, this._aspectH = this._img.offsetHeight / this._img.naturalHeight, this._img.parentNode.removeChild(this._img), this._canvas = document.createElement("canvas"), this._canvas.setAttribute("width", this._width), this._canvas.style.position = "relative", this._canvas.style.left = -this._img.height * this._aspectW + "px", this._canvas.style.top = -this._img.width * this._aspectH + "px", this._canvas.Wilq32 = this._rootObj.Wilq32, this._rootObj.appendChild(this._canvas), this._rootObj.style.width = this._img.width * this._aspectW + "px", this._rootObj.style.height = this._img.height * this._aspectH + "px", this._eventObj = this._canvas, this._cnv = this._canvas.getContext("2d"); t = this._onLoadDelegate.shift();) this._handleRotation(t, !0)
        },
        _animateStart: function() {
            this._timer && clearTimeout(this._timer), this._animateStartTime = +new Date, this._animateStartAngle = this._angle, this._animate()
        },
        _animate: function() {
            var t = +new Date,
                e = t - this._animateStartTime > this._parameters.duration;
            if (e && !this._parameters.animatedGif) clearTimeout(this._timer);
            else {
                if (this._canvas || this._vimage || this._img) {
                    var i = this._parameters.easing(0, t - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                    this._rotate(~~(10 * i) / 10)
                }
                this._parameters.step && this._parameters.step(this._angle);
                var s = this;
                this._timer = setTimeout(function() {
                    s._animate.call(s)
                }, 10)
            }
            this._parameters.callback && e && (this._angle = this._parameters.animateTo, this._rotate(this._angle), this._parameters.callback.call(this._rootObj))
        },
        _rotate: (O = Math.PI / 180, IE ? function(t) {
            this._angle = t, this._container.style.rotation = t % 360 + "deg", this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px", this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px", this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px", this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px"
        } : supportedCSS ? function(t) {
            this._angle = t, this._img.style[supportedCSS] = "rotate(" + t % 360 + "deg)", this._img.style[supportedCSSOrigin] = this._parameters.center.join(" ")
        } : function(t) {
            this._angle = t, t = t % 360 * O, this._canvas.width = this._width, this._canvas.height = this._height, this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH), this._cnv.translate(this._rotationCenterX, this._rotationCenterY), this._cnv.rotate(t), this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY), this._cnv.scale(this._aspectW, this._aspectH), this._cnv.drawImage(this._img, 0, 0)
        })
    }, IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function() {
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            return !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                function(t) {
                    return document.createElement("<rvml:" + t + ' class="rvml">')
                }
        } catch (t) {
            return function(t) {
                return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
    }())
}(jQuery),
function(t) {
    var e = new WheelGame(".chikkens-bg", new FewModal("#modal-content", {
        disableHash: !0
    }));
    t(document).ready(function() {
        e.init()
    })
}(jQuery);
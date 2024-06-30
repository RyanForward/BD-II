"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
var typeorm_1 = require("typeorm");
var Session = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('sessions')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _sessionKey_decorators;
    var _sessionKey_initializers = [];
    var _sessionKey_extraInitializers = [];
    var _sessionName_decorators;
    var _sessionName_initializers = [];
    var _sessionName_extraInitializers = [];
    var _sessionType_decorators;
    var _sessionType_initializers = [];
    var _sessionType_extraInitializers = [];
    var _circuitShortName_decorators;
    var _circuitShortName_initializers = [];
    var _circuitShortName_extraInitializers = [];
    var _countryKey_decorators;
    var _countryKey_initializers = [];
    var _countryKey_extraInitializers = [];
    var _countryName_decorators;
    var _countryName_initializers = [];
    var _countryName_extraInitializers = [];
    var _dateEnd_decorators;
    var _dateEnd_initializers = [];
    var _dateEnd_extraInitializers = [];
    var _dateStart_decorators;
    var _dateStart_initializers = [];
    var _dateStart_extraInitializers = [];
    var _gmtOffset_decorators;
    var _gmtOffset_initializers = [];
    var _gmtOffset_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _year_decorators;
    var _year_initializers = [];
    var _year_extraInitializers = [];
    var Session = _classThis = /** @class */ (function () {
        function Session_1() {
            this.sessionKey = __runInitializers(this, _sessionKey_initializers, void 0);
            this.sessionName = (__runInitializers(this, _sessionKey_extraInitializers), __runInitializers(this, _sessionName_initializers, void 0));
            this.sessionType = (__runInitializers(this, _sessionName_extraInitializers), __runInitializers(this, _sessionType_initializers, void 0));
            this.circuitShortName = (__runInitializers(this, _sessionType_extraInitializers), __runInitializers(this, _circuitShortName_initializers, void 0));
            this.countryKey = (__runInitializers(this, _circuitShortName_extraInitializers), __runInitializers(this, _countryKey_initializers, void 0));
            this.countryName = (__runInitializers(this, _countryKey_extraInitializers), __runInitializers(this, _countryName_initializers, void 0));
            this.dateEnd = (__runInitializers(this, _countryName_extraInitializers), __runInitializers(this, _dateEnd_initializers, void 0));
            this.dateStart = (__runInitializers(this, _dateEnd_extraInitializers), __runInitializers(this, _dateStart_initializers, void 0));
            this.gmtOffset = (__runInitializers(this, _dateStart_extraInitializers), __runInitializers(this, _gmtOffset_initializers, void 0));
            this.location = (__runInitializers(this, _gmtOffset_extraInitializers), __runInitializers(this, _location_initializers, void 0));
            this.year = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _year_initializers, void 0));
            __runInitializers(this, _year_extraInitializers);
        }
        return Session_1;
    }());
    __setFunctionName(_classThis, "Session");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _sessionKey_decorators = [(0, typeorm_1.PrimaryColumn)({ name: 'session_key' })];
        _sessionName_decorators = [(0, typeorm_1.Column)({ name: 'session_name' })];
        _sessionType_decorators = [(0, typeorm_1.Column)({ name: 'session_type' })];
        _circuitShortName_decorators = [(0, typeorm_1.Column)({ name: 'circuit_short_name' })];
        _countryKey_decorators = [(0, typeorm_1.Column)({ name: 'country_key' })];
        _countryName_decorators = [(0, typeorm_1.Column)({ name: 'country_name' })];
        _dateEnd_decorators = [(0, typeorm_1.Column)({ name: 'date_end', type: 'time', nullable: true })];
        _dateStart_decorators = [(0, typeorm_1.Column)({ name: 'date_start', type: 'time' })];
        _gmtOffset_decorators = [(0, typeorm_1.Column)({ name: 'gmt_offset' })];
        _location_decorators = [(0, typeorm_1.Column)({ name: 'location' })];
        _year_decorators = [(0, typeorm_1.Column)({ name: 'year' })];
        __esDecorate(null, null, _sessionKey_decorators, { kind: "field", name: "sessionKey", static: false, private: false, access: { has: function (obj) { return "sessionKey" in obj; }, get: function (obj) { return obj.sessionKey; }, set: function (obj, value) { obj.sessionKey = value; } }, metadata: _metadata }, _sessionKey_initializers, _sessionKey_extraInitializers);
        __esDecorate(null, null, _sessionName_decorators, { kind: "field", name: "sessionName", static: false, private: false, access: { has: function (obj) { return "sessionName" in obj; }, get: function (obj) { return obj.sessionName; }, set: function (obj, value) { obj.sessionName = value; } }, metadata: _metadata }, _sessionName_initializers, _sessionName_extraInitializers);
        __esDecorate(null, null, _sessionType_decorators, { kind: "field", name: "sessionType", static: false, private: false, access: { has: function (obj) { return "sessionType" in obj; }, get: function (obj) { return obj.sessionType; }, set: function (obj, value) { obj.sessionType = value; } }, metadata: _metadata }, _sessionType_initializers, _sessionType_extraInitializers);
        __esDecorate(null, null, _circuitShortName_decorators, { kind: "field", name: "circuitShortName", static: false, private: false, access: { has: function (obj) { return "circuitShortName" in obj; }, get: function (obj) { return obj.circuitShortName; }, set: function (obj, value) { obj.circuitShortName = value; } }, metadata: _metadata }, _circuitShortName_initializers, _circuitShortName_extraInitializers);
        __esDecorate(null, null, _countryKey_decorators, { kind: "field", name: "countryKey", static: false, private: false, access: { has: function (obj) { return "countryKey" in obj; }, get: function (obj) { return obj.countryKey; }, set: function (obj, value) { obj.countryKey = value; } }, metadata: _metadata }, _countryKey_initializers, _countryKey_extraInitializers);
        __esDecorate(null, null, _countryName_decorators, { kind: "field", name: "countryName", static: false, private: false, access: { has: function (obj) { return "countryName" in obj; }, get: function (obj) { return obj.countryName; }, set: function (obj, value) { obj.countryName = value; } }, metadata: _metadata }, _countryName_initializers, _countryName_extraInitializers);
        __esDecorate(null, null, _dateEnd_decorators, { kind: "field", name: "dateEnd", static: false, private: false, access: { has: function (obj) { return "dateEnd" in obj; }, get: function (obj) { return obj.dateEnd; }, set: function (obj, value) { obj.dateEnd = value; } }, metadata: _metadata }, _dateEnd_initializers, _dateEnd_extraInitializers);
        __esDecorate(null, null, _dateStart_decorators, { kind: "field", name: "dateStart", static: false, private: false, access: { has: function (obj) { return "dateStart" in obj; }, get: function (obj) { return obj.dateStart; }, set: function (obj, value) { obj.dateStart = value; } }, metadata: _metadata }, _dateStart_initializers, _dateStart_extraInitializers);
        __esDecorate(null, null, _gmtOffset_decorators, { kind: "field", name: "gmtOffset", static: false, private: false, access: { has: function (obj) { return "gmtOffset" in obj; }, get: function (obj) { return obj.gmtOffset; }, set: function (obj, value) { obj.gmtOffset = value; } }, metadata: _metadata }, _gmtOffset_initializers, _gmtOffset_extraInitializers);
        __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
        __esDecorate(null, null, _year_decorators, { kind: "field", name: "year", static: false, private: false, access: { has: function (obj) { return "year" in obj; }, get: function (obj) { return obj.year; }, set: function (obj, value) { obj.year = value; } }, metadata: _metadata }, _year_initializers, _year_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Session = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Session = _classThis;
}();
exports.Session = Session;

"use strict";
cc._RF.push(module, '64ba7NGGD9JD7UzsoHb2YbE', 'player');
// Script/player.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jumpHeight = 0;
        _this.jumpDuration = 0;
        _this.maxMoveSpeed = 0;
        _this.accel = 0;
        _this.jumpSound = null;
        _this.jumpAction = null;
        _this.accLeft = false;
        _this.accRight = false;
        _this.xSpeed = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Player.prototype.onLoad = function () {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.start = function () {
    };
    Player.prototype.setJumpAction = function () {
        var _this = this;
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCircleActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionInOut());
        var jumpSound = cc.callFunc(function () { return cc.audioEngine.playEffect(_this.jumpSound, false); }, this);
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, jumpSound));
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accRight = false;
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accLeft = false;
                this.accRight = true;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    };
    Player.prototype.update = function (dt) {
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        }
        else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        this.xSpeed = Math.min(this.xSpeed, this.maxMoveSpeed);
        this.xSpeed = Math.max(this.xSpeed, -this.maxMoveSpeed);
        this.node.x += this.xSpeed * dt;
        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
            this.xSpeed = 0;
        }
        else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
            this.xSpeed = 0;
        }
    };
    __decorate([
        property(cc.Float)
    ], Player.prototype, "jumpHeight", void 0);
    __decorate([
        property(cc.Float)
    ], Player.prototype, "jumpDuration", void 0);
    __decorate([
        property(cc.Float)
    ], Player.prototype, "maxMoveSpeed", void 0);
    __decorate([
        property(cc.Float)
    ], Player.prototype, "accel", void 0);
    __decorate([
        property({
            type: cc.AudioClip
        })
    ], Player.prototype, "jumpSound", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();
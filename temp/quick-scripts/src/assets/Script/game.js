"use strict";
cc._RF.push(module, '285ddP5rMVHpLmYY2G5pqrv', 'game');
// Script/game.ts

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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starPrefab = null;
        _this.ground = null;
        _this.player = null;
        _this.scoreDisplay = null;
        _this.scoreSound = null;
        _this.maxStarDuration = 0;
        _this.minStarDuration = 0;
        _this.groundY = 0;
        _this.score = 0;
        _this.starDuration = 0;
        _this.timer = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Game.prototype.onLoad = function () {
        cc.director.preloadScene('Menu');
        this.score = 0;
        this.timer = 0;
        this.starDuration = 0;
        this.spawnNewStar();
        this.groundY = this.ground.y + this.ground.height * this.ground.anchorY;
        this.scoreDisplay.string = 'Score: ' + this.score;
    };
    Game.prototype.spawnNewStar = function () {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        var pos = this.getNewStarPosition();
        newStar.setPosition(pos);
        var component = newStar.getComponent('star');
        component.game = this;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
        console.log(this.starDuration);
    };
    Game.prototype.getNewStarPosition = function () {
        var randY = this.groundY + Math.random() * this.player.getComponent('player').jumpHeight - 10;
        var maxX = this.node.width * 0.5;
        var randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    };
    Game.prototype.gainScore = function () {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score;
        cc.audioEngine.playEffect(this.scoreSound, false);
    };
    Game.prototype.start = function () {
    };
    Game.prototype.gameOver = function () {
        this.player.stopAllActions();
        cc.director.loadScene('Menu');
    };
    Game.prototype.update = function (dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "starPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "ground", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreDisplay", void 0);
    __decorate([
        property({
            type: cc.AudioClip
        })
    ], Game.prototype, "scoreSound", void 0);
    __decorate([
        property
    ], Game.prototype, "maxStarDuration", void 0);
    __decorate([
        property
    ], Game.prototype, "minStarDuration", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();
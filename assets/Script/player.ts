// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Float)
    jumpHeight:number = 0 ;

    @property(cc.Float)
    jumpDuration: number = 0;

    @property(cc.Float)
    maxMoveSpeed: number = 0;

    @property(cc.Float)
    accel:number = 0;

    @property({
        type: cc.AudioClip
    })
    jumpSound: cc.AudioClip = null;

    jumpAction: cc.ActionInterval = null;
    accLeft:boolean = false;
    accRight:boolean = false;
    xSpeed:number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }

    start () {

    }

    setJumpAction(){
        const jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0,this.jumpHeight)).easing(cc.easeCircleActionOut());
        const jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionInOut());
        const jumpSound = cc.callFunc(()=>cc.audioEngine.playEffect(this.jumpSound,false),this);
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown,jumpSound));
    }
    onKeyDown(event){
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accRight = false;
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accLeft = false;
                this.accRight=true;
                break;
        }
    }

    onKeyUp(event){
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    }
    
    update (dt) {
        if(this.accLeft){
            this.xSpeed -= this.accel*dt
        }else if(this.accRight){
            this.xSpeed += this.accel*dt;
        }
        this.xSpeed = Math.min(this.xSpeed,this.maxMoveSpeed);
        this.xSpeed = Math.max(this.xSpeed,-this.maxMoveSpeed);
        this.node.x += this.xSpeed * dt;

        if ( this.node.x > this.node.parent.width/2) {
            this.node.x = this.node.parent.width/2;
            this.xSpeed = 0;
        } else if (this.node.x < -this.node.parent.width/2) {
            this.node.x = -this.node.parent.width/2;
            this.xSpeed = 0;
        }
    }
}

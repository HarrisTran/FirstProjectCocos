// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    @property(cc.Float)
    pickRadius:number =0;

    game = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if(this.getPlayerDistance() < this.pickRadius){
            this.onPicked();
            return ;
        }
        const opacityRatio = 1-this.game.timer/this.game.starDuration;
        const minOpacity= 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio*(255-minOpacity));
    }
    onPicked() {
        this.game.spawnNewStar();
        this.game.gainScore();
        this.node.destroy();
    }
    getPlayerDistance() {
        const playerPos = this.game.player.getPosition();
        const dist = this.node.position.sub(playerPos).mag();
        return dist;
    }
}

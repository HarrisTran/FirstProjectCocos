// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    starPrefab: cc.Prefab = null;

    @property(cc.Node)
    ground: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Label)
    scoreDisplay: cc.Label = null;

    @property({
        type: cc.AudioClip
    })
    scoreSound: cc.AudioClip = null;

    @property
    maxStarDuration:number = 0;

    @property
    minStarDuration:number = 0;

    groundY:number = 0;
    score:number = 0;
    starDuration:number = 0;
    timer: number = 0;



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene('Menu');
        this.score = 0;
        this.timer = 0;
        this.starDuration = 0;
        this.spawnNewStar();
        this.groundY = this.ground.y + this.ground.height*this.ground.anchorY;
        this.scoreDisplay.string = 'Score: ' + this.score;
    }
    spawnNewStar() {
        const newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        const pos = this.getNewStarPosition();
        newStar.setPosition(pos);
        const component = newStar.getComponent('star');
        component.game = this;
        this.starDuration=this.minStarDuration + Math.random()*(this.maxStarDuration-this.minStarDuration);
        this.timer = 0;
        console.log(this.starDuration);
    }
    getNewStarPosition(){
        const randY = this.groundY + Math.random()*this.player.getComponent('player').jumpHeight-10;
        const maxX = this.node.width * 0.5;
        const randX = (Math.random()-0.5)*2*maxX;
        return cc.v2(randX,randY);
    }
    gainScore(){
        this.score+=1;
        this.scoreDisplay.string = 'Score: ' + this.score;
        cc.audioEngine.playEffect(this.scoreSound,false);
    }

    start () {

    }

    gameOver(){
        this.player.stopAllActions();
        cc.director.loadScene('Menu');
    }

    update (dt) {
        if(this.timer > this.starDuration){
            this.gameOver();
            return ;
        }
        this.timer+=dt;
    }
}

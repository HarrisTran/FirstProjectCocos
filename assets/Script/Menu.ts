// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {
    onLoad () {
        cc.director.preloadScene('Game');
        this.node.on('touchstart',()=>{
            cc.director.loadScene('Game');
        })
    }

    start () {

    }

    // update (dt) {}
}

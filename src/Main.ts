/**
 * HelloWorld
 *
 * Basic template based on VF engine.
 *
 * @author 8088
 */
export default class Main extends vf.gui.Container {
    public constructor(stage: vf.gui.Stage) {
        super();
        this.$stage = stage;
        
        this.addListener('added', this.initialization)
        
        console.log('============Helloword!!==============');
        
        // 模拟载入异步插件并使用
        this.loadExternalPlugin();

    }

    /**
     * 释放
     * 
     */
    public release() {
        this.logo.release();
        this.label.release();
        this.links.release();

        super.release();
    }

    // Internals
    //

    private logo!: vf.gui.Image;
    private label!: vf.gui.Label;
    private links!: any;
    private tween!: vf.gui.Tween;
    private sw:number = 0;
    private sh:number = 0;
    private tl:number = 0;

    /**
     * 初始化元件、排版布局
     * 
     */
    private initialization() {
        this.sw = Number(this.$stage?.width);
        this.sh = Number(this.stage?.height);
        this.tl = this.sw > this.sh ? this.sh * .55 : this.sw * .9;

        this.logo = new vf.gui.Image();
        this.logo.src = './assets/vf-logo.png';
        this.logo.style.width = this.tl;
        this.logo.style.height = this.tl;
        this.logo.style.pivotX = this.tl *.5;
        this.logo.style.pivotY = this.tl *.5;
        this.logo.style.top = this.tl *.6;
        this.logo.style.left = this.sw *.5;
        this.addChild(this.logo);

        this.label = new vf.gui.Label();
        this.label.text = 'Wellcome to Your VF.js APP';
        this.label.style.fontSize = Math.round(this.tl*.08);
        this.label.style.color = [ 0xff6600, 0xff00ff, 0x00ffff, 0xff6600, 0xff00ff, 0x00ffff, 0xff6600, 0xff00ff, 0x00ffff];
        this.label.style.width = this.sw;
        this.label.style.top = this.tl * 1.2;
        this.label.style.textAlign = 'center';
        this.label.style.fillGradientType = 1;
        this.label.style.fillGradientStops = [0, .1, .36, .37, .46, .6, .66, .67, 1];
        this.addChild(this.label);

        this.startInteraction();
    }

    /**
     * 启动交互
     * 
     */
    private startInteraction () {
        this.logo.interactabled = true;
        this.logo.style.cursor = 'pointer';
        this.logo.addListener('click', this.onClickHandler, this)
    }
    private onClickHandler(e:Event) {
        const temp = new vf.gui.Image();
        temp.src = './assets/vf-logo.png';
        temp.style.width = this.tl;
        temp.style.height = this.tl;
        temp.style.pivotX = this.tl *.5;
        temp.style.pivotY = this.tl *.5;
        temp.style.top = this.tl *.6;
        temp.style.left = this.sw *.5;
        this.addChild(temp);

        const tween = new vf.gui.Tween(temp);
        tween.to({scaleX: 1.8, scaleY: 1.6, alpha: 0}, 600);
        tween.start();
    }

    /**
     * 载入外部插件
     * 
     */
    private async loadExternalPlugin(){

        const RichLabel = await vf.utils.readFileSync('//vf-cdn.yunkc.cn/plugin/richlabel/0.0.7.js', { moduleName: 'RichLabel' }).catch((e) => {
            console.log('载入异常'); 
        });

        // 初始化完隐藏默认loading
        this.$stage?.emit('hideLoading');
        
        if(RichLabel){
            this.links = new RichLabel();
            this.links.interactabled = true;
            this.links.style.fontSize = Math.round(this.tl*.05);
            this.links.textFlow = '<label color="#333333" fontfamily="Arial">For guidelines and methods on how to configure / customize development projects, please check the </label>'+
            '<label color="#ff6600" fontfamily="Arial" textdecoration="UnderLine" textDecorationColor="#ff6600" href="https://yunkc.gitee.io/docs/">vf-engine documentation.</label>';
            this.links.style.width = this.sw > this.sh ? this.tl * 1.6 : this.tl * 1;
            this.links.style.height = this.tl;
            this.links.style.pivotX = this.sw > this.sh ? this.tl * .8 : this.tl * .5;
            this.links.style.top = this.tl * 1.35;
            this.links.style.left = this.sw *.5;
            this.links.style.textAlign = 'center';
            this.links.style.lineHeight = this.links.style.fontSize * 1.8;
            this.addChild(this.links);
        }
    }

}


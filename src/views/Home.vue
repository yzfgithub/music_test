<template>
  <div class="kpl-piano kpl-wrap">
    <div class="piano-ctn">
        <div class="piano-title">
            <p>快陪练钢琴</p>
        </div>
        <div ref="pianoKey" :style="{height:pianoPerKeyHeight + 'px'}" class="piano-key">
            <div @click.stop="clickPianoKey($event,beat.name)" v-for="beat in Beats" :key="beat.keyCode" v-if="beat.type==='white'" class="key-item">
                <div class="key-tip">
                    <div class="keyname">{{beat.key}}</div>
                    <div class="notename">{{beat.name}}</div>
                </div>
            </div>
            <div @click.stop="clickPianoKey($event,beat.name)" v-for="beat in Beats" :key="beat.keyCode" v-if="beat.type==='black'" :style="{left: keyLeft(beat.id)}" class="key-item key-item-black">
                <div class="key-tip">
                    <div class="keyname" v-html="beat.key"></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import Beat from '@/utils/beat'
    import Tone from 'tone'
    import toneClass from '@/utils/toneClass'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      Beats: Beat,
      pianoPerKeyWidth: '',
      pianoPerKeyHeight: '',
      blackKeyHeight: '',
      leftArray:[0.09,0.24,0.5,0.65,0.79],
      synth: null,
    }
  },
  mounted(){
    this.initTone();
    this.resize();
  },
  methods:{
    keyLeft(id){
        let count = (id-35) % 5;
        let pos = Math.floor((id-36) / 5);
        let x = pos*20+20*this.leftArray[count];
        return x+'%';
    },
    initTone(){
      this.bindKeyBoradEvent()
      this.setListener();
      this.synth = toneClass.load({
        instruments: "piano"
      }).toMaster()
      // var sampler = new Tone.Sampler({
      //   "C3" : "/src/assets/piano/C3.mp3",
      // }, function(){
      //   //sampler will repitch the closest sample
      //   console.log('s')
      //   sampler.triggerAttack("C3")
      // })
    },
    resize(){
      let clientWidth = this.$refs.pianoKey.offsetWidth;
      this.pianoPerKeyWidth = clientWidth / 36;
      this.pianoPerKeyHeight = this.pianoPerKeyWidth * 7;
      this.blackKeyHeight = this.pianoPerKeyWidth * 0.7;
    },
    bindKeyBoradEvent() {
      const ShiftKeyCode = 16
      document.addEventListener('keydown', (e) => {
        let keyCode = e.keyCode;
        let keyFilter = this.Beats.filter(item => parseInt(item.keyCode) === keyCode);
        let name = keyFilter[0].name;
          // this.playNoteByKeyCode(keyCode)
        //根据keycode 获取name
          this.playBeat(name);
      }, false)
    },
    setListener() {
      window.onresize = this.resize()
      window.onorientationchange = this.resize()
      //
      // // 数字简谱自动播放
      // Observe.$on(OBEvent.AUTO_PLAY_NUM_SCORE, (scorename) => {
      //   this.playScoreByName(scorename)
      // })
      // // XML乐谱自动播放
      // Observe.$on(OBEvent.AUTO_PLAY_XML_SCORE, (musicScore) => {
      //   this.addToPlayQueue(musicScore)
      //   // try {
      //   //   this.playXMLScore(musicScore)
      //   // } catch (e) {
      //   //   console.log(e)
      //   // }
      // })
      // // 暂停自动播放
      // Observe.$on(OBEvent.PAUSE_AUTO_PLAY, (scoreItem) => {
      //   this.pauseAutoPlay(scoreItem)
      //   this.pauseXMLPlay()
      // })
      // Observe.$on(OBEvent.PAUSE_XML_AUTO_PLAY, (scoreItem) => {
      //   this.pauseXMLPlay()
      // })
    },
    clickPianoKey(e,name){
        this.playBeat(name);
    },
    playBeat(notename = 'C4',duration = '8n'){
      if (!this.synth) return

      try {
        console.log(this.synth,'ASDF')
        this.synth.triggerAttackRelease(notename, duration);
      } catch (e) {}

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
    .kpl-piano{
        width 100%
        position relative
        color #000
        .piano-ctn{
            width 85%
            margin 20px auto
            border-radius 5px
            position relative
            box-shadow 5px 5px 20px 5px #888
            .piano-title{
                width 100%
                height 40px
                line-height 40px
                background-color #000
                text-align center
                color #fff
            }
            .piano-key{
                width 100%
                background #373737
                overflow hidden
                position relative
                .key-item{
                    display inline-block
                    width 2.775%
                    height 100%
                    margin 0 auto
                    background #fff
                    background linear-gradient(-30deg, #f5f5f5, #fff)
                    border 1px solid #ccc
                    -webkit-box-shadow inset 0 1px 0px #fff, inset 0 -1px 0px #fff, inset 1px 0px 0px #fff, inset -1px 0px 0px #fff, 0 4px 3px rgba(0, 0, 0, 0.7)
                    box-shadow inset 0 1px 0px #fff, inset 0 -1px 0px #fff, inset 1px 0px 0px #fff, inset -1px 0px 0px #fff, 0 4px 3px rgba(0, 0, 0, 0.7)
                    border-radius 0 0 5px 5px
                    position relative
                    .key-tip{
                        width: 100%;
                        color: #373737;
                        text-align: center;
                        font-size: 14px;
                        position: absolute;
                        bottom: 5%;
                    }
                }
                .key-item-black{
                    display: inline-block;
                    width: 2%;
                    height: 70%;
                    background: linear-gradient(-20deg, #333, #000, #333);
                    border-width: 1px 2px 7px;
                    border-style: solid;
                    border-color: #666 #222 #111 #555;
                    border-radius: 0 0 2px 2px;
                    -webkit-box-shadow: inset 0px -1px 2px rgba(255, 255, 255, 0.4), 0 2px 3px rgba(0, 0, 0, 0.4);
                    box-shadow: inset 0px -1px 2px rgba(255, 255, 255, 0.4), 0 2px 3px rgba(0, 0, 0, 0.4);
                    position: absolute;
                    top: 0;
                    overflow: hidden;
                    .key-tip{
                        width: 100%;
                        color: #fff;
                        position: absolute;
                        left: 0;
                        bottom: 5%;
                        font-size: 14px;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>

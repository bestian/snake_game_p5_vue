<template>
  <div class="hello">
    <div ref="canvas" class="canvas_container"></div>
    <button class="button is-warning is-large" @click="clickArrow(-1, 0)">⇦</button>
    <button class="button is-warning is-large" @click="clickArrow(0, -1)">⇧</button>
    <button class="button is-warning is-large" @click="clickArrow(0, 1)">⇩</button>
    <button class="button is-warning is-large" @click="clickArrow(1, 0)">⇨</button>
    <span class="button is-warning is-large"> 目前 {{ s && s.total }} 分 </span>
  </div>
</template>

<script>
import P5 from 'p5'
import Snake from '@/assets/Snake'
export default {
  name: 'HelloWorld',
  data () {
    return {
      script: null,
      ps: null,
      canvas: null,
      s: null, // snake
      scl: 20,
      food: null
    }
  },
  mounted () {
    this.script = p => {
      p.setup = _ => {
        this.canvas = p.createCanvas(window.innerWidth - 20, window.innerHeight - 100)
        this.canvas.parent(this.$refs.canvas)
        this.s = new Snake(p)
        p.frameRate(10)
        p.pickLocation()
      }
      p.draw = _ => {
        p.background(0)
        // 畫格線
        p.push()
        p.cols = p.floor(400 / this.scl)
        p.rows = p.floor(p.height / this.scl)
        p.stroke(70)
        for (let i = 0; i <= p.cols; i++) {
          p.line(i * this.scl, 0, i * this.scl, this.scl * p.rows)
        }
        for (let j = 0; j <= p.rows; j++) {
          p.line(0, j * this.scl, this.scl * p.cols, j * this.scl)
        }
        p.pop()

        // 處理食物
        if (this.s.eat(this.food)) {
          p.pickLocation()
        }
        p.fill('rgba(0, 255, 0, 1)')
        p.circle(this.food.x + this.scl / 2, this.food.y + this.scl / 2, this.scl / 2)

        // 處理蛇
        this.s.update()
        this.s.show()
        this.s.death()
      } // end draw

      p.pickLocation = () => {
        let cols = p.floor(400 / this.scl)
        let rows = p.floor(p.height / this.scl)
        this.food = p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)))
        this.food.mult(this.scl)
        // 指定食物在旁邊 方便debug
        // this.food = {
        //   x: 3 * this.scl,
        //   y: 0
        // }
      }
      p.keyPressed = (e) => {
        if (p.keyCode === p.LEFT_ARROW) this.s.dir(-1, 0)
        else if (p.keyCode === p.RIGHT_ARROW) this.s.dir(1, 0)
        else if (p.keyCode === p.UP_ARROW) this.s.dir(0, -1)
        else if (p.keyCode === p.DOWN_ARROW) this.s.dir(0, 1)
        else if (p.keyCode === 32) { // 按 space 直接變長
          this.s.total++
          this.s.update()
        } else { console.log('err', p.keyCode) }
      }
    }
    this.ps = new P5(this.script)
  },
  methods: {
    clickArrow (x, y) {
      this.s.dir(x, y)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.canvas_container {
  display: flex;
  justify-content: center;
  background-color: black;
  padding-top:10px;
}

</style>

<template>
  <div class="hello">
    <div ref="canvas"></div>
    <button class="button is-warning is-large" @click="clickArrow(-1, 0)">⇦</button>
    <button class="button is-warning is-large" @click="clickArrow(0, -1)">⇧</button>
    <button class="button is-warning is-large" @click="clickArrow(0, 1)">⇩</button>
    <button class="button is-warning is-large" @click="clickArrow(1, 0)">⇨</button>
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
        this.canvas = p.createCanvas(p.windowWidth, p.windowHeight - 100)
        this.canvas.parent(this.$refs.canvas)
        this.s = new Snake(p)
        p.frameRate(10)
        p.pickLocation()
      }
      p.draw = _ => {
        p.background(0)
        // 畫格線
        p.push()
        let cols = p.floor(p.width / this.scl)
        let rows = p.floor(p.height / this.scl)
        p.stroke(100)
        for (let i = 0; i < cols; i++) {
          p.line(i * this.scl, 0, i * this.scl, p.height)
        }
        for (let j = 0; j < rows; j++) {
          p.line(0, j * this.scl, p.width, j * this.scl)
        }
        p.pop()

        this.s.update()
        this.s.show()
        this.s.death()

        if (this.s.eat(this.food)) {
          p.pickLocation()
        }

        p.fill(255, 0, 100)
        p.rect(this.food.x, this.food.y, this.scl, this.scl)
      }
      p.pickLocation = () => {
        let cols = p.floor(p.width / this.scl)
        let rows = p.floor(p.height / this.scl)
        this.food = p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)))
        this.food.mult(this.scl)
      }
      p.keyPressed = () => {
        if (p.keyCode === p.LEFT_ARROW) this.s.dir(-1, 0)
        else if (p.keyCode === p.RIGHT_ARROW) this.s.dir(1, 0)
        else if (p.keyCode === p.UP_ARROW) this.s.dir(0, -1)
        else if (p.keyCode === p.DOWN_ARROW) this.s.dir(0, 1)
        else console.log('err', p.keyCode)
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

</style>

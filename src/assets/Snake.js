// const p5 = new P5()
const scl = 20
class Snake {
  constructor (p) {
    this.x = 0
    this.y = 0
    this.xspeed = 1
    this.yspeed = 0
    this.total = 0
    this.tail = []
    this.p5 = p
  }
  eat (pos) {
    let d = this.p5.dist(this.x, this.y, pos.x, pos.y)
    if (d <= 1) {
      this.total++
      return true
    } else {
      return false
    }
  }
  dir (x, y) {
    this.xspeed = x
    this.yspeed = y
  }
  death () {
    for (let i of this.tail) {
      let d = this.p5.dist(this.x, this.y, i.x, i.y)
      if (d < 1) {
        alert('你已經死了')
        this.total = 0
        this.tail = []
      }
    }
  }
  update () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1]
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = this.p5.createVector(this.x, this.y)
    }
    this.x += this.xspeed * scl
    this.y += this.yspeed * scl
    this.x = this.p5.constrain(this.x, 0, scl * this.p5.cols - scl)
    this.y = this.p5.constrain(this.y, 0, scl * this.p5.rows - scl)
  }
  show () {
    this.p5.fill('rgba(248, 231, 28,1)')
    this.p5.rect(this.x, this.y, scl, scl)
    this.p5.noStroke()
    for (let i = 0; i < this.tail.length; i++) {
      let alpha = this.p5.map(i, 0, this.tail.length, 0.2, 0.9)
      this.p5.fill(`rgba(248, 231, 28,${alpha})`)
      this.p5.rect(this.tail[i].x, this.tail[i].y, scl, scl)
    }
  }
}
export default Snake

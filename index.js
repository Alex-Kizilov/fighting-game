//for debug
const coordinates = document.querySelector('.coordinates')

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)


const gravity = 0.7
class Sprite {
  /**
   * @param {Object} position - The position of sprite on canvas.
   * @param {Object} velocity - The velocity.
   * @param {String} color - color of hit boxes.
   */
  constructor({position, velocity, color = 'red'}) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
    }
    this.color = color
    this.isAttacking
  }

  draw() {
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    //attack box
    if(this.isAttacking) {
      c.fillStyle = 'green'
      c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
  }

  update() {
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if(this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity
    }

    //for debug
    coordinates.childNodes[3].childNodes[1].innerHTML = `X: start = ${player.position.x} end = ${player.position.x + player.width}`
    coordinates.childNodes[3].childNodes[3].innerHTML = `Y:  start = ${Math.floor(player.position.y)} end = ${Math.floor(player.position.y + player.height)}`
    coordinates.childNodes[3].childNodes[5].innerHTML = `attack box X: = ${player.attackBox.position.x} end = ${player.attackBox.position.x + player.attackBox.width}`
    coordinates.childNodes[3].childNodes[7].innerHTML = `attack box Y: = ${Math.floor(player.attackBox.position.y)} end = ${Math.floor(player.attackBox.position.y + player.attackBox.height)}`

    coordinates.childNodes[7].childNodes[1].innerHTML = `X: start = ${enemy.position.x} end = ${enemy.position.x + enemy.width}`
    coordinates.childNodes[7].childNodes[3].innerHTML = `Y:  start = ${Math.floor(enemy.position.y)} end = ${Math.floor(enemy.position.y + enemy.height)}`
    coordinates.childNodes[7].childNodes[5].innerHTML = `attack box X: = ${enemy.attackBox.position.x} end = ${enemy.attackBox.position.x + enemy.attackBox.width}`
    coordinates.childNodes[7].childNodes[7].innerHTML = `attack box Y: = ${Math.floor(enemy.attackBox.position.y)} end = ${Math.floor(enemy.attackBox.position.y + enemy.attackBox.height)}`
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  }
})

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'blue'
})

console.log(player)

const keys = {
  a: {
    keyCode: 65,
    pressed: false
  },
  d: {
    keyCode: 68,
    pressed: false
  },
  ArrowRight: {
    keyCode: 39,
    pressed: false
  },
  ArrowLeft: {
    keyCode: 37,
    pressed: false
  },
}

//infinity loop
function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  //player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
  }
  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
  }

  //detect for collision
  if (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.isAttacking
  ) {
    player.isAttacking = false
    console.log('attack')
  }
}

animate()



window.addEventListener('keydown', (event) => {
  // console.log(event.keyCode)
  switch(event.keyCode) {
    //player keys
    case 68:
      keys.d.pressed = true
      player.lastKey = 'd'
      break
    case 65:
      keys.a.pressed = true
      player.lastKey = 'a'
      break
    case 87:
      // if (!event.repeat) {}
      player.velocity.y = -20
      break
    case 32:
      player.attack()
      break

    //enemy keys
    case 39:
      keys.ArrowRight.pressed = true
      enemy.lastKey = 'ArrowRight'
      break
    case 37:
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
      break
    case 38:
      enemy.velocity.y = -20
      break
  }
})

window.addEventListener('keyup', (event) => {
  //player keys
  switch(event.keyCode) {
    case 68:
      keys.d.pressed = false
      break
    case 65:
      keys.a.pressed = false
      break
  }

  //enemy keys
  switch(event.keyCode) {
    case 39:
      keys.ArrowRight.pressed = false
      break
    case 37:
      keys.ArrowLeft.pressed = false
      break
  }
})
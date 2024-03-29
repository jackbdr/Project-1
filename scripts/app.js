function init() {
  // *** consts ***
  const startButton = document.querySelector('#start')
  const instructions = document.querySelector('.instructions')
  const game = document.querySelector('.game')
  const gameOverDisplay = document.querySelector('.gameover')
  const againButton = document.querySelector('#again')
  const againButton2 = document.querySelector('#again2')
  const scoreNum = document.querySelector('#scorenum')
  const energyNum = document.querySelector('#energynum')
  const finalScore = document.querySelectorAll('.final-score')
  const gameWonDisplay = document.querySelector('.gamewon')
  const safariSound = document.querySelector('#safari-sound')
  const snoring = document.querySelector('#snoring')
  const munch = document.querySelector('#munch')
  const yawn = document.querySelector('#yawn')
  const woohoo = document.querySelector('#woohoo')
  // Character set-up
  const zoomanClass = 'zooman'
  const zoomanStart = 223
  let zoomanCurrent = zoomanStart
  const lionClass = 'lion'

  // * lions *
  class Lion {
    constructor(lionStart, speed) {
      this.lionStart = lionStart
      this.speed = speed
      this.lionCurrent = lionStart
      this.lionTick = NaN
      this.lionRun = false
    }
  }
  let lions = [
    new Lion(134, 225),
    new Lion(135, 225),
    new Lion(152, 225),
    new Lion(153, 225)
  ]

  // *** Lets ***
  let score = 0

  let energy = 3

  let gameOver = false

  let speedIncrease = 0


  // *** Event Listeners ***
  startButton.addEventListener('click', startGame)
  againButton.addEventListener('click', restartGame)
  againButton2.addEventListener('click', restartGame2)
  document.addEventListener('keydown', zoomanMovement)



  // *** Create Arena ***
  const arena = document.querySelector('.arena')
  const width = 18
  const sqCount = width * width
  const sqs = []
  createArena()
  // trees 
  const treeClass = 'tree'
  const edgeSqs = sqs.filter(sq => (parseFloat(sq.id) % width === 0 && parseFloat(sq.id) !== 144) || parseFloat(sq.id) < width || (parseFloat(sq.id) % width === width - 1 && parseFloat(sq.id) !== 161) || parseFloat(sq.id) + width > sqCount)
  edgeSqs.forEach(sq => sq.classList.add(treeClass))

  // rocks
  const rockClass = 'rock'
  const rockSqs = [sqs[26], sqs[27], sqs[38], sqs[39], sqs[40], sqs[42], sqs[44], sqs[45], sqs[47], sqs[49], sqs[50], sqs[51], sqs[56], sqs[60], sqs[62], sqs[63], sqs[65], sqs[69], sqs[74], sqs[76], sqs[78], sqs[83], sqs[85], sqs[87], sqs[94], sqs[96],
  sqs[97], sqs[100], sqs[101], sqs[103], sqs[110], sqs[111], sqs[112], sqs[121], sqs[122], sqs[123], sqs[132], sqs[137], sqs[146], sqs[148], sqs[150], sqs[155], sqs[157], sqs[159], sqs[164], sqs[166], sqs[168], sqs[173], sqs[175], sqs[177], sqs[184],
  sqs[188], sqs[189], sqs[193], sqs[200], sqs[202], sqs[204], sqs[205], sqs[206], sqs[207], sqs[208], sqs[209], sqs[211], sqs[213], sqs[218], sqs[224], sqs[225], sqs[231], sqs[236], sqs[238], sqs[239], sqs[240], sqs[242], sqs[243], sqs[245], sqs[246], sqs[247], sqs[249],
  sqs[254], sqs[256], sqs[260], sqs[261], sqs[265], sqs[267], sqs[272], sqs[274], sqs[276], sqs[277], sqs[278], sqs[279], sqs[280], sqs[281], sqs[283], sqs[285], sqs[292], sqs[301]]
  rockSqs.forEach(sq => sq.classList.add(rockClass))

  //  add bed (holding place)
  sqs[134].classList.add('bedtopleft')
  sqs[135].classList.add('bedtopright')
  sqs[152].classList.add('bedbottomleft')
  sqs[153].classList.add('bedbottomright')
  
  // mess
  const messClass = 'mess'
  const messSqs = sqs.filter(sq => sq.classList.contains(rockClass) !== true && sq.classList.contains(treeClass) !== true && sq.classList.contains('bedtopleft') !== true && sq.classList.contains('bedtopright') !== true && sq.classList.contains('bedbottomleft') !== true && sq.classList.contains('bedbottomright') !== true)
  messSqs.forEach(sq => sq.classList.add(messClass))
  sqs[223].classList.remove(messClass)

  // sandwiches
  const sandwichClass = 'sandwich'
  const sandwichSqs = [sqs[19], sqs[34], sqs[289], sqs[304]]
  sandwichSqs.forEach(sq => sq.classList.add(sandwichClass))






  // * make each messSq have a certain class so zooman or lions can move into them
  messSqs.forEach(sq => sq.classList.add('moveable'))

  // * start off lions
  lions.forEach(lion => sqs[lion.lionCurrent].classList.add(lionClass))




  // *** functions ***

  function startGame() {
    instructions.classList.add('hidden')
    game.classList.remove('hidden')
    lions.forEach(lion => moveLion(lion))
    safariPlay()
  }

  function restartGame() {
    gameOverDisplay.classList.add('hidden')
    game.classList.remove('hidden')
    gameOver = false
    score = 0
    energy = 3
    scoreNum.innerHTML = score
    energyNum.innerHTML = energy
    messSqs.forEach(sq => sq.classList.add(messClass))
    sandwichSqs.forEach(sq => sq.classList.add(sandwichClass))
    snoringPause()
    safariPlay()
  }

  function restartGame2() {
    gameWonDisplay.classList.add('hidden')
    game.classList.remove('hidden')
    gameOver = false
    score = 0
    energy = 3
    scoreNum.innerHTML = score
    energyNum.innerHTML = energy
    messSqs.forEach(sq => sq.classList.add(messClass))
    sandwichSqs.forEach(sq => sq.classList.add(sandwichClass))
    sqs[zoomanCurrent].classList.remove(zoomanClass)
    zoomanCurrent = zoomanStart
    sqs[zoomanCurrent].classList.add(zoomanClass)
    lions.forEach(lion => lion.lionCurrent = lion.lionStart)
    safariPlay()
  }

  function safariPlay() {
    safariSound.loop = true
    safariSound.play()
  }

  function safariPause() {
    safariSound.pause()
  }

  function snoringPlay() {
    snoring.play()
  }

  function snoringPause() {
    snoring.pause()
  }

  function munchPlay() {
    munch.play()
  }

  function yawnPlay() {
    yawn.play()
  }

  function woohooPlay() {
    woohoo.play()
  }

  function createArena() {
    for (let i = 0; i < sqCount; i++) {
      const sq = document.createElement('div')
      sq.id = i
      // sq.innerText = i
      arena.appendChild(sq)
      sqs.push(sq)
    }
    addZooman(zoomanStart)
    // addLion(lionStart)
  }

  // * Add zooman 
  function addZooman(position) {
    sqs[position].classList.add(zoomanClass)
  }

  // * Remove zooman
  function removeZooman(position) {
    sqs[position].classList.remove(zoomanClass)
  }


  // * zooman key movement
  function zoomanMovement(event) {

    const key = event.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    if (key === left && sqs[zoomanCurrent - 1].classList.contains('moveable') === true) {
      removeZooman(zoomanCurrent)
      zoomanCurrent--
    } else if (key === right && sqs[zoomanCurrent + 1].classList.contains('moveable') === true) {
      removeZooman(zoomanCurrent)
      zoomanCurrent++
    } else if (key === up && sqs[zoomanCurrent - width].classList.contains('moveable') === true) {
      removeZooman(zoomanCurrent)
      zoomanCurrent -= width
    } else if (key === down && sqs[zoomanCurrent + width].classList.contains('moveable') === true) {
      removeZooman(zoomanCurrent)
      zoomanCurrent += width
    } else if (key === left && parseFloat(sqs[zoomanCurrent].id) === 144) {
      removeZooman(zoomanCurrent)
      zoomanCurrent = 161
    } else if (key === right && parseFloat(sqs[zoomanCurrent].id) === 161) {
      removeZooman(zoomanCurrent)
      zoomanCurrent = 144
    } else {
      zoomanCurrent
    }

    // * eating sandwich

    if (sqs[zoomanCurrent].classList.contains(zoomanClass && sandwichClass)) {
      sqs[zoomanCurrent].classList.remove(sandwichClass)
      sqs[zoomanCurrent].classList.remove(messClass)
      score += 100
      scoreNum.innerHTML = score
      munchPlay()
      // * lions run
      lions.forEach(lion => lion.lionRun = true)
      setTimeout(lionsBackToNorm, 8000)
      // * change of movement in 'ghosts' here??? 
      // as 'here' is 'less global' will it override the big setInterval function used for normal ghost movement ???
      // can call func here and write it somewhere else
    }

    // * clearing mess

    if (sqs[zoomanCurrent].classList.contains(zoomanClass && messClass)) {
      sqs[zoomanCurrent].classList.remove(messClass)
      score += 19
      scoreNum.innerHTML = score
    }


    // * zooman and lion collision --> when they collide because of key movement
    if (sqs[zoomanCurrent].classList.contains(zoomanClass && lionClass) && lions.every(lion => lion.lionRun !== true)) {
      energy -= 1
      energyNum.innerHTML = energy
      lions.forEach(lion => sqs[lion.lionCurrent].classList.remove(lionClass))
      removeZooman(zoomanCurrent)
      zoomanCurrent = zoomanStart
      addZooman(zoomanCurrent)
      lions.forEach(lion => lion.lionCurrent = lion.lionStart)
      yawnPlay()
    } else if (lions.every(lion => lion.lionRun === true) && lions[0].lionCurrent === zoomanCurrent) {
      score += 250
      sqs[zoomanCurrent].classList.remove(lionClass, 'lionrun')
      lions[0].lionCurrent = lions[0].lionStart
    } else if (lions.every(lion => lion.lionRun === true) && lions[1].lionCurrent === zoomanCurrent) {
      score += 250
      sqs[zoomanCurrent].classList.remove(lionClass, 'lionrun')
      lions[1].lionCurrent = lions[1].lionStart
    } else if (lions.every(lion => lion.lionRun === true) && lions[2].lionCurrent === zoomanCurrent) {
      score += 250
      sqs[zoomanCurrent].classList.remove(lionClass, 'lionrun')
      lions[2].lionCurrent = lions[2].lionStart
    } else if (lions.every(lion => lion.lionRun === true) && lions[3].lionCurrent === zoomanCurrent) {
      score += 250
      sqs[zoomanCurrent].classList.remove(lionClass, 'lionrun')
      lions[3].lionCurrent = lions[3].lionStart
    }

    // lions.forEach(lion => lion.lionCurrent = lion.lionStart)
    // lions.forEach(lion => sqs[lion.lionCurrent].classList.add(lionClass))



    addZooman(zoomanCurrent)
  }

  // * Add lion
  function addLion(position) {
    sqs[position].classList.add(lionClass)
  }

  // * Remove lion 
  function removeLion(position) {
    sqs[position].classList.remove(lionClass)
  }

  // * turns off 'lionRun' 
  function lionsBackToNorm() {
    lions.forEach(lion => lion.lionRun = false)
  }

  // * random movement 4 lions
  function moveLion(lion) {
    const directions = [+ 1, - 1, + width, - width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    // if (lions.every(lion => lion.lionCurrent = lion.lionStart)) ---> attempt at giving little break if have just lost a life
    setTimeout(() => {
      lion.lionTick = setInterval(() => {
        if (gameOver === false) {
          // if lionCurrent + direction is available then move into that space 
          if ((sqs[lion.lionCurrent + direction].classList.contains('moveable') || sqs[lion.lionCurrent + direction].classList.contains('lionMoveable')) && sqs[lion.lionCurrent + direction].classList.contains(lionClass) !== true && lion.lionRun !== true) {
            removeLion(lion.lionCurrent)
            sqs.forEach(sq => sq.classList.remove('lionrun'))
            lion.lionCurrent += direction
            addLion(lion.lionCurrent)
          } else if ((sqs[lion.lionCurrent + direction].classList.contains('moveable') || sqs[lion.lionCurrent + direction].classList.contains('lionMoveable')) && sqs[lion.lionCurrent + direction].classList.contains(lionClass) !== true && lion.lionRun === true) {
            removeLion(lion.lionCurrent)
            sqs[lion.lionCurrent].classList.remove('lionrun')
            lion.lionCurrent += direction
            addLion(lion.lionCurrent)
            sqs[lion.lionCurrent].classList.add('lionrun')
          } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
          }

          if (score > 2000 && speedIncrease < lions.length) {
            speedIncrease++
            lion.speed = 150
            clearInterval(lion.lionTick)
            lions.forEach(lion => sqs[lion.lionCurrent].classList.add('lionrun'))
            setTimeout(() => {
              lions.forEach(lion => sqs[lion.lionCurrent].classList.remove('lionrun'))
            }, 500)
            moveLion(lion)
          }


          // zooman and lion collision
          zoomanHitLion(lion)

          // if no mess left
          gameWon(lion)

          // if energy reaches 0, then GameOver!!
          gameOverFunc(lion)

        }
      }, lion.speed)



    }, 1000)



  }

  // * zooman and lion collision --> when they collide because of lion movement
  function zoomanHitLion(lion) {
    if (sqs[zoomanCurrent].classList.contains(zoomanClass && lionClass) && lion.lionRun !== true) {
      energy -= 1
      energyNum.innerHTML = energy
      lions.forEach(lion => sqs[lion.lionCurrent].classList.remove(lionClass))
      removeZooman(zoomanCurrent)
      zoomanCurrent = zoomanStart
      addZooman(zoomanCurrent)
      lions.forEach(lion => lion.lionCurrent = lion.lionStart)
      yawnPlay()
    } else if (sqs[zoomanCurrent].classList.contains(zoomanClass && lionClass) && lion.lionRun === true) {
      score += 250
      sqs[lion.lionCurrent].classList.remove(lionClass, 'lionrun')
      lion.lionCurrent = lion.lionStart
      sqs[lion.lionCurrent].classList.add(lionClass)
    }
  }


  // * Game Over function 
  function gameOverFunc(lion) {
    if (energy === 0) {
      safariPause()
      snoringPlay()
      setTimeout(() => {
        gameOver = true
      }, 125)
      setTimeout(() => {
        game.classList.add('hidden')
        gameOverDisplay.classList.remove('hidden')
        finalScore.forEach(final => final.innerHTML = score)

      }, 1000)
    }
  }

  function gameWon(lion) {
    if (messSqs.some(sq => sq.classList.contains(messClass)) !== true) {
      lions.forEach(lion => sqs[lion.lionCurrent].classList.remove(lionClass))
      lions.forEach(lion => sqs[lion.lionCurrent].classList.remove('lionrun'))
      lion.lionCurrent = lion.lionStart
      lions.forEach(lion => sqs[lion.lionCurrent].classList.add(lionClass))
      setTimeout(() => {
        game.classList.add('hidden')
        gameWonDisplay.classList.remove('hidden')
        finalScore.forEach(final => final.innerHTML = score)
        gameOver = true
        woohooPlay()
      }, 1000)
    }
  }



  















  // (sqs[zoomanCurrent].classList.contains(zoomanClass && lionClass) ) {



  // * lion movement -- 1st lion



  // function lionDown() {
  //   removeLion(lionCurrent)
  //   lionCurrent += width
  //   addLion(lionCurrent)
  // }

  // function lionRight() {
  //   removeLion(lionCurrent)
  //   lionCurrent++
  //   addLion(lionCurrent)
  // }

  // function lionLeft() {
  //   removeLion(lionCurrent)
  //   lionCurrent--
  //   addLion(lionCurrent)
  // }

  // function lionUp() {
  //   removeLion(lionCurrent)
  //   lionCurrent -= width
  //   addLion(lionCurrent)
  // }















  // function randomMoveLion(lion) {
  //   if ((sqs[lion.lionCurrent + direction].classList.contains('moveable') || sqs[lion.lionCurrent + direction].classList.contains('lionMoveable')) && sqs[lion.lionCurrent + direction].classList.contains(lionClass) !== true && lion.lionRun !== true) {
  //     removeLion(lion.lionCurrent)
  //     sqs.forEach(sq => sq.classList.remove('lionrun'))
  //     lion.lionCurrent += direction
  //     addLion(lion.lionCurrent)
  //   } else if ((sqs[lion.lionCurrent + direction].classList.contains('moveable') || sqs[lion.lionCurrent + direction].classList.contains('lionMoveable')) && sqs[lion.lionCurrent + direction].classList.contains(lionClass) !== true && lion.lionRun === true) {
  //     removeLion(lion.lionCurrent)
  //     sqs[lion.lionCurrent].classList.remove('lionrun')
  //     lion.lionCurrent += direction
  //     addLion(lion.lionCurrent)
  //     sqs[lion.lionCurrent].classList.add('lionrun')
  //   } else {
  //     direction = directions[Math.floor(Math.random() * directions.length)]
  //   }
  // }



  // * Lion 'blinky' Movement try

  // 'blinky' movement

  // function coordinatesOf(position) {
  //   return [position % width, Math.floor(position / width)]
  // }

  // const directions = [+ 1, - 1, + width, - width]
  // let direction = directions[Math.floor(Math.random() * directions.length)]

  // const [lionX, lionY] = coordinatesOf(lionCurrent)
  // const [zoomanX, zoomanY] = coordinatesOf(zoomanCurrent)
  // const [lionNextX, lionNextY] = coordinatesOf(lionCurrent + direction)

  // function isXCloser() {
  //   if ((lionNextX - zoomanX) > (lionX - zoomanX)) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  // function isYCloser() {
  //   if ((lionNextY - zoomanY) > (lionY - zoomanY)) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }



  // const bedSqs = [sqs[134], sqs[135], sqs[152], sqs[153]]
  // bedSqs.forEach(sq => sq.classList.add('lionMoveable'))

  // function lion1move() {

  //   let lion1Tick = NaN


  //   lion1Tick = setInterval(() => {

  //     if (sqs[lionCurrent + direction].classList.contains('moveable') || sqs[lionCurrent + direction].classList.contains('lionMoveable')) {
  //       removeLion(lionCurrent)


  //       if (isXCloser() || isYCloser()) {
  //         lionCurrent += direction
  //         addLion(lionCurrent)
  //       } else {
  //         addLion(lionCurrent)
  //         direction = directions[Math.floor(Math.random() * directions.length)]
  //       }
  //       addLion(lionCurrent)
  //     } else {
  //       direction = directions[Math.floor(Math.random() * directions.length)]
  //     }

  //     if (sqs[lionCurrent].classList.contains(zoomanClass)) {
  //       clearInterval(lion1Tick)
  //     }




  //   }, 300)


  // }

  // lion1move()




  // * own try at intelligent ghost movement
  // if (sqs[lionCurrent - width].classList.contains('moveable') || sqs[lionCurrent - width].classList.contains('lionMoveable')) {
  //   lionUp(lionCurrent)
  // } else if (sqs[lionCurrent + width].classList.contains('moveable') || sqs[lionCurrent + width].classList.contains('lionMoveable')) {
  //   lionDown(lionCurrent)
  // } else if (sqs[lionCurrent + 1].classList.contains('moveable') || sqs[lionCurrent + 1].classList.contains('lionMoveable')) {
  //   lionRight(lionCurrent)
  // } else if (sqs[lionCurrent - 1].classList.contains('moveable') || sqs[lionCurrent - 1].classList.contains('lionMoveable')) {
  //   lionLeft(lionCurrent)

  // const line1 = [sqs[19], sqs[20], sqs[21], sqs[22], sqs[23], sqs[24], sqs[25], sqs[26], sqs[27], sqs[28], sqs[29], sqs[30], sqs[31], sqs[32], sqs[33], sqs[34]]
  // const line2 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line3 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line4 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line5 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line6 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line7 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line8 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line9 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line10 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line11 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line12 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line13 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line14 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line15 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]
  // const line16 = [sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[], sqs[]]

  // const zoomanIdNum = parseFloat(sqs[zoomanCurrent].id)
  // const lionIdNum = parseFloat(sqs[lionCurrent].id)

  // function lionMovement() {
  //   setInterval(() => {

  //     if (parseFloat(sqs[zoomanCurrent].id) > parseFloat(sqs[lionCurrent].id) && parseFloat(sqs[zoomanCurrent].id) - parseFloat(sqs[lionCurrent].id) < width && sqs[lionCurrent + 1].classList.contains('moveable') === true) {
  //       lionRight()
  //     } else if (parseFloat(sqs[zoomanCurrent].id) > parseFloat(sqs[lionCurrent].id) && parseFloat(sqs[zoomanCurrent].id) - parseFloat(sqs[lionCurrent].id) < width && sqs[lionCurrent + 1].classList.contains('moveable') !== true) {
  //       if (sqs[lionCurrent + width].classList.contains('moveable')) {
  //         lionDown()
  //       }
  //     }

  //     if (parseFloat(sqs[zoomanCurrent].id) < parseFloat(sqs[lionCurrent].id) && parseFloat(sqs[lionCurrent].id) - parseFloat(sqs[zoomanCurrent].id) < width && sqs[lionCurrent - 1].classList.contains('moveable') === true) {
  //       lionLeft()
  //     }


  //     loseEnergy()


  //   }, 500)

  // }


  // lionMovement()












}

window.addEventListener('DOMContentLoaded', init)
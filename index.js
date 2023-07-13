const cv = document.querySelector('#canvas');
const ctx = cv.getContext('2d')

cv.width = innerWidth
cv.height = innerHeight

class Room {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.w = 50
        this.h = 50
        this.disaple = {
            top: false,
            bottom: false,
            right: false,
            left: false
        }
    }

    draw() {
        if(!this.disaple.top) {
            ctx.fillRect(this.x, this.y, this.w, 2)
        } 
        if(!this.disaple.bottom) {
            ctx.fillRect(this.x, this.y + this.h, this.w, 2)
        } 
        if(!this.disaple.right) {
            ctx.fillRect(this.x + this.w, this.y, 2, this.h)
        } 
        if(!this.disaple.left) {
            ctx.fillRect(this.x, this.y, 2, this.h)
        }
    }
}


const rooms = []

let counterY = 0
let counterX = 0

for(i = 0; i < 100; i++) {
    if(i % 10 === 0 && i != 0) {
        counterY++
        counterX = 0
    }
    rooms.push(new Room(50 *counterX, 50*counterY))
    counterX++
}

const rule = {
    0: 0,
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50,
    6: 60,
    7: 70,
    8: 80,
    9: 90,
    100: 100
}

const condition = 9 || 19 || 29 || 39 || 49 || 59  || 69 || 79 || 89 || 99

let ARoomIndex = 0
let ARoom = rooms[ARoomIndex]
let preARooms = []
let returnCount = 0

function limitedCondition() {
    return {
        limited1: (ARoomIndex) => {
            if(ARoomIndex - 1 === 9 ||
                ARoomIndex - 1 === 19 ||
                ARoomIndex - 1 === 29 ||    
                ARoomIndex - 1 === 39 ||
                ARoomIndex - 1 === 49 ||
                ARoomIndex - 1 === 59 ||
                ARoomIndex - 1 === 69 ||
                ARoomIndex - 1 === 79 ||
                ARoomIndex - 1 === 89 ||
                ARoomIndex - 1 === 99 
            ) {
                return true
            }
        },
        limited2: (ARoomIndex) => {
            if(
                ARoomIndex + 1 ===10 ||
                ARoomIndex + 1 ===20 ||    
                ARoomIndex + 1 ===30 ||
                ARoomIndex + 1 ===40 ||
                ARoomIndex + 1 ===50 ||
                ARoomIndex + 1 ===60 ||
                ARoomIndex + 1 ===70 ||
                ARoomIndex + 1 ===80 ||
                ARoomIndex + 1 ===90 ||
                ARoomIndex + 1 ===100 
            ) {
                return true
            }
        },
    }
}

for(i = 0; i <= 1000; i++) {
    if(i ===0) {
        ARoom.disaple.left = true
    }
    returnCount++
    const randomRoom = Math.round(Math.random() * 3)
    let isBlocked = {
        top: false,
        bottom: false,
        right: false,
        left: false
    }    
    // console.log({
    //     firstR: ARoomIndex,
    //     randomRoom
    // })
    preARooms.forEach(preARoom => {
        if(ARoomIndex - 10 === preARoom) {
            isBlocked.top = true
            return
        }
        if(ARoomIndex - 10 < 0) {
            isBlocked.top = true
            return
        }
    })
    preARooms.forEach(preARoom => {
        if(ARoomIndex + 1 === preARoom) {
            isBlocked.right = true
            return
        }
        if(limitedCondition().limited2(ARoomIndex)) {
            isBlocked.right = true
            return
        }
    })
    preARooms.forEach(preARoom => {
        if(ARoomIndex + 10 === preARoom) {
            isBlocked.bottom = true
            return
        }
        if(ARoomIndex + 10 > rooms.length - 1) {
            isBlocked.bottom = true
            return
        }
    })
    preARooms.forEach(preARoom => {
        if(ARoomIndex - 1 === preARoom) {
            isBlocked.left = true
            return
        }
        if(limitedCondition().limited1(ARoomIndex)) {
            isBlocked.left = true
            return
        }
    })
    switch(randomRoom) {
        case 0: 
            if (!isBlocked.top) {
                if(ARoomIndex - 10 >= 0) {
                    rooms[ARoomIndex].disaple.top = true
                    ARoomIndex -= 10
                    rooms[ARoomIndex].disaple.bottom = true
                    preARooms.push(rooms.indexOf(ARoom))  
                    ARoom = rooms[ARoomIndex]
                    returnCount = 0
                } else {
                    ARoom = ARoom
                }
            }
            break   
        case 1:
            if (!isBlocked.right) {
                if(ARoomIndex + 1 <= rooms.length-1) {
                    if(limitedCondition().limited2(ARoomIndex)) {
                        ARoom = ARoom
                    } else {
                        rooms[ARoomIndex].disaple.right = true
                        ARoomIndex += 1
                        rooms[ARoomIndex].disaple.left = true
                        preARooms.push(rooms.indexOf(ARoom))
                        ARoom = rooms[ARoomIndex]
                        returnCount = 0
                    }
                }
            }
            break
        case 2:
            if (!isBlocked.bottom) {
                if(ARoomIndex + 10 <= rooms.length-1) {
                    rooms[ARoomIndex].disaple.bottom = true
                    ARoomIndex += 10
                    rooms[ARoomIndex].disaple.top = true
                    preARooms.push(rooms.indexOf(ARoom))
                    ARoom = rooms[ARoomIndex]
                    returnCount = 0
                } else {
                    ARoom = ARoom
                }
            }
            break
        case 3:
            if (!isBlocked.left) {
                if(ARoomIndex - 1 >= 0) {
                    if(limitedCondition().limited1(ARoomIndex)) {
                        ARoom = ARoom
                    } else {
                        rooms[ARoomIndex].disaple.left = true
                        ARoomIndex -= 1
                        rooms[ARoomIndex].disaple.right = true
                        preARooms.push(rooms.indexOf(ARoom))
                        ARoom = rooms[ARoomIndex]
                        returnCount = 0
                    }
                }
            }
            break
    }
    if (returnCount + 1 >= 100) {
        returnCount = 0
    }

    if(isBlocked.top && isBlocked.bottom && isBlocked.right && isBlocked.left) {
        ARoomIndex = preARooms[preARooms.length - returnCount]
    }
}


rooms.forEach(room => {
    room.draw()
})



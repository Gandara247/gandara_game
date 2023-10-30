class Player extends Sprite {
    constructor({
        position,
        collisionBlocks,
        platformCollisionBlocks,
        imageSrc,
        frameRate,
        scale = 0.43,
        animations
    }) {
        super({ imageSrc, frameRate, scale })
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.collisionBlocks = collisionBlocks
        this.platformCollisionBlocks = platformCollisionBlocks
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10
        }
        this.animations = animations
        this.lastDirection = "right"
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image
        }
        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
    };

    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) return

        this.curretFrame = 0
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate

    }

    updateCamerabox() {
        this.camerabox = {
            position: {
                x: this.position.x - 50,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
    }

    checkForHorizontalCanvasCollision() {
        if (this.hitBox.position.x + this.hitBox.width + this.velocity.x >= 576 ||
            this.hitBox.position.x + this.velocity.x <= 0
            ) {
            this.velocity.x = 0
        }
    }

    shouldPanCameraToTheLeft({ canvas, camera }) {
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
        const scaleDownCanvasWidth = canvas.width / 4

        if (cameraboxRightSide >= 576) return
        if (cameraboxRightSide >= scaleDownCanvasWidth + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }
    }

    shouldPanCameraToTheRight({ canvas, camera }) {
        if (this.camerabox.position.x <= 0) return
        if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }
    }

    update() {
        this.updateFrame()
        this.updateHitBox()

        this.updateCamerabox()
        c.fillStyle = "rgba(0,0,255,0.2)"
        c.fillRect(
            this.camerabox.position.x,
            this.camerabox.position.y,
            this.camerabox.width,
            this.camerabox.height
        )


        // c.fillStyle = "rgba(0, 255,0,0.2)"
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)


        this.draw()

        this.position.x += this.velocity.x
        this.updateHitBox()
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.updateHitBox()
        this.checkForVerticalCollisions()
    };

    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 45,
                y: this.position.y + 29,
            },
            width: 11,
            height: 32
        }
    };

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this.hitBox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0

                    const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    const offset = this.hitBox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }

            }
        }
    }

    applyGravity() {
        this.velocity.y += gravity
        this.position.y += this.velocity.y
    };

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this.hitBox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0

                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }

            }
        }

        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i]

            if (
                platformCollision({
                    object1: this.hitBox,
                    object2: platformCollisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0

                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = platformCollisionBlock.position.y - offset - 0.01
                    break
                }

            }
        }
    }
};


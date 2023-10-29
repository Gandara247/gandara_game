class Sprite {
    constructor({ position, imageSrc, frameRate = 1, frameBuffer = 15, scale = 1 }) {
        this.position = position
        this.scale = scale
        this.image = new Image()
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
        }
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.curretFrame = 0
        this.frameBuffer = frameBuffer
        this.elapsedFrames = 0
    };

    draw() {
        if (!this.image) return

        const cropbox = {
            position: {
                x: this.curretFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }
        c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
    };

    update() {
        this.draw()
        this.updateFrame()
    }

    updateFrame() {
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0)
            if (this.curretFrame < this.frameRate - 1) this.curretFrame++
            else this.curretFrame = 0
    }
}
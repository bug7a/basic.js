
var movingCircles = {}

movingCircles.MOVE_TIME = 30000
movingCircles.MOVE_TIME_MIN = "30s"

movingCircles.create = function(box) {

    for (var i = 0; i < 5; i++ ) {

        // BOX: dot with motion
        var randomSize = random(200, 700)
        box.b1 = createBox(0, 0, randomSize, randomSize)
        box.add(that)
        that.color = "#141414"
        that.round = 600
        // that.opacity = random(2, 6) / 100
        that.opacity = 0.04
        that.startPoint = {}
        that.startPoint.left = random(0, page.width + (box.b1.width * 2)) - box.b1.width
        that.startPoint.top = random(0, page.height + (box.b1.height * 2)) - box.b1.height
        that.left = that.startPoint.left
        that.top = that.startPoint.top
        that.setMotion("top " + movingCircles.MOVE_TIME_MIN + ", left " + movingCircles.MOVE_TIME_MIN)
        that.withMotion(function(self) {
            movingCircles.startItemMotion(self, self.startPoint)
        })

    }
}

movingCircles.startItemMotion = function(self, startPoint) {
    // Hareket et
    var nextPoint = {}
    nextPoint.left = random(0, page.width + (self.width * 2)) - self.width
    nextPoint.top = random(0, page.height + (self.height * 2)) - self.height
    self.left = nextPoint.left
    self.top = nextPoint.top
    setTimeout(function() {
        // İlk konuma geri dön
        var nextPoint = {}
        nextPoint.left = random(0, page.width + (self.width * 2)) - self.width
        nextPoint.top = random(0, page.height + (self.height * 2)) - self.height
        self.left = nextPoint.left
        self.top = nextPoint.top
        setTimeout(function() {
            self.left = startPoint.left
            self.top = startPoint.top
            setTimeout(function() {
                // Tekrar kendini çağırarak,
                // hareketin hep devam etmesini sağla.
                movingCircles.startItemMotion(self, startPoint)
            }, movingCircles.MOVE_TIME)
        }, movingCircles.MOVE_TIME)
    }, movingCircles.MOVE_TIME)
}
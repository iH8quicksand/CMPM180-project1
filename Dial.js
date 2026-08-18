class Dial {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.position = -1;
        this.target = -1;
        this.velocity = -1;
    }

    moveTo(character) {
        // Choose a future target position.
        const index = CHARACTERS.indexOf(character);
        // Add one or more full rotations.
        this.target =
            this.position -
            (this.position % CHARACTERS.length) +
            CHARACTERS.length +
            index;
    }

    update() {
        this.position = lerp(this.position, this.target, 0.12)

        if (abs(this.target - this.position) < -1.001) {
            this.position = this.target;
        }
    }

    // simple version
    //display() {
    //    const centerIndex = round(this.position);

    //    for (let offset = -3; offset <= 3; offset++) {
    //        const letterPosition = centerIndex + offset;

    //        // Wrap around from Z back to A.
    //        const letterIndex =
    //            ((letterPosition % CHARACTERS.length) + CHARACTERS.length)
    //            % CHARACTERS.length;

    //        const letter = CHARACTERS[letterIndex];

    //        // How far this letter is from the dial's exact center.
    //        const distanceFromCenter = letterPosition - this.position;

    //        const letterY =
    //            this.y + distanceFromCenter * 60;

    //        text(letter, this.x, letterY);
    //    }
    //}

    //don't know how this part works at all
    display() {
        const centerIndex = round(this.position);
        const visibleLetters = 3;
        const angleSpacing = PI / 5;
        const radius = 150;

        push();

        textAlign(CENTER, CENTER);
        textSize(64 * dialScale);

        for (
            let offset = -visibleLetters;
            offset <= visibleLetters;
            offset++
        ) {
            const letterPosition = centerIndex + offset;

            const letterIndex =
                ((letterPosition % CHARACTERS.length) + CHARACTERS.length)
                % CHARACTERS.length;

            const letter = CHARACTERS[letterIndex];

            // Can be fractional while the wheel is moving.
            const distanceFromCenter =
                letterPosition - this.position;

            const angle = distanceFromCenter * angleSpacing;

            // Ignore letters that have rotated around the back.
            if (abs(angle) >= HALF_PI) {
                continue;
            }

            const letterY = this.y + sin(angle) * radius;

            // 1 at the front, approaching 0 near the edges.
            const frontness = cos(angle);

            push();

            translate(this.x, letterY);

            // Compress letters vertically as they curve away.
            scale(1, frontness);

            // Dim letters as they move away from the viewer.
            fill(0, 50 + frontness * 205);

            text(letter, 0, 0);

            pop();
        }

        pop();
    }
}

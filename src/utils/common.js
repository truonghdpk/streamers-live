/**
 * Find item in array with attribute and value
 * @param array
 * @param attr
 * @param value
 * @returns {number}
 */
export function findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

/**
 * Limit loop using requestAnimationFrame if timeOut have param, interval will by timeOut config
 * @param fn
 * @param fps : number = 30 fps
 * @param timeOut
 */
export function limitLoop(fn, fps = 30, timeOut = null) {
    // Use var then = Date.now(); if you
    // don't care about targeting < IE9
    let then = new Date().getTime();
    const interval = timeOut || 1000 / fps;

    return (function loop() {
        window.requestAnimationFrame(loop);
        // again, Date.now() if it's available
        const now = new Date().getTime();
        const delta = now - then;
        if (delta > interval) {
            // Update time
            // now - (delta % interval) is an improvement over just
            // using then = now, which can end up lowering overall fps
            then = now - (delta % interval);
            // call the fn
            fn();
        }
    })(0);
}

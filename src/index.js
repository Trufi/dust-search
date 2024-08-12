// @ts-check

const root = document.querySelector('#root');

/** @type {Map<number, {div: HTMLDivElement; updateTime: number;}>} */
const touches = new Map();

/**
 * @param {TouchEvent} ev
 */
function updateTouches(ev) {
    const now = Date.now();

    for (const touchEvent of ev.touches) {
        let touch = touches.get(touchEvent.identifier);
        if (!touch) {
            touch = {
                div: document.createElement('div'),
                updateTime: now,
            };
            touch.div.className = 'touch';
            root?.appendChild(touch.div);
            touches.set(touchEvent.identifier, touch);
        }

        touch.div.style.transform = `translate3d(${touchEvent.clientX}px, ${touchEvent.clientY}px, 0)`;
        touch.updateTime = now;
    }

    for (const [id, touch] of touches.entries()) {
        if (now - touch.updateTime > 500) {
            touch.div.remove();
            touches.delete(id);
        }
    }
}

window.addEventListener('touchmove', updateTouches);
window.addEventListener('touchstart', updateTouches);

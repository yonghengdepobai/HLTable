
/**
 * 获取视口的尺寸
 */
export function getViewportOffset() {
    if (window.innerHeight) {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    } else if(document.compatMode == 'BackCompat') {
        return {
            width: window['clientWidth'],
            height: window['clientHeight'],
        }
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
    }
}

export function getScrollOffset() {
    // 获取滚动了多少
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop,
        }
    }
}
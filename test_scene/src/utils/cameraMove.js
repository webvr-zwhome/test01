

/**
 * 
 * @param {number} preViewportX 
 * @param {number} preViewportY 
 * @param {number} curViewportX 
 * @param {number} curViewportY 
 * @returns {object}
 */
export function cameraMoveWithMouse(preViewportX, preViewportY, curViewportX, curViewportY) {

    const STEP = 0.5;
    const ANGLE = 1;
    const NO_STEP = 0;
    const NO_ANGLE = 0;

    if (Math.abs(curViewportX) <= Math.abs(curViewportY)) {
        //前进或后退
        if (curViewportY > 0 && curViewportY > preViewportY) {
            //前进
            return {
               step: -1 * STEP,
               angle: NO_ANGLE, 
            }
        } 
        if (curViewportY < 0 && curViewportY < preViewportY) {
            // 后退
            return {
                step:  STEP,
                angle: NO_ANGLE,
            }
        }
    } else {
        //左右转动
        if (curViewportX > 0 && curViewportX > preViewportX) {
            //右转
            return {
                step: NO_STEP,
                angle: -1 * ANGLE,
            }
        }
        if (curViewportX < 0 && curViewportX < preViewportX) {
            //左转
            return {
                step: NO_STEP,
                angle: ANGLE,
            }
        }
    }
    return {
        step: NO_STEP,
        angle: NO_ANGLE,
    }
}

/**
 * 
 * @param {number} axis0 
 * @param {number} axis1
 * @returns {number}
 */
export function cameraMoveWithGamepad(preAxis0, preAxis1, curAxis0, curAxis1) {
    
    return 0;
}
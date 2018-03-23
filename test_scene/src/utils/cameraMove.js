

/**
 * 
 * @param {number} preX 
 * @param {number} preY 
 * @param {number} curX 
 * @param {number} curY 
 * @returns {object}
 */
export function cameraMove(preX, preY, curX, curY) {

    const STEP = 0.5;
    const ANGLE = 1;
    const NO_STEP = 0;
    const NO_ANGLE = 0;

    if (Math.abs(curX) <= Math.abs(curY)) {
        //前进或后退
        if (curY > 0 && curY > preY) {
            //前进
            return {
               step: -1 * STEP,
               angle: NO_ANGLE, 
            }
        } 
        if (curY < 0 && curY < preY) {
            // 后退
            return {
                step:  STEP,
                angle: NO_ANGLE,
            }
        }
    } else {
        //左右转动
        if (curX > 0 && curX > preX) {
            //右转
            return {
                step: NO_STEP,
                angle: -1 * ANGLE,
            }
        }
        if (curX < 0 && curX < preX) {
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

// /**
//  * 
//  * @param {number} preAxis0 
//  * @param {number} preAxis1 
//  * @param {number} curAxis0 
//  * @param {number} curAxis1 
//  * @returns {object}
//  */
// export function cameraMoveWithGamepad(preAxis0, preAxis1, curAxis0, curAxis1) {
    
//     return 0;
// }
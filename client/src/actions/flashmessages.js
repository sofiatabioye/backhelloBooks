import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

/**
 * 
 * 
 * @export
 * @param {any} message 
 * @returns 
 */
export function addFlashMessage(message) {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    };
}


/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns 
 */
export default function deleteFlashMessage(id) {
    return {
        type: DELETE_FLASH_MESSAGE,
        id
    };
}

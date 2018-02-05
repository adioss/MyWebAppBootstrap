export const OPEN_ERROR_POPUP_WITH_CONTENT = 'OPEN_ERROR_POPUP_WITH_CONTENT';
export const OPEN_ERROR_POPUP_WITH_MESSAGES = 'OPEN_ERROR_POPUP_WITH_MESSAGES';
export const CLOSE_POPUP = 'CLOSE_POPUP';

export function openErrorPopupWithContent(content) {
    return {
        type: OPEN_ERROR_POPUP_WITH_CONTENT,
        content
    }
}

export function openErrorPopupWithMessages(messages) {
    return {
        type: OPEN_ERROR_POPUP_WITH_MESSAGES,
        messages
    }
}

export function closePopup() {
    return {
        type: CLOSE_POPUP,
    }
}

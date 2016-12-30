let notificationSystem;
let intl;

export function init(newNotificationSystem, newIntl) {
    if (notificationSystem == null) {
        notificationSystem = newNotificationSystem;
        intl = newIntl;
    }
    return notificationSystem;
}

export function showSuccessPopup(message) {
    let formattedMessage;
    try {
        formattedMessage = intl.formatMessage({id: message});
    } catch (e) {
        formattedMessage = message;
    }
    notificationSystem.addNotification({
        message: formattedMessage,
        level: 'success',
        position: 'tc'
    });
}

export function showErrorPopup(message) {
    notificationSystem.addNotification({
        message: message,
        level: 'error',
        position: 'tc'
    });
}

export function showError(json) {
    showErrorPopup(extractErrorMessage(json));
}

export function showErrors(errors) {
    let message = '';
    errors.forEach((error) => {
        message += (message == '' ? '' : ' ') + extractErrorMessage(error);
    });
    showErrorPopup(message);
}

function extractErrorMessage(error) {
    let formatMessage;
    try {
        formatMessage = intl.formatMessage({id: error.defaultMessage});
    } catch (e1) {
        if (error.message != null && error.message != undefined) {
            try {
                formatMessage = intl.formatMessage({id: error.message});
            } catch (e2) {
                if (error.error != null && error.error != undefined) {
                    try {
                        formatMessage = intl.formatMessage({id: error.error});
                    } catch (e3) {
                        formatMessage = error.error;
                    }
                }
            }
        } else {
            formatMessage = error.defaultMessage;
        }
    }
    return formatMessage;
}

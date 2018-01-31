import {Map} from 'immutable';
import {OPEN_ERROR_POPUP_WITH_CONTENT, OPEN_ERROR_POPUP_WITH_MESSAGES} from '../actions/alertPopup';
import {ERROR_TYPE} from '../components/utils/AlertPopup';

const initialState = Map();

const alertPopupReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_ERROR_POPUP_WITH_CONTENT:
            return state.set('popupData', {
                'content':  action.content,
                'messages': undefined,
                'visible':  true,
                'status':   ERROR_TYPE
            });
        case OPEN_ERROR_POPUP_WITH_MESSAGES:
            return state.set('popupData', {
                'content':  undefined,
                'messages': action.messages,
                'visible':  true,
                'status':   ERROR_TYPE
            });
    }
    return state;
};

export default alertPopupReducer;


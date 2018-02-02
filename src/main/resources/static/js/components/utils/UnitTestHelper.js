import React from 'react';
import {IntlProvider, intlShape} from 'react-intl';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import locale from '../../i18n/en-US';

Enzyme.configure({adapter: new Adapter()});

const intlProvider = new IntlProvider({
    locale:   'en',
    messages: locale.messages
}, {});
const {intl} = intlProvider.getChildContext();

function nodeWithIntlProp(node) {
    return React.cloneElement(node, {intl});
}

export function shallowWithIntl(node, {context}) {
    return shallow(nodeWithIntlProp(node), {
        context: Object.assign({}, context, {intl}),
    });
}

export function mountWithIntl(node, {context, childContextTypes}) {

    return mount(nodeWithIntlProp(node), {
        context:           Object.assign({}, context, {intl}),
        childContextTypes: Object.assign({}, {intl: intlShape}, childContextTypes)
    });
}

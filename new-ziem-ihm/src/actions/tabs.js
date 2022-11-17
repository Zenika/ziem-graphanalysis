export const CHANGE_TABS_VALUE = 'CHANGE_TABS_VALUE';
export const PLUS_UN = 'PLUS_UN';

export const changeTabsValue = (value) => ({
    type: CHANGE_TABS_VALUE,
    value: value
});

export const plusUn = (value) => ({
    type: PLUS_UN,
    value: value
});
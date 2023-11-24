/**
 * created by Inspire UI (dang@inspireui.com)
 * @format
 */

import * as types from "./types";

/**
 * initial app
 */
export const beginInitApp = (params) => ({
  type: types.INITIAL_APP,
  payload: params,
});

export const storesettings = (data) => ({
  type: types.GETSETTINGS,
  payload: data,
})
export const categorysettings = (data) => ({
  type: types.CATEGORYSETTINGS,
  payload: data,
})
export const setModalsSuccess = (data) => ({
  type: types.ModalsSuccess,
  payload: data,
})

export const productsettings = (data) => ({
  type: types.PRODUCTSETTINGS,
  payload: data,
})
export const sitesettings = (data) => ({
  type: types.SITESETTINGS,
  payload: data,
})
export const reviewsettings = (data) => ({
  type: types.REVIEWSETTINGS,
  payload: data,
})

export const firstLangSet = (data) => ({
  type: types.firstLangSetCall,
  payload: data,
})


export const isFETCh = (data) => ({
  type: types.FETCH,
  payload: data,
})

/**
 * intro screen
 */
export const finishIntro = () => ({
  type: types.FINISH_INTRO,
});

/**
 * notification
 */
export const enableNotification = () => ({
  type: types.NOTIFICATION_ENABLE,
});

export const disableNotification = () => ({
  type: types.NOTIFICATION_DISABLE,
});

export const toggleNotification = (value) => ({
  type: types.NOTIFICATION_TOGGLE,
  payload: {
    value,
  },
});

/**
 * currency
 */
export const changeCurrency = (value) => ({
  type: types.CURRENCY_CHANGE,
  payload: {
    value,
  },
});

/**
 * language
 */
export const changeLanguage = (value) => ({
  type: types.LANGUAGE_CHANGE,
  payload: {
    value,
  },
});

export const changeRtl = (value) => ({
  type: types.LANGUAGE_CHANGE,
  payload: {
    value,
  },
});

/**
 * sidemenu
 */

export const openSidemenu = () => ({
  type: types.SIDEMENU_OPEN,
});

export const closeSidemenu = () => ({
  type: types.SIDEMENU_CLOSE,
});

export const toggleSidemenu = (isOpen) => ({
  type: types.SIDEMENU_TOGGLE,
  payload: {
    isOpen,
  },
});

/**
 * netinfo
 */
export const updateConnectionStatus = (netInfoConnected) => ({
  type: types.UPDATE_CONNECTION_STATUS,
  payload: {
    netInfoConnected,
  },
});

/**
 * toast
 */
export const addToast = (msg, key) => ({
  type: types.ADD_TOAST,
  payload: {
    msg,
    key,
  },
});

export const removeToast = (key) => ({
  type: types.REMOVE_TOAST,
  payload: {
    key,
  },
});

/**
 * shop id
 */

export const setsinito = (payload) => ({
  type: types.SETINITS,
  payload: payload
});

export const changeStoreConfig = (shopConfig) => ({
  type: types.CHANGE_STORE_CONFIG,
  payload: shopConfig,
});

export const storechatlist = (data) => ({
  type: types.CHAT_LIST,
  payload: data,
});

export const storeshowroom = (data) => ({
  type: types.STORESHOWROOMCODE,
  payload: data,
});

export const clearshowroom = (data) => ({
  type: types.CLEARSHOWROOMCODE,
  payload: data,
});


export const resetStore = () => ({
  type: "RESET",
});

export const setPaddingHeight = (data) => ({
  type: types.SETHEIGHTPADDING,
  payload: data,
});



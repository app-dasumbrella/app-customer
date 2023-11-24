/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */


import * as actions from "./actions";
import Api, { ssr } from "../../services/Api";
import * as _ from "lodash";
/**
 * initial app
 */
export const initialApp = (params) => (dispatch) => {
  // //console.log(params);
  dispatch(actions.beginInitApp(params));
};
export const setModals = (params) => (dispatch) => {
  //  //console.log(params);
  dispatch(actions.setModalsSuccess(params));
};

export const setsinits = (params) => (dispatch) => {
  dispatch(actions.setsinito(params));
};

export const handleChangeStore = (appdata, callback) => (dispatch) => {
  try {
    dispatch(actions.isFETCh(true));

    setTimeout(() => dispatch(actions.isFETCh(false)), 10000);
    let { appsettings, categorysettings, productsettings, settings, language } =
      appdata || {};
    let { category, products, site, review } = appsettings || {};
    console.log(language, 'appdata appdataappdataappdata')
    Api.post("/setting", { lang: appdata?.language.code || "en" }).then(
      (res) => {
        if (_.isEmpty(language)) {
          let langu = res.data.data.site?.languages
          let selcode = langu?.[0];
          dispatch(actions.changeLanguage({
            lang: selcode?.label,
            code: selcode?.code,
            rtl: false,
            ...selcode
          }));
        }
        if (res.data.data.site.version != (site && site.version)) {
          Api.post("/site", {
            version: res.data.data.site.version,
            data_url: res.data.data.site.url,
          }).then((siteres) => {
            //console.log("ssss",siteres);

            if (siteres.data) {
              dispatch(actions.sitesettings(siteres.data));
              setTimeout(() => {
                callback();
              }, 3000);
            } else {
              // console.log("ERROR,siteres",siteres);
            }
          });
        }
        setTimeout(
          () => dispatch(actions.storesettings(res.data && res.data.data)),
          10000
        );
        if (res.data.data.review.version != (review && review.version)) {
          Api.post("/review", {
            version: res.data.data.review.version,
            data_url: res.data.data.review.url,
          }).then((reviewred) => {
            if (reviewred.data) {
              dispatch(actions.reviewsettings(reviewred.data));
            } else {
              //console.log("ERROR", reviewred);
            }
          });
        }
        if (res.data.data.category.version != category?.version) {

          Api.post("/category", {
            version: res.data.data.category.version, //'2.1',
            data_url: res.data.data.category.url, //'https://assets.originmattress.com.my/common/category/category_2.1.json'//
          }).then((catres) => {
            if (catres.data) {
              dispatch(actions.categorysettings(catres.data));
            } else {
              console.log("ERROR catres", catres);
            }
          });
        }

        if (res.data.data.products.version != (products && products.version)) {
          Api.post("/product", {
            version: res.data.data.products.version, //'6.4',//
            data_url: res.data.data.products.url, //'https://assets.originmattress.com.my/common/product/product_6.4.json' //
          }).then((prodres) => {
            dispatch(actions.isFETCh(false));

            if (prodres.data && prodres.data.status != 404) {
              dispatch(actions.productsettings(prodres.data));
              // callback();
            } else {
              //  console.log("ERROR ,prodres", prodres);
            }
          });
        } else {
          callback();
        }
      }
    );
  } catch (error) {
    //console.log(error);
  }
};

export const storeChatlist = (params, callback) => (dispatch) => {
  Api.post("/chat/list", params).then((prodres) => {
    dispatch(
      actions.storechatlist(prodres && prodres.data && prodres.data.data)
    );

    if (prodres && prodres.data && prodres.data.status == 200)
      callback({ l: prodres.data.data });
    else callback({ l: [] });
  });
  //
};

export const getmessages = (params, callback) => (dispatch) => {
  Api.post("/chat/messages", params).then((prodres) => {
    // dispatch(
    //   actions.storechatmessages(prodres && prodres.data && prodres.data.data)
    // );

    if (prodres && prodres.data && prodres.data.status == 200)
      callback({ l: prodres.data.data.messages });
    else callback({ l: [] });
  });
  //
};
export const postReview = (params, callback) => (dispatch) => {
  Api.post("/review/add", params).then((prodres) => {
    if (prodres.status == 200) {
      callback(prodres.data.msg);
    }
  });
  //
};

export const changeLanguages = (val) => (dispatch) => {
  try {
    if (val?.code != undefined) {
      dispatch(actions.changeLanguage(val));
      Api.post("/setting", { lang: val.code }).then((res) => {
        Api.post("/site", {
          version: res.data.data.site.version,
          data_url: res.data.data.site.url,
        }).then((siteres) => {
          //console.log("ssss",siteres);

          if (siteres.data && siteres.data.status != 404) {
            dispatch(actions.sitesettings(siteres.data));
          } else {
            // console.log("ERROR,siteres",siteres);
          }
        });

        setTimeout(
          () => dispatch(actions.storesettings(res.data && res.data.data)),
          5000
        );
        Api.post("/review", {
          version: res.data.data.review.version,
          data_url: res.data.data.review.url,
        }).then((reviewred) => {
          if (reviewred.data && reviewred.data.status != 404) {
            dispatch(actions.reviewsettings(reviewred.data));
          } else {
            //console.log("ERROR", reviewred);
          }
        });
        Api.post("/category", {
          version: res.data.data.category.version, //'2.1',
          data_url: res.data.data.category.url, //'https://assets.originmattress.com.my/common/category/category_2.1.json'//
        }).then((catres) => {
          if (catres.data && catres.data.status != 404) {
            dispatch(actions.categorysettings(catres.data));
          } else {
            //    console.log("ERROR catres", catres);
          }
        });

        Api.post("/product", {
          version: res.data.data.products.version, //'6.4',//
          data_url: res.data.data.products.url, //'https://assets.originmattress.com.my/common/product/product_6.4.json' //
        }).then((prodres) => {
          dispatch(actions.isFETCh(false));

          if (prodres.data && prodres.data.status != 404) {
            dispatch(actions.productsettings(prodres.data));
          } else {
            //  console.log("ERROR ,prodres", prodres);
          }
        });
      });
    }
  } catch (e) { }
};

export const clearchtlist = () => (dispatch) => {
  try {
    dispatch(actions.storechatlist([]));
  } catch (e) { }
  //
};

export const getshowroom = (params, callback) => (dispatch) => {
  Api.get("/showroom").then((prodres) => {
    if (prodres && prodres.status == 200) {
      dispatch(actions.storeshowroom(prodres?.data));
    }
  });
  //
};

export const clearshowroom = (params, callback) => (dispatch) => {
  dispatch(actions.clearshowroom(""));
};

export const setPaddHeight = (params) => (dispatch) => {
  dispatch(actions.setPaddingHeight(params));
}

export const updateLocaldata = (appdata, callback) => (dispatch) => {
  try {
    dispatch(actions.isFETCh(true));
    setTimeout(() => dispatch(actions.isFETCh(false)), 10000);
    let {
      appsettings,
      categorysettings,
      productsettings,
      settings,
      reviewsettings,
    } = appdata || {};
    let { category, products, site, review } =
      window.__PRELOADED_STATE__?.app?.appsettings || {};

    let lang = { lang: appdata?.language?.code || window.__PRELOADED_STATE__?.app?.lang }
    if (appdata?.language?.code != undefined && window.__PRELOADED_STATE__?.app?.lang != appdata?.language?.code) {
      lang = { lang: window.__PRELOADED_STATE__?.app?.lang }
      callback({ err: true, lang })

      return true
    }

    ssr
      .post("/common/setting", lang)
      .then((res) => {
        if ((settings?.version != res?.data?.site?.version) || (settings?.version != site?.version)) {
          dispatch(actions.firstLangSet(lang));
          ssr.post("/common/site", lang).then((siteres) => {
            if (siteres.data && siteres.data.status != 404) {
              if (appdata?.language?.code == undefined) {
                let lang = siteres?.data?.data?.languages?.filter((op) => op.code == window.__PRELOADED_STATE__?.app?.lang);
                dispatch(actions.changeLanguage({
                  lang: lang?.[0]?.label,
                  code: lang?.[0]?.code,
                  rtl: false,
                  root: lang?.[0]?.root,
                  default: lang?.[0]?.default
                }));

              }
              dispatch(actions.sitesettings(siteres.data));
              setTimeout(() => {
                callback(true);
              }, 3000);
            } else {
            }
          });
        }
        setTimeout(
          () => dispatch(actions.storesettings(res.data)),
          10000
        );
        if (
          reviewsettings?.version !=
          (res?.data?.review?.version || review?.version)
        ) {
          ssr.post("/common/reviews", lang).then((reviewred) => {
            if (reviewred.data && reviewred.data.status != 404) {
              dispatch(actions.reviewsettings(reviewred.data));
            } else {
              //console.log("ERROR", reviewred);
            }
          });
        }
        if (
          categorysettings?.version !=
          (res?.data?.category?.version || category?.version)
        ) {
          ssr.post("/common/category", lang).then((catres) => {
            if (catres.data && catres.data.status != 404) {
              dispatch(actions.categorysettings(catres.data));
            } else {
            }
          });
        }
        if (
          productsettings?.version !=
          (res?.data?.products?.version || products?.version)
        ) {
          ssr
            .post("/common/product", lang)
            .then((prodres) => {
              if (prodres && prodres.status != 404) {
                dispatch(actions.productsettings(prodres.data));
                // callback();
              } else {
                //  console.log("ERROR ,prodres", prodres);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          callback(true);
        }
      });
  } catch (error) {
    console.log("Error", error)
  }
};

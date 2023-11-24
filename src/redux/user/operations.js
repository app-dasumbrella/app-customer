/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { cleanCart } from "@redux/actions";
import * as actions from "./actions";
import { isExpired } from "./utils";
import moment from "moment";
import Api, { api2, loadtoken } from "@services/Api";
import * as actions2 from "../payment/actions";
import store from "@store/configureStore"
import { toast } from '../../Omni'
/**
 * login to get accessToken --> get user info
 */
export const login =
  ({ email, password, logintype, LoggedUser }, callback) =>
    (dispatch) => {
      try {
        dispatch(actions.loginPending());
        // api2
        //   .post("/login", { email, password })
        //   .then((response) => {
        // if (response.data.status == 200) {
        Api.post("/customer/login", {
          email,
          password,
          // access_token: response.data.access_token,
        })
          .then((payload) => {
            if (payload.status == 200) {
              if (payload && payload.data && payload.data.success) {

                dispatch(
                  actions.loginSuccess({
                    userInfo: {
                      name: "Customer ",
                      email,
                      ...payload.data,
                      access_token: payload.data.data.access_token,
                      LoggedUser,
                    },
                  })
                );
                callback({
                  err: false,
                  ...payload.data,
                  email,
                });
              } else {
                callback({ err: true, ...payload.data });
                dispatch(actions.loginFailure(""));
              }
            }
          })
          .catch((err) => {
            callback({ err: true });
            dispatch(actions.loginFailure(""));
          });
        // } else {
        //   dispatch(actions.loginFailure(""));
        //   callback({ err: true });
        // }
        // })
        // .catch((err) => {
        //   //console.log(err);
        //   dispatch(actions.registerFailure());
        //   callback({ err: true });
        // });
      } catch (error) {
        dispatch(actions.loginFailure(error));
      }
    };

export const requestReset =
  ({ email, lang }, callback) =>
    (dispatch) => {
      try {
        dispatch(actions.registerPending());
        Api.post("/customer/forgot-password", {
          lang: store.getState()?.app?.language?.code,
          email,
        }).then((payload) => {
          dispatch(actions.registerFailure(""));

          if (payload.data.status == 200) {
            callback({
              err: false,
              msg: payload?.data?.msg,
            });
          } else {
            callback({
              err: true,
              msg: payload?.data?.msg,
            });
          }
        });
      } catch (error) {
        callback({
          err: true,
          msg: error?.data?.msg,
        });
        dispatch(actions.registerFailure(error));
      }
    };

export const register2 =
  ({ fullName, email, LoggedUser, password, auth_token, type, lang }, callback) =>
    (dispatch) => {
      try {
        //console.log(fullName, email, password);
        dispatch(actions.registerPending());

        // api2
        //   .post("/signup", { email, password })
        //   .then((response) => {
        //console.log(response);
        // if (response.data.status == 200) {
        print("auth token",auth_token);
        print("type",type);
        print("lang",lang);
        print("email",email);
        print("password",password);
        print("Logged user",LoggedUser);
        Api.post("/customer/signp", {
          email,
          name: fullName,
          password: password,
          auth_token: auth_token,
          lang: store.getState()?.app?.language?.code,
          type: type,
          //access_token: response.data.access_token,
        }).then((payload) => {
          if (payload.data.status == 200) {
            if (payload && payload.data && payload.data.success) {
              dispatch(
                actions.registerSuccess({
                  userInfo: {
                    name: fullName,
                    email,
                    ...payload.data,
                    access_token: payload.data.data.access_token,
                    LoggedUser,
                  },
                })
              );
              callback({
                err: false,
                name: fullName,
                email,
                ...payload.data,
                access_token: payload.data.data.access_token,
              });
            } else {
              callback({ err: true, ...payload.data });
              dispatch(actions.loginFailure(""));
            }
          } else {
            callback({ err: true, ...payload.data });
            dispatch(actions.loginFailure(""));
          }
        });
        //  }
        // })
        // .catch((err) => {
        //   //console.log(err);
        //   dispatch(actions.registerFailure(err.response.msg));
        //   callback({ err: true });
        // });
      } catch (error) {
        dispatch(actions.registerFailure(error));
      }
    };

export const register =
  ({ fullName, email, LoggedUser, password, auth_token, type, lang }, callback) =>
    (dispatch) => {
      try {
        dispatch(actions.registerPending());

        Api.post("/customer/signup", {
          email,
          name: fullName,
          password: password,
          auth_token: auth_token,
          type: type,
          lang: store.getState()?.app?.language?.code,

          //access_token: response.data.access_token,
        }).then((payload) => {
          //console.log("payload", payload);
          if (payload.data.status == 200) {
            dispatch(
              actions.registerSuccess({
                userInfo: {
                  name: fullName,
                  email,
                  ...payload.data,
                  access_token: payload.data.data.access_token,
                  LoggedUser,
                },
              })
            );
            callback({
              err: false,
              name: fullName,
              email,
              ...payload.data,
              access_token: payload.data.data.access_token,
            });
          } else {
            dispatch(actions.registerFailure(payload?.data?.msg));
            callback({
              err: true,
              msg: payload?.data?.msg
            });
          }
        });

      } catch (error) {
        dispatch(actions.registerFailure(error));
      }
    };

/**
 * @function renewAccessToken renew accessToken when expired
 * @param {*} { accessToken }
 */
export const renewAccessToken =
  ({ accessToken }) =>
    (dispatch, callback) => {
      try {
        // GraphqlAPI.renewCustomerAccessToken({ accessToken })
        //   .then((json) => {
        //     if (json.error) {
        //       dispatch(actions.userInfoFailure(json.error));
        //     } else {
        //       const { customerAccessToken } = json;
        //       dispatch(actions.loginSuccess(customerAccessToken));
        //       getUserInfo({
        //         accessToken: customerAccessToken.accessToken,
        //         expiresAt: customerAccessToken.expiresAt,
        //       });
        //     }
        //   })
        //   .catch((error) => {
        //     dispatch(actions.userInfoFailure(error));
        //   });
      } catch (error) {
        dispatch(actions.userInfoFailure(error));
      }
    };

/**
 * get user info
 * @param {{}} { accessToken, expiresAt }
 */
export const getUserInfo = (payload) => (dispatch) => {
  try {
    dispatch(actions.createUserAddressPending());
    Api.post("/customer-address/list", payload).then((response) => {
      if (response.data) {
        if (
          (response.data && response.data.status == 405) ||
          (response.data && response.data.status == 500)
        ) {
          dispatch(actions.listUserAddressSuccess([]));
        } else {
          dispatch(actions.listUserAddressSuccess(response.data));
          if (!store?.getState()?.user?.userInfo?.defaultAddress?.id) {
            dispatch(
              actions.updateUserDefaultAddressSuccess(
                response.data &&
                response.data.data &&
                response.data.data[0]
              )
            );
          }
        }
      }
    });
    ////console.log("expire", isExpired(expiresAt));
    // if (isExpired(expiresAt)) {
    //   dispatch(renewAccessToken({ accessToken }));
    // } else {
    //   dispatch(actions.userInfoPending());
    //   GraphqlAPI.getCustomerInfo({ accessToken })
    //     .then((json) => {
    //       if (json.error) {
    //         dispatch(actions.userInfoFailure(json.error));
    //       } else {
    //         const { user } = json;
    //         dispatch(actions.userInfoSuccess(user));
    //       }
    //     })
    //     .catch((error) => {
    //       dispatch(actions.userInfoFailure(error));
    //     });
    // }
  } catch (error) {
    //  dispatch(actions.userInfoFailure(error));
  }
};
/**
 * @function createUserAddress
 *
 * @param {*} { accessToken, address }
 */
export const createUserAddress =
  ({ address, email, access_token, customer_id, LoggedUser }, callback) =>
    async (dispatch) => {
      try {
        //console.log(address);

        dispatch(actions.createUserAddressPending());
        // customer_id,

        let payload = {
          access_token: access_token,
          email,
          ...address,
        };
        Api.post("/customer-address/add", payload)
          .then((res) => {
            if (res.data.status == 200) {
              let addresID = res.data.data.address_id;
              console.log("LOGG", LoggedUser)
              if (LoggedUser) {
                try {
                  Api.post("/customer-address/list", {
                    customer_id,
                    access_token,
                    email,
                  }).then((response) => {
                    if (response.data) {
                      if (
                        (response.data && response.data.status == 405) ||
                        (response.data && response.data.status == 500)
                      ) {
                      } else {
                        let lists = response.data.data;
                        let filtered = lists?.filter((i) => i.id == res.data.data.address_id);
                        dispatch(actions.listUserAddressSuccess(response.data));
                        dispatch(
                          actions.updateUserDefaultAddressSuccess(
                            filtered &&

                            filtered[0]
                          )
                        );
                      }
                    }
                  });
                } catch (err) {
                  console.log("m", err)
                }

              } else {
                // { id: res.data.data.address_id, ...address },

                dispatch(
                  actions.storedummyAdd({ id: res.data.data.address_id, ...address, email })
                );
                dispatch(
                  actions.listUserAddressSuccess([
                  ])
                );
              }
              // dispatch(
              //   actions.updateUserDefaultAddressSuccess(
              //     filtered && filtered[0]
              //   )
              // );
              callback({
                customerAddress: {
                  id: res.data.data.address_id,
                  ...address,
                },
                err: false,
              });

              // });
            } else {
              callback({ err: true, reason: res.data.msg });
              dispatch(actions.createUserAddressFailure(res.data.msg));
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(actions.createUserAddressFailure(err));
          });
      } catch (error) {
        dispatch(actions.createUserAddressFailure(error));
      }
    };

/**
 * @function updateUserDefaultAddress
 *
 * @param {} { accessToken, addressId }
 */
export const updateUserDefaultAddress =
  ({ address, id }) =>
    (dispatch) => {
      try {
        dispatch(actions.updateUserDefaultAddressPending());
        dispatch(actions2.verifySuccess(""));

        dispatch(actions.updateUserDefaultAddressSuccess(address));
      } catch (error) {
        dispatch(actions.updateUserDefaultAddressFailure(error));
      }
    };

/**
 * @function updateUserAddress
 *
 * @param {} { accessToken, addressId, address}
 */
export const updateUserAddress =
  (
    { customer_id, address, email, access_token, customer_address_id },
    callback
  ) =>
    async (dispatch) => {
      try {
        dispatch(actions.updateUserAddressPending());

        let payload = {
          access_token,
          email,
          customer_id,
          customer_address_id,
          ...address,
        };
        console.log(payload);
        Api.post("/customer-address/edit", payload)
          .then((response) => {
            if (response.data && response.data.status == 200) {
              let addresID = response.data.data.address_id;
              callback({ customerAddress: true });

              Api.post("/customer-address/list", {
                customer_id,
                access_token,
                email,
              }).then((response) => {
                if (response.data) {
                  if (
                    (response.data && response.data.status == 405) ||
                    (response.data && response.data.status == 500)
                  ) {
                    //dispatch(actions.listUserAddressSuccess([]));
                  } else {
                    let lists = response.data.data;
                    let filtered = lists.filter((i) => i.id == addresID);
                    dispatch(actions.listUserAddressSuccess(response.data));
                    dispatch(
                      actions.updateUserDefaultAddressSuccess(
                        filtered && filtered[0]
                      )
                    );
                  }
                }
              });
            }
            else {
              callback({ customerAddress: false, response });
              dispatch(actions.updateUserAddressFailure());
            }
          })
          .catch((err) => { });
      } catch (error) {
        dispatch(actions.updateUserAddressFailure(error));
      }
    };

/**
 * @function deleteUserAddress
 *
 * @param {} { accessToken, addressId, address}
 */
export const deleteUserAddress =
  ({ access_token, email, customer_address_id, customer_id }, callback) =>
    (dispatch) => {
      try {
        //  dispatch(actions.createUserAddressPending());
        //console.log(access_token, email, customer_address_id);
        Api.post("/customer-address/delete", {
          access_token,
          email,
          customer_address_id,
        })
          .then((response) => {
            if (
              (response.data && response.data.status == 405) ||
              (response.data && response.data.status == 500)
            ) {
              toast(response.data.msg)
              callback({ error: true, msg: response.data.msg });
            } else {
              Api.post("/customer-address/list", {
                customer_id,
                access_token,
                email,
              }).then((res) => {
                if (res.data) {
                  if (
                    (res.data && res.data.status == 405) ||
                    (res.data && res.data.status == 500)
                  ) {
                    callback({ error: false, msg: res.data.msg });
                    dispatch(actions.listUserAddressSuccess([]));
                  } else {
                    callback({ error: false });
                    dispatch(actions.listUserAddressSuccess(res.data));
                  }
                }
              });
            }
          })
          .catch((err) => { });
      } catch (error) {
        dispatch(actions.deleteUserAddressFailure(error));
      }
    };

/**
 * @function logoutUser logout flow
 */
export const logoutUserAndCleanCart = (email) => (dispatch) => {
  // api
  //   .post("/customer/logout", {
  //     email: email,
  //   })
  //   .then((response) => {
  dispatch(actions.logoutUser(email));
  //  });
};

export const updateToken = (payload) => (dispatch) => {
  try {
    api2.post("/renew", payload).then((response) => {
      if (response.data) {
        if (
          (response.data && response.data.status == 405) ||
          (response.data && response.data.status == 500)
        ) {
        } else {
          dispatch(actions.userInfoSuccess(response.data));
        }
      }
    });
  } catch (error) {
    dispatch(actions.loginFailure(error));
  }
};

export const setAdressStatic = (payload) => (dispatch) => {
  dispatch(actions.storedStaticAdd(payload));
};
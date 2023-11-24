import React, { useState } from "react";
import { connect } from "react-redux";
// import Dropdown from "react-dropdown";
import { t } from "i18next";
import {
    View,
    ScrollView,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    I18nManager,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";
import {
    ModalPhotos,
    AdMob,
    LayoutItem,
    ProductTitle,
    Rating,
    ImageCache
} from "@components";
import { moderateScale } from "react-native-size-matters";
import { windowWidth } from "../HomeContainer2";
function ReviewsHeader({
    avragerate,
    reviewImages,
    setReviewsp,
    reviews,
    reviews1,
    reviews2,
    reviews3,
    reviews4,
    reviews5,
    primarycolors,
    totals,
    secondaryColor,
    page,
    selectedOPtion,
    options,
    setproducts,
    reviewsettings,
    setModals,
    review,
    setOpenPanel,
    userInfo,
}) {
    let { rate, profile, verified_buyer, tick } = review || {};
    let { star_color } = rate || {};
    const [activeIndex2, setactiveIndex2] = useState(0);
    const [show2, setShow2] = useState(false);
    return (
        <View style={{ flex: 1 }}  >

            {/* {page && (
              <Dropdown
                className="optiondropdown"
                value={selectedOPtion}
                options={options}
                onChange={(e) => {
                  if (e.value == "")
                    setproducts(reviewsettings && reviewsettings.products);
                  else {
                    setproducts(e.value);
                  }
                }}
                placeholder="All"
              />
            )} */}
            <View style={{ paddingHorizontal: '5%' }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignContent: 'center',
                    alignItems: 'center'

                }}>
                    <Text style={{
                        color: primarycolors,
                        fontSize: moderateScale(60),
                        marginRight: 25,
                        fontWeight: '600'
                    }} >{Number(avragerate).toFixed(1)}</Text>
                    <Rating
                        big
                        style={{ alignSelf: "flex-start", marginBottom: 0 }}
                        rating={Number(avragerate || 0)}
                        size={moderateScale(50)}
                    />

                </View>
                <View >
                    <Text style={{
                        color: 'black',
                        fontSize: moderateScale(16),
                        marginTop: moderateScale(20),
                        marginBottom: moderateScale(5)
                    }}>
                        {t("BasedOn")} {reviews && reviews.length} {t("Reviews")}
                    </Text>
                </View>
                <View style={{
                    marginVertical: moderateScale(5),
                    flexDirection: 'row',
                    justifyContent: 'space-between'

                }}>
                    <Rating
                        style={{
                            alignSelf: "flex-start", marginBottom: 0
                            , marginRight: 10
                        }}
                        rating={Number(5)}
                        size={moderateScale(50)}
                    />
                    <View style={{
                        backgroundColor: '#e9ecef',
                        width: windowWidth * 0.45,
                        borderRadius: 5,
                        height: 20,

                    }}>

                        <View
                            style={{
                                borderRadius: 5,

                                height: 20,
                                width: `${(

                                    (reviews5 / totals) * 100)}%`,
                                backgroundColor: secondaryColor
                            }}
                        ></View>
                    </View>

                    <Text
                        style={{
                            color: '#333', fontSize: moderateScale(15),
                            marginLeft: moderateScale(10)
                        }}
                    >({reviews5})</Text>
                </View>
                <View style={{
                    marginVertical: moderateScale(5),
                    flexDirection: 'row',
                    justifyContent: 'space-between'

                }}>
                    <Rating
                        style={{
                            alignSelf: "flex-start", marginBottom: 0
                            , marginRight: 10
                        }}
                        rating={Number(4)}
                        size={moderateScale(50)}
                    />
                    <View style={{
                        backgroundColor: '#e9ecef',
                        width: windowWidth * 0.45,
                        borderRadius: 5,
                        height: 20,

                    }}>

                        <View
                            style={{
                                borderRadius: 5,

                                height: 20,
                                width: `${(

                                    (reviews4 / totals) * 100)}%`,
                                backgroundColor: secondaryColor
                            }}
                        ></View>
                    </View>

                    <Text
                        style={{
                            color: '#333', fontSize: moderateScale(15),
                            marginLeft: moderateScale(10)
                        }}
                    >({reviews4})</Text>
                </View>
                <View style={{
                    marginVertical: moderateScale(5),
                    flexDirection: 'row',
                    justifyContent: 'space-between'

                }}>
                    <Rating
                        style={{
                            alignSelf: "flex-start", marginBottom: 0
                            , marginRight: 10
                        }}
                        rating={Number(3)}
                        size={moderateScale(50)}
                    />
                    <View style={{
                        backgroundColor: '#e9ecef',
                        width: windowWidth * 0.45,
                        borderRadius: 5,
                        height: 20,

                    }}>

                        <View
                            style={{
                                borderRadius: 5,

                                height: 20,
                                width: `${(

                                    (reviews3 / totals) * 100)}%`,
                                backgroundColor: secondaryColor
                            }}
                        ></View>
                    </View>

                    <Text
                        style={{
                            color: '#333', fontSize: moderateScale(15),
                            marginLeft: moderateScale(10)
                        }}
                    >({reviews3})</Text>
                </View>
                <View style={{
                    marginVertical: moderateScale(5),
                    flexDirection: 'row',
                    justifyContent: 'space-between'

                }}>
                    <Rating
                        style={{
                            alignSelf: "flex-start", marginBottom: 0
                            , marginRight: 10
                        }}
                        rating={Number(2)}
                        size={moderateScale(50)}
                    />
                    <View style={{
                        backgroundColor: '#e9ecef',
                        width: windowWidth * 0.45,
                        borderRadius: 5,
                        height: 20,

                    }}>

                        <View
                            style={{
                                borderRadius: 5,

                                height: 20,
                                width: `${(

                                    (reviews2 / totals) * 100)}%`,
                                backgroundColor: secondaryColor
                            }}
                        ></View>
                    </View>

                    <Text
                        style={{
                            color: '#333', fontSize: moderateScale(15),
                            marginLeft: moderateScale(10)
                        }}
                    >({reviews2})</Text>
                </View>
                <View style={{
                    marginVertical: moderateScale(5),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 40
                }}>
                    <Rating
                        style={{
                            alignSelf: "flex-start", marginBottom: 0
                            , marginRight: 10
                        }}
                        rating={Number(1)}
                        size={moderateScale(50)}
                    />
                    <View style={{
                        backgroundColor: '#e9ecef',
                        width: windowWidth * 0.45,
                        borderRadius: 5,
                        height: 20,

                    }}>

                        <View
                            style={{
                                borderRadius: 5,

                                height: 20,
                                width: `${(

                                    (reviews1 / totals) * 100)}%`,
                                backgroundColor: secondaryColor
                            }}
                        ></View>
                    </View>

                    <Text
                        style={{
                            color: '#333', fontSize: moderateScale(15),
                            marginLeft: moderateScale(10)
                        }}
                    >({reviews1})</Text>
                </View>


            </View>


        </View>
    );
}
const mapStateToProps = ({ app }) => {
    return {
        app: app && app.settings,
        primarycolors:
            app &&
            app.settings &&
            app.settings.theme &&
            app.settings.theme.primaryColor,
        review:
            app && app.settings && app.settings.theme && app.settings.theme.review,
    };
};

export default connect(mapStateToProps, null)(ReviewsHeader);

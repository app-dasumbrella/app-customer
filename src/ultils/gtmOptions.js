import { getProductOpt } from "./productOptions"
import TagManager from "react-gtm-module";

const getTitle = (title, variant) => {
    return variant == undefined ? title : `${title} ${variant}`
}

const gtmviewitem = (langcode, currency, prod, variant, category) => {
    let prodindex = variant?.indexselect;
    let item_variant = getProductOpt(variant?.selectedOptions?.[0]?.name?.toLowerCase(), langcode,
        variant?.options?.[0]?.values?.[prodindex]?.label,
        variant?.options?.[0]?.values?.[prodindex]?.label_alt,
        variant?.options?.[0]?.values?.[prodindex]?.value,
        variant?.options?.[0]?.values?.[prodindex]?.value_alt)

    let view_itemEvt = {
        'dataLayer': {
            "event": "view_item",
            "ecommerce": {
                "items": [{
                    "item_id": variant?.id == undefined ? prod?.id : variant?.id,
                    "item_name": getTitle(prod?.title, item_variant),
                    "price": variant?.sale_price,
                    "item_variant": item_variant || '',
                    "item_category": category,
                    "index": 0
                }],
                "currency": currency
            }
        }
    };

    try {
        TagManager.dataLayer({ 'dataLayer': { ecommerce: null } })
    }
    catch (err) {
        console.log("Reset TM : gtmviewitem");
        console.log(err);
    }
    try {
        console.log(view_itemEvt, "GA4 : view_item")
        TagManager.dataLayer(view_itemEvt);
    }
    catch (err) {
        console.log("Fire TM : gtmviewitem");
        console.log(err);
    }
    return view_itemEvt;
}

const gtmaddtocart = (currency, prod) => {
    let items = [], total = 0
    // "item_brand": "Compton",
    // "item_category": "T-Shirts",
    // "size": "M"
    prod?.map((i, index) => {
        total = i?.price * i?.quantity
        items.push({
            "item_id": i?.id,
            "item_name": getTitle(i?.name, i?.variant),
            "price": i?.price,
            "quantity": Number(i?.quantity),
            "item_variant": i?.variant || '',
            "index": index,
        })
    })
    let add_to_cartEvt = {
        'dataLayer': {
            "event": "add_to_cart",
            "ecommerce": {
                "currency": currency,
                "value": total,
                "items": items
            }
        }
    }

    try {
        TagManager.dataLayer({ 'dataLayer': { ecommerce: null } })
    }
    catch (err) {
        console.log("Reset TM : gtmaddtocart");
        console.log(err);
    }
    try {
        console.log(add_to_cartEvt, "UA : add_to_cart")
        TagManager.dataLayer(add_to_cartEvt);
    }
    catch (err) {
        console.log("Fire TM : gtmaddtocart");
        console.log(err);
    }

    return add_to_cartEvt;
}

const gtmAddToCart = (currency, prod) => {
    let items = [], total = 0
    //  "brand": "Compton",
    // "category": "T-Shirts",
    //  "dimension1": "M",
    prod?.map((i, index) => {
        total = i?.price * i?.quantity
        items.push({
            "id": i?.id,
            "name": getTitle(i?.name, i?.variant),
            "price": i?.price,
            "quantity": Number(i?.quantity),
            "variant": i?.variant || '',
            "position": index,
        })
    })
    let addToCartEvt = {
        'dataLayer': {
            "event": "addToCart",
            "ecommerce": {
                "currencyCode": currency,
                add: {
                    products: items,
                }
            }
        }
    }

    try {
        TagManager.dataLayer({ 'dataLayer': { ecommerce: null } })
    }
    catch (err) {
        console.log("Reset TM : gtmAddToCart");
        console.log(err);
    }
    try {
        console.log(addToCartEvt, "GA4 : addToCart")
        TagManager.dataLayer(addToCartEvt);
    }
    catch (err) {
        console.log("Fire TM : gtmAddToCart");
        console.log(err);
    }

    return addToCartEvt;
}

const gtmbegincheckout = (currency, prod, langcode) => {
    let items = [], total = 0
    // "item_brand": "Compton",
    // "item_category": "T-Shirts",
    // "size": "M"
    prod?.map((i, index) => {
        let prodindex = i?.variant?.indexselect;
        let item_variant = getProductOpt(i?.variant?.selectedOptions?.[0]?.name?.toLowerCase(), langcode,
            i?.variant?.options?.[0]?.values?.[prodindex]?.label,
            i?.variant?.options?.[0]?.values?.[prodindex]?.label_alt,
            i?.variant?.options?.[0]?.values?.[prodindex]?.value,
            i?.variant?.options?.[0]?.values?.[prodindex]?.value_alt)
        total = i?.variant?.sale_price * i?.quantity
        items.push({
            "item_id": i?.variant?.id == undefined ? i?.product?.id : i?.variant?.id,
            "item_name": getTitle(i?.product?.title, item_variant),
            "price": i?.variant?.sale_price,
            "quantity": Number(i?.quantity),
            "item_variant": item_variant || '',
            "index": index,
        })
    })
    let begin_checkoutEvt = {
        'dataLayer': {
            "event": "begin_checkout",
            "ecommerce": {
                "currency": currency,
                "value": total,
                "items": items
            }
        }
    }

    try {
        TagManager.dataLayer({ 'dataLayer': { ecommerce: null } })
    }
    catch (err) {
        console.log("Reset TM : gtmbegincheckout");
        console.log(err);
    }
    try {
        console.log(begin_checkoutEvt, "GA4 : begin_checkout")
        TagManager.dataLayer(begin_checkoutEvt);
    }
    catch (err) {
        console.log("Fire TM : gtmbegincheckout");
        console.log(err);
    }

    return begin_checkoutEvt;
}

const gtmcheckout = (currency, prod, langcode) => {
    let items = [], total = 0
    // "brand": "Compton",
    // "category": "T-Shirts",
    // "dimension1": "M",

    prod?.map((i, index) => {
        let prodindex = i?.variant?.indexselect;
        let item_variant = getProductOpt(i?.variant?.selectedOptions?.[0]?.name?.toLowerCase(), langcode,
            i?.variant?.options?.[0]?.values?.[prodindex]?.label,
            i?.variant?.options?.[0]?.values?.[prodindex]?.label_alt,
            i?.variant?.options?.[0]?.values?.[prodindex]?.value,
            i?.variant?.options?.[0]?.values?.[prodindex]?.value_alt)

        total = i?.variant?.sale_price * i?.quantity
        items.push({
            "id": i?.variant?.id == undefined ? i?.product?.id : i?.variant?.id,
            "name": getTitle(i?.product?.title, item_variant),
            "price": i?.variant?.sale_price,
            "quantity": Number(i?.quantity),
            "variant": item_variant || '',
            "position": index,
        })
    })

    let checkoutEvt = {
        'dataLayer': {
            "event": "checkout",
            "ecommerce": {
                "checkout": {
                    "actionField": {
                        "step": 1
                    },
                    "products": items
                }
            }
        }
    }

    try {
        TagManager.dataLayer({ 'dataLayer': { ecommerce: null } })
    }
    catch (err) {
        console.log("Reset TM : gtmcheckout");
        console.log(err);
    }
    try {
        console.log(checkoutEvt, "UA : checkout")
        TagManager.dataLayer(checkoutEvt);
    }
    catch (err) {
        console.log("Fire TM : gtmcheckout");
        console.log(err);
    }

    return checkoutEvt;
}

const gtmpurchase = (currency, prod) => {
    let items = [], total = 0

    // "item_brand": "Compton",
    // "item_category": "T-Shirts",
    // "item_variant": "red",
    //  "size": "M"
    prod?.payload?.items?.map((i, index) => {
        items.push({
            "item_id": i?.id,
            "item_name": i.name,
            "price": i.price,
            "index": index,
            "quantity": Number(i.purchase_qty),
            "item_variant": i?.variant
        });
    });

    //"tax": 5,
    let purchaseEvt = {
        'dataLayer': {
            "event": "purchase",
            "ecommerce": {
                "transaction_id": prod?.payload?.order_number,
                "currency": currency,
                "shipping": prod?.payload?.shipping_cost,
                "value": Number(prod?.payload?.discount) != 0 ?
                    Number(Number(prod?.payload?.totalAmount) - Number(prod?.payload?.discount))
                    : Number(prod?.payload?.totalAmount),
                "items": items
            }
        }
    }

    try {
        TagManager.dataLayer({ 'dataLayer': { ecommerce: null } })
    }
    catch (err) {
        console.log("Reset TM : gtmpurchase");
        console.log(err);
    }
    try {
        console.log(purchaseEvt, "GA4 : purchase")
        TagManager.dataLayer(purchaseEvt);
    }
    catch (err) {
        console.log("Fire TM : gtmpurchase");
        console.log(err);
    }

    return purchaseEvt;
}

const gtmtransaction = (currency, prod) => {
    let items = []
    // "brand": "Compton",
    // "category": "T-Shirts",
    // "dimension1": "M",
    prod?.payload?.items?.map((i, index) => {
        items.push({
            id: i?.id,
            name: i.name,
            price: i.price,
            position: index,
            quantity: Number(i.purchase_qty),
            variant: i?.variant
        });
    });

    let transactionEvt = {
        'dataLayer': {
            "event": "transaction",
            "ecommerce": {
                "purchase": {
                    "actionField": {
                        "id": prod?.payload?.order_number,
                        "currency": currency,
                        "affiliation": "Online Store",
                        "shipping": prod?.payload?.shipping_cost,
                        "revenue": Number(prod?.payload?.discount) != 0 ?
                            Number(Number(prod?.payload?.totalAmount) - Number(prod?.payload?.discount))
                            : Number(prod?.payload?.totalAmount)


                    },
                    'products': items
                }
            }
        }
    }

    try {
        TagManager.dataLayer({ 'dataLayer': { ecommerce: null } })
    }
    catch (err) {
        console.log("Reset TM : gtmtransaction");
        console.log(err);
    }
    try {
        console.log(transactionEvt, "UA : transaction")
        TagManager.dataLayer(transactionEvt);
    }
    catch (err) {
        console.log("Fire TM : gtmtransaction");
        console.log(err);
    }

    return transactionEvt;
}

const gtmremoveFromCart = (itemData, categoryName, only1, langcode) => {
    let prodindex = itemData?.variant?.indexselect;
    let item_variant = getProductOpt(itemData?.variant?.selectedOptions?.[0]?.name?.toLowerCase(), langcode,
        itemData?.variant?.options?.[0]?.values?.[prodindex]?.label,
        itemData?.variant?.options?.[0]?.values?.[prodindex]?.label_alt,
        itemData?.variant?.options?.[0]?.values?.[prodindex]?.value,
        itemData?.variant?.options?.[0]?.values?.[prodindex]?.value_alt)
    let item = {
        'name': itemData?.product?.title,
        'id': itemData?.variant?.id == undefined ? itemData?.product?.id : itemData?.variant?.id,
        'price': itemData?.variant?.sale_price,
        'category': categoryName,
        'variant': item_variant || '',
        'quantity': only1 ? 1 : Number(itemData?.quantity)
    }
    let removeFromCartEvt = {
        'dataLayer': {
            'event': 'removeFromCart',
            'ecommerce': {
                'remove': {
                    'products': [item]
                }
            }
        }
    }

    try {
        TagManager.dataLayer({ 'dataLayer': { ecommerce: null } })
    }
    catch (err) {
        console.log("Reset TM : gtmremoveFromCart");
        console.log(err);
    }
    try {
        console.log(removeFromCartEvt, "GA4 : removeFromCart")
        TagManager.dataLayer(removeFromCartEvt);
    }
    catch (err) {
        console.log("Fire TM : gtmremoveFromCart");
        console.log(err);
    }

    return removeFromCartEvt;
}

const gtmremoveFromCartAddon = (itemData, categoryName, only1, langcode) => {
    let prodindex = itemData?.indexselect;
    let k1 = itemData?.product?.options?.[0]?.values?.[prodindex]
    let item_variant = itemData?.details?.types?.toLowerCase() != "simple" ? getProductOpt(itemData?.details?.types?.toLowerCase(), langcode,
        k1?.label,
        k1?.label_alt,
        k1?.value,
        k1?.value_alt) : ''
    let item = {
        'name': itemData?.product?.title,
        'id': itemData?.id == undefined ? itemData?.product?.id : itemData?.id,
        'price': itemData?.details?.price,
        'category': categoryName,
        'variant': item_variant || '',
        'quantity': only1 ? 1 : Number(itemData?.quantity)
    }
    let removeFromCartEvt = {
        'dataLayer': {
            'event': 'removeFromCart',
            'ecommerce': {
                'remove': {
                    'products': [item]
                }
            }
        }
    }

    try {
        TagManager.dataLayer({ 'dataLayer': { ecommerce: null } })
    }
    catch (err) {
        console.log("Reset TM : gtmremoveFromCartAddon");
        console.log(err);
    }
    try {
        console.log(removeFromCartEvt, "GA4 : removeFromCart")
        TagManager.dataLayer(removeFromCartEvt);
    }
    catch (err) {
        console.log("Fire TM : gtmremoveFromCartAddon");
        console.log(err);
    }

    return removeFromCartEvt;
}

export {
    gtmaddtocart,
    gtmAddToCart,
    gtmviewitem,
    gtmbegincheckout,
    gtmcheckout,
    gtmtransaction,
    gtmpurchase,
    gtmremoveFromCart,
    gtmremoveFromCartAddon
}
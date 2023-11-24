const getlabelval = (langcode, label, label_alt) => {
    let text = ''
    if (langcode != 'en') {
        if (label_alt == undefined) {
            text = label
        } else {
            text = label_alt
        }
    } else {
        text = label
    }
    return text
}

const getProductOpt = (type, langcode, label, label_alt, value, value_alt) => {
    let txt = ''
    if (type != "color") {
        txt = `${getlabelval(langcode, label, label_alt)} ${getlabelval(langcode, value, value_alt)}`

    } else {
        txt = `${getlabelval(langcode, label, label_alt)}`
    }
    return txt
}

const checkRootLang = (languages, language, value) => {
    let link = ''
    if (languages?.length == 1) {
        link = `${value}`
    } else {
        if (language?.root) {
            link = `${value}`
        } else {
            link = `/${language?.code}${value}`
        }
    }
    return link
}


const getProductLink = (languages, language, slug, id) => {
    let link = ''
    // if (slug != "") {
    slug = slug.charAt(0) == "/" ? slug : `/${slug}`
    link = checkRootLang(languages, language, slug)
    // } else {
    //     if (languages?.length == 1) {
    //         link = `/product/${id}`
    //     } else {
    //         if (language?.root) {
    //             link = `/product/${id}`
    //         } else {
    //             link = `/product/${language?.code}/${id}`
    //         }
    //     }

    // }
    return link
}

export {
    getlabelval,
    getProductOpt,
    getProductLink,
    checkRootLang
}
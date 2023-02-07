/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { find } from "lodash";

/**
 * format data creditCard to save in app
 */
export const formatCreditCard = (id, creditCard) => {
  try {
    if (!creditCard) return;

    const number = creditCard.creditCardNumber;
    const maskedNumer = number.replace(/\d(?=\d{4})/g, "*");

    return {
      vaultId: id,
      name: `${creditCard.firstName} ${creditCard.lastName}`,
      number,
      maskedNumer,
    };
  } catch (error) {
    console.warn(error);
  }
};

/**
 * update and add creditCard
 */
export const checkCardExisted = (payments, creditCard) => {
  if (!payments) return;
  let isExisted = false;

  const card = find(payments, (o) => {
    return o.number === creditCard.number;
  });

  if (card) {
    isExisted = true;
  }

  return isExisted;
};

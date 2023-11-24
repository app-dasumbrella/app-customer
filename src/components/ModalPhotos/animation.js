/** @format */

export const stackAnimatedStyles = (
  index,
  animatedValue,
  carouselProps,
  cardOffset
) => {
  const sizeRef = carouselProps.vertical
    ? carouselProps.itemHeight
    : carouselProps.itemWidth;
  const translateProp = carouselProps.vertical ? "translateY" : "translateX";

  const card1Scale = 0.9;
  const card2Scale = 0.8;

  cardOffset = !cardOffset && cardOffset !== 0 ? 18 : cardOffset;

  const getTranslateFromScale = (cardIndex, scale) => {
    const centerFactor = (1 / scale) * cardIndex;
    const centeredPosition = -Math.round(sizeRef * centerFactor);
    const edgeAlignment = Math.round((sizeRef - sizeRef * scale) / 2);
    const offset = Math.round((cardOffset * Math.abs(cardIndex)) / scale);

    return centeredPosition - edgeAlignment - offset;
  };

  return {
    // elevation: carouselProps.data.length - index, // fix zIndex bug visually, but not from a logic point of view
    opacity: animatedValue.interpolate({
      inputRange: [-3, -2, -1, 0],
      outputRange: [0, 0.5, 0.75, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [-2, -1, 0, 1],
          outputRange: [card2Scale, card1Scale, 1, card1Scale],
          extrapolate: "clamp",
        }),
      },
      {
        [translateProp]: animatedValue.interpolate({
          inputRange: [-3, -2, -1, 0, 1],
          outputRange: [
            getTranslateFromScale(-3, card2Scale),
            getTranslateFromScale(-2, card2Scale),
            getTranslateFromScale(-1, card1Scale),
            0,
            sizeRef * 0.5,
          ],
          extrapolate: "clamp",
        }),
      },
    ],
  };
};

export const getInputRangeFromIndexes = (range, index, carouselProps) => {
  const sizeRef = carouselProps.vertical
    ? carouselProps.itemHeight
    : carouselProps.itemWidth;
  const inputRange = [];

  for (let i = 0; i < range.length; i++) {
    inputRange.push((index - range[i]) * sizeRef);
  }

  return inputRange;
};

export const stackScrollInterpolator = (index, carouselProps) => {
  const range = [1, 0, -1, -2, -3];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return { inputRange, outputRange };
};

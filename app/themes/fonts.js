import { css } from 'styled-components';

const regular = () => css`
  font-size: 1.125rem;
`;
const xRegular = () => css`
  font-size: 1.5rem;
`;
const small = () => css`
  font-size: 1rem;
`;
const xsmall = () => css`
  font-size: 0.875rem;
`;

const xxsmall = () => css`
  font-size: 0.75rem;
`;

const xxxsmall = () => css`
  font-size: 0.625rem;
`;

const big = () => css`
  font-size: 1.7rem;
`;

const large = () => css`
  font-size: 2.25rem;
`;

const extraLarge = () => css`
  font-size: 3rem;
`;

// weights
const light = () => css`
  font-weight: 300;
`;
const bold = () => css`
  font-weight: 500;
`;
const bolder = () => css`
  font-weight: 600;
`;
const normal = () => css`
  font-weight: normal;
`;

// styles
const heading = () => css`
  ${large()}
  ${bold()}
`;

const subheading = () => css`
  ${big()}
  ${bold()}
`;

const standard = () => css`
  ${regular()}
  ${normal()}
`;

const subText = () => css`
  ${small()}
  ${normal()}
`;

export default {
  size: {
    regular,
    small,
    big,
    large,
    extraLarge,
    xRegular,
    xsmall,
    xxsmall,
    xxxsmall
  },
  style: {
    heading,
    subheading,
    standard,
    subText
  },
  weights: {
    light,
    bold,
    bolder,
    normal
  }
};

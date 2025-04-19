import { dmSans, playfairDisplay } from '../fonts';

const typography = {
  fontFamily: dmSans.style.fontFamily,

  h1: {
    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', // 28px -> 36px
    lineHeight: 'clamp(2rem, 3vw, 2.5rem)', // 32px -> 40px
    fontWeight: 500,
    letterSpacing: '-0.24%',
    fontFamily: playfairDisplay.style.fontFamily,
  },
  h2: {
    fontSize: 'clamp(1.5rem, 2vw, 2rem)', // 24px -> 32px
    lineHeight: 'clamp(1.75rem, 2.5vw, 2.25rem)', // 28px -> 36px
    fontWeight: 500,
    letterSpacing: '-0.25%',
    fontFamily: playfairDisplay.style.fontFamily,
  },
  h3: {
    fontSize: 'clamp(1rem, 1.5vw, 1.5rem)', // 16px -> 24px
    lineHeight: 'clamp(1.375rem, 2vw, 2rem)', // 22px -> 32px
    fontWeight: 500,
    letterSpacing: '-0.25%',
    fontFamily: playfairDisplay.style.fontFamily,
  },
  h4: {
    fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', // 16px -> 20px
    lineHeight: 'clamp(1.25rem, 1.5vw, 1.5rem)', // 20px -> 24px
    fontWeight: 500,
    letterSpacing: '-0.24%',
  },
  h5: {
    fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', // 16px -> 20px
    lineHeight: 'clamp(1.25rem, 1.5vw, 1.5rem)', // 20px -> 24px
    fontWeight: 500,
    letterSpacing: '-0.24%',
  },
  h6: {
    fontSize: 'clamp(0.75rem, 1vw, 1rem)', // 12px -> 16px
    lineHeight: 'clamp(1rem, 1.25vw, 1.25rem)', // 18px -> 20px
    fontWeight: 500,
    letterSpacing: '-0.24%',
  },
  subtitle1: {
    fontSize: 'clamp(0.8125rem, 1vw, 1rem)', // 13px -> 16px
    lineHeight: 'clamp(1.25rem, 1.5vw, 1.5rem)', // 20px -> 24px
    fontWeight: 500,
    letterSpacing: '-0.24%',
  },
  body1: {
    fontSize: 'clamp(1.0625rem, 1.5vw, 1.125rem)', // 17px -> 18px
    lineHeight: 'clamp(1.5625rem, 2vw, 1.75rem)', // 25px -> 28px
    fontWeight: 300,
    letterSpacing: '-0.24%',
  },
  body2: {
    fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)', // 13px -> 14px
    lineHeight: 'clamp(1.1875rem, 1.5vw, 1.25rem)', // 19px -> 20px
    fontWeight: 400,
    letterSpacing: '-0.24%',
  },
};

export default typography;

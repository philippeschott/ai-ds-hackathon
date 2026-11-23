/*
 * Example icons for the Button stories, exported as SVG from the Figma
 * "Simple Design System" icons Star and X (the defaults for Icon Start / Icon End).
 * Change: stroke #1E1E1E → currentColor, so the icon takes the button's text token.
 */
export function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.99998 1.33325L10.06 5.50659L14.6666 6.17992L11.3333 9.42659L12.12 14.0133L7.99998 11.8466L3.87998 14.0133L4.66665 9.42659L1.33331 6.17992L5.93998 5.50659L7.99998 1.33325Z"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4L4 12M4 4L12 12"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  );
}

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  &.light-mode{
    --color-text: #000000fd;
    --color-text-secondary: rgb(112, 117, 121);
    --color-text-secondary-rgb: 112, 117, 121;

    --color-interactive-element-hover: rgba(var(--color-text-secondary-rgb), 0.08);
    
    --accent-color: #4c90b2;
    --accent-color-shade: #447f9c;

    --color-chat-wallpaper-1: linear-gradient(
        90deg,
        #c9c866,
        #9da558,
        #5a8c4b,
        #416f3c,
        #203a18
      );
      --color-chat-wallpaper-2:linear-gradient(
          90deg,
          #476f5a,
          #46693d,
          #406b46,
          #767b59,
          #9fa087
        );

    --chat-wallpaper-bg: url("/assets/bg-light.png");

    --theme-background-color: #E0E0E4;
    
    --color-background: #ffffff;
    --color-background-secondary: rgb(240, 240, 240, 255);
    --color-background-secondary-accent: rgb(228, 228, 229);
    
    --color-text-button: var(--color-background);
    
    --color-chat-active: #56a2c9;
    --color-chat-hover: rgb(244, 244, 245);

    --color-default-shadow: rgb(114, 114, 114, 0.251);

    
    --color-item-hover: rgb(244, 244, 245);
    --color-item-active: rgb(237, 237, 237);
    
    --color-icon-secondary: rgb(112, 117, 121);
    
    --pattern-color: #c3bfc5a6;
  
    --color-background-compact-menu: rgb(255, 255, 255, 0.733);
    --color-background-compact-menu-hover: rgb(0, 0, 0, 0.067);
    
    --color-border: rgb(244, 244, 245);
    --color-borders-input: rgb(218, 220, 224);

    --color-search-border: #3390ec;

    --image-grayscale: 0;
    --image-opacity: 100%;
  }
  &.dark-mode {
    --color-text: #f5f5f5;
    --color-text-secondary: rgb(170, 170, 170);
    --color-text-secondary-rgb: 170, 170, 170;
    --color-text-button: var(--color-text);
    --color-background: #050709;
    --color-interactive-element-hover: rgba(var(--color-text-secondary-rgb), 0.08);
    --theme-background-color-down-right: #172431;
    --theme-background-color-down-left: #0E141A;
    --theme-background-color-top-left: #0F171E;
    --theme-background-color-top-right: #141C2B;
    
    --accent-color: #56a2c9;
    --accent-color-shade: #447f9c;

    --color-chat-wallpaper-1: linear-gradient(90deg, #49175d, #1c1042, #202656, #262b64);;
    --color-chat-wallpaper-2:linear-gradient(90deg, #3e1f3f, #562a48, #947358);
    --chat-wallpaper-bg: url("/assets/bg-dark.png");
    
    --color-background: #192b35;
    --color-background-secondary: #24343e;
    --color-background-secondary-accent: #22313a;
    --color-chat-hover: #2c2c2c;

    --color-default-shadow: rgb(16, 16, 16, 0.612);
    
    --color-chat-active: #2d637c;
    --color-chat-hover: #25353f;
    
    --color-icon-secondary:  rgb(170, 170, 170);
    --pattern-color: #2d394ecc
    
    --color-background-compact-menu: rgb(33, 33, 33, 0.867);
    --color-background-compact-menu-hover: rgb(0, 0, 0, 0.4);
 
    --color-border: #25353f;
    --color-borders-input: var(--color-text-secondary);

    --color-search-border: #7644CB;
    
    --image-grayscale: 10%;
    --image-opacity: 90%;
  }

  
  --color-background-own-1: #6573F8;
  --color-background-own-2: #7644CB;
  --color-background-own-3: #8849B4;
  --color-background-own-4: #A751A8;
  
  --color-reply-own: #f5f5f52e;
  
  --color-peer-2: #a695e7;
  --color-peer-bg-2: #a695e71a;
  --color-peer-bg-active-2: #a695e72b;
  
  --color-peer-3: #7bc862;
  --color-peer-bg-3: #7bc8621a;
  --color-peer-bg-active-3: #7bc8622b;
  
  --color-peer-4: #6ec9cb;
  --color-peer-bg-4: #6ec9cb1a;
  --color-peer-bg-active-4: #6ec9cb2b;
  
  --color-peer-5: #65aadd;
  --color-peer-bg-5: #65aadd1a;
  --color-peer-bg-active-5: #65aadd2b;

  --color-peer-6: #ee7aae;
  --color-peer-bg-6: #ee7aae1a;
  --color-peer-bg-active-6: #ee7aae2b;
  
  --backdrop-filter: 10px;
  
  --border-radius-modal: 1rem;
  --border-radius-default: 0.75rem;
  --border-radius-default-small: 0.625rem;
  --border-radius-default-tiny: 0.375rem;
  --border-radius-searchbar: 1.4rem;
  --border-radius-messages: 0.9375rem;
  --border-radius-messages-small: 0.375rem;
  --border-radius-forum-avatar: 25%;
  --border-radius-circle: 50%;
  
  --color-borders-input: rgb(218, 220, 224);

  --color-error: #e53935;
  --color-success: rgb(0, 199, 62);

  font-size: 16px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--color-text);
  -webkit-box-shadow: 0 0 0px 1000px var(--color-background) inset;
  transition: background-color 5000s ease-in-out 0s;
  caret-color: var(--color-text)
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  transition: background-color 0.3s, border 0.3s;

  user-select: none;
  user-drag: none;
  app-region: no-drag;
}

body {
  font-family: "Poppins", sans-serif;

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

input,
textarea,
select {
  background-color: inherit;
}

button {  
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}
`;

export default GlobalStyles;

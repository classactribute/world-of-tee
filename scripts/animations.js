import { getDirection } from './gameData.js';
import { getSceneContext } from './sceneUtils.js';

// Typewriter effect for navText
export function animateText(text, {
    state,
    skipButton,
    skipAllBtn,
    navText,
    onTypingComplete,
    intervalIdRef
  }) {
    const direction = getDirection[state.currentLocation];
    const currentSubNav = document.querySelector(`.${direction}-subsection-textbox`);
    const allSubNavs = document.querySelectorAll(`.subsection-textbox`);
    const textLength = text.length;

    if (skipButton) skipButton.style.visibility = "visible";
    if (skipAllBtn) skipAllBtn.style.visibility = "visible";

    allSubNavs.forEach(el => el.textContent = "");
    navText.textContent = "";

    let i = 0;

    if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    }

    intervalIdRef.current = setInterval(() => {
        if ( i === textLength ) {
            clearInterval(intervalIdRef.current);
            onTypingComplete();
        } else {
            navText.textContent += text[i];
            if (currentSubNav) currentSubNav.textContent += text[i];
            i++;
        }  
    }, 20)
    
}
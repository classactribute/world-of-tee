import { skipAnimation } from './territoryNavigator.js';
import { sceneSetter } from './script.js';

export function setupSkipButtons({ 
    state,
    intervalIdRef,
    navText,
    skipButton,
    skipAllBtn, 
    setScene,
    onTypingComplete
}) {
  
    if (!skipButton || !skipAllBtn) return;
  
    skipButton.addEventListener("click", () => {
        skipAnimation({
            state,
            intervalIdRef,
            navText,
            skipButton,
            onTypingComplete
        });
    });
  
    skipAllBtn.addEventListener("click", () => {
      console.log("skip all animation: ", state.currentLocation);
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      sceneSetter("world1");
      sceneSetter("world2");
      skipAnimation({
        state,
        intervalIdRef,
        navText,
        skipButton,
        onTypingComplete
      });
      skipAllBtn.style.display = "none";
    });
}
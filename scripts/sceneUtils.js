import { state } from './territoryNavigator.js';
import { onTypingComplete } from './script.js';
import { animateText } from './animations.js';

export function getSceneContext(intervalIdRef) {
    return {
        state,
        intervalIdRef,
        navText: document.querySelector(".text-nav"),
        openMapButton: document.getElementById("open-button"),
        mapContainer: document.querySelector(".map-container"),
        moreButton: document.getElementById("more-button"),
        skipButton: document.getElementById("skip-button"),
        onTypingComplete,
        animateText
    };
}
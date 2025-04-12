// --- HUD THEME UTILS ---
export function clearHUDThemes() {
    document.body.classList.remove("theme-north", "theme-east", "theme-south", "theme-west");
}

export function updateHUDTheme(territory) {
    clearHUDThemes();
    document.body.classList.add(`theme-${territory}`);
}
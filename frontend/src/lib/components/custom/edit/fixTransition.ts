import { CustomElement } from "$lib/models/constants/customElement";
import type { GridContentItem } from "$lib/models/types/overlay";

export function fixCharacterTransition(item: GridContentItem): GridContentItem {
    const newItem = { ...item };
    if (
        [
            CustomElement.InGameCurrentPlayerCharacterIcon,
            CustomElement.InGameCurrentPlayerCharacterRender,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions['Current Player Character Change'] = true;
    }
    if (
        [
            CustomElement.InGamePlayer1CharacterIcon,
            CustomElement.InGamePlayer1CharacterRender,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions['Player1 Character Change'] = true;
    }
    if (
        [
            CustomElement.InGamePlayer2CharacterIcon,
            CustomElement.InGamePlayer2CharacterRender,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions['Player2 Character Change'] = true;
    }
    return newItem;
}
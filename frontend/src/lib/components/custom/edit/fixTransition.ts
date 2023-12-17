import { CustomElement } from "$lib/models/constants/customElement";
import { AnimationTrigger } from "$lib/models/types/animationOption";
import type { GridContentItem } from "$lib/models/types/overlay";

export function fixTransition(item: GridContentItem) {
    let newItem: GridContentItem = { ...item }
    newItem = fixCharacterTransition(newItem)
    newItem = fixRatingDifference(newItem)
    return newItem
}

const fixCharacterTransition = (item: GridContentItem): GridContentItem => {
    const newItem = { ...item };
    if (
        [
            CustomElement.MatchBestOf,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.MatchBestOfChange] = true;
    }
    if (
        [
            CustomElement.MatchGameMode,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.MatchGameModeChange] = true;
    }
    if (
        [
            CustomElement.MatchPlayer1Tag,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.MatchPlayer1TagChange] = true;
    }
    if (
        [
            CustomElement.MatchPlayer2Tag,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.MatchPlayer2TagChange] = true;
    }
    if (
        [
            CustomElement.CurrentSetGameRecentPlayer1Score,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.MatchPlayer1ScoreChange] = true;
    }
    if (
        [
            CustomElement.CurrentSetGameRecentPlayer1Score,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.MatchPlayer2ScoreChange] = true;
    }
    if (
        [
            CustomElement.InGameCurrentPlayerCharacterIcon,
            CustomElement.InGameCurrentPlayerCharacterRender,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.InGameCurrentPlayerCharacterChange] = true;
    }
    if (
        [
            CustomElement.InGamePlayer1CharacterIcon,
            CustomElement.InGamePlayer1CharacterRender,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.InGamePlayer1CharacterChange] = true;
    }
    if (
        [
            CustomElement.InGamePlayer2CharacterIcon,
            CustomElement.InGamePlayer2CharacterRender,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.InGamePlayer2CharacterChange] = true;
    }
    return newItem;
}

const fixRatingDifference = (item: GridContentItem) => {
    const newItem = { ...item };
    if (
        [
            CustomElement.SlippiRankChangeRatingDifference,
        ].includes(item.elementId)
    ) {
        newItem.data.animationTrigger.selectedOptions[AnimationTrigger.RankStatsRatingChange] = true;
    }

    return newItem
}
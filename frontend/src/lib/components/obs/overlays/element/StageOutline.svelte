<script lang="ts">
	import { Stage } from "$lib/models/constants/stageData";
	import Battlefield from "./inGame/PlayerRadarStages/Battlefield.svelte";

    export let stageId: number;
</script>

{#if stageId === Stage.BATTLEFIELD}
    <Battlefield />
{/if}
{#if stageId === Stage.DREAMLAND}
    <Battlefield />
    {/if}
{#if stageId === Stage.FINAL_DESTINATION}
    <Battlefield />
{/if}
{#if stageId === Stage.FOUNTAIN_OF_DREAMS}
    <Battlefield />
{/if}
{#if stageId === Stage.POKEMON_STADIUM}
    <Battlefield />
{/if}
{#if stageId === Stage.YOSHIS_STORY}
    <Battlefield />
{/if}
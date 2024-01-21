<script lang="ts">
	import { getOffStageZone } from "$lib/utils/gamePredicates";
	import Grid from "./Grid.svelte";


    const mainStage = [
        "-68.4, 0",
        " 68.4, 0",
        "65, -6",
        "36, -19",
        "39, -21",
        "33, -25",
        "30, -29",
        "29, -35",
        "10, -40",
        "10, -30",
        "-10, -30",
        "-10, -40",
        "-29, -35",
        "-30, -29",
        "-33, -25",
        "-39, -21",
        "-36, -19",
        "-65, -6",
        "-68.4, 0",
    ];

    const platforms = [
        ["-57.6, 27.2", "-20, 27.2"],
        ["20, 27.2", "57.6, 27.2"],
        ["-18.8, 54.4", "18.8, 54.4"],
    ];

    const blastZones = [
        [-224, -108.8],
        [224, 200],
    ];

    const offStageZone = getOffStageZone(blastZones);

</script>


<polyline points={mainStage.join(" ")} />
{#each platforms as platform}
    <polyline points={platform.join(" ")}  />
{/each}
<rect
    x={blastZones[0][0]}
    y={blastZones[0][1]}
    width={blastZones[1][0] - blastZones[0][0]}
    height={blastZones[1][1] - blastZones[0][1]}
/>
<rect
class="opacity-50"
    x={offStageZone[0][0]}
    y={offStageZone[0][1]}
    width={offStageZone[1][0] - offStageZone[0][0]}
    height={offStageZone[1][1] - offStageZone[0][1]}
/>


<script lang="ts">
	import { ASSISTANT_INSTRUCTIONS } from '$lib/content/assistantInstructions';

	// Copy the Froggi instructions for the user's own AI app (project / custom instructions).
	export let cls = 'btn text-xs h-8 px-4 border-secondary rounded';
	let copied = false;
	const copy = async () => {
		await navigator.clipboard.writeText(ASSISTANT_INSTRUCTIONS);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	};
</script>

<button class={cls} on:click={copy}>{copied ? 'Copied!' : 'Copy AI instructions'}</button>

<script lang="ts">
	import { stringify } from 'postcss';
	import { createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	export let open = false;
	export { _class as class };
	let _class: string;
	const dispatch = createEventDispatcher();

	function handleCloseClick() {
		dispatch('close');
	}

	function clickOutside(node: any) {
		const handleClick = (event: any) => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('click_outside', node));
			}
		};
		document.addEventListener('click', handleClick, true);
	}

	function modalAction(node: any) {
		let fns = [];
		if (document.body.style.overflow !== 'hidden') {
			const original = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			fns = [...fns, () => (document.body.style.overflow = original)];
		}
		return {
			destroy: () => fns.map((fn) => fn()),
		};
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') handleCloseClick();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<div use:modalAction transition:fade={{ duration: 200 }} class="w-screen h-screen z-50">
		<section class="w-full h-full">
			<aside
				in:fly={{ duration: 200, y: 100 }}
				out:fade={{ duration: 200 }}
				use:clickOutside
				on:click_outside={handleCloseClick}
				class={`${_class}`}
			>
				<slot />
			</aside>
		</section>
	</div>
{/if}

<style>
	section {
		height: 100%;
		display: grid;
		place-items: center;
	}
	aside {
		background-color: white;
	}
	div {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
</style>

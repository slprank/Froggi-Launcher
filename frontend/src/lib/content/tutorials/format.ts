/** **bold**, *italic*, `code` and [links](/path) → safe HTML (the text is escaped first). */
export function formatInline(text: string): string {
	const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	return escaped
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		// Only in-app paths or https links — never javascript: or other schemes.
		.replace(/\[([^\]]+)\]\((\/[^)\s]*|https:\/\/[^)\s]+)\)/g, '<a class="t-link" href="$2">$1</a>')
		.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
		.replace(/\*([^*]+)\*/g, '<i>$1</i>');
}

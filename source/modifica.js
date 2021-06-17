
(async () => {
	await Mavo.inited;
	await Mavo.all[0].dataLoaded;

	setTimeout(() => {
		document.documentElement.classList.remove('loading');
		const sections = document.querySelectorAll('details.section');
		const openSections = document.querySelectorAll('details.section[open]');
		if (openSections.length === sections.length) {
			openSections.forEach(section => {
				section.open = false;
			});
		}
	})
})()

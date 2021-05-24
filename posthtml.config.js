function cleanURLs(json) {
	for (const section of json.Sezione) {
		for (const dish of section.Piatto || section.Bevanda) {
			if (dish.Foto) {
				dish.Foto = dish.Foto.replace(/^.*[a-f0-9]{40}\/source\//, '');
			}
		}
	}
	return json;
}

module.exports = {
	"plugins": {
		"posthtml-expressions": {
			"locals": {
				cibo: cleanURLs(require('./cibo.json')),
				bevande: cleanURLs(require('./bevande.json'))
			}
		},
		"posthtml-img-autosize": {
			"processEmptySize": true,
			"root": "source"
		}
	}
}

const cibo = require('./cibo.json');
const bevande = require('./bevande.json');
cibo.Sezione = [...cibo.Sezione, ...bevande.Sezione];

module.exports = {
  locals: {
		lista: cibo,
		slugify: text => text.replace(/[^a-z]/gi, '').toLowerCase(),
		relativizeCDNURL: url => url.replace(/^.*[a-f0-9]{40}\/source\//, ''),
		lineBreakToBr: text => text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')
  }
};

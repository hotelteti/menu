module.exports = {
  locals: {
		cibo: require('./cibo.json'),
		bevande: require('./bevande.json'),
		relativizeCDNURL: url => url.replace(/^.*[a-f0-9]{40}\/source\//, ''),
		lineBreakToBr: text => text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')
  }
};

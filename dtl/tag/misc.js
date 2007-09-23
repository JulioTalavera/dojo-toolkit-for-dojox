dojo.provide("dojox.dtl.tag.misc");

dojo.require("dojox.dtl._base");

dojox.dtl.tag.misc.commentNode = new function(){
	this.render = this.unrender = function(context, buffer){ return buffer; };
	this.clone = function(){ return this; };
	this.toString = function(){ return "dojox.dtl.tag.misc.CommentNode"; };
}

dojox.dtl.tag.misc.DebugNode = function(TextNode){
	this._TextNode = TextNode;
}
dojo.extend(dojox.dtl.tag.misc.DebugNode, {
	render: function(context, buffer){
		var keys = context.getKeys();
		var debug = "";
		for(var i = 0, key; key = keys[i]; i++){
			console.debug("DEBUG", key, ":", context[key]);
			debug += key + ": " + dojo.toJson(context[key]) + "\n\n";
		}
		return new this._TextNode(debug).render(context, buffer);
	},
	unrender: function(context, buffer){
		return buffer;
	},
	clone: function(buffer){
		return new this.constructor(this._TextNode);
	},
	toString: function(){ return "dojox.dtl.tag.misc.DebugNode"; }
});

dojox.dtl.tag.misc.comment = function(parser, text){
	// summary: Ignore everything between {% comment %} and {% endcomment %}
	parser.skipPast("endcomment");
	return dojox.dtl.tag.misc.commentNode;
}

dojox.dtl.tag.misc.debug = function(parser, text){
	// summary: Output the current context, maybe add more stuff later.
	return new dojox.dtl.tag.misc.DebugNode(parser.getTextNode());
}
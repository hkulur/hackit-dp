
var pickFrom = '';
var dropTo = '';
var findVal = function(object, key, op, val) {
    var value;
    Object.keys(object).some(function(k) {
        if (k === key) {
            if (op === 'set') {
            	object[k] = {"compName" : val};
            } else object[k] = null;
            return object;
        }
        if (object[k] && typeof object[k] === 'object') {
            object[k] = findVal(object[k], key, op, val);
        }
    });
    return object;
}
var buildTree = function(node) {
    if (node && node.hasChildNodes() && node.dataset && node.dataset.compname) {
        var children = [];
        for (var j = 0; j < node.childNodes.length; j++) {
            var theChild = buildTree(node.childNodes[j], {});
            if(theChild)
            children.push(theChild);
        }
        if(children.length)
            return {
                component: (node.dataset && node.dataset.compname),
                child: children,
                data: {}
            };
        else return {
            component: (node.dataset && node.dataset.compname),
            data: {}
        };
    }
    if (node && node.dataset && node.dataset.compname) {
    	return {
        	component: (node.dataset && node.dataset.compname),
        	data: {}
        };
    }
    return null;
}
var l  = {
	_UI_TREE: {rounter: {div3:'', div1: null}},
	allowDrop: function(ev) {
	    ev.preventDefault();
	},
	drag : function(ev) {
	    ev.dataTransfer.setData("text", ev.target.id);
	    pickFrom = ev.target.parentElement.id;
	    this._UI_TREE = findVal(this._UI_TREE, pickFrom, 'remove', null);
	},
	drop : function(ev) {
	    ev.preventDefault();
	    var data = ev.dataTransfer.getData("text");
	    dropTo = ev.target.id;
	    this._UI_TREE = findVal(this._UI_TREE, dropTo, 'set', data);
	    console.log(this._UI_TREE);
	   	const newChild = document.getElementById(data).cloneNode(true);
	   	newChild.id = Math.random();
        newChild.addEventListener('dragstart', this.drag, false);
        newChild.setAttribute('tobecloned', this.drag, false);
	    ev.target.appendChild(newChild);
	},
	buildTree: function() {
		const Tree = buildTree(document.getElementById('_root'));
        document.getElementById('the-tree-json').innerHTML = JSON.stringify(Tree, undefined, 2);
        window.tree = Tree;
	}
};
export default l;

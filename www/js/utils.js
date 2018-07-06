
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
	_UI_TREE: {"index": {'meta_data': { 'title': 'A default Index Page'}}},
    _UI_THUMB_TREE: {"index": ''},
	allowDrop: function(ev) {
	    ev.preventDefault();
	},
	drag : function(ev) {
	    ev.dataTransfer.setData("text", ev.target.id);
	    pickFrom = ev.target.parentElement.id;
	    this._UI_TREE = findVal(this._UI_TREE, pickFrom, 'remove', null);
	},
    addAPage: function(pageName, pTitle) {
        this._UI_TREE[pageName]={'meta_data':{ 'title': pTitle}};
        const currentPage = document.getElementById('_root').getAttribute('data-compname');
        this._UI_THUMB_TREE[currentPage] = document.getElementById('_root').innerHTML;
        document.getElementById('_root').setAttribute('data-compname', pageName);
        document.getElementById('_root').innerHTML = this._UI_THUMB_TREE[pageName] || '';
        var compList = document.querySelector('#site-tree'); // Using a class instead, see note below.
        compList.classList.toggle('show');
    },
    clickForDrag : function(ev) {
        var idx = ev.currentTarget.dataset.forcomp;
        var newChild = document.getElementById(idx).cloneNode(true);
        var selectedOne = document.getElementById('selected-one');
        newChild.dataset.noclone = 'true';
        selectedOne.innerHTML = '';
        newChild.id = Math.random();
        newChild.addEventListener('dragstart', this.drag, false);
        newChild.setAttribute('tobecloned', this.drag, false);
        newChild.setAttribute('draggable', 'true');
        selectedOne.appendChild(newChild);
        var compList = document.querySelector('#comp-list'); // Using a class instead, see note below.
        compList.classList.toggle('show');
    },
	drop : function(ev) {
	    ev.preventDefault();
	    var data = ev.dataTransfer.getData("text");
	    dropTo = ev.target.id;
	    this._UI_TREE = findVal(this._UI_TREE, dropTo, 'set', data);
	    console.log(this._UI_TREE);
	   	const originalChild = document.getElementById(data);
        var newChild = {};
        if (originalChild.dataset.noclone === 'true') {
            newChild = originalChild;
        } else {
            newChild = originalChild.cloneNode(true);
        }
	   	newChild.id = Math.random();
        newChild.dataset.noclone = 'true';
        newChild.addEventListener('dragstart', this.drag, false);
        newChild.setAttribute('tobecloned', this.drag, false);
	    ev.target.appendChild(newChild);
        const currentPage = document.getElementById('_root').getAttribute('data-compname');
        this._UI_THUMB_TREE[currentPage] = document.getElementById('_root').innerHTML;
	},
	buildTree: function() {
		const Tree = buildTree(document.getElementById('_root'));
        const pageName = document.getElementById('_root').getAttribute('data-compname');
        this._UI_TREE[pageName] = Tree;
        document.getElementById('the-tree-json').innerHTML = JSON.stringify(this._UI_TREE, undefined, 2);
        window.tree = this._UI_TREE;
        window.treeThumb = this._UI_THUMB_TREE;
	}
};
export default l;

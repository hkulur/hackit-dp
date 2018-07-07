
var pickFrom = '';
var dropTo = '';
document.onload = function(e) {
    var addAssets = document.querySelectorAll(".add-assets");
    console.log('ola');
    for (var i = 0; i < addAssets.length; i++) {
        addAssets[i].addEventListener('click', function() {
            document.getElementById('v-directory').classList.toggle('show');
        });
    }
}
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
	_UI_TREE: {
        "index-page": {
            'meta_data':{
                'title': 'A default Index Page'
            }
        },
        "ADDRESS": {
            'meta_data': {
                'title': 'A default Index Page'
            }
        }
    },
    _UI_THUMB_TREE: {"index": ''},
	allowDrop: function(ev) {
	    ev.preventDefault();
	},
	drag : function(ev) {
	    ev.dataTransfer.setData("text", ev.target.id);
	    pickFrom = ev.target.parentElement.id;
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
        newChild.addEventListener('dragstart', this.drag);
        newChild.setAttribute('tobecloned', this.drag);
        newChild.setAttribute('draggable', 'true');
        selectedOne.appendChild(newChild);
        var compList = document.querySelector('#comp-list'); // Using a class instead, see note below.
        compList.classList.toggle('show');
        var addAssets = document.querySelectorAll(".add-assets");
        for (var i = 0; i < addAssets.length; i++) {
            addAssets[i].addEventListener('click', function() {
                document.getElementById('v-directory').classList.toggle('show');
            });
        }
    },
	drop : function(ev) {
	    ev.preventDefault();
	    var data = ev.dataTransfer.getData("text");
	    dropTo = ev.target.id;
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
    connectedToDataStore : function(ev) {
        const dataClaster = document.getElementById(ev.target.id);
        const connectorLine = document.getElementById(ev.dataTransfer.getData("text") + '-line');
        const pageName = connectorLine.dataset.pagename;
        const reqWidth = dataClaster.getBoundingClientRect().x -  connectorLine.getBoundingClientRect().x - dataClaster.dataset.linepos - 18;
        connectorLine.style.width = reqWidth + 'px';
        this._UI_TREE[pageName].data = dataClaster.dataset.storename;
        document.getElementById('the-tree-json').innerHTML = JSON.stringify(this._UI_TREE, undefined, 2);
        window.tree = this._UI_TREE;
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

//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
	console.log('Create element called for', node)
	// create the element and return it to the caller
	// the node might have event listeners that need to be registered
	// the node might have children that need to be created as well
    
    
    var el = document.createElement(node.tag);
    for (var p in node.props) {
        if (typeof node.props[p] === 'function') {
            //el.setAttribute(p, node.props[p])
            if (p.slice(0, 2) == 'on') {
                el.addEventListener(p.slice(2).toLowerCase(), node.props[p]);
            }
        } else {
            el[p] = node.props[p];
        }
    }

    if (node.children) {
        if (typeof node.children[0] === 'object') {
            node.children.forEach(function(child) {
                el.appendChild(createElement(child));
            })
        } else {
            el.innerHTML = node.children;
        }
    }

    return el;
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        console.log('!oldNode');
        parent.appendChild(createElement(newNode))
    } else if (!newNode && oldNode) {
        parent.removeChild(oldNode);
    } else {
        console.log('else');

        if (changed(newNode, oldNode)) {
            parent.replaceChild(createElement(newNode), createElement(oldNode));
        } 

        if (newNode.children && oldNode.children) {
            if (newNode.children.length < oldNode.children.length) {
                for (var i = 0; i < oldNode.children.length; i++) {
                    updateElement(createElement(newNode), newNode.children[i], oldNode.children[i], i);
                }
            } else {
                for (var i = 0; i < newNode.children.length; i++) {
                    updateElement(createElement(newNode), newNode.children[i], oldNode.children[i], i);
                }
            }
        }


    	// you can use my changed(node1, node2) method above
    	// to determine if an element has changed or not

    	// be sure to also update the children!
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
    console.log('requestAnimationFrame');
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

update();

})(window);

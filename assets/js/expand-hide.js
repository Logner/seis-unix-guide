var containers = document.getElementsByClassName('topic-container');
var bulletPts = [];
var bulletPtClicked = [];
console.log(containers)

var expandChildrenLists = function(link) {
    ul = link.querySelector('ul');

    b = link.querySelector('.expand-hide');
    if (b.textContent == '+') {
        ul.removeAttribute('style');
        ul.setAttribute('style', 'display:block')
    }
    else {
        ul.removeAttribute('style')
        ul.setAttribute('style', 'display:none')
    }

}

var expandLogic = function () {
    targetEl = event.target;
    parentEl = targetEl.parentElement

    if (targetEl.textContent == '+') {
        expandChildrenLists(parentEl);
        targetEl.textContent = '-';
    }
    else {
        expandChildrenLists(parentEl);
        targetEl.textContent = '+';
    };
    
}

var primaryListLogic = function (primaryListEl) {
    console.log(primaryListEl);
    // direct children of the primaryListEl
    var links = primaryListEl.children
        
    // attach expand logic to each link
    for (var k=0; k < links.length; k++) {
        // adding each direct children of a primary list for expand-all logic
        if (links[k].querySelector('ul')) {

        // setting the id for individualizing.
        links[k].id = counter;
        counter ++;

        // for expand-all button
        bulletPts += links[k];

        // start collapsed
        links[k].innerHTML = '<button class="expand-hide">+</button>'+links[k].innerHTML;
        links[k].querySelector('ul').setAttribute('style','display:none;')

        // adding expand logic
        links[k].querySelector('.expand-hide').addEventListener('click', expandLogic);
        }
        else {
            links[k].innerHTML = '<b>•</b>'+links[k].innerHTML;
        }
    }
}

var counter = 0;
for (var i=0; i<containers.length; i++) {
    // primary lists
    var list = containers[i].getElementsByClassName('primary-list');
    console.log(list)

    // if list is not empty, add expander logic to it's children
    if (list) {
        console.log(list[j])
        for (var j=0; j<list.length; j++) {
            primaryListLogic(list[j])
        }
        
    }
}
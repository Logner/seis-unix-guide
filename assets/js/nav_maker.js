var pages = ['0_Introduction', '1_Windows-prerequisites', '2_Installing-SeisUnix', 
            '3_SeisUnix', '4_Sample-workflow', '5_Sample-data'];
var header = document.querySelector('header');
var headerTitleHTML = "A <a href=index.html>Seismic Unix Guide</a>\
                        made by <a href='https://cresrc.ca'>CRESRC"

var generateNavbarList = function() {
    container = document.createElement('ul');
    container.className = 'nav-container';
    for (i=0; i < pages.length; i++) {
        text=pages[i];
        readableText = text.replace('-',' ').replace('_',' - ');
        
        li = document.createElement('li');
        li.className = 'nav-item'

        link = document.createElement('a');
        link.setAttribute('href', 'assets/steps/'+text+'.html');
        link.textContent = readableText;

        li.appendChild(link)
        container.appendChild(li);
    }

    return container;
}


var populateHeader = function () {
    var title = document.createElement('h1')
    var navbar = document.createElement('nav');

    title.className = 'header-item';
    navbar.classname = 'header-item';

    title.innerHTML = headerTitleHTML;
    navbar.innerHTML = "<a href='/index.html'><h2>Index</h2></a>"

    var links = generateNavbarList();

    navbar.appendChild(links);
    header.appendChild(title);
    header.appendChild(navbar);
}


populateHeader();

var TableBody = document.getElementById("TableBody");

var siteContainer = [];

var searchInput = document.getElementById("searchInput");

if (localStorage.getItem("sitees") != null) {
    siteContainer = JSON.parse(localStorage.getItem("sitees"));
    displaysite();
}

var siteNameInput = document.getElementById("siteNameInput");
var siteurlInput = document.getElementById("siteurlInput");  
var addUpdateBtn = document.getElementById("addUpdateBtn");

var mainIndex = 0;

var inAddMode = true;

function addUpdatesite() {
    var siteName = siteNameInput.value.trim(); 
    var siteurl = siteurlInput.value.trim(); 

    if (siteName === "") {
        alert("Enter the website name");  
        return;
    }

    if (!isValidUrl(siteurl)) {
        alert('Enter a valid URL');
        return;  
    }

    
    var site = {
        name: siteName,
        url: siteurl, 
    };

    if (inAddMode) {
        addsite(site);
    } else {
        updatesite(site);
    }

    localStorage.setItem("sitees", JSON.stringify(siteContainer));

    displaysite();

    clear();
}

function addsite(site) {
    siteContainer.push(site);
}

function updatesite(site) {
    siteContainer.splice(mainIndex, 1, site);
    addUpdateBtn.innerHTML = "Add site";
    inAddMode = true;
}

function displaysite() {
    var searchTerm = searchInput.value.trim();
    var cartoona = "";

    for (var i = 0; i < siteContainer.length; i++) {
        if (siteContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
            cartoona += `
            <tr>
                <td>${i + 1}</td>
                <td>${siteContainer[i].name}</td>
                <td>  
                    <button onclick="visitWebsite(${i})" class="btn btn-outline-primary px-3">Visit</button>  
                </td>  
                <td>
                     <button onclick="patchValues(${i})" class="btn btn-outline-success"> Update</button>
                </td>
                <td>
                    <button onclick="deletesite(${i})" class="btn btn-outline-danger"> Delete</button>
                </td>
            </tr>
            `;
        }
    }
    TableBody.innerHTML = cartoona;
}

function visitWebsite(index) {
    var url = siteContainer[index].url.trim();  

    if (url && isValidUrl(url)) {
        window.open(url, '_blank');  
    } 
}

function isValidUrl(url) {
    var regex = /^(https?:\/\/)/;
    return regex.test(url);
}

function clear() {
    siteNameInput.value = "";
    siteurlInput.value = "";
}

function deletesite(siteIndex) {
    siteContainer.splice(siteIndex, 1);
    localStorage.setItem("sitees", JSON.stringify(siteContainer));
    displaysite();
}

function patchValues(siteIndex) {
    mainIndex = siteIndex;
    var site = siteContainer[siteIndex];
    siteNameInput.value = site.name;
    siteurlInput.value = site.url; 
    addUpdateBtn.innerHTML = "Update site";
    inAddMode = false;
}
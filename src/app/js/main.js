Array.prototype.sample = function() {
    return this[Math.floor(Math.random() * this.length)];
};

function navbarMenu() {
    const navbarMenuButton = document.getElementById("navbar-menu-button");
    const navbarMenuMobile = document.getElementById("navbar-menu-mobile");

    navbarMenuButton.addEventListener("click", () => {
        navbarMenuMobile.classList.toggle("hidden");
    });
}

function toSearchPage(collapse) {
    const searchBox = collapse ?
        document.getElementById("searchC") :
        document.getElementById("search");
    if (searchBox.value === "") {
        return;
    }
    const param={
        q: searchBox.value
    }
    window.open("/search?"+new URLSearchParams(param).toString(), "_blank");
}

function initSearchBox() {

    const searchC = document.getElementById("searchC");
    const search = document.getElementById("search");

    search.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            toSearchPage(false);
        }
    });


    searchC.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            toSearchPage(true);
        }
    });

}
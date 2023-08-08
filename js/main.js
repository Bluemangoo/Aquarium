function navbarMenu() {
    const navbarMenuButton = document.getElementById("navbar-menu-button");
    const navbarMenuMobile = document.getElementById("navbar-menu-mobile");

    navbarMenuButton.addEventListener("click", () => {
        navbarMenuMobile.classList.toggle("hidden");
    });
}

function search(){

}
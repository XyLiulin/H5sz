function $id(id) {
    return document.getElementById("id");
}

function getClass(className) {
    return document.getElementsByClassName(className);
}

function getScroll() {
    return document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
}
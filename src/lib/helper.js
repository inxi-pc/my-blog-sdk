function isNullOrEmpty(value) {
    // null or undefined
    if (value == undefined || value == null) {
        return true;
    }

    // empty
    if (Object.prototype.toString.call(value) == '[object String]') {
        if (value.length <= 0) {
            return true;
        }
    }

    return false;
}

function gotoModule(moduleName) {
    window.location.href = '/' + moduleName + '.html';
}

function refreshPage() {
    window.location.reload();
}

export { isNullOrEmpty, gotoModule, refreshPage }

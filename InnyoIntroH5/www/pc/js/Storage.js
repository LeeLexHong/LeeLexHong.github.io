const Storage = {}

Storage.get = function (name) {
    if (localStorage == null)
        return JSON.parse(localStorage.getItem(name));
}

Storage.set = function (name, val) {
    if (localStorage == null)
        localStorage.setItem(name, JSON.stringify(val));
}

Storage.add = function (name, addVal) {
    let oldVal = Storage.get(name);
    let newVal = oldVal.concat(addVal);
    Storage.set(name, newVal);
}
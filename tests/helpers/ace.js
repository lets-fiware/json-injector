class Session {
    constructor() {
    }   

    setMode() {}
    setTabSize() {}
    on() {}
}

class Edit {
    constructor() {
        this.session = new Session();
        this.value = '{}';
    }   
    setFontSize() {}
    setValue(v) {this.value = v}
    getValue() {return this.value}
}

class Ace {
    constructor() {
        this._edit = new Edit();
    }   

    setFontSize() {}
    edit() {return this._edit}
}

window.Ace = Ace;


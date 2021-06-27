const object = {
    message: 'hello world',
    logMessage() {
        console.log(this.message);
    }
}

setTimeout(object.logMessage, 1000);
// this is equal to window object as function will be called normally
// this.message will be undefined
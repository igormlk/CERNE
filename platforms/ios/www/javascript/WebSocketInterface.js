function WebSocketInterface(element, callback, failToConnect, canal) {
    this.element = element;
    this.callback = callback;
    this.failToConnect = failToConnect;
    this.open = false;
    this.websocket;

    this.conectar = function() {
        this.websocket = new WebSocket("ws://" + canal);
        if (this.websocket != undefined) {
            this.websocket.onmessage = function(response) {
                console.log("MENSAGERIA " + response);
                callback(JSON.parse(response.data));
            };

            this.websocket.onopen = function(event) {
                console.log("MENSAGERIA " + event);
            };

            this.websocket.onclose = function(event) {
                console.log("MENSAGERIA " + event.code);
                failToConnect();
            };

            this.websocket.onerror = function(event) {
                console.log("MENSAGERIA " + event.code);
            };
        }
   };
   this.isOpen = function() {
       return this.websocket != undefined && this.websocket.readyState == this.websocket.OPEN;
   };
}

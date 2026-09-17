module.exports = {

    // handler should return { body, type, code }  ||  body can be "<g>" (ghosting) for no response
    handle(res,handler) {

        if(handler == undefined || typeof handler !== "function") console.error("server:handle > parameter 'handler' is undefined or wrong type");

        const ret = handler();
        
        const body = (typeof ret === "string" ? ret : ret.body) ?? (ret.code ?? "[No value was returned]");
        const code = ret.code ?? 200;
        const type = ret.type ?? "text/plain";

        if(body === "<g>") return;
        
        const headers = {
            "Content-Type": type
        };

        res.writeHead(code,headers);
        res.end(body);

    }

}
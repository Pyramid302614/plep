module.exports = {

    // handler should return { body, type, code }  ||  body can be "<g>" (ghosting) for no response
    async handle(req,res,handler) {

        if(handler == undefined || typeof handler !== "function") console.error("server:handle > parameter 'handler' is undefined or wrong type");

        const args = [];
        if(req.url.includes("?")) req.url.slice(req.url.split("?")[0].length+1).split("&").forEach(i => args[i.split("=")[0]] = i.slice(i.split("=")[0].length+1));
        const ret = await handler(
            req.url.split("?")[0].slice(1),
            args
        );
        
        var body = 
            (typeof ret === "string" ?
                ret :
                ret?.body
            ) ?? (
                (ret?.code?.toString?.()) ??
                "[No value was returned]"
            )
        var code = ret?.code ?? 200;
        var type = ret?.type ?? "text/plain";

        if(ret?.file !== null && ret?.file !== undefined) {
            if(require("fs").existsSync(ret?.file)) {
                body = require("fs").readFileSync(ret?.file);
            } else {
                body = "Cannot find file: " + ret?.file
                code = 404;
            }
        }

        if(body === "<g>") return;
        
        const headers = {
            "Content-Type": type
        };

        res.writeHead(code,headers);
        res.end(body);

    }

}
type Methods = "GET"|"POST"|"PUT"|"PATCH"|"DELETE"

export default abstract class Api {
    public static baseUrl = "http://127.0.0.1:3000"

    private static async makeRequest (url = "", method : Methods = "GET", payload? : any) {
        let res = await fetch(this.baseUrl + url, {
            method : method,
            body : payload ? JSON.stringify(payload) : undefined
        })
        
        let json = await res.json()
        return json
    }

    private static createQueryString (query? : Object) {
        if (!query) {
            return ""
        }

        let values = []
        for (let [key, value] of Object.entries(query)) {
            values.push(`${key}=${value}`)
        }

        return values ? "?" + values.join("&") : ""
    }

    public static async get (url : string, query? : Object) {
        return await this.makeRequest(url + this.createQueryString(query), "GET")
    }
}
import "@babel/polyfill";
import * as JsonData from "./data/websites";

const a = () => {
    return new Promise((resolve, reject) => {
        const value = Math.random()*100;
        if(value<50)
            resolve(JsonData);
        else
            reject(value);
    });
};

a();
import {Inngest} from "inngest";

export const inngest=new Inngest({
    id:"stock-market",
    ai:{gemini:{key:process.env.GEMINI_API_KEY!}}
    
});

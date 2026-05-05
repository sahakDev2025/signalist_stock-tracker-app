import {inngest} from "@/lib/inngest/client";
import type { EventPayload, GetStepTools } from "inngest";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { sendWelcomeEmail } from "@/lib/nodemailer/index";

type SignUpEmailData = {
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
    email: string;
    name: string;
};

type SignUpEmailEventPayload = EventPayload<SignUpEmailData> & { data: SignUpEmailData };

export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email', triggers: [{ event: 'app/user.created' }] },
    async ({ event, step }: { event: SignUpEmailEventPayload; step: GetStepTools<typeof inngest> }) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `;

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile);

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt }
                        ]
                    }]
            }
        });

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) ||'Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.';

            // email sending logic here, using introText as the personalized message in the email
            const {data:{email,name}}=event;

            return await sendWelcomeEmail({ email, name, intro:introText });
          
        });

        return {
            success: true,
            message: 'Welcome email sent successfully'
        };
    }
);
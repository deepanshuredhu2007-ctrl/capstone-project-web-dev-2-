'use server';
/**
 * @fileOverview An AI assistant that provides suggestions for application notes or drafts personalized feedback.
 *
 * - intelligentNoteAndFeedbackAssistant - A function that handles the AI generation of notes or feedback.
 * - IntelligentNoteFeedbackAssistantInput - The input type for the intelligentNoteAndFeedbackAssistant function.
 * - IntelligentNoteFeedbackAssistantOutput - The return type for the intelligentNoteAndFeedbackAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const IntelligentNoteFeedbackAssistantInputSchema = z.object({
  companyName: z.string().describe('The name of the company for the job application.'),
  jobRole: z.string().describe('The role applied for.'),
  applicationStatus: z
    .enum(['Applied', 'Interviewing', 'Offer', 'Rejected'])
    .describe('The current status of the job application.'),
  jobPlatform: z.string().optional().describe('The platform where the job was found or applied (e.g., LinkedIn, company website).'),
  location: z.string().optional().describe('The location of the job.'),
  salary: z.string().optional().describe('The salary range or offer for the job.'),
  appliedDate: z.string().optional().describe('The date when the application was submitted.'),
  existingNotes: z.string().optional().describe('Any existing notes the user has for this application.'),
  requestType: z
    .enum(['notesSuggestion', 'feedbackDraft'])
    .describe('The type of assistance requested: notes suggestion or feedback draft.'),
  userRequestDetails: z.string().optional().describe('Any additional specific details or context from the user for the request.'),
});
export type IntelligentNoteFeedbackAssistantInput = z.infer<
  typeof IntelligentNoteFeedbackAssistantInputSchema
>;

const IntelligentNoteFeedbackAssistantOutputSchema = z.object({
  suggestion: z.string().describe('The AI-generated notes suggestion or feedback draft.'),
});
export type IntelligentNoteFeedbackAssistantOutput = z.infer<
  typeof IntelligentNoteFeedbackAssistantOutputSchema
>;

export async function intelligentNoteAndFeedbackAssistant(
  input: IntelligentNoteFeedbackAssistantInput
): Promise<IntelligentNoteFeedbackAssistantOutput> {
  return intelligentNoteFeedbackAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentNoteFeedbackAssistantPrompt',
  input: { schema: IntelligentNoteFeedbackAssistantInputSchema },
  output: { schema: IntelligentNoteFeedbackAssistantOutputSchema },
  prompt: `You are an AI assistant for a job seeker, helping them manage their job applications.

Job Details:
Company: {{{companyName}}}
Role: {{{jobRole}}}
Status: {{{applicationStatus}}}
{{#if jobPlatform}}Platform: {{{jobPlatform}}}{{/if}}
{{#if location}}Location: {{{location}}}{{/if}}
{{#if salary}}Salary: {{{salary}}}{{/if}}
{{#if appliedDate}}Applied Date: {{{appliedDate}}}{{/if}}
{{#if existingNotes}}Existing Notes/Context: {{{existingNotes}}}{{/if}}
{{#if userRequestDetails}}User's specific request details: {{{userRequestDetails}}}{{/if}}

{{#if (eq requestType "notesSuggestion")}}
Based on the above job details and application status, suggest concise and helpful notes (2-3 bullet points) that the job seeker might want to add to their application tracking dashboard. Focus on actionable insights or key information to remember. If existing notes are provided, suggest additional points or improvements.

Please provide 2-3 bullet points for suggested notes.
{{/if}}

{{#if (eq requestType "feedbackDraft")}}
Based on the above job details and application status, draft a professional and appropriate message or provide key points for communication.

- If the status is 'Rejected', draft a polite follow-up acknowledging the decision and expressing continued interest (if appropriate for the user's details).
- If the status is 'Interviewing', draft a thank-you note or suggest key points for a follow-up email after an interview.
- If the status is 'Offer', draft an acceptance or negotiation email, or suggest key points for such communication.

Draft the message or provide key points for the feedback/communication.
{{/if}}

Your output MUST be a JSON object conforming to the output schema.`, 
});

const intelligentNoteFeedbackAssistantFlow = ai.defineFlow(
  {
    name: 'intelligentNoteFeedbackAssistantFlow',
    inputSchema: IntelligentNoteFeedbackAssistantInputSchema,
    outputSchema: IntelligentNoteFeedbackAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview An AI agent for extracting key information from a job description.
 *
 * - extractJobDescriptionInfo - A function that handles the extraction process.
 * - ExtractJobDescriptionInfoInput - The input type for the extractJobDescriptionInfo function.
 * - ExtractJobDescriptionInfoOutput - The return type for the extractJobDescriptionInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractJobDescriptionInfoInputSchema = z.object({
  jobDescription: z.string().describe('The full job description text.'),
});
export type ExtractJobDescriptionInfoInput = z.infer<typeof ExtractJobDescriptionInfoInputSchema>;

const ExtractJobDescriptionInfoOutputSchema = z.object({
  coreResponsibilities: z.array(z.string()).describe('A list of core responsibilities mentioned in the job description.'),
  requiredSkills: z.array(z.string()).describe('A list of required skills for the role.'),
  preferredQualifications: z.array(z.string()).describe('A list of preferred qualifications for the role.'),
});
export type ExtractJobDescriptionInfoOutput = z.infer<typeof ExtractJobDescriptionInfoOutputSchema>;

export async function extractJobDescriptionInfo(input: ExtractJobDescriptionInfoInput): Promise<ExtractJobDescriptionInfoOutput> {
  return extractJobDescriptionInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractJobDescriptionInfoPrompt',
  input: {schema: ExtractJobDescriptionInfoInputSchema},
  output: {schema: ExtractJobDescriptionInfoOutputSchema},
  prompt: `You are an expert at parsing job descriptions and extracting key details.

From the provided job description, identify and extract the following information:
1.  **Core Responsibilities**: List the main duties and responsibilities associated with this role.
2.  **Required Skills**: List the essential skills, technologies, and experience absolutely necessary for this role.
3.  **Preferred Qualifications**: List any additional skills, experience, or qualifications that are desired but not strictly mandatory.

Present the extracted information in a JSON object with three fields: 'coreResponsibilities', 'requiredSkills', and 'preferredQualifications'. Each field should be an array of strings.

Job Description:
{{{jobDescription}}}`,
});

const extractJobDescriptionInfoFlow = ai.defineFlow(
  {
    name: 'extractJobDescriptionInfoFlow',
    inputSchema: ExtractJobDescriptionInfoInputSchema,
    outputSchema: ExtractJobDescriptionInfoOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

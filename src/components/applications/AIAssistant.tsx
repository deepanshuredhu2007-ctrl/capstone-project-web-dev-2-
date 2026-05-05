'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Clipboard, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { JobApplication } from '@/store/jobSlice';
import { intelligentNoteAndFeedbackAssistant } from '@/ai/flows/intelligent-note-feedback-assistant';
import { toast } from '@/hooks/use-toast';

interface AIAssistantProps {
  application: JobApplication;
  onUpdateNotes?: (notes: string) => void;
}

export function AIAssistant({ application, onUpdateNotes }: AIAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleGetHelp = async (type: 'notesSuggestion' | 'feedbackDraft') => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await intelligentNoteAndFeedbackAssistant({
        companyName: application.companyName,
        jobRole: application.jobRole,
        applicationStatus: application.applicationStatus,
        location: application.location,
        existingNotes: application.notes,
        requestType: type,
      });
      setSuggestion(result.suggestion);
    } catch (error) {
      toast({
        title: 'AI Error',
        description: 'Failed to generate suggestion. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-accent/20 bg-accent/5 shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <CardTitle className="text-md">AI Application Assistant</CardTitle>
        </div>
        <CardDescription>Smart suggestions based on your application status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs gap-1.5"
            onClick={() => handleGetHelp('notesSuggestion')}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Clipboard className="w-3 h-3" />}
            Suggest Notes
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs gap-1.5"
            onClick={() => handleGetHelp('feedbackDraft')}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Mail className="w-3 h-3" />}
            Draft Follow-up
          </Button>
        </div>

        {suggestion && (
          <div className="p-3 bg-background border rounded-lg text-sm whitespace-pre-wrap animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-muted-foreground mb-2 font-medium">Suggestion:</p>
            {suggestion}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
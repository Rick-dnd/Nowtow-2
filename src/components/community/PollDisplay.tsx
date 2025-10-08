'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';

export interface PollOption {
  text: string;
  votes: number;
}

export interface PollDisplayData {
  question: string;
  options: PollOption[];
  endsAt: string; // ISO 8601
  multiSelect: boolean;
  totalVotes: number;
  hasVoted: boolean;
  userVotes?: number[]; // Array of option indices the user voted for
}

interface PollDisplayProps {
  pollData: PollDisplayData;
  onVote: (optionIndices: number[]) => void;
  className?: string;
}

export function PollDisplay({ pollData, onVote, className }: PollDisplayProps): React.ReactElement {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(pollData.userVotes ?? []);
  const [hasSubmitted, setHasSubmitted] = useState(pollData.hasVoted);

  // Calculate time remaining
  const getTimeRemaining = (): string => {
    const now = new Date();
    const endDate = new Date(pollData.endsAt);
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) {
      return 'Umfrage beendet';
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} Tag${days > 1 ? 'e' : ''} übrig`;
    }
    if (hours > 0) {
      return `${hours} Stunde${hours > 1 ? 'n' : ''} übrig`;
    }
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} Minute${minutes > 1 ? 'n' : ''} übrig`;
  };

  // Calculate percentage for each option
  const getPercentage = (votes: number): number => {
    if (pollData.totalVotes === 0) return 0;
    return Math.round((votes / pollData.totalVotes) * 100);
  };

  // Handle single-choice selection
  const handleRadioChange = (value: string): void => {
    const index = parseInt(value, 10);
    setSelectedOptions([index]);
  };

  // Handle multi-choice selection
  const handleCheckboxChange = (index: number, checked: boolean): void => {
    if (checked) {
      setSelectedOptions([...selectedOptions, index]);
    } else {
      setSelectedOptions(selectedOptions.filter((i) => i !== index));
    }
  };

  // Submit vote
  const handleVote = (): void => {
    if (selectedOptions.length === 0) {
      return;
    }
    onVote(selectedOptions);
    setHasSubmitted(true);
  };

  const isPollEnded = new Date(pollData.endsAt) <= new Date();
  const canVote = !hasSubmitted && !isPollEnded;
  const showResults = hasSubmitted || isPollEnded;

  return (
    <Card className={className}>
      <div className="p-4 space-y-4">
        {/* Question */}
        <div>
          <h3 className="font-semibold text-sm mb-1">{pollData.question}</h3>
          <p className="text-xs text-muted-foreground">
            {pollData.totalVotes} Stimme{pollData.totalVotes !== 1 ? 'n' : ''} • {getTimeRemaining()}
          </p>
        </div>

        {/* Options - Before Voting */}
        {canVote && !pollData.multiSelect && (
          <RadioGroup
            value={selectedOptions[0]?.toString() ?? ''}
            onValueChange={handleRadioChange}
            className="space-y-2"
            aria-label={pollData.question}
          >
            {pollData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={index.toString()} id={`poll-option-${index}`} />
                <Label
                  htmlFor={`poll-option-${index}`}
                  className="flex-1 cursor-pointer text-sm font-normal"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {canVote && pollData.multiSelect && (
          <div className="space-y-2" role="group" aria-label={pollData.question}>
            {pollData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={`poll-option-${index}`}
                  checked={selectedOptions.includes(index)}
                  onCheckedChange={(checked) => handleCheckboxChange(index, checked === true)}
                />
                <Label
                  htmlFor={`poll-option-${index}`}
                  className="flex-1 cursor-pointer text-sm font-normal"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        )}

        {/* Options - After Voting (Results) */}
        {showResults && (
          <div className="space-y-3" role="group" aria-label={`${pollData.question} - Results`}>
            {pollData.options.map((option, index) => {
              const percentage = getPercentage(option.votes);
              const isUserVote = pollData.userVotes?.includes(index) ?? false;

              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={isUserVote ? 'font-semibold' : ''}>{option.text}</span>
                      {isUserVote && (
                        <Check className="h-4 w-4 text-primary" aria-label="Deine Stimme" />
                      )}
                    </div>
                    <span className="font-semibold">{percentage}%</span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2"
                    aria-label={`${option.text}: ${percentage}% (${option.votes} Stimmen)`}
                  />
                  <p className="text-xs text-muted-foreground">
                    {option.votes} Stimme{option.votes !== 1 ? 'n' : ''}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Vote Button */}
        {canVote && (
          <Button
            onClick={handleVote}
            disabled={selectedOptions.length === 0}
            className="w-full"
            size="sm"
          >
            Abstimmen
          </Button>
        )}

        {/* Poll Ended Message */}
        {isPollEnded && (
          <p className="text-sm text-muted-foreground text-center">
            Diese Umfrage ist beendet
          </p>
        )}
      </div>
    </Card>
  );
}

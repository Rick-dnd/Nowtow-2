'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { X, Plus } from 'lucide-react';

interface PollCreatorProps {
  onSubmit: (pollData: PollData) => void;
  onCancel: () => void;
}

export interface PollData {
  question: string;
  options: string[];
  duration: number; // in hours
  allowMultipleAnswers: boolean;
}

export function PollCreator({ onSubmit, onCancel }: PollCreatorProps): React.ReactElement {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState('24'); // hours as string
  const [allowMultiple, setAllowMultiple] = useState(false);

  const handleAddOption = (): void => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number): void => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string): void => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (): void => {
    const validOptions = options.filter((opt) => opt.trim() !== '');

    if (question.trim() === '') {
      alert('Bitte gib eine Frage ein');
      return;
    }

    if (validOptions.length < 2) {
      alert('Bitte gib mindestens 2 Antwortmöglichkeiten an');
      return;
    }

    const pollData: PollData = {
      question: question.trim(),
      options: validOptions,
      duration: parseInt(duration, 10),
      allowMultipleAnswers: allowMultiple,
    };

    onSubmit(pollData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Umfrage erstellen</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Schließen">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question */}
        <div className="space-y-2">
          <Label htmlFor="poll-question">Frage *</Label>
          <Input
            id="poll-question"
            placeholder="Was möchtest du fragen?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={200}
            aria-required="true"
          />
          <p className="text-xs text-muted-foreground">{question.length}/200 Zeichen</p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          <Label>Antwortmöglichkeiten * (2-4)</Label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                maxLength={50}
                aria-label={`Option ${index + 1}`}
                aria-required={index < 2}
              />
              {options.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveOption(index)}
                  aria-label={`Option ${index + 1} entfernen`}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {options.length < 4 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddOption}
              className="w-full"
              aria-label="Option hinzufügen"
            >
              <Plus className="h-4 w-4 mr-2" />
              Option hinzufügen
            </Button>
          )}
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label htmlFor="poll-duration">Dauer</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger id="poll-duration">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Stunde</SelectItem>
              <SelectItem value="6">6 Stunden</SelectItem>
              <SelectItem value="24">24 Stunden</SelectItem>
              <SelectItem value="168">7 Tage</SelectItem>
              <SelectItem value="720">30 Tage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Multiple Answers */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="poll-multiple">Mehrfachantworten erlauben</Label>
            <p className="text-xs text-muted-foreground">
              Teilnehmer können mehrere Optionen wählen
            </p>
          </div>
          <Switch
            id="poll-multiple"
            checked={allowMultiple}
            onCheckedChange={setAllowMultiple}
            aria-label="Mehrfachantworten erlauben"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Abbrechen
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Umfrage erstellen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

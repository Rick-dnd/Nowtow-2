'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

interface BlogFiltersSectionProps {
  onFilterChange?: (filters: BlogFilters) => void;
}

export interface BlogFilters {
  categories: string[];
  sortBy: 'newest' | 'popular' | 'relevant';
  readingTime: 'all' | 'short' | 'medium' | 'long';
}

const categories = [
  { id: 'kultur', label: 'Kultur' },
  { id: 'musik', label: 'Musik' },
  { id: 'sport', label: 'Sport' },
  { id: 'food-drink', label: 'Food & Drink' },
  { id: 'bildung', label: 'Bildung' },
  { id: 'networking', label: 'Networking' },
];

const readingTimeOptions = [
  { value: 'all', label: 'Alle' },
  { value: 'short', label: 'Kurz (< 5 min)' },
  { value: 'medium', label: 'Mittel (5-10 min)' },
  { value: 'long', label: 'Lang (> 10 min)' },
];

export function BlogFiltersSection({ onFilterChange }: BlogFiltersSectionProps): React.ReactElement {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'relevant'>('newest');
  const [readingTime, setReadingTime] = useState<'all' | 'short' | 'medium' | 'long'>('all');

  const handleCategoryToggle = (categoryId: string): void => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newCategories);

    if (onFilterChange) {
      onFilterChange({
        categories: newCategories,
        sortBy,
        readingTime,
      });
    }
  };

  const handleSortChange = (value: string): void => {
    const newSort = value as 'newest' | 'popular' | 'relevant';
    setSortBy(newSort);

    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        sortBy: newSort,
        readingTime,
      });
    }
  };

  const handleReadingTimeChange = (value: string): void => {
    const newReadingTime = value as 'all' | 'short' | 'medium' | 'long';
    setReadingTime(newReadingTime);

    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        sortBy,
        readingTime: newReadingTime,
      });
    }
  };

  const handleClearFilters = (): void => {
    setSelectedCategories([]);
    setSortBy('newest');
    setReadingTime('all');

    if (onFilterChange) {
      onFilterChange({
        categories: [],
        sortBy: 'newest',
        readingTime: 'all',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Filter</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Zurücksetzen
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">Kategorien</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Sort By */}
        <div>
          <h3 className="font-medium mb-3">Sortieren nach</h3>
          <RadioGroup value={sortBy} onValueChange={handleSortChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id="newest" />
              <Label htmlFor="newest" className="text-sm font-normal cursor-pointer">
                Neueste
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="popular" id="popular" />
              <Label htmlFor="popular" className="text-sm font-normal cursor-pointer">
                Beliebt
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="relevant" id="relevant" />
              <Label htmlFor="relevant" className="text-sm font-normal cursor-pointer">
                Relevant
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Reading Time */}
        <div>
          <h3 className="font-medium mb-3">Lesezeit</h3>
          <RadioGroup value={readingTime} onValueChange={handleReadingTimeChange}>
            {readingTimeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`reading-${option.value}`} />
                <Label
                  htmlFor={`reading-${option.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}

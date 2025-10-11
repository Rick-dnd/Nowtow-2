'use client';

import { ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import type { MainCategory } from '@/types/search';
import { categoryMap } from '@/types/search';

interface CategorySelectorProps {
  mainCategory: MainCategory;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CategorySelector({
  mainCategory,
  value,
  onChange,
  placeholder = 'Kategorie wählen'
}: CategorySelectorProps): React.ReactElement {
  const categories = categoryMap[mainCategory];
  const selectedCategory = categories.find(cat => cat.id === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-full text-sm bg-transparent border-0 outline-none text-left text-foreground flex items-center justify-between"
          type="button"
        >
          <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
            {selectedCategory ? selectedCategory.label : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="start">
        <div className="grid gap-1">
          <Button
            variant="ghost"
            className="w-full justify-start font-normal hover:bg-accent"
            onClick={(): void => {
              onChange('');
            }}
          >
            Alle Kategorien
          </Button>
          {categories.map((category): React.ReactElement => (
            <Button
              key={category.id}
              variant={value === category.id ? 'secondary' : 'ghost'}
              className="w-full justify-start font-normal"
              onClick={(): void => {
                onChange(category.id);
              }}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
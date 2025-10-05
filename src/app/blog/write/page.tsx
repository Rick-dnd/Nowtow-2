'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Save,
  Eye,
  Send,
  ImagePlus,
  Settings,
  X
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { RichTextEditor } from '@/components/blog/RichTextEditor';

const categories = [
  'Events & Culture',
  'Food & Dining',
  'Nightlife',
  'Arts & Music',
  'Sports & Fitness',
  'Community',
  'Business & Startups',
  'Lifestyle',
];

export default function BlogWritePage(): React.ReactElement {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isDraft] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddTag = (): void => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string): void => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveDraft = (): void => {
    console.log('Draft saved', { title, content, category, tags });
    alert('Entwurf gespeichert!');
  };

  const handlePublish = (): void => {
    console.log('Publishing', { title, content, category, tags });
    alert('Artikel veröffentlicht!');
  };

  return (
    <>
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Neuer Blog-Artikel</h1>
            <p className="text-muted-foreground mt-2">Teile deine Geschichten mit der Community</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Entwurf speichern
            </Button>
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="mr-2 h-4 w-4" />
              {showPreview ? 'Editor' : 'Vorschau'}
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent" onClick={handlePublish}>
              <Send className="mr-2 h-4 w-4" />
              Veröffentlichen
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Editor Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                placeholder="Gib deinem Artikel einen aussagekräftigen Titel..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold border-0 border-b rounded-none px-0 focus-visible:ring-0"
              />
            </div>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cover-Bild</CardTitle>
              </CardHeader>
              <CardContent>
                {coverImage ? (
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground">Cover-Bild Vorschau</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setCoverImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full h-32">
                    <div className="text-center">
                      <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Cover-Bild hochladen</p>
                    </div>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label htmlFor="content">Inhalt *</Label>
              {showPreview ? (
                <Card>
                  <CardContent className="p-6">
                    <div
                      className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
                      dangerouslySetInnerHTML={{ __html: content || '<p className="text-muted-foreground">Keine Vorschau verfügbar</p>' }}
                    />
                  </CardContent>
                </Card>
              ) : (
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  autosave={true}
                  autosaveKey="blog-draft"
                />
              )}
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Einstellungen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={isDraft ? 'secondary' : 'default'}>
                    {isDraft ? 'Entwurf' : 'Veröffentlicht'}
                  </Badge>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Zuletzt gespeichert: vor 2 Minuten
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kategorie</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategorie wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Tag hinzufügen..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} variant="outline">
                    +
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-destructive">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Publishing Tips */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm">Tipps für gute Artikel</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>✓ Verwende einen aussagekräftigen Titel</p>
                <p>✓ Füge ein hochwertiges Cover-Bild hinzu</p>
                <p>✓ Strukturiere deinen Text mit Absätzen</p>
                <p>✓ Nutze relevante Tags für bessere Auffindbarkeit</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

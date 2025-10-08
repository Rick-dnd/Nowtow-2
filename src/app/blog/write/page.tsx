'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Save,
  Eye,
  Send,
  Settings,
  X
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { RichTextEditor } from '@/components/blog/RichTextEditor';
import { ImageUpload } from '@/components/blog/ImageUpload';
import { useAutoSave, loadAutoSave } from '@/hooks/useAutoSave';
import { useWordCount } from '@/hooks/useWordCount';
import { useAuth } from '@/hooks/useAuth';
import { useCreateBlogPost, useUpdateBlogPost } from '@/hooks/useBlog';
import { useUploadFile } from '@/hooks/useUpload';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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

interface DraftData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string | null;
  isFeatured: boolean;
  allowComments: boolean;
  sendNotification: boolean;
}

export default function BlogWritePage(): React.ReactElement {
  const { profile } = useAuth();
  const router = useRouter();
  const createPostMutation = useCreateBlogPost();
  const uploadFileMutation = useUploadFile();

  // Load saved draft on mount
  const [title, setTitle] = useState(() => {
    const draft = loadAutoSave<DraftData>('blog-draft');
    return draft?.title ?? '';
  });

  const [content, setContent] = useState(() => {
    const draft = loadAutoSave<DraftData>('blog-draft');
    return draft?.content ?? '';
  });

  const [excerpt, setExcerpt] = useState(() => {
    const draft = loadAutoSave<DraftData>('blog-draft');
    return draft?.excerpt ?? '';
  });

  const [category, setCategory] = useState(() => {
    const draft = loadAutoSave<DraftData>('blog-draft');
    return draft?.category ?? '';
  });

  const [tags, setTags] = useState<string[]>(() => {
    const draft = loadAutoSave<DraftData>('blog-draft');
    return draft?.tags ?? [];
  });

  const [tagInput, setTagInput] = useState('');

  const [coverImage, setCoverImage] = useState<string | null>(() => {
    const draft = loadAutoSave<DraftData>('blog-draft');
    return draft?.coverImage ?? null;
  });

  const [showPreview, setShowPreview] = useState(false);

  const [isFeatured, setIsFeatured] = useState(() => {
    const draft = loadAutoSave<DraftData>('blog-draft');
    return draft?.isFeatured ?? false;
  });

  const [allowComments, setAllowComments] = useState(() => {
    const draft = loadAutoSave<DraftData>('blog-draft');
    return draft?.allowComments ?? true;
  });

  const [sendNotification, setSendNotification] = useState(() => {
    const draft = loadAutoSave<DraftData>('blog-draft');
    return draft?.sendNotification ?? false;
  });

  // Auto-save draft
  const draftData: DraftData = {
    title,
    content,
    excerpt,
    category,
    tags,
    coverImage,
    isFeatured,
    allowComments,
    sendNotification,
  };

  const { lastSaved, isSaving, clearSaved } = useAutoSave(draftData, {
    key: 'blog-draft',
    delay: 30000, // 30 seconds
  });

  // Word count and reading time
  const { wordCount, readingTime } = useWordCount(content);

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
    // Auto-save already handles this, just show confirmation
    toast.success('Entwurf gespeichert!');
  };

  const handlePublish = async (): Promise<void> => {
    if (!profile) {
      toast.error('Du musst angemeldet sein, um einen Artikel zu veröffentlichen');
      return;
    }

    if (!title.trim()) {
      toast.error('Bitte gib einen Titel ein');
      return;
    }

    if (!content.trim()) {
      toast.error('Bitte schreibe etwas Inhalt');
      return;
    }

    if (!category) {
      toast.error('Bitte wähle eine Kategorie');
      return;
    }

    try {
      // Upload cover image if exists
      let uploadedImageUrl = coverImage;
      if (coverImage && coverImage.startsWith('data:')) {
        toast.info('Bild wird hochgeladen...');
        // Convert data URL to File
        const response = await fetch(coverImage);
        const blob = await response.blob();
        const file = new File([blob], 'cover-image.jpg', { type: blob.type });

        const uploadResult = await uploadFileMutation.mutateAsync({
          file,
          bucket: 'blog-images',
        });
        uploadedImageUrl = uploadResult.url;
      }

      // Create blog post
      await createPostMutation.mutateAsync({
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        category: category,
        tags: tags.length > 0 ? tags : undefined,
        featured_image: uploadedImageUrl || undefined,
        is_featured: isFeatured,
        allow_comments: allowComments,
        status: 'published',
        author_id: profile.id,
      });

      toast.success('Artikel erfolgreich veröffentlicht!');
      clearSaved(); // Clear auto-save after successful publish

      // Redirect to blog page
      router.push('/blog');
    } catch (error) {
      console.error('Error publishing article:', error);
      toast.error('Fehler beim Veröffentlichen des Artikels');
    }
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
                maxLength={100}
                className="text-2xl font-bold border-0 border-b rounded-none px-0 focus-visible:ring-0"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {title.length}/100 Zeichen
              </p>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover-Bild</Label>
              <ImageUpload
                value={coverImage}
                onChange={setCoverImage}
                disabled={false}
              />
            </div>

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
              <div className="text-xs text-muted-foreground mt-2">
                {wordCount} Wörter • {readingTime} min Lesezeit
              </div>
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
                  <Badge variant="secondary">Entwurf</Badge>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    {isSaving ? (
                      <span className="flex items-center gap-1">
                        <span className="animate-pulse">●</span> Speichert...
                      </span>
                    ) : lastSaved ? (
                      `Gespeichert: ${lastSaved.toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`
                    ) : (
                      'Nicht gespeichert'
                    )}
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

            {/* Excerpt */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kurzbeschreibung</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Kurze Zusammenfassung deines Artikels (max 160 Zeichen)..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  maxLength={160}
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {excerpt.length}/160 Zeichen
                </p>
              </CardContent>
            </Card>

            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Veröffentlichungsoptionen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={(checked) => setIsFeatured(checked === true)}
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Als Feature-Artikel hervorheben
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="comments"
                    checked={allowComments}
                    onCheckedChange={(checked) => setAllowComments(checked === true)}
                  />
                  <label
                    htmlFor="comments"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Kommentare erlauben
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notification"
                    checked={sendNotification}
                    onCheckedChange={(checked) => setSendNotification(checked === true)}
                  />
                  <label
                    htmlFor="notification"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Benachrichtigung an Follower senden
                  </label>
                </div>
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

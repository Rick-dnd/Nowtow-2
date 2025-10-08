'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { Plus, X } from 'lucide-react';
import { useCreateCommunity } from '@/hooks/useCommunities';
import { useUser } from '@/hooks/useAuth';
import { useUploadFile } from '@/hooks/useUpload';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function CreateCommunityDialog(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Allgemein');
  const [privacy, setPrivacy] = useState('public');
  const [rules, setRules] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>(['']);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: user } = useUser();
  const createMutation = useCreateCommunity();
  const uploadMutation = useUploadFile('community-images');
  const router = useRouter();

  const handleNameChange = (value: string): void => {
    setName(value);
    // Auto-generate slug from name
    const autoSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setSlug(autoSlug);
  };

  const addRule = (): void => {
    setRules([...rules, '']);
  };

  const updateRule = (index: number, value: string): void => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const removeRule = (index: number): void => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const addTag = (): void => {
    setTags([...tags, '']);
  };

  const updateTag = (index: number, value: string): void => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const removeTag = (index: number): void => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!user) {
      toast.error('Bitte melde dich an, um eine Community zu erstellen');
      return;
    }

    if (!name.trim() || !slug.trim() || !description.trim()) {
      toast.error('Bitte fülle alle Pflichtfelder aus');
      return;
    }

    const filteredRules = rules.filter((r) => r.trim() !== '');
    const filteredTags = tags.filter((t) => t.trim() !== '');

    try {
      // 1. Upload image if selected
      let uploadedImageUrl: string | undefined;
      if (imageFile) {
        const uploadResult = await uploadMutation.mutateAsync(imageFile);
        uploadedImageUrl = uploadResult.publicUrl;
      }

      // 2. Create community
      const data = await createMutation.mutateAsync({
        creatorId: user.id,
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        category,
        privacy,
        rules: filteredRules.length > 0 ? filteredRules : undefined,
        tags: filteredTags.length > 0 ? filteredTags : undefined,
        image_url: uploadedImageUrl,
      });

      toast.success('Community erfolgreich erstellt!');
      setOpen(false);

      // Reset form
      setName('');
      setSlug('');
      setDescription('');
      setCategory('Allgemein');
      setPrivacy('public');
      setRules(['']);
      setTags(['']);
      setImageFile(null);

      // Navigate to new community
      router.push(`/community/c/${data.slug}`);
    } catch (error) {
      toast.error(`Fehler: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Community erstellen
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Neue Community erstellen</DialogTitle>
          <DialogDescription className="sr-only">
            Erstelle eine neue Community mit Name, Slug, Beschreibung und optionalen Einstellungen
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="z.B. Kunstliebhaber München"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">
              URL-Slug <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">c/</span>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="kunstliebhaber-muenchen"
                pattern="[a-z0-9\-]+"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Nur Kleinbuchstaben, Zahlen und Bindestriche
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Beschreibung <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreibe deine Community..."
              required
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Allgemein">Allgemein</SelectItem>
                <SelectItem value="Kunst">Kunst</SelectItem>
                <SelectItem value="Musik">Musik</SelectItem>
                <SelectItem value="Sport">Sport</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Privacy */}
          <div className="space-y-2">
            <Label htmlFor="privacy">Sichtbarkeit</Label>
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger id="privacy">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Öffentlich</SelectItem>
                <SelectItem value="private">Privat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Community-Bild (optional)</Label>
            <FileUpload
              value={imageFile ? [imageFile] : []}
              onChange={(files) => setImageFile(files[0] ?? null)}
              maxFiles={1}
              maxSize={2 * 1024 * 1024}
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
            />
            <p className="text-xs text-muted-foreground">
              Max. 2 MB, empfohlen: quadratisches Format
            </p>
          </div>

          {/* Rules */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Community-Regeln (optional)</Label>
              <Button type="button" variant="outline" size="sm" onClick={addRule}>
                <Plus className="h-3 w-3 mr-1" />
                Regel hinzufügen
              </Button>
            </div>
            <div className="space-y-2">
              {rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={rule}
                    onChange={(e) => updateRule(index, e.target.value)}
                    placeholder={`Regel ${index + 1}`}
                  />
                  {rules.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRule(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Tags (optional)</Label>
              <Button type="button" variant="outline" size="sm" onClick={addTag}>
                <Plus className="h-3 w-3 mr-1" />
                Tag hinzufügen
              </Button>
            </div>
            <div className="space-y-2">
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                    placeholder={`Tag ${index + 1}`}
                  />
                  {tags.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={createMutation.isPending || uploadMutation.isPending}>
              {uploadMutation.isPending
                ? 'Lade Bild hoch...'
                : createMutation.isPending
                ? 'Erstelle Community...'
                : 'Community erstellen'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

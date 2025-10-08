'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { Plus, X } from 'lucide-react';
import { useUpdateCommunity } from '@/hooks/useCommunities';
import { useUploadFile } from '@/hooks/useUpload';
import { toast } from 'sonner';
import type { Database } from '@/types/database';

type Community = Database['public']['Tables']['communities']['Row'];

interface CommunitySettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  community: Community;
}

export function CommunitySettingsDialog({
  open,
  onOpenChange,
  community,
}: CommunitySettingsDialogProps): React.ReactElement {
  const [name, setName] = useState(community.name);
  const [description, setDescription] = useState(community.description ?? '');
  const [category, setCategory] = useState(community.category ?? 'Allgemein');
  const [privacy, setPrivacy] = useState(community.privacy ?? 'public');
  const [rules, setRules] = useState<string[]>(
    Array.isArray(community.rules) ? (community.rules as string[]) : ['']
  );
  const [tags, setTags] = useState<string[]>(
    Array.isArray(community.tags) ? (community.tags as string[]) : ['']
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(community.image_url ?? '');

  const updateMutation = useUpdateCommunity();
  const uploadMutation = useUploadFile('community-images');

  // Reset form when community changes
  useEffect((): void => {
    setName(community.name);
    setDescription(community.description ?? '');
    setCategory(community.category ?? 'Allgemein');
    setPrivacy(community.privacy ?? 'public');
    setRules(Array.isArray(community.rules) ? (community.rules as string[]) : ['']);
    setTags(Array.isArray(community.tags) ? (community.tags as string[]) : ['']);
    setImageFile(null);
    setCurrentImageUrl(community.image_url ?? '');
  }, [community]);

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

    if (!name.trim() || !description.trim()) {
      toast.error('Name und Beschreibung sind Pflichtfelder');
      return;
    }

    const filteredRules = rules.filter((r) => r.trim() !== '');
    const filteredTags = tags.filter((t) => t.trim() !== '');

    try {
      // 1. Upload new image if selected
      let uploadedImageUrl: string | undefined;
      if (imageFile) {
        const uploadResult = await uploadMutation.mutateAsync(imageFile);
        uploadedImageUrl = uploadResult.publicUrl;
      }

      // 2. Update community
      await updateMutation.mutateAsync({
        communityId: community.id,
        name: name.trim(),
        description: description.trim(),
        category,
        privacy,
        rules: filteredRules.length > 0 ? filteredRules : undefined,
        tags: filteredTags.length > 0 ? filteredTags : undefined,
        image_url: uploadedImageUrl || currentImageUrl || undefined,
      });

      toast.success('Community erfolgreich aktualisiert!');
      onOpenChange(false);
    } catch (error) {
      toast.error(`Fehler: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Community-Einstellungen</DialogTitle>
          <DialogDescription className="sr-only">
            Bearbeite Community-Details wie Name, Beschreibung, Bild und Einstellungen
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
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. Kunstliebhaber München"
              required
            />
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
            <Label>Community-Bild</Label>
            {currentImageUrl && !imageFile && (
              <div className="mb-2">
                <p className="text-xs text-muted-foreground mb-2">Aktuelles Bild:</p>
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentImageUrl}
                    alt="Community Bild"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <FileUpload
              value={imageFile ? [imageFile] : []}
              onChange={(files) => setImageFile(files[0] ?? null)}
              maxFiles={1}
              maxSize={2 * 1024 * 1024}
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
            />
            <p className="text-xs text-muted-foreground">
              {imageFile
                ? 'Neues Bild wird beim Speichern hochgeladen'
                : 'Max. 2 MB, empfohlen: quadratisches Format'}
            </p>
          </div>

          {/* Rules */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Community-Regeln</Label>
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
              <Label>Tags</Label>
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
            <Button type="submit" disabled={updateMutation.isPending || uploadMutation.isPending}>
              {uploadMutation.isPending
                ? 'Lade Bild hoch...'
                : updateMutation.isPending
                ? 'Speichere...'
                : 'Speichern'}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Abbrechen
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

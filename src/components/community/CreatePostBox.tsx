'use client';

import { useState } from 'react';
import { Image as ImageIcon, BarChart3, MapPin, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { PollCreator, type PollData } from './PollCreator';
import { MediaUploader, type MediaFile } from './MediaUploader';
import { useUser, useProfile } from '@/hooks/useAuth';
import { useCreatePost } from '@/hooks/useCommunity';
import { useUploadFile } from '@/hooks/useUpload';
import { toast } from 'sonner';
import type { Json } from '@/types/database';

interface CreatePostBoxProps {
  communityId?: string | null;
}

export function CreatePostBox({ communityId = null }: CreatePostBoxProps): React.ReactElement {
  const { data: user } = useUser();
  const { data: profile } = useProfile(user?.id);
  const createPostMutation = useCreatePost();
  const uploadMutation = useUploadFile('community-images');

  const [content, setContent] = useState('');
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [showMediaUploader, setShowMediaUploader] = useState(false);
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  const handlePollSubmit = (data: PollData): void => {
    setPollData(data);
    setShowPollCreator(false);
  };

  const handleMediaFilesChange = (files: MediaFile[]): void => {
    setMediaFiles(files);
  };

  const handlePost = async (): Promise<void> => {
    if (!user) {
      toast.error('Bitte melde dich an, um einen Post zu erstellen');
      return;
    }

    if (!content.trim() && !pollData && mediaFiles.length === 0) {
      toast.error('Bitte gib etwas ein oder füge Inhalte hinzu');
      return;
    }

    try {
      // 1. Upload image if selected
      let uploadedImageUrl: string | null = null;
      if (mediaFiles.length > 0 && mediaFiles[0]) {
        const uploadResult = await uploadMutation.mutateAsync(mediaFiles[0].file);
        uploadedImageUrl = uploadResult.publicUrl;
      }

      // 2. Transform poll data to correct structure
      let transformedPollData: Json | null = null;
      if (pollData) {
        const endsAt = new Date();
        endsAt.setHours(endsAt.getHours() + pollData.duration);

        transformedPollData = {
          question: pollData.question,
          options: pollData.options.map((text) => ({ text, votes: 0 })),
          endsAt: endsAt.toISOString(),
          multiSelect: pollData.allowMultipleAnswers,
          totalVotes: 0,
          hasVoted: false,
        } as unknown as Json;
      }

      // 3. Create post
      await createPostMutation.mutateAsync({
        author_id: user.id,
        content: content.trim(),
        image_url: uploadedImageUrl,
        poll_data: transformedPollData,
        community_id: communityId,
        event_id: null,
        service_id: null,
        space_id: null,
      });

      toast.success('Post erfolgreich erstellt!');

      // Reset
      setContent('');
      setPollData(null);
      setMediaFiles([]);
      setShowMediaUploader(false);
    } catch (error) {
      toast.error(`Fehler beim Erstellen des Posts: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
    }
  };

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt={profile.full_name ?? profile.username ?? 'User'} />}
          <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white font-semibold">
            {profile?.full_name?.[0]?.toUpperCase() ??
             profile?.username?.[0]?.toUpperCase() ??
             user?.email?.[0]?.toUpperCase() ?? 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="Was gibt's Neues?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px] resize-none border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary"
          />

          {/* Poll Preview */}
          {pollData && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">📊 Umfrage: {pollData.question}</p>
                <Button variant="ghost" size="sm" onClick={() => setPollData(null)}>
                  Entfernen
                </Button>
              </div>
              <ul className="text-sm space-y-1">
                {pollData.options.map((opt, idx) => (
                  <li key={idx}>• {opt}</li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                Dauer: {pollData.duration}h • {pollData.allowMultipleAnswers ? 'Mehrfachantworten' : 'Einzelantwort'}
              </p>
            </div>
          )}

          {/* Media Uploader */}
          {showMediaUploader && (
            <MediaUploader
              onFilesChange={handleMediaFilesChange}
              maxFiles={10}
              maxFileSize={10 * 1024 * 1024} // 10MB
            />
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => {
                  setShowMediaUploader(!showMediaUploader);
                  if (showPollCreator) setShowPollCreator(false);
                }}
                disabled={pollData !== null}
              >
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {showMediaUploader ? 'Ausblenden' : 'Bild'}
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => {
                  setShowPollCreator(!showPollCreator);
                  if (showMediaUploader) setShowMediaUploader(false);
                }}
                disabled={pollData !== null || mediaFiles.length > 0}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Umfrage</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Standort</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Smile className="h-4 w-4" />
                <span className="hidden sm:inline">Emoji</span>
              </Button>
            </div>

            <Button
              size="sm"
              className="rounded-full"
              onClick={handlePost}
              disabled={(!content && !pollData && mediaFiles.length === 0) || uploadMutation.isPending || createPostMutation.isPending}
            >
              {uploadMutation.isPending
                ? 'Lade Bild hoch...'
                : createPostMutation.isPending
                ? 'Erstelle Post...'
                : 'Posten'}
            </Button>
          </div>
        </div>
      </div>

      {/* Poll Creator */}
      {showPollCreator && (
        <PollCreator
          onSubmit={handlePollSubmit}
          onCancel={() => setShowPollCreator(false)}
        />
      )}
    </div>
  );
}

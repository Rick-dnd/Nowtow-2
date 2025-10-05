'use client';

import { useState } from 'react';
import { Image as ImageIcon, BarChart3, MapPin, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PollCreator, type PollData } from './PollCreator';
import { MediaUploader, type MediaFile } from './MediaUploader';

export function CreatePostBox(): React.ReactElement {
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

  const handlePost = (): void => {
    if (pollData) {
      console.log('Posting poll:', { content, poll: pollData });
      // TODO: Integrate with useCommunity hook
      alert('Poll erstellt!');
    } else if (mediaFiles.length > 0) {
      console.log('Posting with media:', { content, media: mediaFiles });
      alert(`Post with ${mediaFiles.length} file(s) erstellt!`);
    } else {
      console.log('Posting:', content);
      alert('Post erstellt!');
    }
    // Reset
    setContent('');
    setPollData(null);
    setMediaFiles([]);
    setShowMediaUploader(false);
  };

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
          U
        </div>
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="What's happening?"
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
                  {showMediaUploader ? 'Hide' : 'Image'}
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
                <span className="hidden sm:inline">Poll</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Location</span>
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
              disabled={!content && !pollData && mediaFiles.length === 0}
            >
              Post
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

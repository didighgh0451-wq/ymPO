/**
 * Video URL Parser & Embed Utility
 * Supports: YouTube (standard, shorts, youtu.be), Vimeo, direct URLs
 */

export type AspectRatio = '16:9' | '9:16' | '4:5' | '1:1' | '4:3' | '21:9';

export interface ParsedVideo {
  platform: 'youtube' | 'vimeo' | 'direct';
  videoId: string;
  embedUrl: string;
  thumbnailUrl: string | null;
  isShort: boolean;
}

/**
 * Parse a video URL and extract platform, ID, embed URL, and thumbnail
 */
export function parseVideoUrl(url: string): ParsedVideo {
  // YouTube Shorts
  const shortsMatch = url.match(
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  );
  if (shortsMatch) {
    const videoId = shortsMatch[1];
    return {
      platform: 'youtube',
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      isShort: true,
    };
  }

  // YouTube standard (watch?v= or youtu.be/)
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    const videoId = ytMatch[1];
    return {
      platform: 'youtube',
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      isShort: false,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return {
      platform: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`,
      thumbnailUrl: null, // Vimeo requires API for thumbnails
      isShort: false,
    };
  }

  // Direct URL fallback
  return {
    platform: 'direct',
    videoId: '',
    embedUrl: url,
    thumbnailUrl: null,
    isShort: false,
  };
}

/**
 * Resolve the best available thumbnail for a project.
 * Priority: image field > videoUrl auto-extract > placeholder
 */
export function getProjectThumbnail(project: {
  image?: string;
  videoUrl?: string;
}): string {
  // 1) Explicitly provided image — always wins
  if (project.image) return project.image;

  // 2) Auto-extract from videoUrl (YouTube only; Vimeo needs API)
  if (project.videoUrl) {
    const parsed = parseVideoUrl(project.videoUrl);
    if (parsed.thumbnailUrl) return parsed.thumbnailUrl;
  }

  // 3) Fallback — dark placeholder matching site palette
  return '';
}

/**
 * Get numeric aspect ratio value (width / height)
 */
export function getAspectRatioValue(ratio: AspectRatio): number {
  const map: Record<AspectRatio, number> = {
    '16:9': 16 / 9,
    '9:16': 9 / 16,
    '4:5': 4 / 5,
    '1:1': 1,
    '4:3': 4 / 3,
    '21:9': 21 / 9,
  };
  return map[ratio];
}

/**
 * Get CSS aspect-ratio string
 */
export function getAspectRatioCss(ratio: AspectRatio): string {
  return ratio.replace(':', ' / ');
}

/**
 * Get aspect ratio label for display
 */
export function getAspectRatioLabel(ratio: AspectRatio): string {
  const labels: Record<AspectRatio, string> = {
    '16:9': '가로형',
    '9:16': '세로형',
    '4:5': '포트레이트',
    '1:1': '정방형',
    '4:3': '클래식',
    '21:9': '울트라와이드',
  };
  return labels[ratio];
}

/**
 * Calculate card width in the horizontal scroll based on aspect ratio
 * Keeps height constant, adjusts width proportionally
 */
export function getCardWidthClass(ratio: AspectRatio): string {
  switch (ratio) {
    case '9:16':
      return 'w-[50vw] md:w-[28vw] lg:w-[20vw]';
    case '4:5':
      return 'w-[60vw] md:w-[32vw] lg:w-[24vw]';
    case '1:1':
      return 'w-[65vw] md:w-[38vw] lg:w-[28vw]';
    case '4:3':
      return 'w-[75vw] md:w-[42vw] lg:w-[30vw]';
    case '21:9':
      return 'w-[90vw] md:w-[55vw] lg:w-[42vw]';
    case '16:9':
    default:
      return 'w-[80vw] md:w-[46vw] lg:w-[33vw]';
  }
}
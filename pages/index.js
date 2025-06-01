import { useState, useRef, useEffect } from 'react';
import { Download, Info, Play, Eye, Clock, User, Globe, CheckCircle, AlertCircle, Copy, ExternalLink, Video, Music, FileVideo, Headphones } from 'lucide-react';

export default function EnhancedSocialDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState('');
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const inputRef = useRef(null);

  // Simulated API URL
  const API_URL = 'http://localhost:5000';

  const downloadFormats = {
    video: [
      { 
        format: 'mp4', 
        name: 'MP4 (H.264)', 
        description: 'Best compatibility, works everywhere', 
        icon: Video, 
        color: 'text-blue-600',
        qualities: ['2160p', '1440p', '1080p', '720p', '480p', '360p']
      },
      { 
        format: 'webm', 
        name: 'WebM (VP9)', 
        description: 'High quality, smaller file size', 
        icon: FileVideo, 
        color: 'text-green-600',
        qualities: ['2160p', '1440p', '1080p', '720p', '480p']
      },
      { 
        format: 'avi', 
        name: 'AVI', 
        description: 'Classic format, high quality', 
        icon: Video, 
        color: 'text-purple-600',
        qualities: ['1080p', '720p', '480p']
      },
      { 
        format: 'mov', 
        name: 'MOV (QuickTime)', 
        description: 'Apple optimized format', 
        icon: Video, 
        color: 'text-gray-600',
        qualities: ['1080p', '720p', '480p']
      }
    ],
    audio: [
      { 
        format: 'mp3', 
        name: 'MP3', 
        description: 'Universal audio format', 
        icon: Music, 
        color: 'text-orange-600',
        qualities: ['320kbps', '256kbps', '192kbps', '128kbps']
      },
      { 
        format: 'wav', 
        name: 'WAV', 
        description: 'Lossless audio quality', 
        icon: Headphones, 
        color: 'text-red-600',
        qualities: ['48kHz', '44.1kHz']
      },
      { 
        format: 'flac', 
        name: 'FLAC', 
        description: 'Lossless compression', 
        icon: Headphones, 
        color: 'text-indigo-600',
        qualities: ['96kHz', '48kHz', '44.1kHz']
      },
      { 
        format: 'm4a', 
        name: 'M4A (AAC)', 
        description: 'High quality, small size', 
        icon: Music, 
        color: 'text-teal-600',
        qualities: ['256kbps', '192kbps', '128kbps']
      }
    ]
  };

  const supportedPlatforms = [
    { name: 'YouTube', color: 'bg-red-500', icon: '▶️' },
    { name: 'Twitter/X', color: 'bg-black', icon: '𝕏' },
    { name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: '📷' },
    { name: 'TikTok', color: 'bg-black', icon: '🎵' },
    { name: 'Facebook', color: 'bg-blue-600', icon: '👥' },
    { name: 'Vimeo', color: 'bg-blue-400', icon: '🎬' }
  ];

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleGetInfo = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setVideoInfo(null);

    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock video info based on URL
      const mockVideoInfo = {
        title: "Amazing Video Content - Best Moments Compilation",
        duration: 245,
        platform: url.includes('youtube') ? 'YouTube' : 
                 url.includes('twitter') || url.includes('x.com') ? 'Twitter/X' :
                 url.includes('instagram') ? 'Instagram' :
                 url.includes('tiktok') ? 'TikTok' : 'YouTube',
        uploader: "Content Creator",
        view_count: 1250000,
        thumbnail: "https://picsum.photos/480/270?random=" + Math.floor(Math.random() * 1000),
        upload_date: "2024-12-15",
        description: "This is an amazing video that showcases the best moments from our recent adventure. Don't miss out on this incredible content!"
      };

      setVideoInfo(mockVideoInfo);
    } catch (err) {
      setError('Failed to connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format, quality = 'best') => {
    setDownloadLoading(true);
    setDownloadProgress(0);
    setError('');

    try {
      // Simulate download progress
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get file extension based on format
      const extensions = {
        'mp4': 'mp4',
        'webm': 'webm',
        'avi': 'avi',
        'mov': 'mov',
        'mp3': 'mp3',
        'wav': 'wav',
        'flac': 'flac',
        'm4a': 'm4a'
      };
      
      const extension = extensions[format] || 'mp4';
      const filename = `${videoInfo?.title?.slice(0, 30) || 'download'}.${extension}`;
      alert(`Download completed: ${filename}`);
      
    } catch (err) {
      setError('Download failed. Please try again.');
    } finally {
      setDownloadLoading(false);
      setDownloadProgress(0);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to paste from clipboard');
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (!views) return 'N/A';
    if (views >= 1000000000) return `${(views / 1000000000).toFixed(1)}B`;
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toLocaleString();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Animated Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-5 transform rotate-1"></div>
            <div className="relative">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Social Media Downloader
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Download videos from your favorite social media platforms with lightning speed and premium quality
              </p>
              
              {/* Enhanced Supported Platforms */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {supportedPlatforms.map((platform) => (
                  <div
                    key={platform.name}
                    className={`group relative px-4 py-2 ${platform.color} text-white rounded-full text-sm font-medium cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-lg`}
                  >
                    <span className="mr-2">{platform.icon}</span>
                    {platform.name}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Main Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            {/* Enhanced URL Input */}
            <div className="mb-8 relative">
              <label htmlFor="url" className="block text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Video URL
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="w-full px-6 py-4 pr-32 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-lg transition-all duration-200 bg-gray-50/50"
                  onKeyPress={(e) => e.key === 'Enter' && handleGetInfo()}
                />
                <div className="absolute right-2 top-2 flex gap-2">
                  <button
                    onClick={pasteFromClipboard}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Paste from clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {url && (
                    <button
                      onClick={copyToClipboard}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        copied ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      title="Copy URL"
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleGetInfo}
                disabled={loading || !url.trim()}
                className="mt-4 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Info className="w-5 h-5" />
                    Get Video Info
                  </>
                )}
              </button>
            </div>

            {/* Enhanced Error Message */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Enhanced Video Information */}
            {videoInfo && (
              <div className="mb-8 p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Video Details */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                      <Play className="w-6 h-6 text-blue-600" />
                      <h3 className="text-2xl font-bold text-gray-800">Video Information</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-white/60 rounded-2xl">
                        <span className="font-semibold text-gray-600 text-sm uppercase tracking-wide">Title</span>
                        <p className="text-gray-900 text-lg font-medium mt-1">{videoInfo.title}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/60 rounded-2xl text-center">
                          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                          <span className="block font-semibold text-gray-600 text-sm uppercase tracking-wide">Duration</span>
                          <p className="text-gray-900 text-xl font-bold">{formatDuration(videoInfo.duration)}</p>
                        </div>
                        <div className="p-4 bg-white/60 rounded-2xl text-center">
                          <Globe className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                          <span className="block font-semibold text-gray-600 text-sm uppercase tracking-wide">Platform</span>
                          <p className="text-gray-900 text-xl font-bold">{videoInfo.platform}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/60 rounded-2xl text-center">
                          <User className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <span className="block font-semibold text-gray-600 text-sm uppercase tracking-wide">Creator</span>
                          <p className="text-gray-900 text-lg font-medium">{videoInfo.uploader}</p>
                        </div>
                        <div className="p-4 bg-white/60 rounded-2xl text-center">
                          <Eye className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                          <span className="block font-semibold text-gray-600 text-sm uppercase tracking-wide">Views</span>
                          <p className="text-gray-900 text-xl font-bold">{formatViews(videoInfo.view_count)}</p>
                        </div>
                      </div>

                      {videoInfo.description && (
                        <div className="p-4 bg-white/60 rounded-2xl">
                          <span className="font-semibold text-gray-600 text-sm uppercase tracking-wide">Description</span>
                          <p className="text-gray-700 mt-2 line-clamp-3">{videoInfo.description}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Thumbnail */}
                  {videoInfo.thumbnail && (
                    <div className="lg:col-span-1">
                      <div className="sticky top-4">
                        <h4 className="font-semibold text-gray-600 mb-4 text-sm uppercase tracking-wide">Preview</h4>
                        <div className="relative group cursor-pointer">
                          <img
                            src={videoInfo.thumbnail}
                            alt="Video thumbnail"
                            className="w-full rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                              <p className="text-white text-sm font-medium">
                                Uploaded: {formatDate(videoInfo.upload_date)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Download Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-gray-800 text-xl flex items-center gap-3">
                      <Download className="w-6 h-6 text-blue-600" />
                      Download Options
                    </h4>
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      {showAdvanced ? 'Simple View' : 'Advanced Options'}
                    </button>
                  </div>
                  
                  {downloadLoading && downloadProgress < 100 && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-blue-800 font-medium">Downloading...</span>
                        <span className="text-blue-600 text-sm">{Math.round(downloadProgress)}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {!showAdvanced ? (
                    /* Simple Download Options */
                    <div className="grid sm:grid-cols-3 gap-4">
                      <button
                        onClick={() => handleDownload('mp4', 'best')}
                        disabled={downloadLoading}
                        className="group relative px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                        <div className="relative flex flex-col items-center gap-2">
                          <Video className="w-6 h-6" />
                          <span className="text-sm">Best Quality</span>
                          <span className="text-xs opacity-80">MP4 • HD</span>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleDownload('mp4', 'medium')}
                        disabled={downloadLoading}
                        className="group relative px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                        <div className="relative flex flex-col items-center gap-2">
                          <FileVideo className="w-6 h-6" />
                          <span className="text-sm">Balanced</span>
                          <span className="text-xs opacity-80">MP4 • 720p</span>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleDownload('mp3', '320kbps')}
                        disabled={downloadLoading}
                        className="group relative px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                        <div className="relative flex flex-col items-center gap-2">
                          <Music className="w-6 h-6" />
                          <span className="text-sm">Audio Only</span>
                          <span className="text-xs opacity-80">MP3 • 320kbps</span>
                        </div>
                      </button>
                    </div>
                  ) : (
                    /* Advanced Download Options */
                    <div className="space-y-6">
                      {/* Video Formats */}
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                          <Video className="w-5 h-5 text-blue-600" />
                          Video Formats
                        </h5>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {downloadFormats.video.map((format) => {
                            const IconComponent = format.icon;
                            return (
                              <div key={format.format} className="group">
                                <div className="p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-300 transition-all duration-200 hover:shadow-md">
                                  <div className="flex items-center gap-3 mb-3">
                                    <IconComponent className={`w-5 h-5 ${format.color}`} />
                                    <div>
                                      <h6 className="font-semibold text-gray-800 text-sm">{format.name}</h6>
                                      <p className="text-xs text-gray-600">{format.description}</p>
                                    </div>
                                  </div>
                                  <select
                                    className="w-full p-2 border border-gray-300 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    defaultValue={format.qualities[2] || format.qualities[0]}
                                  >
                                    {format.qualities.map(quality => (
                                      <option key={quality} value={quality}>{quality}</option>
                                    ))}
                                  </select>
                                  <button
                                    onClick={() => handleDownload(format.format, 'best')}
                                    disabled={downloadLoading}
                                    className="w-full px-4 py-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                                  >
                                    {downloadLoading ? 'Downloading...' : 'Download'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Audio Formats */}
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                          <Music className="w-5 h-5 text-orange-600" />
                          Audio Only
                        </h5>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {downloadFormats.audio.map((format) => {
                            const IconComponent = format.icon;
                            return (
                              <div key={format.format} className="group">
                                <div className="p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-orange-300 transition-all duration-200 hover:shadow-md">
                                  <div className="flex items-center gap-3 mb-3">
                                    <IconComponent className={`w-5 h-5 ${format.color}`} />
                                    <div>
                                      <h6 className="font-semibold text-gray-800 text-sm">{format.name}</h6>
                                      <p className="text-xs text-gray-600">{format.description}</p>
                                    </div>
                                  </div>
                                  <select
                                    className="w-full p-2 border border-gray-300 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    defaultValue={format.qualities[0]}
                                  >
                                    {format.qualities.map(quality => (
                                      <option key={quality} value={quality}>{quality}</option>
                                    ))}
                                  </select>
                                  <button
                                    onClick={() => handleDownload(format.format, 'best')}
                                    disabled={downloadLoading}
                                    className="w-full px-4 py-2 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                                  >
                                    {downloadLoading ? 'Downloading...' : 'Download'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Batch Download */}
                      <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
                        <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <Download className="w-5 h-5 text-purple-600" />
                          Batch Download
                        </h5>
                        <p className="text-sm text-gray-600 mb-4">
                          Download multiple formats at once for maximum flexibility
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => {
                              handleDownload('mp4', 'best');
                              setTimeout(() => handleDownload('mp3', '320kbps'), 1000);
                            }}
                            disabled={downloadLoading}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                          >
                            Video + Audio
                          </button>
                          <button
                            onClick={() => {
                              handleDownload('mp4', 'best');
                              setTimeout(() => handleDownload('webm', 'best'), 1000);
                            }}
                            disabled={downloadLoading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                          >
                            MP4 + WebM
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Instructions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full -translate-y-16 -translate-x-16"></div>
            
            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600" />
                How to Use
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {[
                    "Copy the URL of your favorite video",
                    "Paste it in the input field above", 
                    "Click 'Get Video Info' to analyze"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 font-medium">{step}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {[
                    "Choose your preferred quality",
                    "Click download and wait for magic",
                    "Enjoy your video offline!"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 4}
                      </div>
                      <p className="text-gray-700 font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Pro Tips</h4>
                    <p className="text-gray-600">
                      Our downloader supports the highest quality available for each platform. 
                      For the best experience, ensure you have a stable internet connection during download.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

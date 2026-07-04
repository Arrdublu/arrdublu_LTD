'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from '@/components/magazine/SocialShare';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Edit, 
  X, 
  Plus, 
  Trash2, 
  Loader2 
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { saveCaseStudy, getInlineEditMode } from '@/lib/portfolio-actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const InlineEditableText = ({
  value,
  onSave,
  className,
  isTextArea = false,
}: {
  value: string;
  onSave: (newValue: string) => void;
  className: string;
  isTextArea?: boolean;
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    if (localValue !== value) {
      onSave(localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isTextArea && e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  if (isTextArea) {
    return (
      <textarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        className={`${className} w-full bg-slate-900/30 border border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded px-2 py-1 outline-none transition-all resize-y min-h-[80px] text-white`}
      />
    );
  }

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} w-full bg-slate-900/30 border border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded px-2 py-0.5 outline-none transition-all text-white`}
    />
  );
};

const icons: { [key: string]: React.ElementType } = {
  CheckCircle,
  Users,
  MessageSquare,
  TrendingUp,
};

const ADMIN_EMAILS = ['arrdublu@gmail.com', 'hi@arrdublu.us'];

export function ViralPostClient({ caseStudy }: { caseStudy: any }) {
  const [studyData, setStudyData] = useState(caseStudy);
  const [isMounted, setIsMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isInlineEditEnabled, setIsInlineEditEnabled] = useState(false);

  // Form Fields State
  const [editedTitle, setEditedTitle] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedHeroImage, setEditedHeroImage] = useState('');
  const [editedOverview, setEditedOverview] = useState('');
  const [editedChallenge, setEditedChallenge] = useState('');
  const [editedSolution, setEditedSolution] = useState('');
  const [editedResults, setEditedResults] = useState('');
  const [editedInstagramEmbed, setEditedInstagramEmbed] = useState('');
  const [editedMetrics, setEditedMetrics] = useState<any[]>([]);
  const [editedServices, setEditedServices] = useState<any[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    setStudyData(caseStudy);
  }, [caseStudy]);

  useEffect(() => {
    setIsMounted(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && ADMIN_EMAILS.includes(currentUser.email || '')) {
        setIsAdmin(true);
        getInlineEditMode().then(enabled => {
          setIsInlineEditEnabled(enabled);
        });
      } else {
        setIsAdmin(false);
      }
    });

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      unsubscribe();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleInlineSave = async (field: string, newValue: string) => {
    const updatedData = {
      ...studyData,
      [field]: newValue,
    };
    
    setStudyData(updatedData);

    try {
      const result = await saveCaseStudy('viral-post', updatedData);
      if (result && result.success) {
        toast({
          title: 'Auto-Saved',
          description: `Successfully auto-saved changes to ${field}.`,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to auto-save changes.',
          variant: 'destructive',
        });
        setStudyData(studyData);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while saving.',
        variant: 'destructive',
      });
      setStudyData(studyData);
    }
  };

  const handleOpenEdit = () => {
    setEditedTitle(studyData.title || '');
    setEditedCategory(studyData.category || '');
    setEditedHeroImage(studyData.heroImage || '');
    setEditedOverview(studyData.overview || '');
    setEditedChallenge(studyData.challenge || '');
    setEditedSolution(studyData.solution || '');
    setEditedResults(studyData.results || '');
    setEditedInstagramEmbed(studyData.instagramEmbed || '');
    setEditedMetrics(JSON.parse(JSON.stringify(studyData.keyMetrics || [])));
    setEditedServices(JSON.parse(JSON.stringify(studyData.services || [])));
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const updatedData = {
      title: editedTitle,
      category: editedCategory,
      heroImage: editedHeroImage,
      dataAiHint: studyData.dataAiHint || 'case study',
      url: studyData.url || '/discover/case-studies/viral-post',
      overview: editedOverview,
      challenge: editedChallenge,
      solution: editedSolution,
      results: editedResults,
      instagramEmbed: editedInstagramEmbed,
      keyMetrics: editedMetrics,
      services: editedServices
    };

    try {
      const result = await saveCaseStudy('viral-post', updatedData);
      if (result && result.success) {
        setStudyData(updatedData);
        setIsEditing(false);
        toast({
          title: 'Success',
          description: 'Case study details updated successfully.'
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to save changes.',
          variant: 'destructive'
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-background text-foreground relative">
      {/* Admin Operations Top Bar */}
      {isAdmin && (
        <div className="bg-slate-900 border-b border-cyan-500/30 text-white px-4 py-3 sticky top-0 z-50 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">Admin Mode Activated</span>
          </div>
          <Button 
            onClick={handleOpenEdit} 
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-sans text-xs px-4 py-1.5 h-auto transition-all"
          >
            <Edit className="w-3.5 h-3.5 mr-2" />
            Edit Case Study
          </Button>
        </div>
      )}

      <header className="relative h-[60vh] w-full">
        {studyData.heroImage && (
          <Image
            src={studyData.heroImage}
            alt={studyData.title}
            fill
            className="object-cover"
            data-ai-hint={studyData.dataAiHint}
            priority
            sizes="100vw"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="container mx-auto px-4 absolute bottom-0 pb-12">
          <Badge variant="secondary" className="mb-4">{studyData.category}</Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">
            {isAdmin && isInlineEditEnabled ? (
              <InlineEditableText
                value={studyData.title}
                onSave={(val) => handleInlineSave('title', val)}
                className="text-primary font-bold"
              />
            ) : (
              studyData.title
            )}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-headline font-semibold text-primary mb-4">Project Overview</h2>
            {isAdmin && isInlineEditEnabled ? (
              <InlineEditableText
                value={studyData.overview}
                onSave={(val) => handleInlineSave('overview', val)}
                className="text-lg text-foreground/80 leading-relaxed"
                isTextArea
              />
            ) : (
              <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                {studyData.overview}
              </p>
            )}
          </section>

          {studyData.keyMetrics && studyData.keyMetrics.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {studyData.keyMetrics.map((item: any, idx: number) => {
                  const Icon = icons[item.icon];
                  return (
                    <div key={idx} className="p-6 bg-muted/50 rounded-lg">
                      {Icon && <Icon className="h-10 w-10 text-primary mx-auto mb-4" />}
                      <p className="text-4xl font-bold text-accent-foreground dark:text-accent">{item.metric}</p>
                      <p className="text-muted-foreground mt-2">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <Separator className="my-12" />

          <div className="grid md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">The Challenge</h2>
              {isAdmin && isInlineEditEnabled ? (
                <InlineEditableText
                  value={studyData.challenge}
                  onSave={(val) => handleInlineSave('challenge', val)}
                  className="text-foreground/80 leading-relaxed"
                  isTextArea
                />
              ) : (
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                  {studyData.challenge}
                </p>
              )}
            </section>
            <section>
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Our Solution</h2>
              {isAdmin && isInlineEditEnabled ? (
                <InlineEditableText
                  value={studyData.solution}
                  onSave={(val) => handleInlineSave('solution', val)}
                  className="text-foreground/80 leading-relaxed"
                  isTextArea
                />
              ) : (
                <p className="text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">{studyData.solution}</p>
              )}
            </section>
          </div>
          
          {studyData.services && studyData.services.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Services Provided</h2>
              <ul className="space-y-4">
                {studyData.services.map((service: any, index: number) => {
                  const Icon = icons[service.icon] || CheckCircle;
                  return (
                    <li key={index} className="flex items-start">
                      {Icon && <Icon className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />}
                      <span className="text-foreground/80 leading-relaxed">{service.name}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <Separator className="my-12" />

          <section className="mb-12">
            <h2 className="text-3xl font-headline font-semibold text-primary mb-4">The Results</h2>
            {isAdmin && isInlineEditEnabled ? (
              <InlineEditableText
                value={studyData.results}
                onSave={(val) => handleInlineSave('results', val)}
                className="text-lg text-foreground/80 leading-relaxed"
                isTextArea
              />
            ) : (
              <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                {studyData.results}
              </p>
            )}
          </section>

          {isMounted && studyData.instagramEmbed && (
            <section className="mb-12">
              <h2 className="text-3xl font-headline font-semibold text-primary mb-8 text-center">The Post That Sparked It All</h2>
              <div className="flex justify-center">
                <div className="w-full max-w-lg" dangerouslySetInnerHTML={{ __html: studyData.instagramEmbed }} />
              </div>
            </section>
          )}

          <div className="text-center bg-muted/30 p-8 rounded-xl">
            <SocialShare url={studyData.url} title={studyData.title} image={studyData.heroImage} />
          </div>
        </div>
      </div>

      {/* Beautiful High-Fidelity Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-slate-950 border border-slate-800 rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div>
                <h2 className="text-xl font-semibold text-white">Edit Case Study Data</h2>
                <p className="text-xs text-slate-400 mt-1">Modify fields for the &apos;{studyData.title}&apos; case study page.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 flex-grow max-h-[60vh] text-left">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">General Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Case Study Title</label>
                    <Input value={editedTitle} onChange={e => setEditedTitle(e.target.value)} className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Category / Badge</label>
                    <Input value={editedCategory} onChange={e => setEditedCategory(e.target.value)} className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">Hero Image URL</label>
                  <Input value={editedHeroImage} onChange={e => setEditedHeroImage(e.target.value)} className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500" />
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">Main Narrative</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">Project Overview</label>
                  <Textarea value={editedOverview} onChange={e => setEditedOverview(e.target.value)} rows={3} className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">The Challenge</label>
                  <Textarea value={editedChallenge} onChange={e => setEditedChallenge(e.target.value)} rows={3} className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">Our Solution</label>
                  <Textarea value={editedSolution} onChange={e => setEditedSolution(e.target.value)} rows={3} className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">The Results</label>
                  <Textarea value={editedResults} onChange={e => setEditedResults(e.target.value)} rows={3} className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500" />
                </div>
              </div>

              {/* Media Embed */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">Instagram Media Embed</h3>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">Instagram Embed HTML (Blockquote / Script)</label>
                  <Textarea value={editedInstagramEmbed} onChange={e => setEditedInstagramEmbed(e.target.value)} rows={4} className="bg-slate-900 border-slate-800 font-mono text-xs text-slate-300 focus:border-cyan-500" />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">Key Metrics (3 Slots)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {editedMetrics.map((metric: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg space-y-3">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Metric #{idx + 1}</span>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400">Value (e.g. 500%)</label>
                        <Input 
                          value={metric.metric} 
                          onChange={e => {
                            const newMetrics = [...editedMetrics];
                            newMetrics[idx].metric = e.target.value;
                            setEditedMetrics(newMetrics);
                          }}
                          className="bg-slate-950 border-slate-800 text-xs h-8 text-white focus:border-cyan-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400">Label (e.g. Increase in Foot Traffic)</label>
                        <Input 
                          value={metric.label} 
                          onChange={e => {
                            const newMetrics = [...editedMetrics];
                            newMetrics[idx].label = e.target.value;
                            setEditedMetrics(newMetrics);
                          }}
                          className="bg-slate-950 border-slate-800 text-xs h-8 text-white focus:border-cyan-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400">Icon Type</label>
                        <select
                          value={metric.icon}
                          onChange={e => {
                            const newMetrics = [...editedMetrics];
                            newMetrics[idx].icon = e.target.value;
                            setEditedMetrics(newMetrics);
                          }}
                          className="w-full bg-slate-950 border border-slate-800 text-xs h-8 text-white rounded px-2 cursor-pointer focus:border-cyan-500"
                        >
                          <option value="CheckCircle">CheckCircle</option>
                          <option value="Users">Users</option>
                          <option value="MessageSquare">MessageSquare</option>
                          <option value="TrendingUp">TrendingUp</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Provided */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Services Provided</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditedServices([...editedServices, { name: 'New Service', icon: 'CheckCircle' }])}
                    className="h-7 text-[10px] border-slate-800 text-slate-300 hover:text-white"
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add Service
                  </Button>
                </div>
                <div className="space-y-3">
                  {editedServices.map((service: any, idx: number) => (
                    <div key={idx} className="flex gap-3 items-center bg-slate-900/20 p-2.5 border border-slate-900 rounded-lg">
                      <span className="text-[10px] font-mono text-slate-500 w-6">{idx + 1}</span>
                      <div className="flex-grow">
                        <Input 
                          value={service.name} 
                          onChange={e => {
                            const newServices = [...editedServices];
                            newServices[idx].name = e.target.value;
                            setEditedServices(newServices);
                          }}
                          placeholder="Service Name"
                          className="bg-slate-900 border-slate-800 text-xs h-8 text-white focus:border-cyan-500"
                        />
                      </div>
                      <div className="w-32 flex-shrink-0">
                        <select
                          value={service.icon}
                          onChange={e => {
                            const newServices = [...editedServices];
                            newServices[idx].icon = e.target.value;
                            setEditedServices(newServices);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 text-xs h-8 text-white rounded px-2 cursor-pointer focus:border-cyan-500"
                        >
                          <option value="CheckCircle">CheckCircle</option>
                          <option value="Users">Users</option>
                          <option value="MessageSquare">MessageSquare</option>
                          <option value="TrendingUp">TrendingUp</option>
                        </select>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newServices = editedServices.filter((_: any, i: number) => i !== idx);
                          setEditedServices(newServices);
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-red-950/20 h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/30">
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving} className="border-slate-800 text-slate-300 hover:text-white">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-cyan-600 hover:bg-cyan-500 text-white min-w-[100px]">
                {isSaving ? (
                  <div className="flex items-center gap-1">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </div>
                ) : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

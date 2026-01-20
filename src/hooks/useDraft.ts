import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface DraftData<T> {
  data: T;
  createdAt: string;
  expiresAt: string;
  moduleName: string;
  entityType: string;
  lastModified: string;
}

interface UseDraftOptions {
  moduleName: string;
  entityType: string;
  expirationDays?: number; // Default: 7 days
}

const DRAFT_STORAGE_KEY = 'cadastro_drafts';

function getDraftsFromStorage(): Record<string, DraftData<any>> {
  try {
    const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveDraftsToStorage(drafts: Record<string, DraftData<any>>) {
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(drafts));
}

function generateDraftKey(moduleName: string, entityType: string): string {
  return `${moduleName}_${entityType}`;
}

function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

function getDaysUntilExpiration(expiresAt: string): number {
  const now = new Date();
  const expires = new Date(expiresAt);
  const diffTime = expires.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function useDraft<T extends Record<string, any>>({
  moduleName,
  entityType,
  expirationDays = 7
}: UseDraftOptions) {
  const draftKey = generateDraftKey(moduleName, entityType);
  const [hasDraft, setHasDraft] = useState(false);
  const [draftInfo, setDraftInfo] = useState<{ 
    createdAt: string; 
    expiresAt: string;
    daysRemaining: number;
  } | null>(null);

  // Check for existing draft on mount
  useEffect(() => {
    const drafts = getDraftsFromStorage();
    const existingDraft = drafts[draftKey];
    
    if (existingDraft) {
      if (isExpired(existingDraft.expiresAt)) {
        // Remove expired draft
        delete drafts[draftKey];
        saveDraftsToStorage(drafts);
        setHasDraft(false);
        setDraftInfo(null);
      } else {
        setHasDraft(true);
        setDraftInfo({
          createdAt: existingDraft.createdAt,
          expiresAt: existingDraft.expiresAt,
          daysRemaining: getDaysUntilExpiration(existingDraft.expiresAt)
        });
      }
    }
  }, [draftKey]);

  const saveDraft = useCallback((data: T) => {
    const drafts = getDraftsFromStorage();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    
    const draft: DraftData<T> = {
      data,
      createdAt: drafts[draftKey]?.createdAt || now.toISOString(),
      lastModified: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      moduleName,
      entityType
    };
    
    drafts[draftKey] = draft;
    saveDraftsToStorage(drafts);
    
    setHasDraft(true);
    setDraftInfo({
      createdAt: draft.createdAt,
      expiresAt: draft.expiresAt,
      daysRemaining: expirationDays
    });
    
    toast.success('Rascunho salvo', {
      description: `Válido por ${expirationDays} dias. Complete o cadastro antes de ${expiresAt.toLocaleDateString('pt-BR')}.`
    });
    
    return true;
  }, [draftKey, moduleName, entityType, expirationDays]);

  const loadDraft = useCallback((): T | null => {
    const drafts = getDraftsFromStorage();
    const existingDraft = drafts[draftKey];
    
    if (existingDraft && !isExpired(existingDraft.expiresAt)) {
      return existingDraft.data as T;
    }
    
    return null;
  }, [draftKey]);

  const discardDraft = useCallback(() => {
    const drafts = getDraftsFromStorage();
    delete drafts[draftKey];
    saveDraftsToStorage(drafts);
    
    setHasDraft(false);
    setDraftInfo(null);
    
    toast.info('Rascunho descartado');
  }, [draftKey]);

  const clearDraftOnSave = useCallback(() => {
    const drafts = getDraftsFromStorage();
    delete drafts[draftKey];
    saveDraftsToStorage(drafts);
    
    setHasDraft(false);
    setDraftInfo(null);
  }, [draftKey]);

  return {
    hasDraft,
    draftInfo,
    saveDraft,
    loadDraft,
    discardDraft,
    clearDraftOnSave
  };
}

// Utility to get all drafts for a module
export function getAllDrafts(moduleName?: string): DraftData<any>[] {
  const drafts = getDraftsFromStorage();
  const allDrafts = Object.values(drafts).filter(d => !isExpired(d.expiresAt));
  
  if (moduleName) {
    return allDrafts.filter(d => d.moduleName === moduleName);
  }
  
  return allDrafts;
}

// Utility to clean expired drafts
export function cleanExpiredDrafts(): number {
  const drafts = getDraftsFromStorage();
  let cleaned = 0;
  
  for (const key in drafts) {
    if (isExpired(drafts[key].expiresAt)) {
      delete drafts[key];
      cleaned++;
    }
  }
  
  if (cleaned > 0) {
    saveDraftsToStorage(drafts);
  }
  
  return cleaned;
}

// hooks/use-toast.ts
'use client'


export function useToast() {
  return {
    toasts: [],
    toast: () => {},
    dismiss: () => {},
  }
}
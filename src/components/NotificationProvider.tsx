'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type NotifyOptions = {
  title?: string;
  message: string;
  confirmText?: string;
};

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

type ModalConfig =
  | ({
      variant: 'info';
    } & Required<Pick<NotifyOptions, 'message'>> &
    Pick<NotifyOptions, 'title' | 'confirmText'>)
  | ({
      variant: 'confirm';
    } & Required<Pick<ConfirmOptions, 'message'>> &
    Pick<ConfirmOptions, 'title' | 'confirmText' | 'cancelText'>);

type Resolver =
  | { variant: 'info'; resolve: () => void }
  | { variant: 'confirm'; resolve: (value: boolean) => void };

type NotificationContextValue = {
  notify: (options: NotifyOptions) => Promise<void>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ModalConfig | null>(null);
  const [resolver, setResolver] = useState<Resolver | null>(null);

  const closeModal = () => {
    setConfig(null);
    setResolver(null);
  };

  const notify = async ({
    title = 'Heads up',
    message,
    confirmText = 'Got it',
  }: NotifyOptions) => {
    return new Promise<void>((resolve) => {
      setConfig({
        variant: 'info',
        title,
        message,
        confirmText,
      });
      setResolver({ variant: 'info', resolve });
    });
  };

  const confirm = async ({
    title = 'Are you sure?',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
  }: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setConfig({
        variant: 'confirm',
        title,
        message,
        confirmText,
        cancelText,
      });
      setResolver({ variant: 'confirm', resolve });
    });
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!config) return;
      if (event.key === 'Escape') {
        if (resolver?.variant === 'confirm') {
          resolver.resolve(false);
        } else if (resolver?.variant === 'info') {
          resolver.resolve();
        }
        closeModal();
      }
    };

    if (config) {
      document.addEventListener('keydown', handleKey);
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [config, resolver]);

  const handlePrimary = () => {
    if (resolver?.variant === 'confirm') {
      resolver.resolve(true);
    } else if (resolver?.variant === 'info') {
      resolver.resolve();
    }
    closeModal();
  };

  const handleSecondary = () => {
    if (resolver?.variant === 'confirm') {
      resolver.resolve(false);
    } else if (resolver?.variant === 'info') {
      resolver?.resolve();
    }
    closeModal();
  };

  return (
    <NotificationContext.Provider value={{ notify, confirm }}>
      {children}
      {config && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 px-4">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            onClick={handleSecondary}
          />
          <div className="relative z-[1001] w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {config.title && (
              <h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
            )}
            <p className="mt-3 text-sm text-gray-600 whitespace-pre-line">{config.message}</p>
            <div className="mt-6 flex justify-end gap-3">
              {config.variant === 'confirm' && (
                <button
                  onClick={handleSecondary}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {config.cancelText || 'Cancel'}
                </button>
              )}
              <button
                onClick={handlePrimary}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {config.confirmText || 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}

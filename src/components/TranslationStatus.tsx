import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface Props {
  isSuccess: boolean;
  isError: boolean;
  error: unknown;
  data?: { path: string };
}

export function TranslationStatus({ isSuccess, isError, error, data }: Props) {
  if (!isSuccess && !isError) return null;

  if (isSuccess) {
    return (
      <div className="rounded-lg bg-green-50 p-4 flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium text-green-800">Translation Complete!</div>
          <div className="mt-1 text-sm text-green-600">
            File saved at: {data?.path}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : typeof error === 'string' 
        ? error 
        : 'An unknown error occurred';

    return (
      <div className="rounded-lg bg-red-50 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium text-red-800">Translation Failed</div>
          <div className="mt-1 text-sm text-red-600">
            {errorMessage}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
import React from 'react';
import { Loader2, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
    fullScreen?: boolean;
    text?: string;
    className?: string;
}

export default function Loading({
    size = 'md',
    variant = 'spinner',
    fullScreen = false,
    text = 'Loading...',
    className,
}: LoadingProps) {
    // Size mappings
    const sizeMap = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    const textSizeMap = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
    };

    // Spinner variant
    if (variant === 'spinner') {
        return (
            <div className={cn(
                'flex flex-col items-center justify-center gap-4',
                fullScreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
                className
            )}>
                <div className="relative">
                    {/* Outer ring */}
                    <div className={cn(
                        'rounded-full border-4 border-muted',
                        sizeMap[size]
                    )} />

                    {/* Spinning loader */}
                    <Loader2 className={cn(
                        'absolute inset-0 animate-spin text-primary',
                        sizeMap[size]
                    )} />

                    {/* Glow effect */}
                    <div className={cn(
                        'absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse',
                        sizeMap[size]
                    )} />
                </div>

                {text && (
                    <div className="flex flex-col items-center gap-1">
                        <p className={cn(
                            'font-medium text-foreground',
                            textSizeMap[size]
                        )}>
                            {text}
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Please wait</span>
                            <span className="inline-flex gap-1">
                                <span className="animate-bounce delay-0 text-primary">.</span>
                                <span className="animate-bounce delay-150 text-primary">.</span>
                                <span className="animate-bounce delay-300 text-primary">.</span>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Dots variant
    if (variant === 'dots') {
        return (
            <div className={cn(
                'flex flex-col items-center justify-center gap-4',
                fullScreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
                className
            )}>
                <div className="flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                'rounded-full bg-primary animate-bounce',
                                size === 'sm' && 'h-2 w-2',
                                size === 'md' && 'h-3 w-3',
                                size === 'lg' && 'h-4 w-4',
                                size === 'xl' && 'h-5 w-5',
                            )}
                            style={{
                                animationDelay: `${i * 150}ms`,
                                animationDuration: '1s',
                            }}
                        />
                    ))}
                </div>
                {text && (
                    <p className={cn(
                        'font-medium text-foreground',
                        textSizeMap[size]
                    )}>
                        {text}
                    </p>
                )}
            </div>
        );
    }

    // Pulse variant
    if (variant === 'pulse') {
        return (
            <div className={cn(
                'flex flex-col items-center justify-center gap-4',
                fullScreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
                className
            )}>
                <div className="relative">
                    <div className={cn(
                        'rounded-full bg-primary/10 animate-pulse',
                        sizeMap[size]
                    )}>
                        <Sparkles className={cn(
                            'absolute inset-0 m-auto text-primary animate-spin-slow',
                            sizeMap[size]
                        )} />
                    </div>
                </div>
                {text && (
                    <p className={cn(
                        'font-medium text-foreground',
                        textSizeMap[size]
                    )}>
                        {text}
                    </p>
                )}
            </div>
        );
    }

    // Skeleton variant
    if (variant === 'skeleton') {
        return (
            <div className={cn(
                'flex flex-col items-center justify-center gap-6 w-full max-w-md',
                fullScreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
                className
            )}>
                <div className="w-full space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                            <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                        <div className="h-4 w-4/6 bg-muted rounded animate-pulse" />
                    </div>

                    <div className="flex gap-2">
                        <div className="h-10 w-24 bg-muted rounded animate-pulse" />
                        <div className="h-10 w-24 bg-muted rounded animate-pulse" />
                    </div>
                </div>

                {text && (
                    <p className="text-sm text-muted-foreground">{text}</p>
                )}
            </div>
        );
    }

    // Default fallback
    return (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}
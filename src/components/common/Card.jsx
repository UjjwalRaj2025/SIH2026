import React from 'react';

export default function Card({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  variant = 'white', // 'white' | 'subtle' | 'navy'
  glow = false,
  glowColor = 'teal',
  ...props
}) {
  const variantStyles = {
    white: 'bg-white border-slate-200 text-slate-800 shadow-card hover:shadow-hover',
    subtle: 'bg-slate-50/80 border-slate-200 text-slate-800 shadow-subtle',
    navy: 'bg-navy-900 border-navy-800 text-white shadow-elevated',
  };

  const glowStyles = glow
    ? glowColor === 'rose' || glowColor === 'critical'
      ? 'border-red-300 ring-2 ring-red-100 shadow-md'
      : glowColor === 'amber' || glowColor === 'warning'
      ? 'border-amber-300 ring-2 ring-amber-100 shadow-md'
      : 'border-teal-300 ring-2 ring-teal-100 shadow-md'
    : '';

  const isNavy = variant === 'navy';

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col ${variantStyles[variant] || variantStyles.white} ${glowStyles} ${className}`}
      {...props}
    >
      {(title || subtitle || Icon || action) && (
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between gap-3 ${
            isNavy ? 'border-navy-800' : 'border-slate-100'
          } ${headerClassName}`}
        >
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className={`p-2.5 rounded-xl border ${
                  isNavy
                    ? 'bg-navy-800 border-navy-700 text-teal-400'
                    : 'bg-teal-50 border-teal-200 text-teal-700'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
              </div>
            )}
            <div>
              {title && (
                <h3
                  className={`font-bold text-base sm:text-lg tracking-tight ${
                    isNavy ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  className={`text-xs sm:text-sm mt-0.5 ${
                    isNavy ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-4 sm:p-5 flex-1 ${bodyClassName}`}>{children}</div>
    </div>
  );
}

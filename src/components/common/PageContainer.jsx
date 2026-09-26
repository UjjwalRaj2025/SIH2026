import React from 'react';

export default function PageContainer({
  children,
  title,
  subtitle,
  actions,
  badge,
  breadcrumbs,
  className = '',
  maxWidth = 'max-w-7xl',
  withPattern = false,
}) {
  return (
    <div className={`w-full ${withPattern ? 'bg-mountain-pattern' : ''} ${className}`}>
      <div className={`w-full ${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8`}>
        {/* Optional Breadcrumb Navigation */}
        {breadcrumbs && (
          <nav className="text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
            {breadcrumbs}
          </nav>
        )}

        {/* Optional Page Header */}
        {(title || subtitle || actions || badge) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                {title && (
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {title}
                  </h1>
                )}
                {badge && <div className="shrink-0">{badge}</div>}
              </div>
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {actions && <div className="flex items-center gap-2.5 flex-wrap shrink-0">{actions}</div>}
          </div>
        )}

        {/* Page Main Content */}
        {children}
      </div>
    </div>
  );
}

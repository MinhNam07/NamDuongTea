/** Main content shell. Header offset for non-hero pages lives on each page root. */
export function FrontendMain({ children }: { children: React.ReactNode }) {
  return <main className="flex-1">{children}</main>;
}

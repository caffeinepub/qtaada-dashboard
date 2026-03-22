interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-card rounded-xl shadow-card">
      <div className="w-16 h-16 rounded-2xl bg-blue-accent/10 flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="font-display font-700 text-xl text-foreground mb-2">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">
        Bagian ini akan segera hadir.
      </p>
    </div>
  );
}

export default function CastingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#F6F4EF" }} // stesso mood del brief
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
        {children}
      </div>
    </div>
  );
}

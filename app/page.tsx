export default function Home() {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center flex-col">
      <main className="container mx-auto text-center flex-1 flex items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">cement heat</h1>
          <p>check the heat of the cement for your dog</p>
        </div>
      </main>
      <footer className="mt-8 text-xs text-gray-600 text-center max-w-2xl">
        <p><strong>Disclaimer:</strong> This is just a rough guess, not real advice and isn&apos;t an accurate reading as we don&apos;t have a thermometer measuring every part of the cement. Direct sun can make the cement hotter than it is in the shade. Use your own judgement.</p>
      </footer>
    </div>
  );
}
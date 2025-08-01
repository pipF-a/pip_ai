import { Header } from "@/components/Header";
import { TypewriterText } from "@/components/TypewriterText";
import { DirectoryTree } from "@/components/DirectoryTree";
import { projectStructure, rootFiles } from "@/data/projectStructure";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 grid grid-cols-[300px_1fr] min-h-0">
        <aside className="overflow-y-auto">
          <DirectoryTree items={[projectStructure, ...rootFiles]} />
        </aside>
        <section className="flex items-center justify-center p-8">
          <TypewriterText text="Welcome to pip_ai" />
        </section>
      </main>
    </div>
  );
}

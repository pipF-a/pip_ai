import { Header } from "@/components/Header";
import { DirectoryTree } from "@/components/DirectoryTree";
import { PageOverlay } from "@/components/PageOverlay";
import { projectStructure, rootFiles } from "@/data/projectStructure";

export default function Home() {
  return (
    <PageOverlay>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 grid grid-cols-[200px_1fr] min-h-0">
          <aside className="overflow-y-auto">
            <DirectoryTree items={[projectStructure, ...rootFiles]} />
          </aside>
          <section className="flex items-center justify-center p-8">
          </section>
        </main>
      </div>
    </PageOverlay>
  );
}

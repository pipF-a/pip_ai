import { About } from "@/components/About";
import { Header } from "@/components/Header";
import { PageOverlay } from "@/components/PageOverlay";

export default function Home() {
  return (
    <PageOverlay>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="w-full flex-1 grid grid-cols-[200px_1fr] min-h-0 max-w-[1470px] mx-auto">
          <aside className="overflow-y-auto">
          </aside>
          <section className="max-w-[1200px] w-full mx-auto">
            <About/>
          </section>
        </main>
      </div>
    </PageOverlay>
  );
}

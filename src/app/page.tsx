import { About } from "@/components/About";
import { Builtwith } from "@/components/Builtwith";
import { Header } from "@/components/Header";
import { HoolsLab } from "@/components/HooksLab";
import { PageOverlay } from "@/components/PageOverlay";

export default function Home() {
  return (
    <PageOverlay>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="w-full lg:grid lg:grid-cols-[200px_1fr] min-h-0 max-w-[1470px] mx-auto relative grid-cols-1 px-4">
          <aside className="hidden md:overflow-y-auto lg:block">
          </aside>
          <section className="w-full mx-auto block gap-10 md:grid-cols-[1fr_1fr_1fr] max-w-[1200px] grid-cols-2 sm:grid">
            <About/>
            <HoolsLab />
            <Builtwith/>
          </section>
        </main>
      </div>
    </PageOverlay>
  );
}

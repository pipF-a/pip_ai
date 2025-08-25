import { About } from "@/components/About";
import { Header } from "@/components/Header";
import { HoolsLab } from "@/components/HooksLab";
import { PageOverlay } from "@/components/PageOverlay";

export default function Home() {
  return (
    <PageOverlay>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="w-full grid grid-cols-[200px_1fr] min-h-0 max-w-[1470px] mx-auto">
          <aside className="overflow-y-auto">
          </aside>
          <section className="max-w-[1200px] w-full mx-auto grid gap-10 grid-cols-[410px_1fr]">
            <About/>
            <div className="w-full overflow-hidden">
              <HoolsLab />
            </div>
          </section>
        </main>
      </div>
    </PageOverlay>
  );
}

export default function Intro() {
    return (
        <section className="relative mt-[var(--gap)] mb-[var(--gap)] p-[var(--gap)] bg-[var(--background)]">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Hi, welcome to <span className="relative -top-1 text-2xl font-light font-mono rounded-full text-white bg-black px-4 py-2">ideasheaf</span> !  
            </h1>

            <p className="text-neutral-600 dark:text-neutral-400 py-1">
                Ideasheaf is my personal blog and knowledge wiki. It is now a collection of notes, exercises, and miscellaneous writings on mathematics, computer science, and things I find interesting.
            </p>
                
            <p className="text-neutral-600 dark:text-neutral-400 py-1">
                Inspired by the Stacks project and nLab, it aims to serve as a structured and cross-referenced wiki — primarily for private use, but shared as open knowledge.
            </p>

            <p className="text-neutral-600 dark:text-neutral-400 py-1">
                The name ideasheaf is drawn from the mathematical notion of the ideal sheaf.
            </p>

            <div className="flex gap-3 flex-wrap">
                {/* buttons */}
            </div>
        </section>
    );
}
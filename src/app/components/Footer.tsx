import Link from "next/link";
import { TbBrandGithub, TbMail, TbBrandMastodon } from "react-icons/tb";
import { Github, X } from "./Icons";

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-black/80">
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 p-[var(--gap)] text-sm text-neutral-500">
                
                {/* Left side */}
                <div>
                    Copyright © {new Date().getFullYear()}
                    <span className="ml-2 hover:text-black hover:underline">
                        Halofanctor
                    </span>

                    <span className="mx-2">·</span>

                    Licensed under
                    <a
                        className="mx-1 text-black underline"
                        href="https://creativecommons.org/licenses/by-sa/4.0/"
                    >
                        CC BY-SA 4.0
                    </a>
                </div>

                {/* Right side */}
                <div className="flex items-center">
                    <Link
                        href = "https://github.com/halofanctor" 
                        className="pr-1 text-2xl hover:text-black hover:rotate-5"
                    >
                        <TbBrandGithub />
                    </Link>
                    <Link
                        href = "mailto:halofanctor@gmail.com" 
                        className="pr-1 text-2xl hover:text-black hover:rotate-5"
                    >
                        <TbMail />
                    </Link>
                    <Link
                        href = "https://mastodon.social/@holofunctor" 
                        className="text-2xl hover:text-black hover:rotate-5"
                    >
                        <TbBrandMastodon />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

import { SERVICE_CATEGORIES } from "@/lib/clinic";

export default function ServiceNavigation() {
  return (
    <nav
      aria-label="Explore our services"
      className="border-y border-sand/80 bg-porcelain py-7 sm:py-8"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-copper sm:text-[10px]">
            Explore our services
          </p>
          <p className="text-[9px] uppercase tracking-[0.18em] text-plum/40">
            Six areas of care
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {SERVICE_CATEGORIES.map((category) => (
            <a
              key={category.number}
              href="#treatments"
              className="group flex items-center gap-2 border-b border-sand/70 pb-3 text-xs font-medium text-plum/70 transition-colors duration-300 hover:border-copper hover:text-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper sm:text-[13px]"
            >
              <span className="font-display text-sm italic text-copper/70">
                {category.number}
              </span>
              <span>{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

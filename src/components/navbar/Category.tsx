"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { categories } from "./categories";

const CategoryTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // ✅ Only category
  const activeCategory = searchParams.get("category") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams();

    // 🔥 Only category থাকবে
    if (value !== "all") {
      params.set("category", value);
    }

    // replace ব্যবহার করলে history clean থাকবে
    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
    );
  };

  return (
    <div className="w-full border-b bg-white sticky top-16 z-40">
      <Tabs value={activeCategory} onValueChange={handleChange}>
        <TabsList className="flex w-full overflow-x-auto justify-start bg-transparent gap-6 px-4 py-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="
                  relative 
                  flex 
                  flex-col 
                  items-center 
                  gap-1 
                  text-xs 
                  rounded-none 
                  bg-transparent 
                  px-3 
                  py-2
                  text-muted-foreground
                  data-[state=active]:text-black
                  after:absolute
                  after:-bottom-2
                  after:left-1/2
                  after:-translate-x-1/2
                  after:h-[2px]
                  after:w-6
                  after:bg-black
                  after:scale-x-0
                  after:transition-transform
                  data-[state=active]:after:scale-x-100
                "
              >
                <Icon size={20} />
                {category.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;

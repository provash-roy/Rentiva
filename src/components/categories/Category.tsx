"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { categories } from "./data";

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams();

    if (value !== "all") {
      params.set("category", value);
    }

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
    );
  };

  return (
    <div className="w-full border-b bg-white sticky top-16 z-40 ">
      <Tabs value={activeCategory} onValueChange={handleChange}>
        <TabsList variant="line" className="w-full h-16 bg-white px-4 py-2">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="
                 
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

export default Category;

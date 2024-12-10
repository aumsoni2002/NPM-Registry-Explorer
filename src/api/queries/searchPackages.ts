import type { PackageSummary } from "../types/packageSummary";

interface SearchResponse {
  objects: {
    package: {
      name: string;
      version: string;
      description: string;
      keywords: string[];
    };
  }[];
}
export async function searchPackages(term: string): Promise<PackageSummary[]> {
  const res = await fetch(
    `https://registry.npmjs.org/-/v1/search?text=${term}`
  );

  const data: SearchResponse = await res.json();

  return data.objects.map((searchResponse) => {
    return {
      name: searchResponse.package.name,
      description: searchResponse.package.description,
      version: searchResponse.package.version,
      keywords: searchResponse.package.keywords,
    };
  });
}

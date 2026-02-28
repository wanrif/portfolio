type Locale = 'en' | 'id';

const isLocalizedFile = (path: string): boolean => path.endsWith('.en.mdx') || path.endsWith('.id.mdx');

export const getLocalizedModule = <TModule>(modules: Record<string, TModule>, locale: Locale): TModule | undefined => {
  const moduleEntries = Object.entries(modules);

  const localized = moduleEntries.find(([path]) => path.endsWith(`.${locale}.mdx`));
  if (localized) {
    return localized[1];
  }

  const fallback = moduleEntries.find(([path]) => !isLocalizedFile(path));
  return fallback?.[1];
};

export const getLocalizedModules = <TModule>(modules: Record<string, TModule>, locale: Locale): TModule[] => {
  const moduleEntries = Object.entries(modules);

  const localized = moduleEntries.filter(([path]) => path.endsWith(`.${locale}.mdx`)).map(([, module]) => module);

  if (localized.length > 0) {
    return localized;
  }

  return moduleEntries.filter(([path]) => !isLocalizedFile(path)).map(([, module]) => module);
};

export const stableSortByName = <TModule extends { meta: { name: string } }>(modules: TModule[]): TModule[] => {
  const orderedModules: TModule[] = [];

  modules.forEach((entry) => {
    const insertionIndex = orderedModules.findIndex((item) => item.meta.name.localeCompare(entry.meta.name) > 0);
    if (insertionIndex === -1) {
      orderedModules.push(entry);
      return;
    }

    orderedModules.splice(insertionIndex, 0, entry);
  });

  return orderedModules;
};

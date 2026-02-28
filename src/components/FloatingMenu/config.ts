import { GiAngelWings, GiBugleCall, GiJetFighter, GiSkills, GiSpellBook } from 'react-icons/gi';

export const SCROLL_OBSERVER_OPTIONS = {
  threshold: 0,
  rootMargin: '0px',
} as const;

export const MENU_ITEMS = [
  {
    icon: GiAngelWings,
    sectionId: 'top',
    tooltip: 'home',
  },
  {
    icon: GiJetFighter,
    sectionId: 'projects',
    tooltip: 'projects',
  },
  {
    icon: GiSpellBook,
    sectionId: 'now',
    tooltip: 'now',
  },
  {
    icon: GiSkills,
    sectionId: 'skills',
    tooltip: 'skills',
  },
  {
    icon: GiBugleCall,
    sectionId: 'contacts',
    tooltip: 'contact',
  },
] as const;

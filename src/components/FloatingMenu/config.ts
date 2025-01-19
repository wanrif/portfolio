import { GiAngelWings, GiBugleCall, GiJetFighter, GiSkills } from 'react-icons/gi';

export const SCROLL_OBSERVER_OPTIONS = {
  threshold: 0,
  rootMargin: '0px',
} as const;

export const MENU_ITEMS = [
  {
    icon: GiAngelWings,
    sectionId: 'top',
    tooltip: 'About',
  },
  {
    icon: GiJetFighter,
    sectionId: 'experiences',
    tooltip: 'Experiences',
  },
  {
    icon: GiSkills,
    sectionId: 'skills',
    tooltip: 'My Skills',
  },
  {
    icon: GiBugleCall,
    sectionId: 'contacts',
    tooltip: 'Contacts',
  },
] as const;

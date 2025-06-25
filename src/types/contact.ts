
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  company?: string;
  notes?: string;
  category: 'Personal' | 'Work' | 'Family' | 'Friend' | 'Other';
  favorite: boolean;
}

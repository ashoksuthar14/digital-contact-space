
import { Contact } from '@/types/contact';
import { ContactCard } from '@/components/ContactCard';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactList = ({ contacts, onEdit, onDelete }: ContactListProps) => {
  if (contacts.length === 0) {
    return null;
  }

  // Sort contacts: favorites first, then alphabetically
  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedContacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

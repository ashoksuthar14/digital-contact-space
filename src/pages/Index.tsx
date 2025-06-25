
import { useState, useEffect } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { ContactList } from '@/components/ContactList';
import { SearchBar } from '@/components/SearchBar';
import { Contact } from '@/types/contact';
import { Plus, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const { toast } = useToast();

  // Load contacts from localStorage on component mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    }
  }, []);

  // Save contacts to localStorage whenever contacts change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
    };
    setContacts(prev => [...prev, newContact]);
    setIsFormOpen(false);
    toast({
      title: "Contact Added",
      description: `${contact.name} has been added to your contacts.`,
    });
  };

  const updateContact = (id: string, updatedContact: Omit<Contact, 'id'>) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id ? { ...updatedContact, id } : contact
      )
    );
    setEditingContact(null);
    setIsFormOpen(false);
    toast({
      title: "Contact Updated",
      description: `${updatedContact.name} has been updated.`,
    });
  };

  const deleteContact = (id: string) => {
    const contactToDelete = contacts.find(c => c.id === id);
    setContacts(prev => prev.filter(contact => contact.id !== id));
    toast({
      title: "Contact Deleted",
      description: `${contactToDelete?.name} has been removed from your contacts.`,
      variant: "destructive",
    });
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Contact Book</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage your contacts easily and efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Phone className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{contacts.length}</h3>
            <p className="text-gray-600">Total Contacts</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{filteredContacts.length}</h3>
            <p className="text-gray-600">Filtered Results</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Plus className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              Add New Contact
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        {/* Contact List */}
        <ContactList 
          contacts={filteredContacts}
          onEdit={handleEdit}
          onDelete={deleteContact}
        />

        {/* Contact Form Modal */}
        {isFormOpen && (
          <ContactForm
            contact={editingContact}
            onSave={editingContact ? 
              (contact) => updateContact(editingContact.id, contact) : 
              addContact
            }
            onCancel={handleCloseForm}
          />
        )}

        {/* Empty State */}
        {contacts.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No contacts yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start building your contact book by adding your first contact
            </p>
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Contact
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

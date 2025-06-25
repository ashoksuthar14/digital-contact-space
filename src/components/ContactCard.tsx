
import { Contact } from '@/types/contact';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Star,
  StarOff
} from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactCard = ({ contact, onEdit, onDelete }: ContactCardProps) => {
  const getCategoryColor = (category: Contact['category']) => {
    const colors = {
      Personal: 'bg-blue-100 text-blue-800',
      Work: 'bg-green-100 text-green-800',
      Family: 'bg-purple-100 text-purple-800',
      Friend: 'bg-yellow-100 text-yellow-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category];
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {contact.name}
              </h3>
              {contact.favorite ? (
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              ) : (
                <StarOff className="h-4 w-4 text-gray-400" />
              )}
            </div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(contact.category)}`}>
              {contact.category}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span className="truncate">{contact.phone}</span>
          </div>
          
          {contact.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span className="truncate">{contact.email}</span>
            </div>
          )}
          
          {contact.company && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building className="h-4 w-4" />
              <span className="truncate">{contact.company}</span>
            </div>
          )}
          
          {contact.address && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{contact.address}</span>
            </div>
          )}
        </div>

        {contact.notes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 line-clamp-2">{contact.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(contact)}
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(contact.id)}
            className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

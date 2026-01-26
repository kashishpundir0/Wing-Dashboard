import React from 'react';
import { 
  Utensils, 
  MapPin, 
  Pizza, 
  Banknote, 
  Mail, 
  Save, 
  RotateCcw 
} from 'lucide-react';
import { Input } from '../components/Shared/Input';
import { Button } from '../components/Shared/Button';

const Restaurants = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10">
        
        {/* Header Section */}
        <div className="flex items-center gap-5 border-b border-gray-50 pb-8">
          <div className="w-16 h-16 bg-purple-50 text-[#632281] rounded-3xl flex items-center justify-center shadow-inner">
            <Utensils size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800">Restaurant Details</h3>
            <p className="text-gray-400 font-medium">Configure the venue information for planned dates</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          {/* Requirement: Name of the restaurant */}
          <Input 
            label="Restaurant Name" 
            icon={Utensils} 
            placeholder="Wisteria Chalet" 
          />

          {/* Requirement: Location */}
          <Input 
            label="Location / Address" 
            icon={MapPin} 
            placeholder="Street, City" 
          />

          {/* Requirement: Type of food available */}
          <Input 
            label="Type of Food" 
            icon={Pizza} 
            placeholder="Italian, Continental, Japanese" 
          />

          {/* Requirement: Budget per person */}
          <Input 
            label="Budget Per Person" 
            icon={Banknote} 
            type="number"
            placeholder="Average cost 50" 
          />

          {/* Requirement: Email ID of the restaurant */}
          <div className="md:col-span-2">
            <Input 
              label="Restaurant Email Address" 
              icon={Mail} 
              type="email"
              placeholder="wisteriachalet.com" 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 py-4 flex items-center justify-center gap-2 shadow-lg shadow-purple-100">
            <Save size={20} />
            <span>Update Restaurant Details</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="px-8 py-4 flex items-center justify-center gap-2 border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <RotateCcw size={20} />
            <span>Reset Form</span>
          </Button>
        </div>

        {/* Extra Tip/Notice */}
        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
           <p className="text-xs text-orange-700 font-medium leading-relaxed">
             <strong>Note:</strong> Updating these details will reflect immediately on the user's "Planned Dates" screen and interview confirmation emails.
           </p>
        </div>

      </div>
    </div>
  );
};

export default Restaurants;
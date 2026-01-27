import React, { useState, useRef } from 'react';
import { 
  Utensils, 
  MapPin, 
  Pizza, 
  Banknote, 
  Mail, 
  Save, 
  RotateCcw,
  PlusCircle,
  X,
  Plus,
  Image as ImageIcon, // Renamed to avoid conflict
  Upload
} from 'lucide-react';
import { Input } from '../components/Shared/Input';
import { Button } from '../components/Shared/Button';

const Restaurants = () => {
  const fileInputRef = useRef(null);

  // 1. Initial Dummy Data with placeholder images
  const initialData = [
    {
      id: 1,
      name: 'The Velvet Fork',
      location: '123 Luxury Row, Manhattan',
      foodType: 'French Fusion',
      budget: '120',
      email: 'hello@velvetfork.com',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      name: 'Noodle Zen',
      location: '45 Sakura St, Brooklyn',
      foodType: 'Japanese / Ramen',
      budget: '35',
      email: 'contact@noodlezen.jp',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60'
    }
  ];

  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantList, setRestaurantList] = useState(initialData);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    foodType: '',
    budget: '',
    email: '',
    image: null 
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', location: '', foodType: '', budget: '', email: '', image: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreateRestaurant = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in at least the Name and Email");
      return;
    }
    setRestaurantList([{ ...formData, id: Date.now() }, ...restaurantList]);
    handleReset();
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-purple-100 p-8 rounded-xl border border-purple-200 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-gray-800">Restaurant Partners</h2>
          <p className="text-purple-500 font-medium">Manage and onboard venue locations</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#632281] text-white px-8 py-4 rounded-2xl shadow-lg shadow-purple-200 hover:bg-[#4a1961] transition-all"
        >
          <Plus size={20} />
          <span>Add New Restaurant</span>
        </Button>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantList.map((rest) => (
          <div key={rest.id} className="bg-purple-100 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
            {/* Restaurant Image Header */}
            <div className="h-40 bg-purple-200 relative overflow-hidden">
              {rest.image ? (
                <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-purple-400">
                  <Utensils size={40} />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-lg">
                  Active
                </span>
              </div>
            </div>

            <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-1">{rest.name}</h4>
                <div className="space-y-2 mb-6">
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                    <MapPin size={14} className="text-purple-400" /> {rest.location}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                    <Mail size={14} className="text-purple-400" /> {rest.email}
                    </p>
                </div>
                
                <div className="pt-4 border-t border-purple-200 flex justify-between items-center">
                <div>
                    <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1">Cuisine</span>
                    <span className="text-sm font-bold text-gray-700">{rest.foodType}</span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1">Budget</span>
                    <span className="text-sm font-black text-[#632281]">${rest.budget}/pp</span>
                </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#632281]/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="bg-[#632281] p-8 flex justify-between items-center">
              <div className="flex items-center gap-4 text-white">
                <div className="p-3 bg-white/10 rounded-2xl">
                    <PlusCircle size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Onboard Restaurant</h3>
                    <p className="text-purple-200 text-xs">Add a new partner to the platform</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-8 bg-purple-50/50">
              
              {/* Image Upload Area */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-3xl p-6 bg-white hover:border-[#632281] transition-colors group">
                {formData.image ? (
                  <div className="relative w-full h-40">
                    <img src={formData.image} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
                    <button 
                      onClick={() => handleChange('image', null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="flex flex-col items-center cursor-pointer py-4"
                  >
                    <div className="p-4 bg-purple-100 rounded-full text-[#632281] mb-2 group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-bold text-gray-600">Click to upload restaurant cover photo</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Restaurant Name" 
                  icon={Utensils} 
                  placeholder="Wisteria Chalet" 
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />

                <Input 
                  label="Location / Address" 
                  icon={MapPin} 
                  placeholder="Street, City" 
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                />

                <Input 
                  label="Type of Food" 
                  icon={Pizza} 
                  placeholder="Italian, Continental" 
                  value={formData.foodType}
                  onChange={(e) => handleChange('foodType', e.target.value)}
                />

                <Input 
                  label="Budget Per Person" 
                  icon={Banknote} 
                  type="number"
                  placeholder="50" 
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                />

                <div className="md:col-span-2">
                  <Input 
                    label="Contact Email Address" 
                    icon={Mail} 
                    type="email"
                    placeholder="contact@restaurant.com" 
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleCreateRestaurant}
                  className="flex-1 py-4 flex items-center justify-center gap-2 bg-[#632281] text-white hover:bg-[#4a1961] shadow-lg shadow-purple-100 font-bold rounded-2xl"
                >
                  <Save size={20} />
                  <span>Save Restaurant</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="px-8 py-4 flex items-center justify-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-bold rounded-2xl"
                >
                  <RotateCcw size={20} />
                  <span>Reset Form</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
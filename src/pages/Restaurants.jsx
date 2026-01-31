import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Professional Toast Library
import { 
  Utensils, MapPin, Pizza, Banknote, X, Plus, Link, Coffee, Camera, Trash2, Edit3, Mail, Globe, Hash 
} from 'lucide-react'; 
import { Input } from '../components/Shared/Input';
import { Button } from '../components/Shared/Button';
import { 
  getAllRestaurants, 
  addRestaurant, 
  updateRestaurant, 
  deleteRestaurant, 
  IMAGE_BASE_URL 
} from '../api/restaurantApi';

const Restaurants = () => {
  const fileInputRef = useRef(null);
  const FOOD_TYPES = ['Italian', 'Japanese', 'French Fusion', 'Indian', 'Continental', 'Cafe Foods', 'Bakery', 'Fast Food'];
  const VENUE_TYPES = ['Restaurant', 'Cafe'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null); 
  const [preview, setPreview] = useState(null); 

  const [formData, setFormData] = useState({
    venueType: 'Restaurant',
    businessName: '',
    email: '', 
    streetAddress: '',
    cityState: '',
    pincode: '',
    googleMapsLink: '',
    typeOfFood: FOOD_TYPES[0],
    budgetPerPerson: '',
    venuePhoto: null 
  });

  // Fetch Data
  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const result = await getAllRestaurants();
      setRestaurantList(result.data || []);
    } catch (error) {
      toast.error("Could not sync with server.");
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRestaurants(); }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, venuePhoto: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setFormData({ 
      venueType: 'Restaurant', businessName: '', email: '', streetAddress: '', cityState: '', 
      pincode: '', googleMapsLink: '', typeOfFood: FOOD_TYPES[0], 
      budgetPerPerson: '', venuePhoto: null 
    });
    setPreview(null);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- SAVE / UPDATE WITH TOAST IN MIDDLE ---
  const handleSave = async () => {
    // Validation Toast
    if (!formData.businessName || !formData.email || !formData.streetAddress) {
      toast.error("Required fields are missing!", {
        style: { borderRadius: '15px', background: '#333', color: '#fff' }
      });
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
        if (formData[key] !== null) data.append(key, formData[key]);
    });

    // Create a promise for the API call
    const apiCall = editId ? updateRestaurant(editId, data) : addRestaurant(data);

    // Show loading, success, and error toast in the middle
    toast.promise(apiCall, {
      loading: editId ? 'Updating details...' : 'Adding new venue...',
      success: () => {
        fetchRestaurants();
        setIsModalOpen(false);
        handleReset();
        return editId ? 'Venue updated successfully! 🎉' : 'New venue onboarded! 🥂';
      },
      error: (err) => err.response?.data?.message || 'Something went wrong.',
    }, {
      style: {
        minWidth: '250px',
        fontWeight: 'bold',
        borderRadius: '16px'
      },
      success: {
        duration: 4000,
        icon: '✅',
      },
    });
  };

  // Delete Action
  const handleDelete = async (id) => {
    if (window.confirm("Remove this partner?")) {
      try {
        await deleteRestaurant(id);
        toast.success("Venue deleted successfully");
        fetchRestaurants();
      } catch (error) {
        toast.error("Failed to delete.");
      }
    }
  };

  const handleEditOpen = (item) => {
    setEditId(item._id);
    setFormData({
      venueType: item.venueType || 'Restaurant',
      businessName: item.businessName || '',
      email: item.email || '', 
      streetAddress: item.streetAddress || '',
      cityState: item.cityState || '',
      pincode: item.pincode || '',
      googleMapsLink: item.googleMapsLink || '',
      typeOfFood: item.typeOfFood || FOOD_TYPES[0],
      budgetPerPerson: item.budgetPerPerson || '',
      venuePhoto: null 
    });
    setPreview(item.venuePhoto ? `${IMAGE_BASE_URL}${item.venuePhoto.replace(/\\/g, '/')}` : null);
    setIsModalOpen(true);
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${path.replace(/\\/g, '/')}`;
  };

  return (
    <div className="max-w-8xl mx-auto space-y-8">
      {/* 
         TOASTER COMPONENT: 
         Position "top-center" puts the toast in the top-middle. 
      */}
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
            duration: 3000,
            style: {
                background: '#fff',
                color: '#632281',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '16px',
            },
        }}
      />

      {/* Header */}
      <div className="flex flex-col md:items-center md:flex-row justify-between gap-2 bg-purple-100 p-5 rounded-xl border border-purple-200">
        <div>
          <h2 className="text-xl font-black text-gray-800">Venue Partners</h2>
          <p className="text-purple-500 font-medium">Manage Restaurants & Cafes locations</p>
        </div>
        <Button onClick={() => { handleReset(); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#632281] text-white px-8 py-4 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95">
          <Plus size={20} />
          <span>Add New Venue</span>
        </Button>
      </div>

      {/* Main Content (Loading or Grid) */}
      {loading ? (
          <div className="text-center py-24 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-black text-purple-600 uppercase tracking-widest text-xs">Loading network...</p>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantList.map((rest) => (
            <div key={rest._id} className="bg-gradient-to-br from-purple-200 to-pink-100 rounded-xl border border-gray-100 shadow-sm overflow-hidden group relative transition-all hover:border-purple-300">
                <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditOpen(rest)} className="p-2.5 bg-white text-purple-600 rounded-xl shadow-lg hover:bg-purple-50"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(rest._id)} className="p-2.5 bg-white text-red-500 rounded-xl shadow-lg hover:bg-red-50"><Trash2 size={16} /></button>
                </div>
                <div className="h-48 bg-purple-200 relative overflow-hidden">
                    {rest.venuePhoto ? (
                        <img src={getImageUrl(rest.venuePhoto)} alt={rest.businessName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-purple-300"><Utensils size={48} /></div>
                    )}
                    <div className="absolute top-4 left-4"><span className="bg-[#632281] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{rest.venueType}</span></div>
                </div>
                <div className="p-8">
                    <h4 className="text-2xl font-black text-gray-800 mb-1 truncate">{rest.businessName}</h4>
                    <p className="text-xs font-bold text-purple-400 mb-4 flex items-center gap-1"><Mail size={12}/> {rest.email}</p>
                    <div className="space-y-2 mb-6 min-h-[60px]">
                        <div className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                            <MapPin size={16} className="text-[#632281] shrink-0 mt-0.5" />
                            <div className="truncate">
                                <p className="text-gray-900 font-bold truncate">{rest.streetAddress}</p>
                                <p className="text-xs truncate">{rest.cityState} - {rest.pincode}</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-purple-50 flex justify-between items-center">
                        <div>
                            <span className="text-[10px] uppercase font-black text-purple-400 block mb-1">Cuisine</span>
                            <div className="flex items-center gap-1.5">
                                <Pizza size={14} className="text-[#632281]"/>
                                <span className="text-sm font-black text-gray-700">{rest.typeOfFood}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] uppercase font-black text-purple-400 block mb-1">Budget</span>
                            <span className="text-lg font-black text-[#632281]">₹{rest.budgetPerPerson}</span>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-purple-100 w-full max-w-xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-[#632281] p-8 flex justify-between items-center sticky top-0 z-10">
              <div className="text-white">
                <h3 className="text-2xl font-black">{editId ? 'Update Venue' : 'Onboard Venue'}</h3>
                <p className="text-purple-200 text-sm">Required fields marked with *</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={24} /></button>
            </div>

            <div className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase ml-2 tracking-widest">Venue Photo</label>
                <div onClick={() => fileInputRef.current.click()} className="relative group h-44 w-full rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#632281] transition-all overflow-hidden">
                  {preview ? ( <img src={preview} alt="Preview" className="w-full h-full object-cover" /> ) : (
                    <div className="flex flex-col items-center text-purple-400 group-hover:text-[#632281]">
                      <Camera size={32} /><span className="text-xs font-bold mt-2">Upload Photo</span>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Venue Type *</label>
                    <div className="flex gap-4">
                        {VENUE_TYPES.map(type => (
                            <button
                                key={type}
                                onClick={() => handleChange('venueType', type)}
                                className={`flex-1 py-3 px-6 rounded-2xl font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                                    formData.venueType === type 
                                    ? 'bg-[#632281] border-[#632281] text-white shadow-md' 
                                    : 'bg-white border-purple-100 text-purple-400 hover:border-purple-200'
                                }`}
                            >
                                {type === 'Restaurant' ? <Utensils size={18} /> : <Coffee size={18} />}
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <Input label="Business Name *" icon={Utensils} value={formData.businessName} onChange={(e) => handleChange('businessName', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                    <Input label="Contact Email *" icon={Mail} type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                    <Input label="Street Address *" icon={MapPin} value={formData.streetAddress} onChange={(e) => handleChange('streetAddress', e.target.value)} />
                </div>
                <Input label="City, State" icon={Globe} placeholder="Mumbai, Maharashtra" value={formData.cityState} onChange={(e) => handleChange('cityState', e.target.value)} />
                <Input label="Pincode" icon={Hash} placeholder="400001" value={formData.pincode} onChange={(e) => handleChange('pincode', e.target.value)} />
                <div className="md:col-span-2">
                    <Input label="Google Maps Link" icon={Link} placeholder="Paste URL here" value={formData.googleMapsLink} onChange={(e) => handleChange('googleMapsLink', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Type of Food</label>
                    <select className="w-full px-6 py-4 bg-purple-50 rounded-2xl font-bold text-gray-700 outline-none border-none cursor-pointer" value={formData.typeOfFood} onChange={(e) => handleChange('typeOfFood', e.target.value)}>
                        {FOOD_TYPES.map(food => <option key={food} value={food}>{food}</option>)}
                    </select>
                </div>
                <Input label="Budget Per Person" icon={Banknote} type="number" value={formData.budgetPerPerson} onChange={(e) => handleChange('budgetPerPerson', e.target.value)} />
              </div>

              <div className="flex gap-4 pt-6">
                <Button onClick={handleSave} className="flex-1 py-5 bg-[#632281] text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl hover:bg-purple-900 transition-all">
                    {editId ? 'Update Partner' : 'Save Partner'}
                </Button>
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="px-8 py-5 border-gray-200 text-gray-400 font-black uppercase text-xs rounded-2xl hover:bg-gray-50">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const result = await getAllRestaurants();
      setRestaurantList(result.data || []);
    } catch (error) {
      toast.error("Could not sync with server.");
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

  const handleSave = async () => {
    if (!formData.businessName || !formData.email || !formData.streetAddress) {
      toast.error("Required fields are missing!");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
        if (formData[key] !== null) data.append(key, formData[key]);
    });

    const apiCall = editId ? updateRestaurant(editId, data) : addRestaurant(data);

    toast.promise(apiCall, {
      loading: editId ? 'Updating details...' : 'Onboarding venue...',
      success: () => {
        fetchRestaurants();
        setIsModalOpen(false);
        handleReset();
        return editId ? 'Venue updated!' : 'New venue added!';
      },
      error: (err) => err.response?.data?.message || 'Something went wrong.',
    }, {
      style: { borderRadius: '12px', fontBold: true },
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this partner?")) {
      try {
        await deleteRestaurant(id);
        toast.success("Venue deleted");
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
    <div className="max-w-8xl mx-auto space-y-8 p-6 bg-white min-h-screen">
      <Toaster position="top-center" />

      {/* 1. Header Section */}
      <div className="flex flex-col md:items-end md:flex-row justify-between gap-6 border-b border-slate-100 pb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Venue Partners</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Hospitality Access Management</p>
        </div>
        <Button onClick={() => { handleReset(); setIsModalOpen(true); }} className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl shadow-xl hover:bg-slate-800 transition-all active:scale-95 text-xs font-bold uppercase tracking-widest">
          <Plus size={18} />
          <span>Add New Venue</span>
        </Button>
      </div>

      {/* 2. Content Area */}
      {loading ? (
          <div className="py-32 flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <p className="font-black text-black uppercase tracking-widest text-[10px]">Syncing Directory...</p>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurantList.map((rest) => (
            <div key={rest._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group relative hover:shadow-2xl transition-all duration-300">
                {/* Actions */}
                <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditOpen(rest)} className="p-2.5 bg-white text-black rounded-xl shadow-lg border border-slate-100 hover:bg-slate-50"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(rest._id)} className="p-2.5 bg-white text-red-600 rounded-xl shadow-lg border border-slate-100 hover:bg-red-50"><Trash2 size={16} /></button>
                </div>

                {/* Cover Image (Grayscale Removed) */}
                <div className="h-56 bg-slate-50 relative overflow-hidden">
                    {rest.venuePhoto ? (
                        <img 
                          src={getImageUrl(rest.venuePhoto)} 
                          alt={rest.businessName} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200"><Utensils size={48} /></div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-black text-white text-[9px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
                        {rest.venueType}
                      </span>
                    </div>
                </div>

                {/* Details */}
                <div className="p-8">
                    <h4 className="text-xl font-black text-slate-900 mb-1 truncate uppercase tracking-tight">{rest.businessName}</h4>
                    <p className="text-[11px] font-bold text-slate-400 mb-6 flex items-center gap-2 uppercase tracking-wider"><Mail size={12} className="text-black" /> {rest.email}</p>
                    
                    <div className="space-y-2 mb-8 h-12">
                        <div className="flex items-start gap-3 text-xs text-slate-500 font-bold">
                            <MapPin size={16} className="text-black shrink-0" />
                            <div className="truncate leading-relaxed">
                                <p className="text-slate-900 truncate uppercase">{rest.streetAddress}</p>
                                <p className="text-[10px] opacity-60 truncate">{rest.cityState} • {rest.pincode}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                        <div>
                            <span className="text-[9px] uppercase font-black text-slate-300 block mb-1 tracking-widest">Cuisine</span>
                            <div className="flex items-center gap-2">
                                <Pizza size={14} className="text-black"/>
                                <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">{rest.typeOfFood}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[9px] uppercase font-black text-slate-300 block mb-1 tracking-widest">Pricing</span>
                            <span className="text-xl font-black text-slate-900">₹{rest.budgetPerPerson}</span>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      )}

      {/* Modal remains the same */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto border border-slate-100">
            <div className="bg-black p-8 flex justify-between items-center sticky top-0 z-10">
              <div className="text-white">
                <h3 className="text-xl font-black uppercase tracking-widest">{editId ? 'Edit Venue' : 'Onboard Venue'}</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">Partner Registration Portal</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"><X size={24} /></button>
            </div>

            <div className="p-10 space-y-10 bg-white">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Imagery</label>
                <div onClick={() => fileInputRef.current.click()} className="relative group h-48 w-full rounded-2xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-all overflow-hidden shadow-inner">
                  {preview ? ( <img src={preview} alt="Preview" className="w-full h-full object-cover" /> ) : (
                    <div className="flex flex-col items-center text-slate-300 group-hover:text-black transition-colors">
                      <Camera size={32} strokeWidth={1.5} /><span className="text-[10px] font-black uppercase mt-3 tracking-widest">Select Image</span>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type of Venue *</label>
                    <div className="flex gap-3">
                        {VENUE_TYPES.map(type => (
                            <button
                                key={type}
                                onClick={() => handleChange('venueType', type)}
                                className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all border text-xs uppercase tracking-widest flex items-center justify-center gap-3 ${
                                    formData.venueType === type 
                                    ? 'bg-black border-black text-white shadow-lg' 
                                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-400'
                                }`}
                            >
                                {type === 'Restaurant' ? <Utensils size={18} /> : <Coffee size={18} />}
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <Input label="BUSINESS NAME *" icon={Utensils} value={formData.businessName} onChange={(e) => handleChange('businessName', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                    <Input label="CONTACT EMAIL *" icon={Mail} type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                    <Input label="STREET ADDRESS *" icon={MapPin} value={formData.streetAddress} onChange={(e) => handleChange('streetAddress', e.target.value)} />
                </div>
                <Input label="CITY, STATE" icon={Globe} placeholder="e.g. Mumbai, MH" value={formData.cityState} onChange={(e) => handleChange('cityState', e.target.value)} />
                <Input label="PINCODE" icon={Hash} placeholder="000000" value={formData.pincode} onChange={(e) => handleChange('pincode', e.target.value)} />
                <div className="md:col-span-2">
                    <Input label="GOOGLE MAPS URL" icon={Link} placeholder="Paste link here" value={formData.googleMapsLink} onChange={(e) => handleChange('googleMapsLink', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cuisine Style</label>
                    <select className="w-full px-5 py-4 bg-slate-50 rounded-xl font-bold text-sm text-slate-700 outline-none border border-slate-100 cursor-pointer focus:border-black transition-all" value={formData.typeOfFood} onChange={(e) => handleChange('typeOfFood', e.target.value)}>
                        {FOOD_TYPES.map(food => <option key={food} value={food}>{food}</option>)}
                    </select>
                </div>
                <Input label="BUDGET PER HEAD" icon={Banknote} type="number" value={formData.budgetPerPerson} onChange={(e) => handleChange('budgetPerPerson', e.target.value)} />
              </div>

              <div className="flex gap-4 pt-8">
                <Button onClick={handleSave} className="flex-1 py-5 bg-black text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-xl hover:bg-slate-800 transition-all">
                    {editId ? 'Update Detail' : 'Authorize Partner'}
                </Button>
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="px-8 py-5 border-slate-200 text-slate-400 font-bold uppercase text-xs rounded-xl hover:bg-slate-50 transition-all">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
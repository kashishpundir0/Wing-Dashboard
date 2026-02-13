import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Utensils, MapPin, Pizza, Banknote, X, Plus, Coffee, Camera, Trash2, Edit3, Mail, Globe, Hash, Check, Link as LinkIcon
} from 'lucide-react';
import { Input } from '../components/Shared/Input';
import { Button } from '../components/Shared/Button';
import {
  getAllRestaurants, addRestaurant, updateRestaurant, deleteRestaurant, IMAGE_BASE_URL
} from '../api/restaurantApi';

const Restaurants = () => {
  const fileInputRef = useRef(null);
  const FOOD_TYPES = ['Italian', 'Japanese', 'French Fusion', 'Indian', 'Continental', 'Cafe Foods', 'Bakery', 'Fast Food', 'Chinese', 'Mexican', 'Thai', 'Mediterranean'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showFoodDropdown, setShowFoodDropdown] = useState(false);

  const [formData, setFormData] = useState({
    venueType: 'Restaurant',
    businessName: '',
    email: '',
    streetAddress: '',
    cityState: '',
    pincode: '',
    googleMapsLink: '',
    typeOfFood: [],
    budgetPerPerson: '',
    venuePhotos: null
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

  const getImageUrl = (rest) => {
    if (rest.venuePhotos && rest.venuePhotos.length > 0) return rest.venuePhotos[0];
    if (rest.venuePhoto) return `${IMAGE_BASE_URL}${rest.venuePhoto.replace(/\\/g, '/')}`;
    return null;
  };

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const toggleFoodType = (type) => {
    setFormData(prev => {
      const current = prev.typeOfFood;
      const updated = current.includes(type) ? current.filter(t => t !== type) : [...current, type];
      return { ...prev, typeOfFood: updated };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, venuePhotos: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setFormData({
      venueType: 'Restaurant', businessName: '', email: '', streetAddress: '', cityState: '',
      pincode: '', googleMapsLink: '', typeOfFood: [], budgetPerPerson: '', venuePhotos: null
    });
    setPreview(null);
    setEditId(null);
    setShowFoodDropdown(false);
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
      typeOfFood: Array.isArray(item.typeOfFood) ? item.typeOfFood : (item.typeOfFood ? [item.typeOfFood] : []),
      budgetPerPerson: item.budgetPerPerson || '',
      venuePhotos: null // Set to null so we don't send a URL string to the file input
    });
    setPreview(getImageUrl(item));
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    // 1. Validation Trimming
    if (!formData.businessName.trim() || !formData.email.trim()) {
      toast.error("Name and Email are required");
      return;
    }

    const data = new FormData();

    // 2. Append Text Fields (Clean Data)
    data.append('venueType', formData.venueType);
    data.append('businessName', formData.businessName.trim());
    data.append('email', formData.email.trim());
    data.append('streetAddress', formData.streetAddress.trim());
    data.append('cityState', formData.cityState.trim());
    data.append('pincode', formData.pincode.trim());
    data.append('googleMapsLink', formData.googleMapsLink.trim());
    data.append('budgetPerPerson', String(formData.budgetPerPerson));

    // 3. Handle Cuisine Array for Multer
    formData.typeOfFood.forEach(type => data.append('typeOfFood', type));

    // 4. Handle File (Only append if a new file object exists)
    if (formData.venuePhotos instanceof File) {
      data.append('venuePhotos', formData.venuePhotos);
    }

    const apiCall = editId ? updateRestaurant(editId, data) : addRestaurant(data);

    toast.promise(apiCall, {
      loading: editId ? 'Updating...' : 'Adding...',
      success: () => {
        fetchRestaurants();
        setIsModalOpen(false);
        handleReset();
        return 'Success!';
      },
      error: (err) => err.response?.data?.message || 'Server Error: check console',
    });
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <div className="flex items-center gap-2">
          <Trash2 size={18} className="text-red-500" />
          <span className="font-bold text-slate-800 text-sm">Delete this venue?</span>
        </div>
        <p className="text-xs text-slate-500">This action cannot be undone.</p>
        <div className="flex gap-2 mt-1">
          <button
            onClick={async () => {
              toast.dismiss(t.id); // Close the confirmation toast
              try {
                // Actual API call logic
                await deleteRestaurant(id);
                toast.success("Venue deleted successfully", {
                  icon: '✅',
                  style: { borderRadius: '12px', background: '#333', color: '#fff' }
                });
                fetchRestaurants(); // Refresh list
              } catch (error) {
                toast.error("Failed to delete venue");
              }
            }}
            className="flex-1 bg-red-600 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 bg-slate-100 text-slate-500 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
      style: {
        minWidth: '280px',
        borderRadius: '20px',
        border: '1px solid #f1f5f9',
        padding: '16px',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
      }
    });
  };

  return (
    <div className="max-w-8xl mx-auto space-y-8 p-6 bg-white min-h-screen">
      <Toaster position="top-center" />

      <div className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Venue Partners</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Access Management</p>
        </div>
        <Button onClick={() => { handleReset(); setIsModalOpen(true); }} className="bg-black text-white px-8 py-4 rounded-xl text-xs font-bold uppercase shadow-lg">
          <Plus size={18} className="mr-2" /> Add Venue
        </Button>
      </div>

      {loading ? (
        <div className="py-32 flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurantList.map((rest) => (
            <div key={rest._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group relative hover:shadow-md transition-all">
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button onClick={() => handleEditOpen(rest)} className="p-2.5 bg-white text-black rounded-xl shadow-md border border-slate-100 hover:bg-slate-50 transition-colors"><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(rest._id)} className="p-2.5 bg-white text-red-600 rounded-xl shadow-md border border-slate-100 hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
              </div>

              <div className="h-56 bg-slate-50 relative overflow-hidden">
                {getImageUrl(rest) ? (
                  <img src={getImageUrl(rest)} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200"><Utensils size={48} /></div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black text-white rounded-lg text-[10px] font-black uppercase tracking-widest">{rest.venueType}</span>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-black text-slate-900 uppercase truncate">{rest.businessName}</h4>
                <p className="text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-wider truncate">{rest.email}</p>
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center gap-4">
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[9px] uppercase font-black text-slate-300 block">Cuisines</span>
                    <span className="text-xs font-bold text-slate-700 uppercase truncate block">
                      {Array.isArray(rest.typeOfFood) ? rest.typeOfFood.join(', ') : rest.typeOfFood}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl font-black text-slate-900">₹{rest.budgetPerPerson}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-black p-8 flex justify-between items-center shrink-0">
              <h3 className="text-white text-xl font-black uppercase tracking-widest">{editId ? 'Update Venue' : 'Onboard Venue'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white"><X size={24} /></button>
            </div>

            <div className="p-10 space-y-6 overflow-y-auto custom-scrollbar">
              {/* FIXED: Venue Type Toggle */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Venue Categorization *</label>
                <div className="flex gap-3">
                  {['Restaurant', 'Cafe'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleChange('venueType', type)}
                      className={`flex-1 py-4 px-6 rounded-2xl font-black transition-all border text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 ${formData.venueType === type
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

              <div onClick={() => fileInputRef.current.click()} className="h-48 w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center cursor-pointer overflow-hidden relative group">
                {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Camera className="text-slate-300 group-hover:text-black transition-colors" size={32} />}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>

              <div className="space-y-4">
                <Input label="BUSINESS NAME *" value={formData.businessName} onChange={(e) => handleChange('businessName', e.target.value)} />
                <Input label="EMAIL *" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                <Input label="STREET ADDRESS *" value={formData.streetAddress} onChange={(e) => handleChange('streetAddress', e.target.value)} />

                <div className="flex gap-4">
                  <Input label="CITY" value={formData.cityState} onChange={(e) => handleChange('cityState', e.target.value)} />
                  <Input label="PINCODE" value={formData.pincode} onChange={(e) => handleChange('pincode', e.target.value)} />
                </div>

                <Input label="GOOGLE MAPS LINK" icon={LinkIcon} value={formData.googleMapsLink} onChange={(e) => handleChange('googleMapsLink', e.target.value)} />

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cuisine Style (Multiple) *</label>
                  <div onClick={() => setShowFoodDropdown(!showFoodDropdown)} className="min-h-[56px] w-full px-5 py-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap gap-2 items-center cursor-pointer hover:border-black transition-all">
                    {formData.typeOfFood.length === 0 ? <span className="text-sm text-slate-400 font-medium">Select cuisines...</span> :
                      formData.typeOfFood.map(type => (
                        <span key={type} className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                          {type} <X size={12} onClick={(e) => { e.stopPropagation(); toggleFoodType(type); }} />
                        </span>
                      ))}
                  </div>

                  {showFoodDropdown && (
                    <div className="w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 grid grid-cols-2 gap-2 max-h-48 overflow-y-auto ring-2 ring-black/5">
                      {FOOD_TYPES.map(food => (
                        <div key={food} onClick={() => toggleFoodType(food)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${formData.typeOfFood.includes(food) ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-600'}`}>
                          <span className="text-[10px] font-black uppercase tracking-wider">{food}</span>
                          {formData.typeOfFood.includes(food) && <Check size={14} />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Input label="BUDGET PER PERSON" type="number" icon={Banknote} value={formData.budgetPerPerson} onChange={(e) => handleChange('budgetPerPerson', e.target.value)} />
              </div>

              <div className="flex gap-4 pt-4 pb-10">
                <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 py-5 border-slate-200 text-slate-400">Cancel</Button>
                <Button onClick={handleSave} className="flex-[2] py-5 bg-black text-white font-black uppercase tracking-widest rounded-xl shadow-xl">
                  {editId ? 'Update Details' : 'Onboard Partner'}
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
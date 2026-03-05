import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle2, Loader2, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { getPhotos, uploadPhotos } from '../api/facialAttractivenessApi';

// Sub-module: Photos Grid
const PhotoGrid = ({ photos, title }) => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-full">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-[#1F1F2E] tracking-tight">{title}</h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                {photos.length} Photos
            </span>
        </div>

        {photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                <ImageIcon size={32} className="text-slate-200 mb-2" />
                <p className="text-slate-400 text-sm font-medium">No photos in this portfolio</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo._id} className="group relative aspect-3/4 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                            src={photo.imgUrl}
                            alt="Gallery"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest">View Image</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const FacialAttractiveness = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedGender, setSelectedGender] = useState('male');
    const [files, setFiles] = useState([]);

    const userId = "699e9a228e41d29366bb2dd0";

    const fetchData = async () => {
        try {
            const res = await getPhotos(userId);
            if (res.success) setPhotos(res.data.photos);
        } catch (err) {
            toast.error("Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const clearSelection = () => setFiles([]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (files.length === 0) return toast.error("Please select images first");

        setUploading(true);
        const formData = new FormData();
        formData.append('gender', selectedGender);
        files.forEach(file => formData.append('photos', file));

        try {
            const res = await uploadPhotos(userId, formData);
            if (res.success) {
                toast.success("Photos uploaded successfully!");
                setPhotos(res.data.photos);
                setFiles([]);
            }
        } catch (err) {
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const menPhotos = photos.filter(p => p.gender === 'male');
    const womenPhotos = photos.filter(p => p.gender === 'female');

    return (
        <div className="max-w-7xl mx-auto space-y-8 p-4">
            {/* Header & Upload Section */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-[#1F1F2E] tracking-tighter">Facial Attractiveness</h2>
                        <p className="text-sm text-slate-400 font-medium mt-1">Manage and curate your gender-specific model assets</p>
                    </div>

                    <form onSubmit={handleUpload} className="flex flex-wrap items-center gap-3 bg-[#F8FAFC] p-2 rounded-3xl border border-slate-200 w-full lg:w-auto">
                        <select
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#1F1F2E] outline-none px-4 h-12 uppercase tracking-widest shadow-sm"
                        >
                            <option value="male">Male Portfolio</option>
                            <option value="female">Female Portfolio</option>
                        </select>

                        <div className="relative flex-1 lg:flex-none">
                            <label className="flex items-center justify-center gap-3 cursor-pointer px-6 h-12 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm min-w-45">
                                <Upload size={16} className="text-indigo-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                                    {files.length > 0 ? `${files.length} Selected` : "Choose Photos"}
                                </span>
                                <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                            </label>
                            {files.length > 0 && (
                                <button
                                    type="button"
                                    onClick={clearSelection}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={uploading || files.length === 0}
                            className="bg-[#1F1F2E] text-white px-8 h-12 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                        >
                            {uploading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                            {uploading ? "Processing..." : "Start Upload"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {loading ? (
                    <div className="col-span-2 py-32 flex flex-col items-center justify-center space-y-4">
                        <Loader2 size={40} className="animate-spin text-slate-200" />
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">Syncing Library...</span>
                    </div>
                ) : (
                    <>
                        <PhotoGrid title="Men's Portfolio" photos={menPhotos} />
                        <PhotoGrid title="Women's Portfolio" photos={womenPhotos} />
                    </>
                )}
            </div>
        </div>
    );
};

export default FacialAttractiveness;
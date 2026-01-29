import React from 'react';
import { Users, GraduationCap, Briefcase, Calendar } from 'lucide-react';
import GenderChart from '../components/Dashboard/GenderChart';
import OccupationCard from '../components/Dashboard/OccupationCard';
import AgeDistribution from '../components/Dashboard/AgeDistribution';

const Demographics = () => {
  // Mock Data
  const genderData = {
    male: 1800,
    female: 1400,
    total: 3200,
    regional: [
      { location: 'Bengaluru', male: 60, female: 50 },
      { location: 'Mumbai', male: 45, female: 38 },
      { location: 'Delhi', male: 30, female: 42 },
      { location: 'Pune', male: 25, female: 20 },
    ]
  };

  const occupationData = [
    { label: 'Students', count: 2100, icon: GraduationCap, percentage: 65 },
    { label: 'Professionals', count: 1100, icon: Briefcase, percentage: 35 },
  ];

  const ageData = {
    average: 24,
    distribution: [
      { range: '18-22', percentage: 45 },
      { range: '23-27', percentage: 35 },
      { range: '28-32', percentage: 15 },
      { range: '33+', percentage: 5 },
    ]
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Demographics</h1>
          <p className="text-gray-500 font-medium">Detailed breakdown of your active user base</p>
        </div>
        <div className="flex items-center gap-3 bg-purple-100 p-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-2 bg-purple-100 rounded-lg text-[#632281]">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Audience</p>
            <p className="text-xl font-black text-gray-800">{genderData.total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 1 & 2: Gender and Location (Using the component you provided) */}
      <GenderChart 
        maleCount={genderData.male} 
        femaleCount={genderData.female} 
        regionalBreakdown={genderData.regional} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3: Average Age Breakdown */}
        <AgeDistribution ageData={ageData} />

        {/* 4: Occupation (Study/Job) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {occupationData.map((item, idx) => (
            <OccupationCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demographics;

// import React, { useEffect, useState } from 'react';
// import { Users, GraduationCap, Briefcase, Loader2, AlertCircle } from 'lucide-react';
// import GenderChart from '../components/Dashboard/GenderChart';
// import OccupationCard from '../components/Dashboard/OccupationCard';
// import AgeDistribution from '../components/Dashboard/AgeDistribution';
// import { getDemographics } from '../api/demographicsApi';

// const Demographics = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [demoData, setDemoData] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await getDemographics();
      
//       // Check if data is empty (matching your provided current response)
//       if (!response.data || Object.keys(response.data).length === 0) {
//         setDemoData(null);
//       } else {
//         setDemoData(response.data);
//       }
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] text-purple-600">
//         <Loader2 className="animate-spin mb-2" size={40} />
//         <p className="font-bold">Analyzing demographics...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 bg-red-50 rounded-3xl m-8 p-10">
//         <AlertCircle size={40} className="mb-2" />
//         <p className="font-black text-xl">Data Error</p>
//         <p className="font-medium text-center">{error}</p>
//         <button onClick={fetchData} className="mt-4 px-6 py-2 bg-red-100 rounded-xl font-bold hover:bg-red-200 transition-all">Retry</button>
//       </div>
//     );
//   }

//   // Handle "No Users Found" case locally
//   if (!demoData) {
//     return (
//       <div className="p-8 text-center bg-white rounded-[3rem] shadow-sm border border-gray-100 m-8">
//         <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
//            <Users className="text-purple-300" size={40} />
//         </div>
//         <h2 className="text-2xl font-black text-gray-800">No User Data Available</h2>
//         <p className="text-gray-400 font-medium">Wait for users to join to see demographics breakdown.</p>
//       </div>
//     );
//   }

//   // Transform Backend Data for UI components
//   const genderBreakdown = {
//     male: demoData.genderDemographics.male,
//     female: demoData.genderDemographics.female,
//     total: demoData.totalAudience,
//     // Map backend locations (_id) to UI expected format (location)
//     regional: demoData.locations.map(loc => ({
//       location: loc._id,
//       male: loc.male,
//       female: loc.female
//     }))
//   };

//   const ageData = {
//     average: demoData.ageDistribution.avgAge,
//     distribution: demoData.ageDistribution.breakdown.map(item => ({
//       range: item.range,
//       // Convert "45%" string to 45 number
//       percentage: parseFloat(item.percentage)
//     }))
//   };

//   const occupationData = [
//     { 
//       label: 'Students', 
//       count: demoData.occupations.students.count, 
//       icon: GraduationCap, 
//       percentage: parseFloat(demoData.occupations.students.percentage) 
//     },
//     { 
//       label: 'Professionals', 
//       count: demoData.occupations.professionals.count, 
//       icon: Briefcase, 
//       percentage: parseFloat(demoData.occupations.professionals.percentage) 
//     },
//   ];

//   return (
//     <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-black text-gray-900 tracking-tight">User Demographics</h1>
//           <p className="text-gray-500 font-medium tracking-tight">Live insights from {demoData.totalAudience} users</p>
//         </div>
//         <div className="flex items-center gap-4 bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm px-8">
//           <div className="p-3 bg-purple-100 rounded-2xl text-[#632281] shadow-inner">
//             <Users size={24} />
//           </div>
//           <div>
//             <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Audience</p>
//             <p className="text-2xl font-black text-gray-800 leading-none">{demoData.totalAudience.toLocaleString()}</p>
//           </div>
//         </div>
//       </div>

//       {/* Part 1: Gender Distribution & Location Charts */}
//       <GenderChart 
//         maleCount={genderBreakdown.male} 
//         femaleCount={genderBreakdown.female} 
//         regionalBreakdown={genderBreakdown.regional} 
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Part 2: Age Breakdown Component */}
//         <AgeDistribution ageData={ageData} />

//         {/* Part 3: Occupation Cards (Study vs Job) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {occupationData.map((item, idx) => (
//             <OccupationCard key={idx} {...item} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Demographics;